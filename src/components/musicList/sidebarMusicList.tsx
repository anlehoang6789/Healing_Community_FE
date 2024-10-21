"use client";
import DialogCreatePlaylist from "@/components/musicList/dialog-create-playlist";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import React, { useState } from "react";

export default function SidebarMusicList() {
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(
    "Làm việc"
  );

  const playlists = ["Làm việc", "Thư giản", "Chill", "Workout", "Study"];
  const selectedIndex = playlists.indexOf(selectedPlaylist || "");

  return (
    <div className="relative">
      <div className="mt-3 relative">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Playlist</h2>
          <DialogCreatePlaylist />
        </div>
        <ScrollArea className="h-[400px] relative">
          <div className="flex flex-col gap-2 relative">
            <motion.div
              layout // This enables the sliding effect
              className="absolute left-0 right-0 h-9 bg-gradient-to-r from-[#d4fc79] to-[#96e6a1] rounded-md"
              style={{
                top: selectedIndex * 44, // Assuming each button's height is around 42px (including gaps)
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }} // Customize the spring effect
            />
            {playlists.map((playlist) => (
              <Button
                key={playlist}
                variant="ghost"
                className={`justify-start relative z-10${
                  selectedPlaylist === playlist ? " text-black" : ""
                }`}
                onClick={() => setSelectedPlaylist(playlist)}
              >
                {playlist}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
