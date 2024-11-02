"use client";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ChangePasswordBody,
  ChangePasswordBodyType,
} from "@/schemaValidations/account.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useChangePasswordUserMutation } from "@/queries/useAccount";
import { handleErrorApi } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const CuteDove = ({ isEyesCovered }: { isEyesCovered: boolean }) => (
  <motion.div
    className="absolute -top-12 right-[-50px] transform w-56 h-56"
    initial={{ y: -50 }}
    animate={{ y: 0 }}
    transition={{ type: "spring", stiffness: 100 }}
  >
    <div className="relative w-full h-full">
      {/* Body */}
      <div className="absolute bottom-0 w-56 h-40 bg-gray-200 rounded-[60%]"></div>

      {/* Wings */}
      <motion.div
        className="absolute top-20 left-1 w-32 h-16 bg-gray-300 rounded-full origin-top-left z-10"
        animate={{
          rotate: isEyesCovered ? 30 : 0,
          x: isEyesCovered ? -15 : 0,
        }}
        transition={{ type: "spring", stiffness: 100 }}
      ></motion.div>
      <motion.div
        className="absolute top-20 right-1 w-32 h-16 bg-gray-300 rounded-full origin-top-right z-10"
        animate={{
          rotate: isEyesCovered ? -30 : 0,
          x: isEyesCovered ? 15 : 0,
        }}
        transition={{ type: "spring", stiffness: 100 }}
      ></motion.div>

      {/* Head */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gray-200 rounded-full"></div>

      {/* Eyes */}
      <div className="absolute top-20 left-10 w-8 h-8 bg-white rounded-full flex items-center justify-center overflow-hidden">
        <div className="w-4 h-4 bg-black rounded-full"></div>
      </div>
      <div className="absolute top-20 right-10 w-8 h-8 bg-white rounded-full flex items-center justify-center overflow-hidden">
        <div className="w-4 h-4 bg-black rounded-full"></div>
      </div>

      {/* Beak */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-6 h-4 bg-yellow-400 rounded-full"
        animate={{
          scaleY: isEyesCovered ? 0.5 : 1,
          translateY: isEyesCovered ? 6 : 0,
          scaleX: 1.2, // Make the beak slightly wider
        }}
      ></motion.div>

      {/* Cheeks */}
      <div className="absolute bottom-16 left-4 w-6 h-4 bg-pink-300 rounded-full"></div>
      <div className="absolute bottom-16 right-4 w-6 h-4 bg-pink-300 rounded-full"></div>
    </div>
  </motion.div>
);

export default function ChangePasswordForm() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const form = useForm<ChangePasswordBodyType>({
    resolver: zodResolver(ChangePasswordBody),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const isAnyPasswordVisible =
    showCurrentPassword || showNewPassword || showConfirmNewPassword;

  const changePasswordUserMutation = useChangePasswordUserMutation();

  const onSubmit = async (data: ChangePasswordBodyType) => {
    try {
      const result = await changePasswordUserMutation.mutateAsync(data);
      form.reset();
      toast({
        title: result.payload.message,
        description: "Vui lòng đăng nhập lại với mật khẩu mới",
        variant: "success",
      });
    } catch (error) {
      handleErrorApi({ error, setError: form.setError });
    }
  };

  return (
    <div className="relative pt-4 md:pt-28 px-4 max-w-[800px] mx-auto">
      <div className="hidden md:block">
        <CuteDove isEyesCovered={isAnyPasswordVisible} />
      </div>
      <Card className="max-w-full mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-xl md:text-2xl font-semibold">
            Đổi Mật Khẩu
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="space-y-4 w-full flex-shrink-0"
              noValidate
              onSubmit={form.handleSubmit(onSubmit, (errors) => {
                console.warn(errors);
              })}
            >
              <div className="grid gap-4">
                {/* Hidden username field for accessibility */}
                <Input
                  type="text"
                  name="username"
                  autoComplete="username"
                  className="hidden text-muted-foreground"
                />
                <FormField
                  control={form.control}
                  name="oldPassword"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid gap-2">
                        <div className="flex items-center">
                          <Label htmlFor="oldPassword">Mật khẩu hiện tại</Label>
                          <span className="text-red-500 ml-1">*</span>
                        </div>
                        <div className="relative">
                          <Input
                            id="oldPassword"
                            type={showCurrentPassword ? "text" : "password"}
                            required
                            {...field}
                            autoComplete="current-password"
                            placeholder="Mk@12345"
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
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid gap-2">
                        <div className="flex items-center">
                          <Label htmlFor="confirmPassword">
                            Xác nhận mật khẩu
                          </Label>
                          <span className="text-red-500 ml-1">*</span>
                        </div>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showConfirmNewPassword ? "text" : "password"}
                            required
                            {...field}
                            autoComplete="confirm-new-password"
                            placeholder="Mk@12345"
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
                  className="w-full bg-black hover:bg-gray-700 rounded-[20px] mt-6"
                  size="lg"
                >
                  Đổi mật khẩu
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
