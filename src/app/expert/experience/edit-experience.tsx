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
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import {
  CreateExpertExperienceBody,
  CreateExpertExperienceBodyType,
} from "@/schemaValidations/expert.schema";
import { Textarea } from "@/components/ui/textarea";

export default function EditExperience({
  id,
  setId,
  onSubmitSuccess,
}: {
  id?: string | undefined;
  setId: (value: string | undefined) => void;
  onSubmitSuccess?: () => void;
}) {
  const form = useForm<CreateExpertExperienceBodyType>({
    resolver: zodResolver(CreateExpertExperienceBody),
    defaultValues: {
      companyName: "",
      positionTitle: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  });

  //   const { data } = useEmployeeDetailsQuery({
  //     id: id as number,
  //     enabled: Boolean(id),
  //   });

  //useEffect này sẽ chạy khi data thay đổi => show data lên form
  //   useEffect(() => {
  //     if (data) {
  //       const { name, email, avatar } = data.payload.data;
  //       form.reset({
  //         name,
  //         email,
  //         avatar: avatar ?? undefined,
  //         changePassword: form.getValues("changePassword"),
  //         password: form.getValues("password"),
  //         confirmPassword: form.getValues("confirmPassword"),
  //       });
  //     }
  //   }, [data, form]);

  //ham submit form giup thay doi thong tin tai khoan
  //   const updateEmployeeMutation = useUpdateEmployeeMutation();
  //   const updateAvatar = useUploadMediaMutation();
  //   const onSubmit = async (data: UpdateEmployeeAccountBodyType) => {
  //     if (updateEmployeeMutation.isPending) return;
  //     try {
  //       let body: UpdateEmployeeAccountBodyType & { id: number } = {
  //         id: id as number,
  //         ...data,
  //       };
  //       if (file) {
  //         const formData = new FormData();
  //         formData.append("avatar", file);
  //         const uploadAvatarResult = await updateAvatar.mutateAsync(formData);
  //         const imageUrl = uploadAvatarResult.payload.data;
  //         body = { ...body, avatar: imageUrl };
  //       }
  //       const result = await updateEmployeeMutation.mutateAsync(body);
  //       toast({
  //         description: result.payload.message,
  //       });
  //       reset();
  //       onSubmitSuccess && onSubmitSuccess();
  //     } catch (error) {
  //       handleErrorApi({ error, setError: form.setError });
  //     }
  //   };

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
      <DialogContent className="sm:max-w-[600px] max-h-screen overflow-auto">
        <DialogHeader>
          <DialogTitle>Cập nhật tài khoản</DialogTitle>
          <DialogDescription>
            Các trường tên, email, mật khẩu là bắt buộc
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            noValidate
            className="grid auto-rows-max items-start gap-4 md:gap-8"
            id="add-dish-form"
            // onSubmit={form.handleSubmit(onSubmit, (error) => {
            //   console.warn(error);
            // })}
          >
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-center justify-items-start gap-4">
                      <Label htmlFor="companyName">Tên công ty</Label>
                      <div className="col-span-3 w-full space-y-2">
                        <Input id="companyName" className="w-full" {...field} />
                        <FormMessage />
                      </div>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="positionTitle"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-center justify-items-start gap-4">
                      <Label htmlFor="positionTitle">Vị trí đảm nhận</Label>
                      <div className="col-span-3 w-full space-y-2">
                        <Input
                          id="positionTitle"
                          className="w-full"
                          {...field}
                        />
                        <FormMessage />
                      </div>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-center justify-items-start gap-4">
                      <Label htmlFor="startDate">Ngày bắt đầu</Label>
                      <div className="col-span-3 w-full space-y-2">
                        <Input
                          id="startDate"
                          className="w-full"
                          {...field}
                          type="number"
                        />
                        <FormMessage />
                      </div>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-center justify-items-start gap-4">
                      <Label htmlFor="endDate">Ngày kết thúc</Label>
                      <div className="col-span-3 w-full space-y-2">
                        <Input
                          id="endDate"
                          className="w-full"
                          {...field}
                          type="number"
                        />
                        <FormMessage />
                      </div>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-center justify-items-start gap-4">
                      <Label htmlFor="description">Mô tả sản phẩm</Label>
                      <div className="col-span-3 w-full space-y-2">
                        <Textarea
                          id="description"
                          className="w-full"
                          {...field}
                        />
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
          <Button type="submit" form="edit-employee-form">
            Lưu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
