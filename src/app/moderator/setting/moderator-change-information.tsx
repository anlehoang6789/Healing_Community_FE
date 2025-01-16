"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  UpdateProfileUserBody,
  UpdateProfileUserBodyType,
} from "@/schemaValidations/account.schema";
import { useEffect, useMemo, useRef, useState } from "react";
import { getUserIdFromLocalStorage, handleErrorApi } from "@/lib/utils";
import {
  useGetUserProfileQuery,
  useUpdateAvatarProfileMutation,
  useUpdateProfileUserMutation,
} from "@/queries/useAccount";
import { toast } from "@/hooks/use-toast";

export default function ModeratorChangeInformation() {
  const [file, setFile] = useState<File | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);
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
      const { fullName, phoneNumber, profilePicture } = data.payload.data;
      form.setValue("fullName", fullName);
      form.setValue("phoneNumber", phoneNumber);
      form.setValue("profilePictureUrl", profilePicture);
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
        className="grid auto-rows-max items-start gap-4 md:gap-8"
        onSubmit={form.handleSubmit(onSubmit, (error) => {
          console.warn(error);
        })}
        onReset={reset}
      >
        <Card x-chunk="dashboard-07-chunk-0">
          <CardHeader>
            <CardTitle className="text-muted-foreground">
              Thông tin cá nhân
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <FormField
                control={form.control}
                name="profilePictureUrl"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2 items-start justify-start">
                      <Avatar className="aspect-square w-[100px] h-[100px] rounded-md object-cover border shadow-md border-muted-foreground">
                        <AvatarImage
                          src={
                            previewAvatarFromFile ||
                            "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
                          }
                          alt={data?.payload?.data?.fullName}
                        />
                        <AvatarFallback className="rounded-none">
                          {fullname.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={avatarInputRef}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setFile(file);
                            field.onChange(
                              "http://localhost:3000/" + field.name
                            );
                          }
                        }}
                      />
                      <button
                        className="flex aspect-square w-[100px] items-center justify-center rounded-md border border-dashed border-muted-foreground"
                        type="button"
                        onClick={() => avatarInputRef.current?.click()}
                      >
                        <Upload className="h-4 w-4 text-muted-foreground" />
                        <span className="sr-only">Upload</span>
                      </button>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-3 text-muted-foreground">
                      <Label htmlFor="name">Tên</Label>
                      <Input
                        id="fullName"
                        type="text"
                        className="w-full"
                        {...field}
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
                    <div className="grid gap-3 text-muted-foreground">
                      <Label htmlFor="name">Số điện thoại</Label>
                      <Input
                        id="phoneNumber"
                        type="text"
                        className="w-full"
                        {...field}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <div className=" items-center gap-2 md:ml-auto flex">
                <Button
                  variant="ghost"
                  size="sm"
                  type="reset"
                  className="text-muted-foreground"
                >
                  Hủy
                </Button>
                <Button
                  size="sm"
                  type="submit"
                  variant={"outline"}
                  className="bg-backgroundChat text-textChat"
                >
                  Lưu thông tin
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
