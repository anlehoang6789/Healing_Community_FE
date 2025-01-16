"use client";

import { Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RateExpertBody,
  RateExpertBodyType,
} from "@/schemaValidations/expert.schema";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import {
  useGetExpertRatingForUserQuery,
  useRateExpertMutation,
} from "@/queries/useExpert";
import { toast } from "@/hooks/use-toast";
import { handleErrorApi } from "@/lib/utils";
import { useEffect } from "react";

export default function DialogRateExpert({
  isOpen,
  setIsOpen,
  appointmentId,
  expertProfileId,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  appointmentId: string | null;
  expertProfileId: string;
}) {
  const form = useForm<RateExpertBodyType>({
    resolver: zodResolver(RateExpertBody),
    defaultValues: {
      appointmentId: "",
      rating: 0,
      comment: "",
    },
  });

  const { data } = useGetExpertRatingForUserQuery({
    appointmentId: appointmentId as string,
    enabled: !!appointmentId,
  });
  useEffect(() => {
    if (isOpen) {
      form.setValue("appointmentId", appointmentId as string);
      if (data?.payload.data === null) {
        form.setValue("rating", 0);
        form.setValue("comment", "");
      } else if (data) {
        form.setValue("rating", data.payload.data.rating);
        form.setValue("comment", data.payload.data.comment);
      }
    }
  }, [isOpen, appointmentId, form, data]);

  const onReset = () => {
    form.reset();
    setIsOpen(false);
  };

  const rateExpertMutation = useRateExpertMutation({
    expertProfileId: expertProfileId,
    appointmentId: appointmentId as string,
  });
  const onSubmit = async (values: RateExpertBodyType) => {
    if (rateExpertMutation.isPending) return;
    try {
      await rateExpertMutation.mutateAsync(values);
      toast({
        title: "Đánh giá của bạn đã được gửi!",
        variant: "success",
      });
      onReset();
    } catch (error) {
      handleErrorApi({ error, setError: form.setError });
    }
  };

  const rating = form.watch("rating");

  return (
    <Dialog open={isOpen} onOpenChange={(value) => setIsOpen(value)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-textChat font-semibold">
            Đánh giá chất lượng buổi tư vấn với chuyên gia
          </DialogTitle>
          <DialogDescription className="sr-only">
            Make changes to your profile here. Click save when you done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            noValidate
            onSubmit={form.handleSubmit(onSubmit, (error) => {
              console.warn(error);
            })}
            onReset={onReset}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <div>
                    <Label
                      htmlFor="rating"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Đánh giá của bạn cho buổi tư vấn
                    </Label>
                    <div className="flex space-x-1" id="rating">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-8 h-8 cursor-pointer ${
                            star <= field.value
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                          onClick={() => field.onChange(star)}
                          onMouseEnter={() => field.onChange(star)}
                          onMouseLeave={() => field.onChange(field.value)}
                        />
                      ))}
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <div>
                    <Label
                      htmlFor="comment"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Bình luận
                    </Label>
                    <Textarea
                      id="comment"
                      {...field}
                      placeholder="Vui lòng chia sẻ cảm nghĩ của bạn về buổi tư vấn..."
                      className="h-24 overflow-y-auto resize-none text-textChat"
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="reset"
                variant={"outline"}
                className="text-muted-foreground"
              >
                Hủy
              </Button>
              <Button type="submit" disabled={rating === 0}>
                Gửi
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
