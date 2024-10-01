"use client";

import React, { useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";


export const AnimatedTooltip = ({
  children,
  content,
}: {
  children: React.ReactNode;
  content: string;
}) => {
  const [hovered, setHovered] = useState(false);
  const springConfig = { stiffness: 150, damping: 5 };
  const x = useMotionValue(0);
  const rotate = useSpring(
    useTransform(x, [-150, 150], [-30, 30]),
    springConfig
  );

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const halfWidth = event.currentTarget.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  const tooltipOffsetY = 30; // khoảng cách giữa tooltip và con trỏ chuột

  return (
    <div
      className="relative group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 200,
                damping: 15,
              },
            }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            style={{
              translateX: "-50%", // Căn giữa tooltip so với con trỏ chuột
              translateY: `calc(-100% + ${tooltipOffsetY}px)`, // điều chỉnh vị trí y
              rotate: rotate,
              whiteSpace: "nowrap",
            }}
            className="absolute top-10 left-1/2 transform -translate-x-1/2 flex text-xs flex-col items-center justify-center rounded-md bg-black z-50 shadow-xl px-4 py-2"
          >
            <div className="text-white text-xs font-medium">{content}</div>
          </motion.div>
        )}
      </AnimatePresence>
      <div onMouseMove={handleMouseMove} className="cursor-pointer">
        {children}
      </div>
    </div>
  );
};
