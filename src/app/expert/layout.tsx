import FooterService from "@/components/layoutClient/footerService";
import HeaderService from "@/components/layoutClient/headerService";
import SidebarLayout from "@/components/layoutExpert/sidebarLayout";

export default function ExpertLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen w-full flex-col relative">
      <HeaderService />
      <div className="flex flex-grow">
        <SidebarLayout />

        <main className="flex-grow flex flex-col sm:gap-4 sm:py-4 sm:pl-4 max-w-full">
          {children}
        </main>
      </div>
      <FooterService />
    </div>
  );
}
