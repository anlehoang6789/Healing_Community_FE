"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  RegisterBody,
  RegisterBodyType,
} from "@/schemaValidations/auth.schema";
import { useRegisterUserMutation } from "@/queries/useAuth";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { handleErrorApi } from "@/lib/utils";

export default function RegisterExpertForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();
  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      email: "",
      userName: "",
      password: "",
      confirmPassword: "",
      isExpert: true,
    },
  });

  const registerExpertMutation = useRegisterUserMutation();

  const onSubmit = async (data: RegisterBodyType) => {
    try {
      const result = await registerExpertMutation.mutateAsync(data);
      toast({
        description: result.payload.message,
        variant: "success",
      });
      router.push("/login");
    } catch (error) {
      handleErrorApi({ error, setError: form.setError });
    }
  };

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     setSelectedFile(file);
  //   }
  // };

  // const handleRemoveFile = () => {
  //   setSelectedFile(null);
  // };

  // const onSubmit = (data: RegisterExpertBodyType) => {
  //   console.log("Form data:", data);
  // };

  return (
    <div>
      <Form {...form}>
        <form
          className="space-y-4 max-w-[600px] flex-shrink-0 w-full"
          noValidate
          onSubmit={form.handleSubmit(onSubmit, (errors) => {
            console.warn(errors);
          })}
        >
          <div className="grid gap-4">
            <h1 className="text-4xl font-bold text-black text-center">
              Đăng ký chuyên gia
            </h1>
            {/* Email field */}
            <FormField
              control={form.control}
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
                      type="email"
                      placeholder="abc@gmail.com"
                      required
                      {...field}
                      autoComplete="email"
                      className="placeholder:text-[#919BA4] border-[0.5px] border-[#666]"
                    />
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            {/* Username field */}
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="username" className="text-black">
                        Tên tài khoản
                      </Label>
                      <span className="text-red-500 ml-1">*</span>
                    </div>
                    <Input
                      id="userName"
                      type="text"
                      placeholder="abcdef"
                      required
                      {...field}
                      autoComplete="username"
                      className="placeholder:text-[#919BA4] border-[0.5px] border-[#666]"
                    />
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            {/* Chỗ hiển thị combobox */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="username" className="text-black">
                          Tên tài khoản
                        </Label>
                        <span className="text-red-500 ml-1">*</span>
                      </div>
                      <Input
                        id="username"
                        type="text"
                        placeholder="abcdef"
                        required
                        {...field}
                        autoComplete="username"
                        className="w-full"
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="career"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label
                          htmlFor="career"
                          className="text-black"
                          id="career-label"
                        >
                          Nghề nghiệp
                        </Label>
                        <span className="text-red-500 ml-1">*</span>
                      </div>
                      <CareerCombobox
                        id="career"
                        aria-labelledby="career-label"
                        value={field.value}
                        onChange={field.onChange}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div> */}

            {/* Password field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password" className="text-black">
                        Mật khẩu
                      </Label>
                      <span className="text-red-500 ml-1">*</span>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        required
                        {...field}
                        autoComplete="current-password"
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
            {/* Confirm password field */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="confirmPassword" className="text-black">
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
                        autoComplete="current-password"
                        placeholder="Mk@12345"
                        className="placeholder:text-[#919BA4] border-[0.5px] border-[#666] "
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
            {/* File Upload Field */}
            {/* <FormItem>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="file" className="text-black font-semibold">
                    Tải lên chứng chỉ
                  </Label>
                  <span className="text-red-500 ml-1">*</span>
                </div>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-10 h-10 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        JPEG, JPG, PNG or PDF (MAX. 5MB)
                      </p>
                    </div>
                    <Input
                      id="file"
                      type="file"
                      accept=".jpeg,.jpg,.png,.pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
                {selectedFile && (
                  <div className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
                    <span className="text-sm text-gray-600 truncate">
                      {selectedFile.name}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={handleRemoveFile}
                      className="h-8 w-8"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                <FormMessage />
              </div>
            </FormItem> */}
            <Button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 rounded-[20px] mt-2"
              size="lg"
            >
              Đăng ký
            </Button>
            {/* <div className="flex items-center justify-center text-black space-x-4">
              <Separator className="flex-1 h-[1px] bg-[#b2babb]" />
              <h5 className="text-base text-black">Hoặc</h5>
              <Separator className="flex-1 h-[1px] bg-[#b2babb]" />
            </div>
            <Button
              className="w-full bg-white text-black hover:bg-gray-100 rounded-[20px] flex"
              type="button"
              size="lg"
            >
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/logo%2Flogo-google-png.png?alt=media&token=4c4b28b4-7706-4c3f-9f8e-c8fccfc9a8ff"
                alt="Google Logo"
                width={20}
                height={20}
                style={{ width: "auto", height: "auto" }}
                className="mr-2"
              />
              Đăng nhập bằng Google
            </Button> */}
            <div className="flex items-center justify-center text-black">
              <h5 className="text-sm">Đã có tài khoản?</h5>
              <span className="ml-1 underline text-sm hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-pink-500 to-violet-500">
                <Link href={"/login"}>Đăng nhập ngay</Link>
              </span>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
