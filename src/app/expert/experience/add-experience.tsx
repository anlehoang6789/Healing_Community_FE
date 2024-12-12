"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { handleErrorApi } from "@/lib/utils";
import {
  CreateExpertExperienceBody,
  CreateExpertExperienceBodyType,
} from "@/schemaValidations/expert.schema";
import { Textarea } from "@/components/ui/textarea";

export default function AddExperience() {
  const [file, setFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
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

  //   const updateAvatar = useUploadMediaMutation();
  //   const addEmployee = useAddEmployeeMutation();
  const reset = () => {
    form.reset();
    setFile(null);
  };

  //   const onSubmit = async (data: CreateEmployeeAccountBodyType) => {
  //     if (addEmployee.isPending) return;
  //     try {
  //       //check xem có upload file cho avatar không
  //       let body = data;
  //       if (file) {
  //         const formData = new FormData();
  //         formData.append("avatar", file);
  //         const uploadAvatarResult = await updateAvatar.mutateAsync(formData);
  //         const imageUrl = uploadAvatarResult.payload.data;
  //         body = { ...data, avatar: imageUrl };
  //       }
  //       const result = await addEmployee.mutateAsync(body);
  //       toast({
  //         description: result.payload.message,
  //       });
  //       reset();
  //       setOpen(false);
  //     } catch (error) {
  //       handleErrorApi({ error, setError: form.setError });
  //     }
  //   };
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-7 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Bổ sung kinh nghiệm làm việc
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-screen overflow-auto">
        <DialogHeader>
          <DialogTitle>Thêm kinh nghiệm làm việc</DialogTitle>
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
          <Button type="submit" form="add-dish-form">
            Thêm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
