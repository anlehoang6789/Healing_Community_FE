"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ImageUp } from "lucide-react";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import CategoryCombobox from "@/components/createPost/category-combobox";
import {
  CreatePostBody,
  CreatePostBodyType,
} from "@/schemaValidations/post.schema";
import Image from "next/image";
import {
  useCreatePostMutation,
  useUploadAvatarCoverFromFileMutation,
} from "@/queries/usePost";
import { toast } from "@/hooks/use-toast";
import { getUserIdFromLocalStorage, handleErrorApi } from "@/lib/utils";
import { useCheckContentByAIMutation } from "@/queries/useDetector";

const RichTextEditor = dynamic(
  () => import("@/app/user/create-post/rich-text-editor"),
  {
    ssr: false,
  }
);

export default function PostStoryForm() {
  const userIdFromLocalStorage = getUserIdFromLocalStorage();
  const [file, setFile] = useState<File | null>(null);
  const avatarInputRef = useRef<HTMLInputElement | null>(null);
  const [wordCount, setWordCount] = useState(0);
  const form = useForm<CreatePostBodyType>({
    resolver: zodResolver(CreatePostBody),
    defaultValues: {
      categoryId: "",
      title: "",
      description: "",
      coverImgUrl: "",
      status: 0,
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
  };

  // Xử lí việc tạo bài viết
  const uploadAvatarCover = useUploadAvatarCoverFromFileMutation();
  const createPostMutation = useCreatePostMutation(
    userIdFromLocalStorage as string
  );
  const checkContentByAIMutation = useCheckContentByAIMutation();
  const onSubmit = async (data: CreatePostBodyType) => {
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
        reset();
      }
    } catch (error) {
      handleErrorApi({ error, setError: form.setError });
    }
  };

  return (
    <div className="p-4">
      <Form {...form}>
        <form
          noValidate
          className="space-y-4"
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
                        <span className="font-semibold">Thêm ảnh đại diện</span>
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
              name="status"
              render={({ field }) => (
                <FormItem>
                  <div className="grid gap-2">
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => {
                          const numericValue = value === "public" ? 0 : 1;
                          field.onChange(numericValue); // Cập nhật giá trị status
                        }}
                        value={field.value === 0 ? "public" : "private"} // Xử lý giá trị mặc định
                        className="flex flex-col space-y-1"
                        id="status"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="public" />
                          </FormControl>
                          <FormLabel className="font-normal text-black">
                            Công khai
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="private" />
                          </FormControl>
                          <FormLabel className="font-normal text-black">
                            Chỉ mình tôi
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <Separator />

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
                    <CategoryCombobox
                      id="categoryId"
                      aria-labelledby="category-label"
                      value={field.value}
                      onChange={field.onChange}
                    />
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
                disabled={
                  checkContentByAIMutation.isPending ||
                  createPostMutation.isPending
                }
              >
                {checkContentByAIMutation.isPending
                  ? "Đang kiểm tra nội dung..."
                  : createPostMutation.isPending
                  ? "Đang đăng bài..."
                  : "Đăng bài"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
