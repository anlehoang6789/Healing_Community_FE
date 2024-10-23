"use client";
import ContentChat from "@/components/chat/contentChat";
import SidebarChat, { contacts } from "@/components/chat/sidebarChat";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import React, { useState } from "react";

export default function ClientPageChat() {
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row text-muted-foreground">
      <div
        className={`md:w-1/4 lg:w-1/5 md:mr-2 shadow-lg rounded-lg bg-backgroundChat ${
          isSidebarOpen ? "fixed inset-0 z-50" : "hidden md:block"
        }`}
      >
        <SidebarChat
          selectedContact={selectedContact}
          setSelectedContact={(contact) => {
            setSelectedContact(contact);
            setIsSidebarOpen(false);
          }}
        />
      </div>
      <div className="flex-1 flex flex-col shadow-lg rounded-lg bg-backgroundChat">
        <div className="md:hidden p-2">
          <Button
            variant="ghost"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        <ContentChat selectedContact={selectedContact} />
      </div>
    </div>
  );
}
