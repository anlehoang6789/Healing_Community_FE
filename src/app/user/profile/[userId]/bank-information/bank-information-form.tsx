"use client";
import BankCombobox from "@/app/user/profile/[userId]/bank-information/bank-combobox";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  BankInformationBody,
  BankInformationBodyType,
} from "@/schemaValidations/account.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function BankInformationForm() {
  const form = useForm<BankInformationBodyType>({
    resolver: zodResolver(BankInformationBody),
    defaultValues: {
      bankName: "",
      bankAccountName: "",
      bankAccountNumber: "",
    },
  });

  //hàm format số tài khoản ngân hàng
  const handleAccountNumberChange = (value: string) => {
    // Remove all non-digit characters
    const digitsOnly = value.replace(/\D/g, "");
    // Limit to 16 digits
    const truncated = digitsOnly.slice(0, 16);
    // Format with spaces every 4 digits
    const formatted = truncated.replace(/(\d{4})(?=\d)/g, "$1 ");
    return formatted;
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Thông tin tài khoản ngân hàng</CardTitle>
        <CardDescription>
          Vui lòng nhập thông tin tài khoản ngân hàng của bạn
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form
          noValidate
          className="space-y-4"
          //   onSubmit={form.handleSubmit(onSubmit, (error) => {
          //     console.warn(error);
          //   })}
          //   onReset={reset}
        >
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="bankName"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="bankName">Tên ngân hàng</Label>
                      <BankCombobox
                        id="bankName"
                        aria-labelledby="bank-label"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bankAccountName"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="bankAccountName">Tên tài khoản</Label>
                    <Input
                      id="bankAccountName"
                      {...field}
                      placeholder="Nhập tên tài khoản"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bankAccountNumber"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="bankAccountNumber">Số tài khoản</Label>
                    <Input
                      id="bankAccountNumber"
                      value={field.value}
                      onChange={(e) => {
                        const formattedValue = handleAccountNumberChange(
                          e.target.value
                        );
                        field.onChange(formattedValue);
                      }}
                      placeholder="Nhập số tài khoản"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Lưu thông tin
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
