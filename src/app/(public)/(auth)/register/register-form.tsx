"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  RegisterBody,
  RegisterBodyType,
} from "@/schemaValidations/auth.schema";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <div>
      <Form {...form}>
        <form
          className="space-y-4 max-w-[600px] flex-shrink-0 w-full"
          noValidate
        >
          <div className="grid gap-4">
            <h1 className="text-4xl font-bold text-black text-center">
              Đăng ký
            </h1>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="email" className="text-black">
                        Email
                      </Label>
                      <span className="text-red-500 ml-1">*</span>
                    </div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="abc@gmail.com"
                      required
                      {...field}
                      autoComplete="email"
                    />
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="username" className="text-black">
                        Tên tài khoản
                      </Label>
                      <span className="text-red-500 ml-1">*</span>
                    </div>
                    <Input
                      id="username"
                      type="text"
                      placeholder="abcdef"
                      required
                      {...field}
                      autoComplete="username"
                    />
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password" className="text-black">
                        Mật khẩu
                      </Label>
                      <span className="text-red-500 ml-1">*</span>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        required
                        {...field}
                        autoComplete="current-password"
                        placeholder="Mk@12345"
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                      >
                        {showPassword ? (
                          <Eye
                            size={"16px"}
                            strokeWidth="0.5px"
                            className="text-black"
                          />
                        ) : (
                          <EyeOff
                            size={"16px"}
                            strokeWidth="0.5px"
                            className="text-black"
                          />
                        )}
                      </span>
                    </div>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="confirmPassword" className="text-black">
                        Xác nhận mật khẩu
                      </Label>
                      <span className="text-red-500 ml-1">*</span>
                    </div>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        {...field}
                        autoComplete="current-password"
                        placeholder="Mk@12345"
                      />
                      <span
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                      >
                        {showConfirmPassword ? (
                          <Eye
                            size={"16px"}
                            strokeWidth="0.5px"
                            className="text-black"
                          />
                        ) : (
                          <EyeOff
                            size={"16px"}
                            strokeWidth="0.5px"
                            className="text-black"
                          />
                        )}
                      </span>
                    </div>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 rounded-[20px] mt-2"
              size="lg"
            >
              Đăng ký
            </Button>
            <div className="flex items-center justify-center text-black space-x-4">
              <Separator className="flex-1 h-[1px] bg-[#b2babb]" />
              <h5 className="text-base text-black">Hoặc</h5>
              <Separator className="flex-1 h-[1px] bg-[#b2babb]" />
            </div>
            <Button
              className="w-full bg-white text-black hover:bg-gray-100 rounded-[20px] flex"
              type="button"
              size="lg"
            >
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/logo%2Flogo-google-png.png?alt=media&token=4c4b28b4-7706-4c3f-9f8e-c8fccfc9a8ff"
                alt="Google Logo"
                width={20}
                height={20}
                style={{ width: "auto", height: "auto" }}
                className="mr-2"
              />
              Đăng nhập bằng Google
            </Button>
            <div className="flex items-center justify-center text-black">
              <h5 className="text-sm">Đã có tài khoản?</h5>
              <span className="ml-1 underline text-sm hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-pink-500 to-violet-500">
                <Link href={"/login"}>Đăng nhập ngay</Link>
              </span>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
