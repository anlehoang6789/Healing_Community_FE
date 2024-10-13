import FooterService from "@/components/LayoutClient/footerService";
import HeaderService from "@/components/LayoutClient/headerService";

export default function UserLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen w-full flex-col relative">
      {/* Phần header */}
      <HeaderService />

      {/* phần main */}
      <main className="flex flex-1 flex-col ">{children}</main>

      {/* Phần footer */}
      <FooterService />
    </div>
  );
}
