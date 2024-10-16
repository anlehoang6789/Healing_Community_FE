"use client";

import React, { useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";

type TooltipPosition = "top" | "bottom" | "left" | "right";

interface AnimatedTooltipProps {
  children: React.ReactNode;
  content: string;
  position?: TooltipPosition; // Optional position prop
}

export const AnimatedTooltip = ({
  children,
  content,
  position = "bottom", // Default position is bottom
}: AnimatedTooltipProps) => {
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

  // Adjusted Tooltip Position to move it completely above or below the hovered item
  const getTooltipPositionStyles = (position: TooltipPosition) => {
    const tooltipOffset = 10; // space between item and tooltip
    switch (position) {
      case "top":
        return {
          bottom: `calc(100% + ${tooltipOffset}px)`, // Move tooltip above item
          left: "50%",
          transform: "translateX(-50%)",
        };
      case "bottom":
        return {
          top: `calc(100% + ${tooltipOffset}px)`, // Move tooltip below item
          left: "-25%",
          transform: "translateX(30%)",
        };
      case "left":
        return {
          right: `calc(100% + ${tooltipOffset}px)`, // Move tooltip to the left of the item
          top: "50%",
          transform: "translateY(-50%)",
        };
      case "right":
        return {
          left: `calc(100% + ${tooltipOffset}px)`, // Move tooltip to the right of the item
          top: "50%",
          transform: "translateY(-50%)",
        };
      default:
        return {
          top: `calc(100% + ${tooltipOffset}px)`, // Default to bottom
          left: "-25%",
          transform: "translateX(30%)",
        };
    }
  };

  const tooltipStyles = getTooltipPositionStyles(position);

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
              position: "absolute",
              ...tooltipStyles,
              rotate: rotate,
              whiteSpace: "nowrap",
            }}
            className="flex text-xs flex-col items-center justify-center rounded-md bg-[#212f3d] z-50 shadow-xl px-4 py-2"
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
