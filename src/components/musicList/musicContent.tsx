"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const music = [
  {
    name: "Có chắc yêu là đây",
    artist: "Sơn Tùng M-TP",
    avatarUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  },
  {
    name: "Sao cũng được",
    artist: "Binz",
    avatarUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  },
  {
    name: "Cao tầng 20",
    artist: "B Ray",
    avatarUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  },
  {
    name: "Tháng 4 là lời nói dối của em",
    artist: "Hà Anh Tuấn",
    avatarUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  },
  {
    name: "Em của ngày hôm qua",
    artist: "Sơn Tùng M-TP",
    avatarUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  },
  {
    name: "Hãy trao cho anh",
    artist: "Sơn Tùng M-TP",
    avatarUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  },
];

const podcasts = [
  {
    name: "Lận",
    host: "Duong Thuy Dung",
    avatarUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  },
  {
    name: "Ở đây có 2 Podcast",
    host: "Ở đây có 2 Podcast",
    avatarUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  },
  {
    name: "1 chút ảnh ngọc",
    host: "@_lightpearl",
    avatarUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  },
  {
    name: "Một tâm hồn đầy Nắng!",
    host: "Một tâm hồn đầy Nắng!",
    avatarUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  },
  {
    name: "Chamie Podcast",
    host: "Chamie",
    avatarUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  },
  {
    name: "Ler Ther Podcast",
    host: "Thảo Lê",
    avatarUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  },
  {
    name: "Hêu Podcast",
    host: "Hêu Podcast",
    avatarUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  },
];

export default function MusicContent() {
  return (
    <div className="p-4 sm:p-6 text-muted-foreground mb-2 md:mb-0">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
        Chào buổi tối
      </h1>
      <div>
        <div className="space-y-6">
          <section>
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">Gần đây</h2>
              <Link
                href="/music"
                className="text-sm text-muted-foreground hover:underline"
              >
                Hiện tất cả
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {music.map((item) => (
                <Link
                  key={item.name}
                  href={`/music/${encodeURIComponent(item.name)}`}
                  className="flex items-center space-x-1 md:space-x-4 bg-zinc-800/50 rounded-md p-2 hover:bg-zinc-800 transition"
                >
                  <Image
                    src={item.avatarUrl}
                    alt={`${item.name}'s avatar`}
                    width={64}
                    height={64}
                    className="rounded-md"
                  />
                  <div>
                    <p className="text-wrap text-xs md:text-base font-medium truncate text-white">
                      {item.name}
                    </p>
                    <p className="text-wrap text-[10px] md:text-sm text-slate-300 truncate">
                      {item.artist}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">
                Nhạc không lời
              </h2>

              <Link
                href="/music"
                className="text-sm text-muted-foreground hover:underline"
              >
                Hiện tất cả{" "}
              </Link>
            </div>
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {podcasts.map((podcast) => (
                <div key={podcast.name} className="flex-shrink-0 w-40">
                  <Image
                    src={podcast.avatarUrl}
                    alt={`${podcast.name} cover`}
                    width={160}
                    height={160}
                    className="rounded-md mb-2"
                  />
                  <p className="font-medium truncate">{podcast.name}</p>
                  <p className="text-sm text-zinc-400 truncate">
                    {podcast.host}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">
                Dành Cho Hoàng An
              </h2>
              <Link
                href="/music"
                className="text-sm text-muted-foreground hover:underline"
              >
                Hiện tất cả{" "}
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {music.map((i) => (
                <div key={i.name} className="bg-zinc-800/50 p-4 rounded-lg">
                  <Image
                    src={i.avatarUrl}
                    width={200}
                    height={200}
                    alt={`Mix ${i}`}
                    className="rounded mb-2"
                  />
                  <h4 className="font-semibold text-white">
                    Daily Mix {i.name}
                  </h4>
                  <p className="text-sm text-slate-200">Various Artists</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
