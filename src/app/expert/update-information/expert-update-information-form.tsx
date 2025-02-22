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
import { useGetUserProfileQuery } from "@/queries/useAccount";
import {
  useGetExpertProfileQuery,
  useUpdateProfileExpertMutation,
  useUploadProfileImageForExpert,
} from "@/queries/useExpert";
import {
  UpdateProfileExpertBody,
  UpdateProfileExpertBodyType,
} from "@/schemaValidations/expert.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera } from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export default function ExpertUpdateInformationForm() {
  const [file, setFile] = useState<File | null>(null);
  const avatarInputRef = useRef<HTMLInputElement | null>(null);
  const form = useForm<UpdateProfileExpertBodyType>({
    resolver: zodResolver(UpdateProfileExpertBody),
    defaultValues: {
      specialization: "",
      expertiseAreas: "",
      bio: "",
      fullname: "",
      profileImageUrl: undefined,
    },
  });
  const userId = getUserIdFromLocalStorage();
  const { data } = useGetUserProfileQuery(userId as string); //lấy username và email từ user_service
  const uploadAvatarExpert = useUploadProfileImageForExpert(); //upload ảnh đại diện
  const updateProfileExpert = useUpdateProfileExpertMutation(); //update thông tin cá nhân
  const { data: expertProfile, refetch } = useGetExpertProfileQuery(
    userId as string
  ); //lấy thông tin cá nhân từ expert_service
  const profilePicture = form.watch("profileImageUrl");
  console.log(expertProfile);
  const previewAvatarFromFile = useMemo(() => {
    if (file) {
      return URL.createObjectURL(file);
    }
    return profilePicture;
  }, [file, profilePicture]);

  useEffect(() => {
    if (expertProfile) {
      const { bio, fullname, expertiseAreas, specialization, profileImageUrl } =
        expertProfile.payload.data;
      form.setValue("specialization", specialization);
      form.setValue("fullname", fullname);
      form.setValue("bio", bio);
      form.setValue("profileImageUrl", profileImageUrl);
      form.setValue("expertiseAreas", expertiseAreas);
    }
  }, [data, form, expertProfile]);

  //hàm update thông tin cá nhân
  const onSubmit = async (data: UpdateProfileExpertBodyType) => {
    if (updateProfileExpert.isPending) return;
    try {
      let body = data;
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const uploadAvatarResult = await uploadAvatarExpert.mutateAsync(
          formData
        );
        const imageUrl = uploadAvatarResult.payload.data;
        body = { ...data, profileImageUrl: imageUrl };
      }
      const result = await updateProfileExpert.mutateAsync(body);
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
              Ảnh đại diện
            </h2>
            <FormField
              control={form.control}
              name="profileImageUrl"
              render={({ field }) => (
                <FormItem>
                  <div className="relative w-48 h-48 mx-auto">
                    <Avatar className="w-full h-full">
                      <AvatarImage
                        src={
                          previewAvatarFromFile ||
                          "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
                        }
                        alt={"fullname"}
                      />

                      <AvatarFallback>
                        {data?.payload.data.fullName ||
                          data?.payload.data.userName}
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
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label
                        htmlFor="fullName"
                        className="text-muted-foreground flex items-center justify-end"
                      >
                        Tên hiển thị{" "}
                        <span className="text-red-500 ml-2">*</span>
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
                name="specialization"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label
                        htmlFor="specialization"
                        className="flex items-center justify-end text-muted-foreground"
                      >
                        Chuyên môn <span className="text-red-500 ml-2">*</span>
                      </Label>
                      <Input
                        id="specialization"
                        type="text"
                        placeholder="Nhập chuyên môn của bạn"
                        className="col-span-3"
                        autoComplete="off"
                        {...field}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expertiseAreas"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label
                        htmlFor="expertiseAreas"
                        className="flex items-center text-muted-foreground"
                      >
                        Lĩnh vực chuyên môn{" "}
                        <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="expertiseAreas"
                        type="text"
                        placeholder="Nhập lĩnh vực trong chuyên môn của bạn"
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
            name="bio"
            render={({ field }) => (
              <FormItem>
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-muted-foreground">
                    Mô tả
                  </h2>
                  <Textarea
                    id="bio"
                    {...field}
                    placeholder="Viết một vài điều về bản thân..."
                    className="min-h-[100px] text-muted-foreground"
                  />
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
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
