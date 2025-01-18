"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { getUserIdFromLocalStorage, handleErrorApi } from "@/lib/utils";
import {
  useGetUserProfileQuery,
  useUpdateAvatarProfileMutation,
  useUpdateProfileUserMutation,
} from "@/queries/useAccount";
import {
  UpdateProfileUserBody,
  UpdateProfileUserBodyType,
} from "@/schemaValidations/account.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { InstagramLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { Camera, Facebook, Linkedin } from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export default function PersonalInformationForm() {
  const [file, setFile] = useState<File | null>(null);
  const avatarInputRef = useRef<HTMLInputElement | null>(null);
  const form = useForm<UpdateProfileUserBodyType>({
    resolver: zodResolver(UpdateProfileUserBody),
    defaultValues: {
      fullName: "",
      descrtiption: "",
      phoneNumber: "",
      profilePictureUrl: "",
      socialLink: {
        facebook: "",
        instagram: "",
        twitter: "",
        linkedIn: "",
      },
    },
  });

  // Lấy thông tin từ form
  const profilePicture = form.watch("profilePictureUrl");
  const fullname = form.watch("fullName");
  const previewAvatarFromFile = useMemo(() => {
    if (file) {
      return URL.createObjectURL(file);
    }
    return profilePicture;
  }, [file, profilePicture]);

  const userId = getUserIdFromLocalStorage();

  //call api lấy thông tin user
  const { data, refetch } = useGetUserProfileQuery(userId as string);
  useEffect(() => {
    if (data) {
      const {
        fullName,
        phoneNumber,
        profilePicture,
        socialLink,
        descrtiption,
      } = data.payload.data;
      form.setValue("fullName", fullName);
      form.setValue("descrtiption", descrtiption);
      form.setValue("phoneNumber", phoneNumber);
      form.setValue("profilePictureUrl", profilePicture);
      form.setValue("socialLink", {
        facebook: socialLink?.facebook || "",
        instagram: socialLink?.instagram || "",
        twitter: socialLink?.twitter || "",
        linkedIn: socialLink?.linkedIn || "",
      });
    }
  }, [data, form]);

  // update thông tin user
  const updateAvatarProfile = useUpdateAvatarProfileMutation();
  const updateUserProfile = useUpdateProfileUserMutation();
  const onSubmit = async (data: UpdateProfileUserBodyType) => {
    if (updateUserProfile.isPending) return;
    try {
      let body = data;
      if (file) {
        const formData = new FormData();
        formData.append("formFile", file);
        const uploadAvatarResult = await updateAvatarProfile.mutateAsync(
          formData
        );
        const imageUrl = uploadAvatarResult.payload.data;
        body = { ...data, profilePictureUrl: imageUrl };
      }
      const result = await updateUserProfile.mutateAsync(body);
      toast({
        description: result.payload.message,
        variant: "success",
      });
      refetch();
    } catch (error) {
      handleErrorApi({ error, setError: form.setError });
    }
  };

  const reset = () => {
    form.reset();
    setFile(null);
  };

  return (
    <Form {...form}>
      <form
        noValidate
        className="flex flex-col md:flex-row gap-8"
        onSubmit={form.handleSubmit(onSubmit, (error) => {
          console.warn(error);
        })}
        onReset={reset}
      >
        <div className="w-full md:w-1/3 space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-muted-foreground">
              Ảnh đại diện <span className="text-red-500">*</span>
            </h2>
            <FormField
              control={form.control}
              name="profilePictureUrl"
              render={({ field }) => (
                <FormItem>
                  <div className="relative w-48 h-48 mx-auto">
                    <Avatar className="w-full h-full">
                      <AvatarImage
                        src={
                          previewAvatarFromFile ||
                          "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
                        }
                        alt={data?.payload?.data?.fullName}
                      />
                      <AvatarFallback>
                        {fullname.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <Label
                      htmlFor="profilePictureUrl"
                      className="absolute bottom-2 right-2 cursor-pointer bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary-hover transition-colors"
                    >
                      <Camera className="w-5 h-5" />
                      <Input
                        id="profilePictureUrl"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        autoComplete="off"
                        ref={avatarInputRef}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setFile(file);
                            field.onChange(
                              "http://localhost:3000/" + file.name
                            );
                          }
                        }}
                      />
                    </Label>
                  </div>
                </FormItem>
              )}
            />

            <p className="text-sm text-muted-foreground text-center">
              Nhấp vào biểu tượng máy ảnh để thay đổi ảnh đại diện
            </p>
          </div>
        </div>
        <Separator orientation="vertical" className="hidden md:block" />

        <div className="w-full md:w-2/3 space-y-6">
          <div className="space-x-2 hidden md:flex justify-end">
            <Button
              variant="outline"
              className="text-muted-foreground"
              type="reset"
            >
              Hủy
            </Button>
            <Button type="submit">Lưu thay đổi</Button>
          </div>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-muted-foreground">
              Thông tin công khai
            </h2>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label
                        htmlFor="fullName"
                        className="text-right text-muted-foreground"
                      >
                        Tên hiển thị <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="fullName"
                        placeholder="Nhập tên hiển thị của bạn"
                        className="col-span-3"
                        autoComplete="off"
                        {...field}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="userName"
                  className="text-right text-muted-foreground"
                >
                  Tên người dùng
                </Label>
                <div className="col-span-3 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-muted-foreground sm:text-sm">
                    nickname
                  </span>
                  <Input
                    id="userName"
                    placeholder="tên-người-dùng"
                    className="rounded-l-none font-medium"
                    autoComplete="off"
                    disabled
                    value={data?.payload?.data?.userName || ""}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label
                        htmlFor="phoneNumber"
                        className="text-right text-muted-foreground"
                      >
                        Số điện thoại <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phoneNumber"
                        type="tel"
                        placeholder="Nhập số điện thoại của bạn"
                        className="col-span-3"
                        autoComplete="off"
                        {...field}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="email"
                  className="text-right text-muted-foreground"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Nhập email của bạn"
                  className="col-span-3 font-medium"
                  autoComplete="off"
                  disabled
                  value={data?.payload?.data?.email || ""}
                />
              </div>
            </div>
          </div>

          <Separator />

          <FormField
            control={form.control}
            name="descrtiption"
            render={({ field }) => (
              <FormItem>
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-muted-foreground">
                    Mô tả
                  </h2>
                  <Textarea
                    id="descrtiption"
                    {...field}
                    placeholder="Viết một vài điều về bản thân..."
                    className="min-h-[100px] text-muted-foreground"
                  />
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Separator />

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-muted-foreground">
              Mạng xã hội
            </h2>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="socialLink.facebook"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center space-x-2">
                      <Facebook className="w-5 h-5 text-blue-600" />
                      <Input
                        type="url"
                        id="socialLink.facebook"
                        placeholder="Link Facebook"
                        {...field}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="socialLink.instagram"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center space-x-2">
                      <InstagramLogoIcon className="w-5 h-5 text-pink-600" />
                      <Input
                        type="url"
                        id="socialLink.instagram"
                        placeholder="Link Instagram"
                        {...field}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="socialLink.twitter"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center space-x-2">
                      <TwitterLogoIcon className="w-5 h-5 text-blue-400" />
                      <Input
                        type="url"
                        id="socialLink.twitter"
                        placeholder="Link Twitter"
                        {...field}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="socialLink.linkedIn"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center space-x-2">
                      <Linkedin className="w-5 h-5 text-blue-700" />
                      <Input
                        type="url"
                        id="socialLink.linkedIn"
                        placeholder="Link LinkedIn"
                        {...field}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:hidden justify-end space-y-2 md:space-y-0 md:space-x-2 mt-2">
          <Button
            variant="outline"
            className="text-muted-foreground"
            type="reset"
          >
            Hủy
          </Button>
          <Button type="submit">Lưu thay đổi</Button>
        </div>
      </form>
    </Form>
  );
}
