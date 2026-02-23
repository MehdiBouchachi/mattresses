"use client";

import { useSelector } from "react-redux";
import { selectCartCount } from "@/store/slices/cartSlice";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import Button from "../ui/Button";

export default function Header() {
  const count = useSelector(selectCartCount);
  const router = useRouter();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);

  const locale = pathname.split("/")[1];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
        {/* LOGO */}
        <h1
          onClick={() => router.push(`/${locale}`)}
          className="text-3xl font-semibold tracking-[0.12em] cursor-pointer"
        >
          LITMAD
        </h1>

        {/* NAV */}
        <div className="flex items-center gap-5">
          <Button
            variant="primary"
            size="md"
            onClick={() => router.push(`/${locale}/mattresses`)}
          >
            Shop Now
          </Button>

          {/* CART */}
          <Button
            variant="secondary"
            className="relative p-3"
            onClick={() => router.push(`/${locale}/cart`)}
          >
            <FiShoppingCart className="text-lg" />

            {count > 0 && (
              <span
                className="absolute -top-2 -right-2 
                           bg-[#2B2D6E] text-white 
                           text-[10px] px-2 py-[2px] 
                           rounded-full font-medium"
              >
                {count}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
