"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import { useAppContext } from "@/components/app-provider";
import Link from "next/link";

const phrasesTop = [
  "Khám phá câu chuyện chữa lành",
  "Bắt đầu hành trình chữa lành",
  "Tìm nguồn động viên để bước tiếp",
  "Lan tỏa câu chuyện chữa lành",
];

const phrasesBottom = [
  "truyền cảm hứng tiếp theo của bạn",
  "tâm hồn của bạn ngay hôm nay",
  "trên con đường hạnh phúc",
  "và hy vọng đến cộng đồng",
];

const colors = [
  "#E60023", // Màu cho phrase 1
  "#007BFF", // Màu cho phrase 2
  "#28A745", // Màu cho phrase 3
  "#FFC107", // Màu cho phrase 4
];

const cards = [
  {
    title: "Fern future home vibes",
    image:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/landingpage%2Ftrip%2FBeach%20Bonfire%20Malibu%20Travel%20%26%20leisure%20magazine%20photo%2C%20Sony%20A7III%2C%20candid%2C%20multiple%20subjects%2C%20diverse%2C%20TikTok%2C%20unstock.png?alt=media&token=fdb29ff1-5a1c-4d8f-8db0-6672780c8d7d",
    size: "large",
  },
  {
    title: "My Scandinavian bedroom",
    image:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/landingpage%2Ftrip%2FBeer%20Garden%20Berlin%20Travel%20%26%20leisure%20magazine%20photo%2C%20Sony%20A7III%2C%20candid%2C%20multiple%20subjects%2C%20diverse%2C%20TikTok%2C%20unstock.png?alt=media&token=ccc0e7e3-24a9-4c59-93d4-3b330e870160",
    size: "small",
  },
  {
    title: "The deck of my dreams",
    image:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/landingpage%2Ftrip%2FGreat%20Wall%20Trek%2C%20travelog%20photo%2C%20candid%20shot%2C%20VSCO%2C%20grain%2C%20faded%2C%20colourful%2C%20tropical%20vibes%2C%20Subtle%20tones%2C%20golden%20hour.png?alt=media&token=ee153725-fda3-44f2-8dda-d910e73afce4",
    size: "small",
  },
  {
    title: "Serve my drinks in style",
    image:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/landingpage%2Ftrip%2FRio%20beachside%20food%20stall%20Travel%20%26%20leisure%20magazine%20photo%2C%20Sony%20A7III%2C%20candid%2C%20multiple%20subjects%2C%20diverse%2C%20TikTok%2C%20unstock.png?alt=media&token=323c7b5b-4c5d-4f13-b075-508f700725e1",
    size: "small",
  },
  {
    title: "Our bathroom upgrade",
    image:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/landingpage%2Ftrip%2Ftwo%20people%20walking%20on%20a%20beach%20holding%20hands%2C%20at%20sunset%2C%20in%20the%20style%20of%20art%20of%20tonga%2C%20fujifilm%20x-t4%2C%20romantic%20ruins%2C%20joyful%20celebration%20of%20nature%2C%20golden%20light%2C%20traditional%2C%20candid%20shots.png?alt=media&token=2f7fda9b-eef5-4422-87c8-084c8cd7c3a9",
    size: "small",
  },
];

