"use client";

import Link from "next/link";
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
    { href: "#", label: "Soluciones" },
    { href: "/planes", label: "Planes" },
    { href: "#", label: "Testimonios" },
    { href: "/sobre", label: "Sobre" },
  ];

  return (
    <header className="">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Left: Logo */}
          <div className="md:flex md:items-center md:gap-12">
            <Link className="" href="/">
              <Image
                src="/iso-grow.png"
                alt="Grow ERP"
                height={200}
                width={200}
                className="h-8 aspect-auto object-contain"
              />
            </Link>
          </div>

          {/* Center: Desktop Nav */}
          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-gray-800 text-lg font-medium transition hover:text-gray-500/75"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Right: Auth + Mobile Trigger */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex sm:gap-4">
              <Button variant={"secondary"} className="rounded-full" asChild>
                <Link href="#">Acceder</Link>
              </Button>

              <Button asChild className="bg-[#007BD3] rounded-full">
                <Link href="#">Agendar una demo</Link>
              </Button>
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
                      <Button
                        asChild
                        className="bg-teal-600 hover:bg-teal-600/90 text-white"
                      >
                        <Link href="#">Login</Link>
                      </Button>
                      <Button
                        asChild
                        variant="secondary"
                        className="bg-gray-100 text-teal-600 hover:bg-gray-200"
                      >
                        <Link href="#">Register</Link>
                      </Button>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
