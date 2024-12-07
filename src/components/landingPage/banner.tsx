"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, Search } from "lucide-react";
import Image from "next/image";
import { useAppContext } from "@/components/app-provider";
import Link from "next/link";
import { useTheme } from "next-themes";

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

const imageSets = [
  [
    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/landingpage%2Fpaper%20lanterns%20flying%20into%20the%20sky%20at%20a%20Festival%20in%20Shangyuan%20%2C%20candid%2C%20tourist%20in%20shot%2C%20ornate%20details%2C%20blue%20hour%2C%20travelog%20photo%2C%20VSCO%2C%20grain%2C%20faded%2C%20colourful%2C%20vivid%2C%20dreamy.png?alt=media&token=27cbb477-3844-4bbd-83b6-1a39cc78ea11",
    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/landingpage%2FNight%20Market%20in%20Chiang%20Mai%20from%20a%20distance%2C%20candid%2C%20tourist%20in%20shot%2C%20ornate%20details%2C%20blue%20hour%2C%20travelog%20photo%2C%20VSCO%2C%20grain%2C%20faded%2C%20colourful%2C%20vivid%2C%20dreamy.png?alt=media&token=45e355c1-3ba5-48e0-93c3-e7add8dfa4b3",
    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/landingpage%2FMount%20Fuji%20Hike%2C%20travelog%20photo%2C%20candid%20shot%2C%20VSCO%2C%20grain%2C%20faded%2C%20colourful%2C%20tropical%20vibes%2C%20Subtle%20tones%2C%20golden%20hour.png?alt=media&token=34a42e14-92e4-4e59-87fd-0f4265cf8d72",
    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/landingpage%2FLavender%20Fields%20in%20Provence%2C%20travelog%20photo%2C%20candid%20shot%2C%20VSCO%2C%20grain%2C%20faded%2C%20colourful%2C%20tropical%20vibes%2C%20Subtle%20tones%2C%20golden%20hour.png?alt=media&token=f26fa9f3-7508-4e71-89df-af89f552015a",
    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/landingpage%2FAfrican%20Safari%20Wildlife%20with%20an%20old%20landrover%20parked%20on%20a%20hillside%2C%20travelog%20photo%2C%20candid%20shot%2C%20VSCO%2C%20grain%2C%20faded%2C%20colourful%2C%20tropical%20vibes%2C%20Subtle%20tones%2C%20golden%20hour.png?alt=media&token=d6982f86-932c-4c63-838b-c444ed2a009a",
    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/landingpage%2FBali%20jungle%20hotel%20candid%2C%20tourist%20in%20shot%2C%20ornate%20details%2C%20blue%20hour%2C%20travelog%20photo%2C%20VSCO%2C%20grain%2C%20faded%2C%20colourful%2C%20vivid%2C%20dreamy.png?alt=media&token=ea7b77e1-966e-4431-b36b-7c1d145932de",
  ],
  [
    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/landingpage%2Fanimal%2FMeadows%2C%203d%20render%2C%20fluffy%2C%20funny%2C%20%20--ar%2016_9.png?alt=media&token=caf798cf-02de-4fdc-a310-1c115ad741b0",
    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/landingpage%2Fanimal%2Fa%20grass%20field%20is%20in%20the%20sunlight%20during%20sunset%2C%20in%20the%20style%20of%20atmospheric%20clouds%2C%20minimalist%20nature%20studies%2C%20stockphoto%2C%20light%20yellow%20and%20dark%20cyan%2C%20nature-inspired%20imagery%2C%20uhd%20image%20.png?alt=media&token=d5905496-834b-49b1-92a8-84b7cf3e9ef4",
    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/landingpage%2Fanimal%2Fa%20woman%20is%20holding%20a%20bowl%20with%20fruits%20in%20it%2C%20in%20the%20style%20of%20eco-friendly%20craftsmanship%2C%20velvia%2C%20dark%20amber%20and%20pink%2C%20poolcore%2C%20rollei%20prego%2090%2C%20eye-catching%20tags%2C%20enigmatic%20tropics.png?alt=media&token=c5939717-2e36-4079-a02c-36238e33446e",
    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/landingpage%2Fanimal%2Fa%20little%20animal%20in%20a%20field%20of%20tall%20grass%20looking%20at%20a%20rocky%20area%20with%20clouds%2C%20in%20the%20style%20of%20mediterranean%20landscapes%2C%20canon%20ef%2085mm%20f_1.2l%20ii%20usm%2C%20panorama%2C%20pastel%20dreamscapes%2C%20joong%20keun%20lee%2C%20realistic%20rendering%20.png?alt=media&token=7626b17c-d6cb-4eed-bf54-6651e957ac37",
    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/landingpage%2Fanimal%2Ftwo%20white%20dogs%20are%20in%20a%20snowy%20forest%20next%20to%20trees%2C%20in%20the%20style%20of%20documentary%20travel%20photography%2C%20dark%20crimson%20and%20brown%2C%20wies%C5%82aw%20wa%C5%82kuski%2C%20fujifilm%20pro%20800z%2C%2032k%20uhd%2C%20nonrepresentational%20.png?alt=media&token=528081dc-f781-4933-9a8c-2bf5e24191bd",
    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/landingpage%2Fanimal%2Fa%20woman's%20hands%20holding%20a%20coffee%20cup%20in%20front%20of%20a%20table%2C%20in%20the%20style%20of%20light%20beige%20and%20dark%20azure%2C%20precision%20in%20details%2C%20handsome%2C%20caffenol%20developing%2C%20marble%2C%20back%20button%20focus%2C%20navy%20and%20blue.png?alt=media&token=2f3b2d81-3774-45aa-a9d6-ac24526c81de",
  ],
  [
    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/landingpage%2Frelax%2FA%20woman%20meditating%20in%20lotus%20position%20on%20the%20beach%2C%20with%20sunset%20light%20and%20palm%20trees%20in%20the%20background.%20A%20wooden%20bridge%20is%20behind%20her%2C%20with%20yoga%20and%20a%20yoga%20mat%20under%20her%20feet.%20It%20is%20a%20beautiful%20scenery%20of%20nature%20aroun.png?alt=media&token=85aaf462-36ac-4335-b220-4ab453a7cbcc",
    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/landingpage%2Frelax%2Fa%20woman%20doing%20some%20yoga%20poses%20near%20the%20ocean%20after%20sunset%2C%20in%20the%20style%20of%20orange%20and%20magenta%2C%20bold%20primary%20colors%2C%20warmcore%2C%20hikecore%2C%20reductionist%20form%2C%20uhd%20image%2C%20bold%2C%20colorful%2C%20large-scale.png?alt=media&token=82637bc7-4eaa-4d13-a886-2d48fafe32aa",
    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/landingpage%2Frelax%2Fa%20woman%20looks%20at%20river%20and%20trees%20with%20a%20long%20jacket%2C%20in%20the%20style%20of%20beige%2C%20handcrafted%20beauty%2C%20uhd%20image%2C%20normcore%2C%20aurorapunk%2C%20neo-traditionalist%2C%20inspirational.png?alt=media&token=98841d80-5d65-4896-8b4e-46597b931081",
    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/landingpage%2Frelax%2Fa%20group%20of%20goldfish%20swim%20in%20a%20pond%20with%20lily%20pond%2C%20in%20the%20style%20of%20artistic%20reportage%2C%20dark%20turquoise%20and%20light%20amber%2C%20topcor%2058mm%20f_1.4%2C%20surrealistic%20detail%2C%20sharpness.png?alt=media&token=5ba05152-4346-4fe4-b919-1a5f0f0ae3bd",
    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/landingpage%2Frelax%2Fa%20Waterfall%20in%20the%20style%20of%20tim%20walker%2C%20dreamlike%2C%20photo%20taken%20with%20provia%2C%20sheet%20film.png?alt=media&token=07c9d11e-01bd-45ef-aa29-702e7ff630de",
    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/landingpage%2Frelax%2Fdiver%20dives%20through%20a%20cave%20with%20sea%20nettle%20coral%2C%20in%20the%20style%20of%20colorful%20post-impressionism%2C%20high%20quality%20photo%2C%20birds-eye-view%2C%20slim%20aarons%2C%20orange%20and%20blue%2C%208k%20resolution%2C%20majestic%2C%20sweeping%20seascapes%20.png?alt=media&token=ab6abf8e-1ec3-4753-bc51-3c6908d1227e",
  ],
  [
    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/landingpage%2Fpositive%2FClose%20up%20of%20a%20man%20running%20on%20the%20road%20in%20the%20park%2C%20depicting%20a%20healthy%20lifestyle%20concept%2C%20gym%20background.%20Stock%20photo%202_3%20place%20for%20text%20stock%20photo%207089mm%20f4%2056%20mm%20fujifilm%20GFX%20medium%20format%20lens%2C%20capturing%20a%20sunset.png?alt=media&token=0de6c062-4478-4ec2-a4f1-b4685a31110f",
    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/landingpage%2Fpositive%2Fa%20frog%20sitting%20on%20top%20of%20a%20green%20leaf%2C%20in%20the%20style%20of%20canon%20eos%205d%20mark%20iv%2C%20hazy%2C%20sigma%2035mm%20f_1.4%20dg%20hsm%20art%2C%20camille%20pissarro%2C%20high%20quality%20photo%2C%20nusch%20%C3%A9luard%2C%20olympus%20xa2%20.png?alt=media&token=4a3e618c-6bd6-48d8-9d11-b8d9ca01a55e",
    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/landingpage%2Fpositive%2Fman%20in%20a%20surfer%20hat%20swimming%20in%20the%20water%2C%20in%20the%20style%20of%20norwegian%20nature%2C%20candid%20portraits%2C%20dusan%20djukaric%2C%20charming%2C%20idyllic%20rural%20scenes%2C%20olympus%20xa2%2C%20andrzej%20sykut%2C%20cabincore.png?alt=media&token=0ee92aaa-8cfb-4489-9095-0358bc005268",
    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/landingpage%2Fpositive%2Fretro%20tent%20on%20the%20ground%20on%20the%20shore%20of%20a%20lake%2C%20lake%20and%20canoe%20in%20the%20background%2C%20mountains%20in%20the%20distance%2C%20cloudy%20day%2C%20full%20shot%2C%20high%20quality%20photo.png?alt=media&token=4cc1681e-9366-4acd-b670-f8b28d3c4c9a",
    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/landingpage%2Fpositive%2Ftwo%20people%20sitting%20on%20a%20rock%20with%20an%20overhanging%20waterfall%2C%20in%20the%20style%20of%20candid%20photography%20style%2C%20indian%20pop%20culture%2C%20canon%20sure%20shot%20af-7s%2C%20travel%2C%20environmental%20portraiture%2C%20wilderness%2C%20high%20resolution%20.png?alt=media&token=61c13f58-d1a8-4adb-aac7-a24f47f778fb",
    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/landingpage%2Fpositive%2Fyoung%20man%20dressed%20in%20shorts%20and%20tennis%20shoes%20standing%2C%20tennis%20racket%2C%20tennis%20court%2C%20sunny%20day%2C%20framing%20racket%20close-up%2C%20high%20quality%20photo.png?alt=media&token=8714e84c-ea5a-4ba6-b8cd-5fb0fd5bfd7d",
  ],
];

