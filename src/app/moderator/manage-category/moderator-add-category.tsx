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
  CreateCategoryBody,
  CreateCategoryBodyType,
} from "@/schemaValidations/post.schema";
import { useAddCategoryMutation } from "@/queries/usePost";

export default function ModeratorAddCategory() {
  const [open, setOpen] = useState(false);
  const form = useForm<CreateCategoryBodyType>({
    resolver: zodResolver(CreateCategoryBody),
    defaultValues: {
      name: "",
    },
  });

  const addCategory = useAddCategoryMutation();
  const reset = () => {
    form.reset();
  };

  const onSubmit = async (body: CreateCategoryBodyType) => {
    if (addCategory.isPending) return;
    try {
      const result = await addCategory.mutateAsync(body);
      toast({
        description: result.payload.message,
        variant: "success",
      });
      reset();
      setOpen(false);
    } catch (error) {
      handleErrorApi({ error, setError: form.setError });
    }
  };
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-7 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Bổ sung các thể loại cho bài viết
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-screen overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-textChat font-bold">
            Thêm thể loại cho các bài viết
          </DialogTitle>
          <DialogDescription className="text-textChat font-bold sr-only">
            Thêm thông tin kinh nghiệm làm việc của bạn
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            noValidate
            className="grid auto-rows-max items-start gap-4 md:gap-8"
            id="add-dish-form"
            onSubmit={form.handleSubmit(onSubmit, (error) => {
              console.warn(error);
            })}
          >
            <div className="grid gap-4 py-4 text-textChat">
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
          <Button type="submit" form="add-dish-form">
            Thêm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
