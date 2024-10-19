import HeaderService from "@/components/layoutClient/headerService";

export default function MusicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-screen w-full flex-col relative">
      <HeaderService />

      <main className="flex flex-1 flex-col ">{children}</main>
    </div>
  );
}
