import FooterService from "@/components/LayoutClient/footerService";

import HeaderService from "@/components/LayoutClient/headerService";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen w-full flex-col relative">
      {/* Phần header */}
      <HeaderService />

      {/* phần main */}
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {children}
      </main>

      {/* Phần footer */}
      <FooterService />
    </div>
  );
}
