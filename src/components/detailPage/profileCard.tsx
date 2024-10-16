"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MapPin, User, Cake, Briefcase, Calendar } from "lucide-react";
import Link from "next/link";

interface ProfileCardProps {
  name?: string;
  avatar?: string;
  location?: string;
  gender?: string;
  birthday?: string;
  occupation?: string;
  joinDate?: string;
}

export default function ProfileCard({
  name = "Hoàng An",
  avatar = "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  location = "Bình Thọ, Hồ Chí Minh",
  gender = "Nam/Anh ấy",
  birthday = "12/3/20xx",
  occupation = "Kĩ sư phần mềm - Chuyên gia thiết kế web",
  joinDate = "21/3/2024",
}: ProfileCardProps) {
  return (
    <Card className="w-full mx-auto mr-20">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Link href="#">
          <Avatar className="w-12 h-12 border-2 border-rose-300">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{name}</AvatarFallback>
          </Avatar>
        </Link>
        <h2 className="lg:text-2xl md:text-4xl sm:text-4xl text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
          {name}
        </h2>
      </CardHeader>
      <div className="flex justify-center">
        <Button className="h-7 w-full ml-8 mr-8 mt-2 mb-4 bg-gradient-custom-left-to-right text-white font-bold">
          Theo dõi
        </Button>
      </div>
      <CardContent>
        <p className="flex justify-center text-muted-foreground mb-4 lg:text-base md:text-2xl sm:text-2xl">
          Xin chào mình là An rất vui được chia sẻ!
        </p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-gray-400" />
            <span className="lg:text-sm md:text-xl sm:text-xl">{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <User size={16} className="text-gray-400" />
            <span className="lg:text-sm md:text-xl sm:text-xl">{gender}</span>
          </div>
          <div className="flex items-center gap-2">
            <Cake size={16} className="text-gray-400" />
            <span className="lg:text-sm md:text-xl sm:text-xl">{birthday}</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase size={16} className="text-gray-400" />
            <span className="lg:text-sm md:text-xl sm:text-xl">
              {occupation}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-gray-400" />
            <span className="lg:text-sm md:text-xl sm:text-xl">
              Tham Gia {joinDate}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
