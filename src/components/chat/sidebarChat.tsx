"use client";
import AvatarChat from "@/app/chat/avatar-chat";
import { Contact } from "@/app/chat/client-page-chat";
import NameChat from "@/app/chat/name-chat";
import NameSidebarChat from "@/app/chat/name-sidebar-chat";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import React, { useState } from "react";

interface SidebarChatProps {
  contacts: Contact[];
  selectedContact: Contact | null;
  setSelectedContact: (contact: Contact) => void;
}

export default function SidebarChat({
  contacts,
  selectedContact,
  setSelectedContact,
}: SidebarChatProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // Limit the number of words in a message when display
  const truncateMessage = (message: string, wordLimit: number) => {
    const words = message.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return message;
  };
  return (
    <div className="w-full">
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Đoạn chat</h1>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm trên HC Community"
            className="pl-8 bg-muted border-gray-700 text-muted-foreground"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <ScrollArea className="h-[calc(100vh-100px)]">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            className={`flex items-center p-4 hover:bg-muted cursor-pointer w-[90%] rounded-lg transition-all mx-auto ${
              selectedContact?.id === contact.id ? "bg-muted" : ""
            }`}
            onClick={() => setSelectedContact(contact)}
          >
            {/* <Avatar className="h-10 w-10">
              <AvatarImage
                src={
                  typeof contact.avatar === "string"
                    ? contact.avatar
                    : undefined
                }
              />
              <AvatarFallback>{contact.name.substring(0, 2)}</AvatarFallback>
            </Avatar> */}
            <AvatarChat userId={contact.id} />
            <div className="ml-3">
              {/* <p className="font-semibold">{contact.name}</p> */}
              {/* <div className="flex items-center">
                <p className="text-sm text-gray-500">
                  {truncateMessage(contact?.lastMessage ?? "", 6)}
                </p>
                <span className="text-sm ml-3">.10h</span>
              </div> */}
              <NameSidebarChat userId={contact.id} />
            </div>
          </div>
        ))}
        {filteredContacts.length === 0 && (
          <p className="text-center text-textChat mt-4">
            Không tìm thấy liên hệ nào
          </p>
        )}
      </ScrollArea>
    </div>
  );
}
