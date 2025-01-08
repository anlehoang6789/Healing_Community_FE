import LoginForm from "@/app/(public)/(auth)/login/login-form";
import Image from "next/image";
import React, { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-16">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 bg-gradient-custom p-8">
            <Suspense>
              <LoginForm />
            </Suspense>
          </div>
          <div className="hidden md:block w-1/2 relative h-full min-h-[550px]">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
              alt="Lotus Login"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
