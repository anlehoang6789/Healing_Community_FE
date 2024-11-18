"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, Search } from "lucide-react";
import Image from "next/image";
import { useAppContext } from "@/components/app-provider";
import Link from "next/link";

const phrases = [
  "Khám phá cảm hứng chữa lành",
  "Tìm ý tưởng tự chăm sóc",
  "Tìm hoạt động thư giãn",
  "Lan tỏa năng lượng tích cực",
];

const colors = [
  "#E60023", // Màu cho phrase 1
  "#007BFF", // Màu cho phrase 2
  "#28A745", // Màu cho phrase 3
  "#FFC107", // Màu cho phrase 4
];

const imageSets = [
  [
    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  ],
  [
    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  ],
  [
    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  ],
  [
    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  ],
];

const searchImages = [
  "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
];

const cards = [
  {
    title: "Fern future home vibes",
    image:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    size: "large",
  },
  {
    title: "My Scandinavian bedroom",
    image:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    size: "small",
  },
  {
    title: "The deck of my dreams",
    image:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    size: "small",
  },
  {
    title: "Serve my drinks in style",
    image:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    size: "small",
  },
  {
    title: "Our bathroom upgrade",
    image:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    size: "small",
  },
];

export default function Component() {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const { isAuth, setIsAuth } = useAppContext();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index: number) => {
    setCurrentPhrase(index);
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-white pt-8">
      <div className="mx-auto w-full">
        {/* Banner section */}
        <div>
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="mb-4 text-6xl font-bold tracking-tight">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPhrase}
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: 20 }}
                  exit={{ opacity: -1, y: 10 }}
                  transition={{ duration: 0.75 }}
                  className="mb-8"
                  style={{ color: colors[currentPhrase] }}
                >
                  {phrases[currentPhrase]}
                </motion.div>
              </AnimatePresence>
              tiếp theo của bạn
            </h1>

            <div className="mt-4 flex items-center gap-2">
              {phrases.map((_, index) => (
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

          <div className="mt-12 h-[400px] overflow-hidden">
            <motion.div
              key={currentPhrase}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 2 }}
              className="flex justify-between"
            >
              {imageSets[currentPhrase].map((src, index) => {
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: {
                        delay: index * 0.1,
                        duration: 0.5,
                      },
                    }}
                    className={`relative ${
                      index < 2
                        ? "block sm:block"
                        : index < 3
                        ? "hidden sm:block md:block"
                        : "hidden lg:block"
                    }`}
                    style={{
                      marginTop: index % 2 === 0 ? "0px" : "50px",
                      height:
                        index % 3 === 0
                          ? "350px"
                          : index % 3 === 1
                          ? "280px"
                          : "280px",
                      width: "220px",
                      transform: "translateY(-10px)",
                    }}
                  >
                    <Image
                      src={src}
                      alt={`Inspiration ${index + 1}`}
                      fill
                      className="rounded-3xl object-cover"
                      priority
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Search Section */}
        <div className="relative bg-[#FFF6D5] py-32 md:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col-reverse items-center justify-between gap-12 lg:flex-row">
              {/* Container for the left side with images */}
              <div className="relative h-[500px] w-[500px]">
                <div className="absolute top-0 h-full w-full">
                  {searchImages.map((src, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.2 }}
                      className="absolute rounded-3xl shadow-lg"
                      style={{
                        width: index === 1 ? "350px" : "200px", // Larger central image
                        height: index === 1 ? "450px" : "250px", // Larger central image
                        // Adjust positions based on index
                        left:
                          index === 0
                            ? "-10%"
                            : index === 1
                            ? "25%"
                            : index === 1
                            ? "5%"
                            : "80%",
                        top:
                          index === 0
                            ? "20%"
                            : index === 1
                            ? "5%"
                            : index === 2
                            ? "70%"
                            : "-15%",
                        zIndex: index === 1 ? 2 : 1, // Keep central image on top
                      }}
                    >
                      <Image
                        src={src}
                        alt={`Search example ${index + 1}`}
                        fill
                        className="rounded-3xl object-cover"
                      />
                    </motion.div>
                  ))}

                  {/* Search bar overlay */}
                  <div className="absolute left-[35%] top-[10%] z-10 flex items-center gap-2 rounded-full bg-white px-6 py-3 shadow-lg">
                    <Search className="h-5 w-5 text-gray-500" />
                    <span className="text-lg font-semibold">
                      chữa lành tâm hồn
                    </span>
                  </div>
                </div>
              </div>

              {/* Right side with text */}
              <div className="flex flex-col items-center gap-6 lg:max-w-xl">
                <h2 className="text-4xl font-extrabold text-[#E60023] md:text-5xl lg:text-6xl">
                  Tìm kiếm nội dung
                </h2>
                <p className="text-lg text-center text-[#E60023] md:text-xl">
                  Bạn muốn thử điều gì tiếp theo? Hãy nghĩ về thứ bạn yêu thích
                  — chẳng hạn như &quot;chữa lành tâm hồn&quot; — và xem bạn tìm
                  thấy gì .
                </p>

                {!isAuth && (
                  <Link href={"/register"}>
                    <Button className="rounded-full bg-[#E60023] px-8 py-6 text-lg font-semibold text-white hover:bg-[#E60023]/90">
                      Trải nghiệm ngay
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Save Section */}
        <div className="relative bg-[#e1f8f7] px-4 py-20 md:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">
              {/* Left side with text */}
              <div className="flex flex-col items-center gap-6 lg:max-w-xl">
                <h2 className="text-4xl font-extrabold text-teal-800 md:text-5xl lg:text-6xl">
                  Chia sẻ câu chuyện
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
                        className="rounded-3xl object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Post section */}
        <div className="flex min-h-screen flex-row">
          {/* Left Section with Images */}
          <div className="relative w-1/2 bg-[#f5d1bc] overflow-hidden">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
              alt="Beauty portrait"
              fill
              className="object-cover object-center"
              priority
            />
            {/* Pinterest Pin Card */}
            <div className="absolute left-[10%] top-[20%] w-[80%] max-w-[300px] overflow-hidden rounded-2xl bg-white shadow-xl hidden md:block">
              <div className="relative h-[400px] w-full">
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
                  alt="Lip shade tutorial"
                  fill
                  className="object-cover "
                />
                <div className="absolute bottom-4 left-4 flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src="https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
                      alt="Profile picture"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-white">
                    <p className="font-semibold">Gia Minh</p>
                    <p className="text-sm">56.7k người theo dõi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section with Text */}
          <div className="flex w-1/2 flex-col items-center justify-center bg-pink-50 px-4 py-16 text-center sm:px-8 lg:px-16">
            <h1 className="mb-6 text-2xl font-bold text-red-600 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
              Đăng bài, chia sẻ,
              <br />
              trải nghiệm, tích cực
            </h1>
            <p className="mb-8 max-w-md text-sm text-red-600/90 sm:text-base lg:text-lg">
              Phần hay nhất của Cộng đồng chữa lành là khám phá những điều và
              chia sẻ năng lượng tích cực từ mọi người trên khắp thế giới.
            </p>

            {!isAuth && (
              <Link href={"/register"}>
                <Button className="rounded-full bg-red-500 px-6 py-2 text-sm font-semibold text-white hover:bg-red-600 sm:px-8 sm:py-3 sm:text-base lg:px-10 lg:py-4 lg:text-lg">
                  Trải nghiệm ngay
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
