import RegisterExpertForm from "@/app/(public)/(auth)/register/register-expert-form";
import RegisterForm from "@/app/(public)/(auth)/register/register-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export default function RegisterTabs() {
  return (
    <div>
      <Tabs defaultValue="user" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="user">Đăng ký người dùng</TabsTrigger>
          <TabsTrigger value="expert">Đăng ký chuyên gia</TabsTrigger>
        </TabsList>
        <div className="flex flex-col md:flex-row rounded-lg">
          <TabsContent value="user" className="grow">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 bg-gradient-custom p-8">
                <RegisterForm />
              </div>
              <div className="hidden md:block w-full md:w-1/2 relative h-auto min-h-[600px]">
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
          </TabsContent>

          <TabsContent value="expert" className="grow">
            <div className="flex flex-col md:flex-row">
              <div className="hidden md:block w-full md:w-1/2 relative h-auto min-h-[600px]">
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Fexper-banner.jpg?alt=media&token=5f8854c0-8e3c-40b9-9650-d68b3fcf86df"
                  alt="Register Expert"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                  priority
                />
              </div>
              <div className="w-full md:w-1/2 bg-gradient-custom p-8">
                <RegisterExpertForm />
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
