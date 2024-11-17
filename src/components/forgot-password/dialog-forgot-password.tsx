"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ForgotPasswordBody,
  ForgotPasswordBodyType,
  ResetPasswordWithOtpBody,
  ResetPasswordWithOtpBodyType,
} from "@/schemaValidations/account.schema";
import {
  useForgotPasswordSendOtpMutation,
  useResetPasswordWhenHaveOtpMutation,
} from "@/queries/useAccount";
import { toast } from "@/hooks/use-toast";
import { handleErrorApi } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

export default function DialogForgotPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isOtpSend, setIsOtpSend] = useState(false);
  const [emailOtp, setEmailOtp] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const formForgotPassword = useForm<ForgotPasswordBodyType>({
    resolver: zodResolver(ForgotPasswordBody),
    defaultValues: {
      email: "",
    },
  });

  const forgotPasswordSendOtpMutation = useForgotPasswordSendOtpMutation();

  const handleForgotPassword = async (data: ForgotPasswordBodyType) => {
    if (forgotPasswordSendOtpMutation.isPending) return;
    try {
      const result = await forgotPasswordSendOtpMutation.mutateAsync(data);
      toast({
        description: result.payload.message,
        variant: "success",
      });
      setEmailOtp(data.email);
      setIsOtpSend(true);
    } catch (error) {
      handleErrorApi({ error, setError: formForgotPassword.setError });
    }
  };

  const formResetPassword = useForm<ResetPasswordWithOtpBodyType>({
    resolver: zodResolver(ResetPasswordWithOtpBody),
    defaultValues: {
      email: "",
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (emailOtp) {
      formResetPassword.setValue("email", emailOtp);
    }
  }, [emailOtp, formResetPassword]);

  const resetPasswordWhenHaveOtpMutation = useResetPasswordWhenHaveOtpMutation(
    () => {
      // Close the dialog when the mutation is successful
      setIsDialogOpen(false);
    }
  );

  const handleResetPassword = async (data: ResetPasswordWithOtpBodyType) => {
    if (resetPasswordWhenHaveOtpMutation.isPending) return;
    try {
      const result = await resetPasswordWhenHaveOtpMutation.mutateAsync(data);
      toast({
        title: result.payload.message,
        description: "Hãy dùng mật khẩu mới để đăng nhập!!!",
        variant: "success",
      });
      formResetPassword.reset();
    } catch (error) {
      handleErrorApi({ error, setError: formResetPassword.setError });
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <h5 className="text-sm text-black hover:underline">Quên mật khẩu?</h5>
      </DialogTrigger>
      <DialogContent className="max-w-md ">
        <DialogTitle className="sr-only">Forgot password</DialogTitle>
        <DialogDescription className="sr-only">
          Make changes to your profile here. Click save when done.
        </DialogDescription>
        {isOtpSend ? (
          <Form {...formResetPassword}>
            <form
              className="space-y-4 max-w-[600px] flex-shrink-0 w-full"
              noValidate
              onSubmit={formResetPassword.handleSubmit(
                handleResetPassword,
                (errors) => {
                  console.warn(errors);
                }
              )}
            >
              <div className="grid gap-4">
                <h1 className="text-2xl font-semibold text-muted-foreground text-center">
                  Cập nhật mật khẩu mới
                </h1>
                <FormField
                  control={formResetPassword.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid gap-2">
                        <div className="flex items-center">
                          <Label htmlFor="email" className="text-black">
                            Email
                          </Label>
                          <span className="text-red-500 ml-1">*</span>
                        </div>
                        <Input
                          id="email"
                          type="text"
                          placeholder="Email"
                          required
                          {...field}
                          autoComplete="off"
                          className="placeholder:text-[#919BA4] border-[0.5px] border-[#666]"
                        />
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={formResetPassword.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid gap-2">
                        <div className="flex items-center">
                          <Label htmlFor="otp" className="text-black">
                            OTP
                          </Label>
                          <span className="text-red-500 ml-1">*</span>
                        </div>
                        <Input
                          id="otp"
                          type="text"
                          placeholder="Mã OTP"
                          required
                          {...field}
                          autoComplete="off"
                          className="placeholder:text-[#919BA4] border-[0.5px] border-[#666]"
                        />
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={formResetPassword.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid gap-2">
                        <div className="flex items-center">
                          <Label htmlFor="newPassword" className="text-black">
                            Mật khẩu
                          </Label>
                          <span className="text-red-500 ml-1">*</span>
                        </div>
                        <div className="relative">
                          <Input
                            id="newPassword"
                            type={showPassword ? "text" : "password"}
                            required
                            {...field}
                            autoComplete="off"
                            placeholder="Mk@12345"
                            className="placeholder:text-[#919BA4] border-[0.5px] border-[#666]"
                          />
                          <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                          >
                            {showPassword ? (
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
                  control={formResetPassword.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid gap-2">
                        <div className="flex items-center">
                          <Label
                            htmlFor="confirmPassword"
                            className="text-black"
                          >
                            Xác nhận mật khẩu
                          </Label>
                          <span className="text-red-500 ml-1">*</span>
                        </div>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            required
                            {...field}
                            autoComplete="off"
                            placeholder="Mk@12345"
                            className="placeholder:text-[#919BA4] border-[0.5px] border-[#666]"
                          />
                          <span
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                          >
                            {showConfirmPassword ? (
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

                <Button type="submit" className="w-full rounded-[20px] mt-2">
                  Cập nhật mật khẩu
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <Form {...formForgotPassword}>
            <form
              className="space-y-4 max-w-[600px] flex-shrink-0 w-full"
              noValidate
              onSubmit={formForgotPassword.handleSubmit(
                handleForgotPassword,
                (errors) => {
                  console.warn(errors);
                }
              )}
            >
              <div className="grid gap-4">
                <h1 className="text-2xl font-semibold text-muted-foreground text-center">
                  Quên mật khẩu
                </h1>
                <FormField
                  control={formForgotPassword.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid gap-2">
                        <Input
                          id="email"
                          type="text"
                          placeholder="Nhập email"
                          required
                          {...field}
                          autoComplete="off"
                          className="placeholder:text-[#919BA4] border-[0.5px] border-[#666]"
                        />
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full rounded-[20px] mt-2">
                  Gửi mã OTP
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
