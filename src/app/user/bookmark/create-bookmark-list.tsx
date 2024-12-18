"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateBookmarkListBody,
  CreateBookmarkListBodyType,
} from "@/schemaValidations/post.schema";
import { useCreateBookmarkListMutation } from "@/queries/usePost";
import { toast } from "@/hooks/use-toast";
import { handleErrorApi } from "@/lib/utils";

export default function CreateBookmarkList() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const form = useForm<CreateBookmarkListBodyType>({
    resolver: zodResolver(CreateBookmarkListBody),
    defaultValues: {
      name: "",
    },
  });

  const createBookmarkListMutation = useCreateBookmarkListMutation();
  const onSubmit = async (body: CreateBookmarkListBodyType) => {
    if (createBookmarkListMutation.isPending) return;
    try {
      const res = await createBookmarkListMutation.mutateAsync(body);
      toast({
        description: res.payload.message,
        variant: "success",
      });
      setIsDialogOpen(false);
      form.reset();
    } catch (error) {
      handleErrorApi({ error, setError: form.setError });
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="w-full mb-4">
          <Plus className="mr-2 h-4 w-4" /> Tạo danh sách mới
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
              <h1 className="text-2xl font-semibold text-textChat text-center">
                Bộ sưu tập mới
              </h1>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-2">
                      <Input
                        id="name"
                        type="text"
                        placeholder="Tên bộ sưu tập mới"
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
