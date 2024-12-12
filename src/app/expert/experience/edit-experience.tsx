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
import {
  UpdateExpertExperienceBody,
  UpdateExpertExperienceBodyType,
} from "@/schemaValidations/expert.schema";
import { Textarea } from "@/components/ui/textarea";
import {
  useGetExpertExperienceDetail,
  useUpdateExpertExperienceMutation,
} from "@/queries/useExpert";
import { toast } from "@/hooks/use-toast";
import { handleErrorApi } from "@/lib/utils";
import { format, parse } from "date-fns";

export default function EditExperience({
  id,
  setId,
  onSubmitSuccess,
}: {
  id?: string | undefined;
  setId: (value: string | undefined) => void;
  onSubmitSuccess?: () => void;
}) {
  const form = useForm<UpdateExpertExperienceBodyType>({
    resolver: zodResolver(UpdateExpertExperienceBody),
    defaultValues: {
      workExperienceId: "",
      companyName: "",
      positionTitle: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  });

  const { data } = useGetExpertExperienceDetail({
    workExperienceId: id as string,
    enabled: Boolean(id),
  });

  //useEffect này sẽ chạy khi data thay đổi => show data lên form
  useEffect(() => {
    if (data) {
      const {
        companyName,
        positionTitle,
        description,
        startDate,
        endDate,
        workExperienceId,
      } = data.payload.data;
      form.reset({
        workExperienceId,
        companyName,
        positionTitle,
        description,
        startDate,
        endDate,
      });
    }
  }, [data, form]);

  //ham submit form giup thay doi kinh nghiem lam viec
  const updateExperienceMutation = useUpdateExpertExperienceMutation();
  const onSubmit = async (data: UpdateExpertExperienceBodyType) => {
    if (updateExperienceMutation.isPending) return;
    try {
      const body = {
        ...data,
        startDate: data.startDate
          ? format(
              parse(data.startDate, "yyyy-MM-dd", new Date()),
              "yyyy-MM-dd"
            )
          : "",
        endDate: data.endDate
          ? format(parse(data.endDate, "yyyy-MM-dd", new Date()), "yyyy-MM-dd")
          : "",
      };
      const result = await updateExperienceMutation.mutateAsync(body);
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
            Cập nhật kinh nghiệm làm việc của bạn
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
                name="workExperienceId"
                render={({ field }) => <Input type="hidden" {...field} />}
              />
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
                          type="text"
                          placeholder="dd/mm/yyyy"
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
                          type="text"
                          placeholder="dd/mm/yyyy"
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
                      <Label htmlFor="description">Mô tả</Label>
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
          <Button type="submit" form="edit-experience-form">
            Lưu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
