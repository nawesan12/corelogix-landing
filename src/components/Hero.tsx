"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const baseY = useTransform(scrollYProgress, [0, 1], [-20, 40]);
  const overlayY = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const overlayScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <motion.div
      ref={ref}
      className="relative mx-auto flex max-w-7xl flex-col items-center"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 h-[480px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(0,123,211,0.2),_transparent_70%)] blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, scale: [0.9, 1, 0.95, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div style={{ y: baseY }} className="w-full mx-auto">
        <Image src="/hero1.png" alt="Grow ERP" width={1000} height={1000} />
      </motion.div>
      <motion.div
        style={{ y: overlayY, scale: overlayScale }}
        className="relative -top-80 drop-shadow-2xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
      >
        <Image
          src="/hero2.png"
          alt="Grow ERP"
          width={700}
          height={700}
          priority
        />
      </motion.div>
    </motion.div>
  );
}
