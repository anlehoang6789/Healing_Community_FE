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
import {
  PostStoryBody,
  PostStoryBodyType,
} from "@/schemaValidations/story.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Category } from "@/constants/category.type";
import CategoryCombobox from "@/components/createPost/category-combobox";

const RichTextEditor = dynamic(
  () => import("@/app/user/create-post/rich-text-editor"),
  {
    ssr: false,
  }
);

export default function PostStoryForm() {
  const [wordCount, setWordCount] = useState(0);
  const form = useForm<PostStoryBodyType>({
    resolver: zodResolver(PostStoryBody),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
      videoUrl: "",
      status: "public",
      category: Category.Travel,
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

  return (
    <div className="p-4">
      <Form {...form}>
        <form className="space-y-4">
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
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <div className="grid gap-2">
                    <Label htmlFor="imageUrl" className="sr-only">
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
                        id="imageUrl"
                        {...field}
                        onChange={(e) => {
                          console.log(e.target.files);
                        }}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
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
                    <RichTextEditor id="description" />
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
                        onValueChange={field.onChange}
                        value={field.value}
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
              name="category"
              render={({ field }) => (
                <FormItem>
                  <div className="grid gap-4">
                    <div className="flex items-center">
                      <Label
                        htmlFor="category"
                        className="text-gray-500 text-sm font-light"
                        id="category-label"
                      >
                        Chọn thể loại bài viết của bạn
                      </Label>
                    </div>
                    <CategoryCombobox
                      id="category"
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
                type="button"
                className="bg-white text-black md:mr-3 mb-2 md:mb-0 w-full md:w-auto"
                variant={"outline"}
              >
                Xem trước
              </Button>
              <Button
                type="submit"
                className="bg-black hover:bg-gray-800 w-full md:w-auto"
              >
                Đăng bài
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
