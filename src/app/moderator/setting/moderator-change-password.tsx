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
import { useState } from "react";
import { useChangePasswordUserMutation } from "@/queries/useAccount";
import { toast } from "@/hooks/use-toast";
import { handleErrorApi } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

export default function ModeratorChangePassword() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const form = useForm<ChangePasswordBodyType>({
    resolver: zodResolver(ChangePasswordBody),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const changePasswordUserMutation = useChangePasswordUserMutation();

  const onSubmit = async (data: ChangePasswordBodyType) => {
    try {
      const result = await changePasswordUserMutation.mutateAsync(data);
      form.reset();
      toast({
        title: result.payload.message,
        description: "Vui lòng đăng nhập lại với mật khẩu mới",
        variant: "success",
      });
    } catch (error) {
      handleErrorApi({ error, setError: form.setError });
    }
  };

  return (
    <Form {...form}>
      <form
        className="grid auto-rows-max items-start gap-4 md:gap-8"
        noValidate
        onSubmit={form.handleSubmit(onSubmit, (errors) => {
          console.warn(errors);
        })}
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
                      <Label htmlFor="oldPassword">Mật khẩu hiện tại</Label>
                      <div className="relative">
                        <Input
                          id="oldPassword"
                          type={showCurrentPassword ? "text" : "password"}
                          required
                          {...field}
                          className="w-full"
                          autoComplete="current-password"
                          placeholder="Mk@12345"
                          {...field}
                        />
                        <span
                          onClick={() =>
                            setShowCurrentPassword(!showCurrentPassword)
                          }
                          className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                        >
                          {showCurrentPassword ? (
                            <Eye
                              size={"16px"}
                              strokeWidth="0.5px"
                              className="text-black"
                            />
                          ) : (
                            <EyeOff
                              size={"16px"}
                              strokeWidth="0.5px"
                              className="text-black"
                            />
                          )}
                        </span>
                      </div>
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
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          required
                          {...field}
                          autoComplete="new-password"
                          placeholder="Mk@12345"
                          className="w-full"
                        />
                        <span
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                        >
                          {showNewPassword ? (
                            <Eye
                              size={"16px"}
                              strokeWidth="0.5px"
                              className="text-black"
                            />
                          ) : (
                            <EyeOff
                              size={"16px"}
                              strokeWidth="0.5px"
                              className="text-black"
                            />
                          )}
                        </span>
                      </div>
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
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={showConfirmNewPassword ? "text" : "password"}
                          required
                          {...field}
                          autoComplete="new-password"
                          placeholder="Mk@12345"
                          className="w-full"
                        />
                        <span
                          onClick={() =>
                            setShowConfirmNewPassword(!showConfirmNewPassword)
                          }
                          className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                        >
                          {showConfirmNewPassword ? (
                            <Eye
                              size={"16px"}
                              strokeWidth="0.5px"
                              className="text-black"
                            />
                          ) : (
                            <EyeOff
                              size={"16px"}
                              strokeWidth="0.5px"
                              className="text-black"
                            />
                          )}
                        </span>
                      </div>
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
