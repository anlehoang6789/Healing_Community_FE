import MusicContent from "@/components/musicList/musicContent";
import MusicMobilePlayer from "@/components/musicList/musicMobilePlayer";
import MusicPlayer from "@/components/musicList/musicPlayer";
import SidebarMusicList from "@/components/musicList/sidebarMusicList";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

export default function MusicPage() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="hidden md:block w-[15%] text-muted-foreground bg-muted p-4 relative">
          <SidebarMusicList />
        </div>

        {/* Main content */}
        <div className="w-full md:w-[85%] p-4">
          <ScrollArea className="h-[600px]">
            <MusicContent />
          </ScrollArea>
        </div>
      </div>

      {/* Music player */}
      <div className="fixed bottom-0 left-0 w-full md:relative">
        <span className="block md:hidden">
          <MusicMobilePlayer />
        </span>
        <span className="hidden md:block">
          <MusicPlayer />
        </span>
      </div>
    </div>
  );
}
