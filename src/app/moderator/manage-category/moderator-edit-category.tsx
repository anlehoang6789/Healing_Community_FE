"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { handleErrorApi } from "@/lib/utils";
import {
  CreateCategoryBody,
  CreateCategoryBodyType,
} from "@/schemaValidations/post.schema";
import {
  useGetDetailsCategoryQuery,
  useUpdateCategoryMutation,
} from "@/queries/usePost";

export default function ModeratorEditCategory({
  id,
  setId,
  onSubmitSuccess,
}: {
  id?: string | undefined;
  setId: (value: string | undefined) => void;
  onSubmitSuccess?: () => void;
}) {
  const form = useForm<CreateCategoryBodyType>({
    resolver: zodResolver(CreateCategoryBody),
    defaultValues: {
      name: "",
    },
  });

  const { data } = useGetDetailsCategoryQuery({
    categoryId: id as string,
    enabled: Boolean(id),
  });

  //useEffect này sẽ chạy khi data thay đổi => show data lên form
  useEffect(() => {
    if (data) {
      const { name } = data.payload.data;
      form.reset({
        name,
      });
    }
  }, [data, form]);

  //ham submit form giup thay doi kinh nghiem lam viec
  const updateCategoryMutation = useUpdateCategoryMutation();
  const onSubmit = async (data: CreateCategoryBodyType) => {
    if (updateCategoryMutation.isPending) return;
    try {
      let body: CreateCategoryBodyType & { categoryId: string } = {
        categoryId: id as string,
        ...data,
      };
      const result = await updateCategoryMutation.mutateAsync(body);
      toast({
        description: result.payload.message,
        variant: "success",
      });
      reset();
      onSubmitSuccess && onSubmitSuccess();
    } catch (error) {
      handleErrorApi({ error, setError: form.setError });
    }
  };

  const reset = () => {
    setId(undefined);
  };

  return (
    <Dialog
      open={Boolean(id)}
      onOpenChange={(value) => {
        if (!value) {
          reset();
        }
      }}
    >
      <DialogContent className="sm:max-w-[600px] max-h-screen overflow-auto text-textChat">
        <DialogHeader>
          <DialogTitle className="font-bold text-lg">
            Cập nhật danh mục cho bài viết
          </DialogTitle>
          <DialogDescription className="sr-only">
            Các trường tên, email, mật khẩu là bắt buộc
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            noValidate
            className="grid auto-rows-max items-start gap-4 md:gap-8"
            id="edit-experience-form"
            onSubmit={form.handleSubmit(onSubmit, (error) => {
              console.warn(error);
            })}
          >
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-center justify-items-start gap-4">
                      <Label htmlFor="name">Tên thể loại</Label>
                      <div className="col-span-3 w-full space-y-2">
                        <Input id="name" className="w-full" {...field} />
                        <FormMessage />
                      </div>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <DialogFooter>
          <Button type="submit" form="edit-experience-form">
            Lưu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
