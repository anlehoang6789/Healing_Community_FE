"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import {
  ChangePasswordBody,
  ChangePasswordBodyType,
} from "@/schemaValidations/account.schema";

export default function ModeratorChangePassword() {
  const form = useForm<ChangePasswordBodyType>({
    resolver: zodResolver(ChangePasswordBody),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  return (
    <Form {...form}>
      <form
        noValidate
        className="grid auto-rows-max items-start gap-4 md:gap-8"
        // onSubmit={form.handleSubmit(onSubmit, (err) => console.log(err))}
        // onReset={resetForm}
      >
        <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
          <CardHeader>
            <CardTitle className="text-muted-foreground">
              Đổi mật khẩu
            </CardTitle>
            <CardDescription className="sr-only">
              Lipsum dolor sit amet, consectetur adipiscing elit
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-3 text-muted-foreground">
                      <Label htmlFor="oldPassword">Mật khẩu cũ</Label>
                      <Input
                        id="oldPassword"
                        type="password"
                        className="w-full"
                        autoComplete="off"
                        {...field}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-3 text-muted-foreground">
                      <Label htmlFor="newPassword">Mật khẩu mới</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        className="w-full"
                        autoComplete="off"
                        {...field}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-3 text-muted-foreground">
                      <Label htmlFor="confirmPassword">
                        Nhập lại mật khẩu mới
                      </Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        className="w-full"
                        autoComplete="off"
                        {...field}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <div className=" items-center gap-2 md:ml-auto flex">
                <Button
                  variant="ghost"
                  size="sm"
                  type="reset"
                  className="text-muted-foreground"
                >
                  Hủy
                </Button>
                <Button
                  size="sm"
                  type="submit"
                  variant={"outline"}
                  className="bg-backgroundChat text-textChat"
                >
                  Lưu thông tin
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
