"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye, EyeOff, Plus } from "lucide-react";
import React, { useState } from "react";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import {
  RegisterModeratorBody,
  RegisterModeratorBodyType,
} from "@/schemaValidations/moderator.schema";
import { useCreateAccountForModerator } from "@/queries/useUser";
import { toast } from "@/hooks/use-toast";
import { handleErrorApi } from "@/lib/utils";

export default function CreateAccountModerator() {
  const [showPassword, setShowPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<RegisterModeratorBodyType>({
    resolver: zodResolver(RegisterModeratorBody),
    defaultValues: {
      email: "",
      userName: "",
      password: "",
      fullName: "",
      phoneNumber: "",
    },
  });

  const createAccountForModerator = useCreateAccountForModerator();
  const onSubmit = async (data: RegisterModeratorBodyType) => {
    if (createAccountForModerator.isPending) return;
    try {
      const res = await createAccountForModerator.mutateAsync(data);
      toast({
        description: res.payload.message,
        variant: "success",
      });
      setIsOpen(false);
      form.reset();
    } catch (error) {
      handleErrorApi({ error, setError: form.setError });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="text-muted-foreground border-2 border-dashed border-primary flex items-center "
        >
          Tạo mới tài khoản <Plus className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md ">
        <DialogTitle className="sr-only">Edit profile</DialogTitle>
        <DialogDescription className="sr-only">
          Make changes to your profile here. Click save when done.
        </DialogDescription>
        <Form {...form}>
          <form
            className="space-y-4 max-w-[600px] flex-shrink-0 w-full"
            noValidate
            onSubmit={form.handleSubmit(onSubmit, (errors) => {
              console.warn(errors);
            })}
          >
            <div className="grid gap-4">
              <h1 className="text-2xl font-semibold text-muted-foreground text-center">
                Cấp tài khoản kiểm duyệt viên
              </h1>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="password" className="text-black">
                          Email
                        </Label>
                        <span className="text-red-500 ml-1">*</span>
                      </div>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Email kiểm duyệt viên"
                        required
                        {...field}
                        autoComplete="off"
                        className="placeholder:text-[#919BA4] border-[0.5px] border-[#666]"
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="userName" className="text-black">
                          Tên tài khoản
                        </Label>
                        <span className="text-red-500 ml-1">*</span>
                      </div>
                      <Input
                        id="userName"
                        type="text"
                        placeholder="Tên kiểm duyệt viên"
                        required
                        {...field}
                        autoComplete="off"
                        className="placeholder:text-[#919BA4] border-[0.5px] border-[#666]"
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="fullName" className="text-black">
                          Tên hiển thị
                        </Label>
                        <span className="text-red-500 ml-1">*</span>
                      </div>
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Tên hiển thị"
                        required
                        {...field}
                        autoComplete="off"
                        className="placeholder:text-[#919BA4] border-[0.5px] border-[#666]"
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="phoneNumber" className="text-black">
                          Số điện thoại
                        </Label>
                        <span className="text-red-500 ml-1">*</span>
                      </div>
                      <Input
                        id="phoneNumber"
                        type="text"
                        placeholder="Số điện thoại"
                        maxLength={11}
                        required
                        {...field}
                        autoComplete="off"
                        className="placeholder:text-[#919BA4] border-[0.5px] border-[#666]"
                        onInput={(e) => {
                          e.currentTarget.value = e.currentTarget.value.replace(
                            /\D/g,
                            ""
                          );
                          field.onChange(e.currentTarget.value);
                        }}
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
                          className="placeholder:text-[#919BA4] border-[0.5px] border-[#666]"
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

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#d4fc79] to-[#96e6a1] hover:bg-gray-200 rounded-[20px] text-black mt-2"
              >
                TẠO MỚI
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
