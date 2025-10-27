"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";

export default function Header() {
  const navItems = [
    { href: "/soluciones", label: "Soluciones" },
    { href: "/planes", label: "Planes" },
    { href: "/blog", label: "Blog" },
    { href: "/testimonios", label: "Testimonios" },
    { href: "/nosotros", label: "Nosotros" },
  ];

  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  return (
    <motion.header
      className="sticky top-0 z-50"
      animate={{
        backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
        backgroundColor: scrolled ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0)",
        boxShadow: scrolled ? "0 10px 30px -20px rgba(15,23,42,0.3)" : "0 0 0 rgba(0,0,0,0)",
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Left: Logo */}
          <div className="md:flex md:items-center md:gap-12">
            <Link className="" href="/">
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: "easeOut" }}>
                <Image
                  src="/iso-grow.png"
                  alt="Grow ERP"
                  height={200}
                  width={200}
                  className="h-8 aspect-auto object-contain"
                />
              </motion.div>
            </Link>
          </div>

          {/* Center: Desktop Nav */}
          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 * index }}
                    whileHover={{ y: -2 }}
                  >
                    <Link
                      href={item.href}
                      className="text-gray-800 text-lg font-medium transition hover:text-gray-500/75"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Right: Auth + Mobile Trigger */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex sm:gap-4">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button variant={"secondary"} className="rounded-full" asChild>
                  <Link href="#">Acceder</Link>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild className="bg-[#007BD3] rounded-full">
                  <Link href="/agendar-demo">Agendar una demo</Link>
                </Button>
              </motion.div>
            </div>

            {/* Mobile Menu */}
            <div className="block md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-sm bg-gray-100 text-gray-600 hover:bg-gray-200"
                    aria-label="Open menu"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </Button>
                </SheetTrigger>

                <SheetContent side="right" className="w-[300px] sm:w-[360px]">
                  <SheetHeader>
                    <SheetTitle className="text-left">Menu</SheetTitle>
                  </SheetHeader>

                  <nav className="mt-6">
                    <ul className="grid gap-3">
                      {navItems.map((item) => (
                        <li key={item.label}>
                          <Link
                            href={item.href}
                            className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <Button asChild variant="secondary">
                        <Link href="#">Acceder</Link>
                      </Button>
                      <Button
                        asChild
                        className="bg-[#007BD3] hover:bg-[#0b6dbd] text-white"
                      >
                        <Link href="/agendar-demo">Agendar una demo</Link>
                      </Button>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
