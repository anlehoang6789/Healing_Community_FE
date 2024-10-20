import { CirclePlus, Play } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function MusicMobilePlayer() {
  return (
    <div className="h-16 bg-zinc-800 border-t border-zinc-700 p-2 flex justify-between items-center space-x-2">
      {/* Song image */}
      <Image
        src="https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
        width={40}
        height={40}
        alt="Current Song"
        className="rounded"
      />

      {/* Song title and artist */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <h4 className="text-white text-sm truncate">Ngày Đầu Tiên</h4>
        <p className="text-gray-400 text-xs truncate">Đức Phúc</p>
      </div>

      {/* Heart and play buttons */}
      <div className="flex items-center space-x-2">
        <CirclePlus className="text-white w-5 h-5" />
        <Play className="text-white w-5 h-5" />
      </div>
    </div>
  );
}
