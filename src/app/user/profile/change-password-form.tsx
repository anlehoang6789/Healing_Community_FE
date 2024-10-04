"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  ChangePasswordBody,
  ChangePasswordBodyType,
} from "@/schemaValidations/account.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function ChangePasswordForm() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const form = useForm<ChangePasswordBodyType>({
    resolver: zodResolver(ChangePasswordBody("")),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });
  return (
    <Card className="max-w-[600px] mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-xl md:text-2xl font-semibold">
          Đổi Mật Khẩu
        </CardTitle>
        <Separator className="bg-[#b2babb]" />
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4 w-full" noValidate>
            <div className="grid gap-4">
              {/* Hidden username field for accessibility */}
              <Input
                type="text"
                name="username"
                autoComplete="username"
                className="hidden"
              />
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="currentPassword">
                          Mật khẩu hiện tại
                        </Label>
                        <span className="text-red-500 ml-1">*</span>
                      </div>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showCurrentPassword ? "text" : "password"}
                          required
                          {...field}
                          autoComplete="current-password"
                          placeholder="Mk@12345"
                          className="placeholder:text-[#919BA4] border-[0.5px] border-[#666]"
                        />
                        <span
                          onClick={() =>
                            setShowCurrentPassword(!showCurrentPassword)
                          }
                          className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                        >
                          {showCurrentPassword ? (
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
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="newPassword">Mật khẩu mới</Label>
                        <span className="text-red-500 ml-1">*</span>
                      </div>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          required
                          {...field}
                          autoComplete="new-password"
                          placeholder="Mk@12345"
                          className="placeholder:text-[#919BA4] border-[0.5px] border-[#666]"
                        />
                        <span
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                        >
                          {showNewPassword ? (
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
                name="confirmNewPassword"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="confirmNewPassword">
                          Xác nhận mật khẩu
                        </Label>
                        <span className="text-red-500 ml-1">*</span>
                      </div>
                      <div className="relative">
                        <Input
                          id="confirmNewPassword"
                          type={showConfirmNewPassword ? "text" : "password"}
                          required
                          {...field}
                          autoComplete="confirm-new-password"
                          placeholder="Mk@12345"
                          className="placeholder:text-[#919BA4] border-[0.5px] border-[#666]"
                        />
                        <span
                          onClick={() =>
                            setShowConfirmNewPassword(!showConfirmNewPassword)
                          }
                          className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                        >
                          {showConfirmNewPassword ? (
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
                Đổi mật khẩu
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