export default function Component() {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const { isAuth } = useAppContext();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrasesTop.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index: number) => {
    setCurrentPhrase(index);
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden pt-8">
      <div className="mx-auto w-full">
        {/* Banner section */}
        <div>
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="mb-4 text-6xl font-bold tracking-tight text-textChat">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPhrase}
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: 20 }}
                  exit={{ opacity: -1, y: 10 }}
                  transition={{ duration: 1 }}
                  className="mb-8"
                  style={{ color: colors[currentPhrase] }}
                >
                  {phrasesTop[currentPhrase]}
                </motion.div>
              </AnimatePresence>
            </h1>

            <h1 className="mb-4 text-6xl font-bold tracking-tight text-textChat">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPhrase}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 1 }}
                  className="mb-8"
                  style={{ color: colors[currentPhrase] }}
                >
                  {phrasesBottom[currentPhrase]}
                </motion.div>
              </AnimatePresence>
            </h1>

            <div className="pb-4 flex items-center gap-2">
              {phrasesTop.map((_, index) => (
                <div
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`h-2 w-2 rounded-full cursor-pointer transition-colors duration-300 ${
                    currentPhrase === index
                      ? `bg-[${colors[index]}]`
                      : "bg-gray-300"
                  }`}
                  style={{
                    backgroundColor:
                      currentPhrase === index ? colors[index] : "gray",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Save Section */}
        <div className="relative bg-[#e1f8f7] px-4 py-20 md:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">
              {/* Left side with text */}
              <div className="flex flex-col items-center gap-6 lg:max-w-xl">
                <h2 className="text-4xl font-extrabold text-teal-800 md:text-4xl lg:text-4xl">
                  Chia sẻ và Kết nối
                </h2>
                <p className="text-lg text-teal-700 md:text-xl text-center">
                  Bạn có thể chia sẻ câu chuyện chữa lành của mình đến với mọi
                  người, lan tỏa cảm xúc tích cực.
                </p>

                {!isAuth && (
                  <Link href={"/register"}>
                    <Button className="rounded-full bg-red-500 px-8 py-6 text-lg font-semibold text-white hover:bg-red-600">
                      Trải nghiệm ngay
                    </Button>
                  </Link>
                )}
              </div>

              {/* Right side with image layout */}
              <div className="relative h-[600px] w-[600px]">
                <div className="absolute inset-0">
                  {cards.map((card, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.2 }}
                      className="absolute rounded-3xl shadow-lg"
                      style={{
                        width: index === 0 ? "350px" : "200px",
                        height: index === 0 ? "450px" : "250px",
                        left:
                          index === 0
                            ? "25%"
                            : index === 1
                            ? "0%"
                            : index === 2
                            ? "70%"
                            : index === 3
                            ? "5%"
                            : "60%",
                        top:
                          index === 0
                            ? "10%"
                            : index === 1
                            ? "-10%"
                            : index === 2
                            ? "0%"
                            : index === 3
                            ? "70%"
                            : "60%",
                        zIndex: index === 0 ? 2 : 1,
                      }}
                    >
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                        className="rounded-3xl object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="min-h-screen w-full bg-[#f5f0e9] px-4 pb-16 pt-6 md:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            {/* Header */}
            <div className="mb-20 text-center">
              <p className="mb-4 text-sm uppercase tracking-wider text-gray-600">
                Đặc trưng
              </p>
              <h1 className="text-4xl font-medium text-gray-900 md:text-5xl lg:text-6xl">
                Thay đổi cuộc sống
              </h1>
            </div>

            {/* Features */}
            <div className="space-y-32">
              {/* Healing Feature */}
              <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between md:gap-24">
                <div className="w-full md:w-1/2">
                  <Image
                    src="https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Fbac-si-tam-ly-online-gioi.png?alt=media&token=8a0c4cdd-4760-4af4-bce5-5961dddcba77"
                    width={600}
                    height={400}
                    className="rounded-lg object-cover h-96"
                    alt="Healing Feature"
                  />
                </div>
                <div className="w-full text-center md:w-1/2 md:text-left">
                  <h2 className="mb-4 text-4xl font-medium text-gray-900 md:text-4xl lg:text-4xl">
                    Tư vấn cùng Chuyên gia
                  </h2>
                  <p className="text-xl text-gray-600">
                    Đặt lịch hẹn 1-1 với các chuyên gia tâm lý được chứng nhận,
                    để trải nghiệm sự chữa lành sâu sắc về cảm xúc và tinh thần.
                  </p>
                </div>
              </div>

              {/* Peace Feature */}
              <div className="flex flex-col-reverse items-center gap-8 md:flex-row md:justify-between md:gap-24">
                <div className="w-full text-center md:w-1/2 md:text-left">
                  <h2 className="mb-4 text-4xl font-medium text-gray-900 md:text-4xl lg:text-4xl">
                    Chữa lành linh hoạt
                  </h2>
                  <p className="text-lg text-gray-600">
                    Đặt lịch hẹn linh hoạt, dễ dàng chọn thời gian phù hợp để
                    trò chuyện 1-1 với chuyên gia, giúp bạn chữa lành sâu sắc và
                    hiệu quả.
                  </p>
                </div>
                <div className="w-full md:w-1/2">
                  <Image
                    src="https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2FUntitled-2-730x408-1.jpg?alt=media&token=24c4cd9d-4fec-45dd-a553-e40234e2df23"
                    width={600}
                    height={400}
                    className="rounded-lg object-cover h-96 w-[600px]"
                    alt="Healing Feature"
                  />
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-20 flex justify-center">
              {!isAuth && (
                <Link href={"/register"}>
                  <Button className="rounded-full bg-red-500 px-8 py-6 text-lg font-semibold text-white hover:bg-red-600">
                    Trải nghiệm ngay
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="min-h-screen w-full bg-[#f5d1bc]">
          <div className="mx-auto grid h-screen max-w-7xl grid-cols-1 items-center gap-8 px-4 md:grid-cols-2 md:px-6 lg:px-8">
            <div className="space-y-24">
              <h1 className="text-4xl font-medium  text-[#3C3520] md:text-5xl lg:text-6xl xl:text-6xl">
                Đánh thức sự bình yên trong nội tâm bạn
              </h1>
              <p className="text-lg text-[#3C3520]/80 md:text-xl pb-12">
                Biến đổi cuộc sống của bạn thông qua nền tảng của chúng tôi.
              </p>

              {!isAuth && (
                <Link href={"/register"}>
                  <Button className="rounded-full bg-red-500 px-8 py-6 text-lg font-semibold text-white hover:bg-red-600">
                    Trải nghiệm ngay
                  </Button>
                </Link>
              )}
            </div>
            <div className="hidden md:block">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Fvi-sao-cang-co-thu-gian-cang-cang-thang-hon-1719900189053615927711-242-0-1289-2000-crop-1719900236903499908269.jpeg?alt=media&token=d006fcd2-ef4c-4439-847a-0b172f75e057"
                alt="Portrait of a woman"
                width={600}
                height={800}
                className="h-auto w-full object-cover rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