const searchImages = [
  "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/landingpage%2Fsearch%2Ftiny%20Waterfall%20_%20lo-fi%3B%20imax%3B%20sharp%20focus%3B%20provia%20_%20asymmetric%20balance%20_%20naturecore.png?alt=media&token=fe5b1caa-8b55-4246-a4b4-156e18bb3b7d",
  "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/landingpage%2Fsearch%2FCityscape%2C%20in%20the%20style%20of%20ray%20tracing%2C%20michal%20lisowski%2C%20golden%20light%2C%20domestic%20realist%2C%20ed%20freeman%2C%20eileen%20gray%2C%20realistic%20lighting%2C%20dramatic%20scenery.png?alt=media&token=11ce6cf9-1b35-40ae-916a-3025d19bfc15",
  "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/landingpage%2Fsearch%2FIn%20a%20sun-dappled%20meadow%2C%20a%20fluffy%20white%20rabbit%20nibbles%20on%20clover%2C%20surrounded%20by%20a%20carpet%20of%20vibrant%20wildflowers.%20Describe%20its%20twitching%20nose%20and%20the%20softness%20of%20its%20fur%20as%20it%20blends%20harmoniously%20with%20nature.png?alt=media&token=ba563aef-4df2-4f5a-bee3-d0add5bbff9a",
  "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/landingpage%2Fsearch%2FBookstore%20in%20the%20style%20of%20fujifilm%20neopan%20photography%2C%20large%20green%20plants%2C%20naomi%20okubo%2C%20laurent%20grasso%2C%20colorized%2C%20robert%20irwin%2C%20candid%2C%20indigo%2C%20portrait%2C%20white%20and%20clean.png?alt=media&token=30875870-ad5b-4855-a24b-0a6a619c7331",
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
  const { isAuth, setIsAuth } = useAppContext();
  const { theme } = useTheme();

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

            <div className="mt-4 flex items-center gap-2">
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

          <div className="mt-12 h-[400px] overflow-hidden">
            <motion.div
              key={currentPhrase}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 3 }}
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
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
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
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
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

        {/* Post section */}
        <div className="flex min-h-screen flex-row">
          {/* Left Section with Images */}
          <div className="relative w-1/2 bg-[#f5d1bc] overflow-hidden">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/landingpage%2Fa%20photo%20of%20some%20small%20flowers%20in%20a%20vase%2C%20in%20the%20style%20of%20light%20sky-blue%20and%20bronze%2C%20ethereal%20minimalism%2C%20naturecore%2C%20long%20lens%2C%20delicate%20flora%20depictions%2C%20light%20cyan%20and%20orange%2C%20zen%20minimalism%20--ar%202_3%20--v%205.png?alt=media&token=dee8e366-db2e-478b-8d0a-e4fe4fd38d74"
              alt="Beauty portrait"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              className="object-cover object-center"
              priority
            />
            {/* Pinterest Pin Card */}
            <div className="absolute left-[10%] top-[20%] w-[80%] max-w-[300px] overflow-hidden rounded-2xl bg-white shadow-xl hidden md:block">
              <div className="relative h-[400px] w-full">
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/landingpage%2FBeautiful%20Asian%20woman%20holding%20white%20tulips%20in%20front%20of%20her%20face%20against%20a%20green%20background%2C%20happy%20portrait%20photography%20in%20the%20style%20of%20canon%20eos%20mark%20iv..png?alt=media&token=ee7969c9-7399-49ea-9d6a-8cab4d058b53"
                  alt="Lip shade tutorial"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                  className="object-cover "
                />
                <div className="absolute bottom-4 left-4 flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src="https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/landingpage%2FBeautiful%20Asian%20woman%20holding%20white%20tulips%20in%20front%20of%20her%20face%20against%20a%20green%20background%2C%20happy%20portrait%20photography%20in%20the%20style%20of%20canon%20eos%20mark%20iv.%20.png?alt=media&token=fd1cc000-739f-470f-a037-8218ec574fcd"
                      alt="Profile picture"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
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
