"use client";
import { useCallback, useEffect, useRef, useState } from "react";

export interface Message {
  Id?: string;
  tempId?: string;
  SenderId: string;
  RecipientId: string;
  Content: string;
  Timestamp: string;
  SessionId?: string;
}

export const useWebSocket = (userId: string, partnerId: string) => {
  const socketRef = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<{ [key: string]: Message[] }>({});
  const [isConnected, setIsConnected] = useState(false);
  const messageKeysRef = useRef<{ [key: string]: Set<string> }>({});
  const loadedHistory = useRef<{ [key: string]: boolean }>({});

  const isValidRecipient = (senderId: string, recipientId: string) => {
    return senderId !== recipientId && senderId && recipientId;
  };

  const getMessageKey = (message: Message) => {
    return `${message.SenderId}-${message.RecipientId}-${message.Content}-${message.Timestamp}`;
  };

  // Add message if it's unique
  const addMessageIfUnique = useCallback(
    (message: Message, partnerId: string) => {
      const key = getMessageKey(message);
      if (!messageKeysRef.current[partnerId]) {
        messageKeysRef.current[partnerId] = new Set();
      }

      if (!messageKeysRef.current[partnerId].has(key)) {
        messageKeysRef.current[partnerId].add(key);
        setMessages((prev) => ({
          ...prev,
          [partnerId]: [...(prev[partnerId] || []), message],
        }));
      } else {
        // Update existing message with server data
        setMessages((prev) => {
          const updatedMessages = (prev[partnerId] || []).map((msg) =>
            getMessageKey(msg) === key ? { ...msg, ...message } : msg
          );
          return { ...prev, [partnerId]: updatedMessages };
        });
      }
    },
    []
  );

  const sendMessage = (content: string) => {
    if (!isValidRecipient(userId, partnerId)) {
      console.warn("Cannot send message to self or invalid IDs");
      return;
    }

    const tempId = crypto.randomUUID();

    const vnDate = new Date();
    const timezoneOffset = vnDate.getTimezoneOffset();
    const vnTimestamp = new Date(
      vnDate.getTime() - timezoneOffset * 60000
    ).toISOString();

    const localMessage: Message = {
      tempId,
      SenderId: userId,
      RecipientId: partnerId,
      Content: content,
      Timestamp: vnTimestamp,
    };
    addMessageIfUnique(localMessage, partnerId);

    const messageToSend = {
      content: content,
      tempId: tempId,
    };
    socketRef.current?.send(JSON.stringify(messageToSend));
  };

  useEffect(() => {
    let ws: WebSocket | null = null;

    if (userId && partnerId && isValidRecipient(userId, partnerId)) {
      const socketUrl = `ws://chat-service-production-1f41.up.railway.app/ws?userId=${userId}&partnerId=${partnerId}`;
      ws = new WebSocket(socketUrl);
      socketRef.current = ws;

      ws.onopen = () => {
        console.log("WebSocket connected");
        setIsConnected(true);
      };

      ws.onmessage = (event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data);
          console.log("Received message:", data);

          if (Array.isArray(data)) {
            // Initial chat history
            if (!loadedHistory.current[partnerId]) {
              loadedHistory.current[partnerId] = true;
              data.forEach((messageData) => {
                const message: Message = {
                  Id: messageData.Id,
                  tempId: messageData.tempId,
                  SenderId: messageData.SenderId,
                  RecipientId: messageData.RecipientId,
                  Content: messageData.Content,
                  Timestamp: messageData.Timestamp,
                  SessionId: messageData.SessionId,
                };
                addMessageIfUnique(message, partnerId);
              });
            }
          } else if (data.Id || data.Content) {
            // Offline message or message with metadata
            const message: Message = {
              Id: data.Id,
              tempId: data.tempId,
              SenderId: data.SenderId || partnerId,
              RecipientId: data.RecipientId || userId,
              Content: data.Content || data.content,
              Timestamp: data.Timestamp || new Date().toISOString() + 7,
              SessionId: data.SessionId,
            };
            addMessageIfUnique(message, partnerId);
          } else if (data.content) {
            // Real-time message received from the other user
            const vnDate = new Date();
            const timezoneOffset = vnDate.getTimezoneOffset();
            const vnTimestamp = new Date(
              vnDate.getTime() - timezoneOffset * 60000
            ).toISOString();
            const message: Message = {
              SenderId: partnerId,
              RecipientId: userId,
              Content: data.content,
              Timestamp: vnTimestamp,
            };
            addMessageIfUnique(message, partnerId);
          } else {
            // Unrecognized data format
            console.warn("Unrecognized message format:", data);
          }
        } catch (error) {
          console.error("Error parsing message:", error);
          console.error("Raw message that failed:", event.data);
        }
      };

      ws.onclose = () => {
        console.log("WebSocket disconnected");
        setIsConnected(false);
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      return () => {
        ws?.close();
      };
    }

    // Clean up function
    return () => {
      socketRef.current?.close();
    };
  }, [userId, partnerId, addMessageIfUnique]);

  // Clear message keys when switching contacts
  useEffect(() => {
    loadedHistory.current[partnerId] = false;
    if (partnerId) {
      // if (!messageKeysRef.current[partnerId]) {
      //   messageKeysRef.current[partnerId] = new Set();
      // }
      messageKeysRef.current[partnerId] = new Set();
      setMessages((prev) => ({
        ...prev,
        [partnerId]: [], // Clear messages for the new partner
      }));
    }
  }, [partnerId]);

  return { messages: messages[partnerId] || [], sendMessage, isConnected };
};
