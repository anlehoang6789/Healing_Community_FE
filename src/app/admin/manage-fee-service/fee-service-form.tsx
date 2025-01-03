"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpdateFeeServiceSchema,
  UpdateFeeServiceType,
} from "@/schemaValidations/payment.schema";
import {
  useGetFeeServiceQuery,
  useUpdateFeeServiceMutation,
} from "@/queries/usePayment";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { formatCurrency, handleErrorApi } from "@/lib/utils";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";

export default function FeeServiceForm() {
  const form = useForm<UpdateFeeServiceType>({
    resolver: zodResolver(UpdateFeeServiceSchema),
    defaultValues: {
      platformFeeId: "",
      percent: 0,
    },
  });

  const { data } = useGetFeeServiceQuery();

  useEffect(() => {
    if (data) {
      const { platformFeeId, platformFeeValue } = data.payload.data;
      form.setValue("platformFeeId", platformFeeId);
      form.setValue("percent", platformFeeValue);
    }
  }, [data, form]);

  const updateFeeService = useUpdateFeeServiceMutation();
  const onSubmit = async (data: UpdateFeeServiceType) => {
    if (updateFeeService.isPending) return;
    try {
      const res = await updateFeeService.mutateAsync(data);
      toast({
        title: res.payload.message,
        variant: "success",
      });
    } catch (error) {
      handleErrorApi({ error, setError: form.setError });
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Phí Dịch Vụ Nền Tảng</CardTitle>
          <CardDescription>
            Giải thích về cách tính phí nền tảng
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Phí nền tảng áp dụng đối với chuyên gia sử dụng nền tảng để tạo lịch
            tư vấn với khách hàng.
          </p>
          <p className="mb-4">Cách tính phí:</p>
          <ul className="list-disc list-inside mb-4">
            <li>
              Nền tảng sẽ thu{" "}
              <span className="p-1 bg-yellow-300 rounded-lg text-gray-800">
                {data?.payload.data.platformFeeValue}%
              </span>{" "}
              phí cho mỗi giá tiền khi tư vấn.
            </li>
            <li>Phí được tính trên tổng giá trị của buổi tư vấn.</li>
          </ul>
          <p className="mb-4">Ví dụ:</p>
          <p>
            Nếu chuyên gia tạo ra 1 lịch tư vấn có giá trị là{" "}
            {formatCurrency(100000)}, thì tiền chuyên gia thực nhận sau khi đã
            trừ phí nền tảng là:
          </p>
          <p className="font-bold">
            100.000 - 100.000 * {Number(data?.payload.data.platformFeeValue)}% ={" "}
            {formatCurrency(
              100000 -
                100000 * (Number(data?.payload.data.platformFeeValue) / 100)
            )}
          </p>
        </CardContent>
      </Card>

      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Quản lí phí dịch vụ cho nền tảng</CardTitle>
          <CardDescription>
            Thay đổi phí dịch vụ để xem số tiền nền tảng thu được
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Form {...form}>
              <form
                noValidate
                className="space-y-4"
                onSubmit={form.handleSubmit(onSubmit, (error) => {
                  console.warn(error);
                })}
              >
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="percent"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex flex-col space-y-2">
                          <Label htmlFor="percent">
                            Phí dịch vụ (tính theo %){" "}
                            <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="percent"
                            {...field}
                            placeholder="Nhập phí dịch vụ"
                            type="number"
                            onChange={(e) => {
                              const value = Math.max(
                                0,
                                Math.min(100, Number(e.target.value))
                              );
                              field.onChange(value);
                            }}
                          />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button className="w-full" type="submit">
                  Lưu
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
