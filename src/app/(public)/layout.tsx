import DarkModeToggle from "@/components/dark-mode-toogle";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen w-full flex-col relative">
      {/* Phần header */}

      {/* Nút darkmode */}
      <div className="ml-auto">
        <DarkModeToggle />
      </div>

      {/* phần main */}
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {children}
      </main>

      {/* Phần footer */}
    </div>
  );
}
