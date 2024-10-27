"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Banner() {
  return (
    <div className="relative w-full h-[40vh] overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 mb-8 rounded-lg">
      <motion.div
        className="absolute inset-0  bg-cover bg-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1.5 }}
      />
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-white p-4">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-center mb-4"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Cộng Đồng Chữa Lành
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-center max-w-3xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Nơi mọi suy nghĩ đều tìm thấy một ngôi nhà và mỗi hình ảnh đều kể một
          câu chuyện
        </motion.p>
        <motion.div
          className="mt-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Link href="/register">
            <Button className="bg-white text-purple-600 px-4 py-3 rounded-full font-semibold hover:bg-purple-100 transition duration-300 tracking-wide">
              Trải nghiệm ngay
            </Button>
          </Link>
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      />
    </div>
  );
}
