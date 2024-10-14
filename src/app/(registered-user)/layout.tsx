import FooterService from "@/components/layoutClient/footerService";
import HeaderService from "@/components/layoutClient/headerService";

export default function RegisteredUserLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen w-full flex-col relative">
      <HeaderService />

      {/* phần main */}
      <main className="flex flex-1 flex-col ">{children}</main>

      <FooterService />
    </div>
  );
}
