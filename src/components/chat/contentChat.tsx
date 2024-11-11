"use client";
import { Contact } from "@/components/chat/sidebarChat";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Image as ImageIcon,
  Info,
  Phone,
  Sticker,
  Video,
  SendHorizontal,
  Smile as Emoji,
} from "lucide-react";
import React from "react";

interface ContentChatProps {
  selectedContact: Contact;
}

export default function ContentChat({ selectedContact }: ContentChatProps) {
  return (
    <div className="flex-1 flex flex-col">
      {/* header chat content */}
      <div className="sticky top-0 z-10 bg-backgroundChat shadow-lg rounded-t-lg flex items-center justify-between p-4">
        <div className="flex items-center">
          <div className="relative">
            <Avatar className="h-10 w-10">
              <AvatarImage src={selectedContact.avatar} />
              <AvatarFallback>
                {selectedContact.name.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>

          <div className="ml-3">
            <p className="font-semibold">{selectedContact.name}</p>
            <p className="text-sm text-gray-500">Đang hoạt động</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Info className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <ScrollArea className="p-4 h-[600px]">
        {/* Chat messages would go here */}
        <div className="space-y-4">
          <div className="flex justify-end">
            <div className="bg-green-500 text-white rounded-[20px] py-2 px-4 max-w-[70%]">
              <p>
                sao mấy cái task t phân m kh làm mà m làm cái task gì v{" "}
                {selectedContact.name}
              </p>
            </div>
          </div>
          <div className="flex">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src={selectedContact.avatar} />
              <AvatarFallback>
                {selectedContact.name.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="bg-muted text-textChat rounded-[20px] py-2 px-4 max-w-[70%]">
              <p>Làm cái payment history đó m</p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-green-500 text-white rounded-[20px] py-2 px-4 max-w-[70%]">
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi
                enim aspernatur temporibus maxime aut repellendus labore facere
                similique officiis reprehenderit tenetur est consequuntur,
                magnam quas atque sapiente qui tempora. Earum.
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-green-500 text-white rounded-[20px] py-2 px-4 max-w-[70%]">
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi
                enim aspernatur temporibus maxime aut repellendus labore facere
                similique officiis reprehenderit tenetur est consequuntur,
                magnam quas atque sapiente qui tempora. Earum.
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-green-500 text-white rounded-[20px] py-2 px-4 max-w-[70%]">
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi
                enim aspernatur temporibus maxime aut repellendus labore facere
                similique officiis reprehenderit tenetur est consequuntur,
                magnam quas atque sapiente qui tempora. Earum.
              </p>
            </div>
          </div>
          <div className="flex">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src={selectedContact.avatar} />
              <AvatarFallback>
                {selectedContact.name.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="bg-muted text-textChat rounded-[20px] py-2 px-4 max-w-[70%]">
              <p>Làm cái payment history đó m</p>
            </div>
          </div>
          <div className="flex">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src={selectedContact.avatar} />
              <AvatarFallback>
                {selectedContact.name.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="bg-muted text-textChat rounded-[20px] py-2 px-4 max-w-[70%]">
              <p>Làm cái payment history đó m</p>
            </div>
          </div>
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <div className="flex items-center justify-center space-x-2">
          <Button variant="ghost" size="icon">
            <ImageIcon className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Sticker className="h-5 w-5" />
          </Button>
          <div className="relative w-[60%]">
            <Input
              placeholder="Aa"
              className="bg-muted text-muted-foreground rounded-[20px] border-gray-200"
            />
            <Emoji className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
          <Button variant="ghost" size="icon">
            <SendHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
