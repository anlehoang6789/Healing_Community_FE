import Footer from "@/components/footer/page";
import Header from "@/components/header/page";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <Header></Header>
      <Button className="bg-red-500 text-white">Nhấn thử đi</Button>
      <Footer />
    </>
  );
}
