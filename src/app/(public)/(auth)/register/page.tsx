import RegisterForm from "@/app/(public)/(auth)/register/register-form";
import Image from "next/image";
import React from "react";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-16 ">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 bg-gradient-custom p-8">
            <RegisterForm />
          </div>
          <div className="hidden md:block w-1/2 relative h-auto min-h-[600px]">
            <div className="relative w-full h-full">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-register.jpg?alt=media&token=0bead35e-556e-4935-945e-909d9cee4483"
                alt="Lotus Register"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
