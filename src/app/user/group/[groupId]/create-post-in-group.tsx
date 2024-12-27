"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Role } from "@/constants/type";
import { toast } from "@/hooks/use-toast";
import { getUserIdFromLocalStorage, handleErrorApi } from "@/lib/utils";
import { useGetUserProfileQuery } from "@/queries/useAccount";
import { useGetRoleByUserIdQuery } from "@/queries/useAuth";
import { useCheckContentByAIMutation } from "@/queries/useDetector";
import { useGetExpertProfileQuery } from "@/queries/useExpert";
import {
  useCreatePostInGroupMutation,
  useGetAllCategoryQuery,
  useUploadAvatarCoverFromFileMutation,
} from "@/queries/usePost";
import {
  CreatePostInGroupBody,
  CreatePostInGroupBodyType,
} from "@/schemaValidations/post.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageUp } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useMemo, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";

const RichTextEditor = dynamic(
  () => import("@/app/user/create-post/rich-text-editor"),
  {
    ssr: false,
  }
);

export default function CreatePostInGroup({ groupId }: { groupId: string }) {
  const [open, setOpen] = useState(false);
  const userIdFromLocalStorage = getUserIdFromLocalStorage();
  const [file, setFile] = useState<File | null>(null);
  const avatarInputRef = useRef<HTMLInputElement | null>(null);
  const [wordCount, setWordCount] = useState(0);
  const { data: categoryData } = useGetAllCategoryQuery();
  const categoryList = categoryData?.payload.data || [];
  const form = useForm<CreatePostInGroupBodyType>({
    resolver: zodResolver(CreatePostInGroupBody),
    defaultValues: {
      groupId,
      categoryId: categoryList[0]?.categoryId,
      title: "",
      description: "",
      coverImgUrl: "",
      status: 2,
    },
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    const words = inputValue.trim().split(/\s+/).filter(Boolean); // Split by whitespace and filter out empty strings
    setWordCount(words.length);

    // Update the title field value only if word count is less than or equal to 100
    if (words.length <= 50) {
      form.setValue("title", inputValue);
    }
  };

  const profilePicture = form.watch("coverImgUrl");
  const previewAvatarFromFile = useMemo(() => {
    if (file) {
      return URL.createObjectURL(file);
    }
    return profilePicture;
  }, [file, profilePicture]);

  // Hàm xử lí sau khi hiện ảnh xem trước vẫn có thể click vào ảnh để chọn bức ảnh khác
  const handleClickImage = () => {
    if (avatarInputRef.current) {
      avatarInputRef.current.click();
    }
  };
  const reset = () => {
    form.reset();
    setFile(null);
    form.setValue("description", "");
    setOpen(false);
  };

  const { data: roleByUserId } = useGetRoleByUserIdQuery(
    userIdFromLocalStorage as string
  );
  const isExpert = roleByUserId?.payload.data.roleName === Role.Expert;
  const { data: userProfile } = useGetUserProfileQuery(
    userIdFromLocalStorage as string,
    !isExpert && !!userIdFromLocalStorage
  );
  const { data: expertProfile } = useGetExpertProfileQuery(
    userIdFromLocalStorage as string,
    isExpert && !!userIdFromLocalStorage
  );

  // Xử lí việc tạo bài viết
  const uploadAvatarCover = useUploadAvatarCoverFromFileMutation();
  const createPostMutation = useCreatePostInGroupMutation(groupId);
  const checkContentByAIMutation = useCheckContentByAIMutation();
  const onSubmit = async (data: CreatePostInGroupBodyType) => {
    if (createPostMutation.isPending || checkContentByAIMutation.isPending)
      return;
    try {
      const checkResult = await checkContentByAIMutation.mutateAsync(
        data.description
      );
      if (!checkResult.payload.is_safe) {
        toast({
          title: "Oops! Bài viết của bạn không được chấp nhận.",
          description: checkResult.payload.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Nội dung bài viết của bạn đã được kiểm duyệt.",
        description: "Hãy đợi một chút, chúng tôi đang đăng bài viết của bạn.",
        variant: "success",
      });

      let body = data;
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const uploadAvatarResult = await uploadAvatarCover.mutateAsync(
          formData
        );
        const imageUrl = uploadAvatarResult.payload.url;
        body = { ...data, coverImgUrl: imageUrl };
        const result = await createPostMutation.mutateAsync(body);
        toast({
          title: result.payload.message,
          variant: "success",
        });
        setOpen(false);
        reset();
      }
    } catch (error) {
      handleErrorApi({ error, setError: form.setError });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="w-full flex items-center gap-2 bg-secondary rounded-full p-2 px-4">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={
                  isExpert
                    ? expertProfile?.payload.data.profileImageUrl
                    : userProfile?.payload.data.profilePicture ||
                      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
                }
              />
              <AvatarFallback>
                {isExpert
                  ? expertProfile?.payload.data.fullname ||
                    expertProfile?.payload.data.email
                  : userProfile?.payload.data.fullName ||
                    userProfile?.payload.data.userName ||
                    "Anonymous"}
              </AvatarFallback>
            </Avatar>
            <span className="text-muted-foreground text-sm text-left flex-1">
              Bạn viết gì đi...
            </span>
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[900px] max-h-screen overflow-auto">
          <DialogHeader>
            <DialogTitle className="font-bold text-textChat text-3xl text-center">
              Tạo bài viết
            </DialogTitle>
            <DialogDescription className="sr-only">
              Make changes to your profile here. Click save when you done.
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 bg-white rounded-lg">
            <Form {...form}>
              <form
                noValidate
                className="space-y-4"
                id="create-post-in-group"
                onSubmit={form.handleSubmit(onSubmit, (error) => {
                  console.warn(error);
                })}
                onReset={reset}
              >
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <div className="grid gap-2">
                          <div className="flex items-center sr-only">
                            <Label htmlFor="title" className="text-black">
                              Tiêu đề
                            </Label>
                            <span className="text-red-500 ml-1">*</span>
                          </div>
                          <textarea
                            id="title"
                            placeholder="Nhập tiêu đề bài viết ..."
                            required
                            {...field}
                            onChange={(e) => {
                              const textarea = e.target;
                              textarea.rows = 1; // Reset the rows to 1
                              const newRowCnt = Math.ceil(
                                textarea.scrollHeight / textarea.offsetHeight
                              );
                              textarea.rows = newRowCnt; // Update the rows based on the content
                              handleTitleChange(e);
                            }}
                            autoComplete="title"
                            className="border-0 bg-transparent focus:outline-none h-auto min-h-10 max-h-70 font-semibold text-xl md:text-3xl text-black resize-none"
                          />
                          <FormMessage />
                          <div className="text-right text-sm text-gray-500">
                            {wordCount}/50
                          </div>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="coverImgUrl"
                    render={({ field }) => (
                      <FormItem>
                        <div className="grid gap-2 relative">
                          <Label htmlFor="coverImgUrl" className="sr-only">
                            Hình ảnh
                          </Label>
                          <div className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-400 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors relative">
                            <ImageUp className="text-green-500" size={40} />
                            <p className="text-gray-500 mt-2 text-sm">
                              <span className="font-semibold">
                                Thêm ảnh đại diện
                              </span>
                            </p>
                            <p className="text-gray-400 text-xs">
                              Kéo và thả tệp vào khu vực này để tải lên ảnh
                            </p>
                            <input
                              type="file"
                              id="coverImgUrl"
                              accept="image/*"
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
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                          </div>
                          {file && (
                            <Image
                              src={previewAvatarFromFile}
                              alt="Preview"
                              className="absolute top-0 left-0 rounded-md"
                              style={{ objectFit: "cover" }}
                              fill
                              onClick={handleClickImage}
                            />
                          )}
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <div className="grid gap-2">
                          <Controller
                            name="description"
                            control={form.control}
                            render={({ field }) => (
                              <RichTextEditor
                                id="description"
                                value={field.value || ""}
                                onChange={field.onChange}
                              />
                            )}
                          />

                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <div className="grid gap-4">
                          <div className="flex items-center">
                            <Label
                              htmlFor="categoryId"
                              className="text-gray-500 text-sm font-light"
                              id="category-label"
                            >
                              Chọn thể loại bài viết của bạn
                            </Label>
                          </div>
                          <div className="relative">
                            <select
                              id="categoryId"
                              value={field.value}
                              onChange={(e) => {
                                const selectedValue = e.target.value;
                                field.onChange(
                                  selectedValue === "default"
                                    ? ""
                                    : selectedValue
                                ); // Đặt lại thành chuỗi rỗng nếu chọn giá trị mặc định
                              }}
                              className="w-full md:w-[20%] p-2 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-gray-700"
                            >
                              <option value="default" disabled>
                                Chọn thể loại
                              </option>
                              {categoryList.map((category) => (
                                <option
                                  key={category.categoryId}
                                  value={category.categoryId}
                                  className="text-black text-xs"
                                >
                                  {category.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-col items-center md:justify-end mt-4 md:flex-row">
                    <Button
                      type="reset"
                      className="bg-white text-black md:mr-3 mb-2 md:mb-0 w-full md:w-auto"
                      variant={"outline"}
                    >
                      Hủy
                    </Button>
                    <Button
                      type="submit"
                      className="bg-black hover:bg-gray-800 w-full md:w-auto"
                    >
                      Lưu
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
