import FooterService from "@/components/layoutClient/footerService";

import HeaderService from "@/components/layoutClient/headerService";

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
      <main className="">
        {children}
      </main>

      {/* Phần footer */}
      <FooterService />
    </div>
  );
}
