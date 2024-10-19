"use client";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  CirclePlus,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
  ChevronDown,
  X,
} from "lucide-react";
import Image from "next/image";
import React from "react";

export default function MusicPlayer() {
  return (
    <div className="h-20 bg-zinc-800 border-t border-zinc-700 p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
          width={48}
          height={48}
          alt="Current Song"
          className="rounded"
        />
        <div>
          <h4 className="font-semibold text-white">Có chắc yêu là đây</h4>
          <p className="text-sm text-gray-400">Sơn Tùng MTP</p>
        </div>
        <AnimatedTooltip content="Thêm vào playlist" position="top">
          <CirclePlus className="w-4 h-4 text-white" />
        </AnimatedTooltip>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Shuffle />
          </Button>
          <Button variant="ghost" size="icon">
            <SkipBack />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="bg-white text-black rounded-full"
          >
            <Play />
          </Button>
          <Button variant="ghost" size="icon">
            <SkipForward />
          </Button>
          <Button variant="ghost" size="icon">
            <Repeat />
          </Button>
        </div>
        <div className="w-96  bg-zinc-600 rounded-full mt-3">
          <Progress value={20} />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Volume2 size={20} />
        <div className="w-24 h-1 bg-zinc-600 rounded-full">
          <div className="w-2/3 h-full bg-white rounded-full"></div>
        </div>
        <ChevronDown size={20} />
        <X size={20} />
      </div>
    </div>
  );
}
