"use client";
import { Contact } from "@/app/chat/client-page-chat";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Message } from "@/hooks/use-web-socket";
import { formatTime } from "@/lib/utils";
import EmojiPicker from "@emoji-mart/react";

import data from "@emoji-mart/data";
import { SendHorizontal, Smile as Emoji } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import AvatarChat from "@/app/chat/avatar-chat";
import NameChat from "@/app/chat/name-chat";

interface ContentChatProps {
  selectedContact: Contact;
  messages: Message[];
  sendMessage: (content: string) => void;
  isConnected: boolean;
}

export default function ContentChat({
  selectedContact,
  messages,
  sendMessage,
  isConnected,
}: ContentChatProps) {
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom(); // Cuộn xuống khi có tin nhắn mới
  }, [messages]);

  useEffect(() => {
    scrollToBottom(); // Cuộn xuống ngay từ đầu
  }, []);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      sendMessage(inputMessage);
      setInputMessage("");
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* header chat content */}
      <div className="sticky top-0 z-10 bg-backgroundChat shadow-lg rounded-t-lg flex items-center justify-between p-4">
        <div className="flex items-center">
          <div className="relative">
            {/* <Avatar className="h-10 w-10">
              <AvatarImage
                src={
                  typeof selectedContact.avatar === "string"
                    ? selectedContact.avatar
                    : undefined
                }
              />
              <AvatarFallback>
                {selectedContact.name.substring(0, 2)}
              </AvatarFallback>
            </Avatar> */}
            <AvatarChat userId={selectedContact.id} />
            <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>

          <div className="ml-3">
            {/* <p className="font-semibold">{selectedContact.name}</p> */}
            <NameChat userId={selectedContact.id} />
            <p className="text-sm text-gray-500">Đang hoạt động</p>
          </div>
        </div>
      </div>
      {/* Phần nội dung chat */}
      <ScrollArea className="p-4 h-[600px] flex flex-col justify-end relative">
        <div className="space-y-4 absolute bottom-0 right-0 px-2 w-full">
          {messages.length === 0 ? (
            <div className="flex justify-center items-center text-gray-400">
              Hãy bắt đầu cuộc trò chuyện!
            </div>
          ) : (
            messages.map((message, index) => {
              const isFirstMessage = index === messages.length - 1; // Kiểm tra tin nhắn cuối cùng
              const isMyMessage = message.SenderId !== selectedContact.id;
              return (
                <div
                  key={message.Id || index}
                  className={`flex gap-2 ${
                    message.SenderId === selectedContact.id ? "" : "justify-end"
                  }`}
                >
                  {message.SenderId === selectedContact.id && (
                    // <Avatar className="h-8 w-8 mr-2">
                    //   <AvatarImage
                    //     src={
                    //       typeof selectedContact.avatar === "string"
                    //         ? selectedContact.avatar
                    //         : undefined
                    //     }
                    //   />
                    //   <AvatarFallback>
                    //     {selectedContact.name.substring(0, 2)}
                    //   </AvatarFallback>
                    // </Avatar>
                    <AvatarChat userId={selectedContact.id} />
                  )}
                  {/* chỗ sẽ hiển thị tin nhắn của mình */}
                  <div
                    className={`rounded-[20px] py-2 px-4 max-w-[70%] ${
                      message.SenderId === selectedContact.id
                        ? "bg-muted text-textChat"
                        : "bg-green-500 text-white"
                    }${
                      isMyMessage && isFirstMessage
                        ? "absolute bottom-0 right-4 text-white"
                        : ""
                    }`}
                    style={{
                      marginTop: isMyMessage && isFirstMessage ? "auto" : "", // Đẩy lên góc phải nếu tin nhắn đầu tiên
                    }}
                  >
                    <p>{message.Content}</p>
                    <span className="text-xs opacity-70">
                      {formatTime(message.Timestamp)}
                    </span>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef}></div>
        </div>
      </ScrollArea>
      {/* phần nhập chat */}
      <div className="p-4 border-t">
        <div className="flex items-center justify-center space-x-2">
          <div className="relative w-[60%]">
            <Input
              placeholder="Aa"
              className="bg-muted text-muted-foreground rounded-[20px] border-gray-200"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Emoji
              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            />
            {showEmojiPicker && typeof window !== "undefined" && (
              <div className="absolute bottom-full right-0 z-50">
                <EmojiPicker
                  data={data}
                  onEmojiSelect={(emoji: any) => {
                    setInputMessage((prev) => prev + emoji.native);
                    setShowEmojiPicker(false);
                  }}
                  theme="light"
                  previewPosition="none"
                  skinTonePosition="none"
                  autoFocus={true}
                  locale="vi"
                  defaultSkinTone="neutral"
                />
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSendMessage}
            disabled={!isConnected}
          >
            <SendHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
