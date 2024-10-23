"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import React from "react";

export type Contact = {
  id: number;
  name: string;
  lastMessage: string;
  avatar: string;
};

export const contacts: Contact[] = [
  {
    id: 1,
    name: "Nguyễn Trong Nghia",
    lastMessage: "Nay MU t thắng sao không nghe thằng em nói gì hết vậy",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Gia Minh",
    lastMessage: "Okee",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Team đồ án",
    lastMessage: "Nghĩa: Thầy làm cả cùng h ...",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "Nghĩa Hùng",
    lastMessage: "👍 1 ngày",
    avatar: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: 5,
    name: "Tuyển dụng IT Jobs Việt Nam",
    lastMessage: "Quyền: BEKISOFT URGEN...",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 6,
    name: "Tuyển dụng IT Jobs Việt Nam",
    lastMessage: "Quyền: BEKISOFT URGEN...",
    avatar: "https://i.pravatar.cc/150?img=6",
  },
  {
    id: 7,
    name: "Tuyển dụng IT Jobs Việt Nam",
    lastMessage: "Quyền: BEKISOFT URGEN...",
    avatar: "https://i.pravatar.cc/150?img=7",
  },
  {
    id: 8,
    name: "Tuyển dụng IT Jobs Việt Nam",
    lastMessage: "Quyền: BEKISOFT URGEN...",
    avatar: "https://i.pravatar.cc/150?img=8",
  },
  {
    id: 9,
    name: "Tuyển dụng IT Jobs Việt Nam",
    lastMessage: "Quyền: BEKISOFT URGEN...",
    avatar: "https://i.pravatar.cc/150?img=9",
  },
  {
    id: 10,
    name: "Tuyển dụng IT Jobs Việt Nam",
    lastMessage: "Quyền: BEKISOFT URGEN...",
    avatar: "https://i.pravatar.cc/150?img=10",
  },
];

interface SidebarChatProps {
  selectedContact: Contact;
  setSelectedContact: (contact: Contact) => void;
}

export default function SidebarChat({
  selectedContact,
  setSelectedContact,
}: SidebarChatProps) {
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
          />
        </div>
      </div>
      <ScrollArea className="h-[calc(100vh-100px)]">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className={`flex items-center p-4 hover:bg-muted cursor-pointer w-[90%] rounded-lg transition-all mx-auto ${
              selectedContact.id === contact.id ? "bg-muted" : ""
            }`}
            onClick={() => setSelectedContact(contact)}
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src={contact.avatar} />
              <AvatarFallback>{contact.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="font-semibold">{contact.name}</p>
              <div className="flex items-center">
                <p className="text-sm text-gray-500">
                  {truncateMessage(contact.lastMessage, 6)}
                </p>
                <span className="text-sm ml-3">.10h</span>
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}
