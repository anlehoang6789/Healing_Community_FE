"use client";
import AvatarChat from "@/app/chat/avatar-chat";
import ContentChat from "@/components/chat/contentChat";
import SidebarChat from "@/components/chat/sidebarChat";
import { useWebSocket } from "@/hooks/use-web-socket";
import { getUserIdFromLocalStorage } from "@/lib/utils";
import { useGetFollowingQuery } from "@/queries/useAccount";
import React, { useEffect, useState } from "react";

export interface Contact {
  id: string;
  name: string;
  avatar: string | JSX.Element;
  lastMessage?: string;
}

export default function ClientPageChat() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [mounted, setMounted] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState("");
  const userId = getUserIdFromLocalStorage();

  useEffect(() => {
    setMounted(true);
    const userId = getUserIdFromLocalStorage() || "";
    setLoggedInUserId(userId);
  }, []);

  const { data: followingData } = useGetFollowingQuery(userId as string);
  const followingList = followingData?.payload.data || [];
  const contacts: Contact[] = followingList.map((user) => ({
    id: user.userId,
    name: user.fullName || user.userName,
    avatar: <AvatarChat userId={user.userId} />,
    lastMessage: "Last message placeholder",
  }));

  useEffect(() => {
    if (contacts.length > 0 && !selectedContact) {
      setSelectedContact(contacts[0]);
    }
  }, [contacts, selectedContact]);

  const { messages, sendMessage, isConnected } = useWebSocket(
    loggedInUserId,
    selectedContact?.id ?? ""
  );
  if (!mounted) return null;

  return (
    <div className="flex flex-col md:flex-row text-muted-foreground">
      <div className="md:w-1/4 lg:w-1/5 md:mr-2 shadow-lg rounded-lg bg-backgroundChat">
        <SidebarChat
          contacts={contacts}
          selectedContact={selectedContact}
          setSelectedContact={setSelectedContact}
        />
      </div>
      <div className="flex-1 flex flex-col shadow-lg rounded-lg bg-backgroundChat">
        {selectedContact ? (
          <ContentChat
            selectedContact={selectedContact}
            messages={messages}
            sendMessage={sendMessage}
            isConnected={isConnected}
          />
        ) : (
          <p className="text-center mt-8">Chọn một liên hệ để bắt đầu chat</p>
        )}
      </div>
    </div>
  );
}
