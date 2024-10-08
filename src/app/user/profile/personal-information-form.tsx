"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  PersonalInformationBody,
  PersonalInformationBodyType,
} from "@/schemaValidations/account.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { InstagramLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { Camera, Facebook, Linkedin, User } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

export default function PersonalInformationForm() {
  const form = useForm<PersonalInformationBodyType>({
    resolver: zodResolver(PersonalInformationBody),
    defaultValues: {
      displayName: "",
      username: "",
      description: "",
      twitterLink: "",
      facebookLink: "",
      instagramLink: "",
      linkedinLink: "",
    },
  });
  return (
    <form className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/3 space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-muted-foreground">
            Ảnh đại diện
          </h2>
          <div className="relative w-48 h-48 mx-auto">
            <Avatar className="w-full h-full">
              <AvatarImage
                src="https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-register.jpg?alt=media&token=0bead35e-556e-4935-945e-909d9cee4483"
                alt="Avatar"
              />
              <AvatarFallback>
                <User className="w-24 h-24" />
              </AvatarFallback>
            </Avatar>
            <Label
              htmlFor="avatar-upload"
              className="absolute bottom-2 right-2 cursor-pointer bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary-hover transition-colors"
            >
              <Camera className="w-5 h-5" />
              <Input
                id="avatar-upload"
                type="file"
                className="hidden"
                accept="image/*"
                autoComplete="off"
              />
            </Label>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Nhấp vào biểu tượng máy ảnh để thay đổi ảnh đại diện
          </p>
        </div>

        {/* <div className="space-y-4">
            <h2 className="text-lg font-semibold">Tùy chọn</h2>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="public-profile" />
                <Label htmlFor="public-profile">Hồ sơ công khai</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="email-notifications" />
                <Label htmlFor="email-notifications">Nhận thông báo qua email</Label>
              </div>
            </div>
          </div> */}
      </div>

      <Separator orientation="vertical" className="hidden md:block" />

      <div className="w-full md:w-2/3 space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-muted-foreground">
            Thông tin công khai
          </h2>
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="display-name"
                className="text-right text-muted-foreground"
              >
                Tên hiển thị
              </Label>
              <Input
                id="display-name"
                name="display-name"
                placeholder="Nhập tên hiển thị của bạn"
                className="col-span-3"
                autoComplete="name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="username"
                className="text-right text-muted-foreground"
              >
                Tên người dùng
              </Label>
              <div className="col-span-3 flex rounded-md shadow-sm">
                <span className="inline-flex items-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-muted-foreground sm:text-sm">
                  nickname
                </span>
                <Input
                  id="username"
                  name="username"
                  placeholder="tên-người-dùng"
                  className="rounded-l-none"
                  autoComplete="username"
                  disabled
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="display-phone"
                className="text-right text-muted-foreground"
              >
                Số điện thoại
              </Label>
              <Input
                id="display-phone"
                type="tel"
                name="display-phone"
                placeholder="Nhập tên số điện thoại của bạn"
                className="col-span-3"
                autoComplete="phone"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="display-email"
                className="text-right text-muted-foreground"
              >
                Email
              </Label>
              <Input
                id="display-email"
                type="email"
                name="display-email"
                placeholder="Nhập email của bạn"
                className="col-span-3"
                autoComplete="email"
                disabled
              />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-muted-foreground">Mô tả</h2>
          <Textarea
            id="description"
            name="description"
            placeholder="Viết một vài điều về bản thân..."
            className="min-h-[100px]"
          />
        </div>

        <Separator />

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-muted-foreground">
            Mạng xã hội
          </h2>
          <div className="grid gap-4">
            <div className="flex items-center space-x-2">
              <TwitterLogoIcon className="w-5 h-5 text-blue-400" />
              <Input
                id="twitter-link"
                name="twitter-link"
                placeholder="Tên người dùng Twitter"
                autoComplete="off"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Facebook className="w-5 h-5 text-blue-600" />
              <Input
                id="facebook-link"
                name="facebook-link"
                placeholder="Liên kết Facebook"
                autoComplete="off"
              />
            </div>
            <div className="flex items-center space-x-2">
              <InstagramLogoIcon className="w-5 h-5 text-pink-600" />
              <Input
                id="instagram-link"
                name="instagram-link"
                placeholder="Tên người dùng Instagram"
                autoComplete="off"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Linkedin className="w-5 h-5 text-blue-700" />
              <Input
                id="linkedin-link"
                name="linkedin-link"
                placeholder="Liên kết LinkedIn"
                autoComplete="off"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
