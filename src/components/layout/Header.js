"use client";

import { useSelector } from "react-redux";
import { selectCartCount } from "@/store/slices/cartSlice";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiShoppingCart, FiChevronDown } from "react-icons/fi";
import Image from "next/image";
import Button from "../ui/Button";

const languages = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "ar", label: "العربية" },
];

export default function Header() {
  const count = useSelector(selectCartCount);
  const router = useRouter();
  const pathname = usePathname();

  const locale = pathname.split("/")[1] || "en";

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const switchLanguage = (newLocale) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
    setOpen(false);
  };

  const currentLanguage =
    languages.find((lng) => lng.code === locale)?.label || "English";

  return (
    <header
      dir="ltr"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-lg shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
        {/* LOGO */}
        <div
          onClick={() => router.push(`/${locale}`)}
          className="cursor-pointer flex items-center"
        >
          <Image
            src="/images/logo.webp"
            alt="Litmad"
            width={150}
            height={45}
            priority
            className="object-contain"
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-8 relative">
          {/* LANGUAGE DROPDOWN */}
          <div className="relative">
            <Button
              variant="secondary"
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 text-sm font-medium 
                         border transition
                         "
            >
              {currentLanguage}
              <FiChevronDown
                className={`transition-transform ${open ? "rotate-180" : ""}`}
              />
            </Button>

            {open && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-beige-600 rounded-xl shadow-lg overflow-hidden">
                {languages.map((lng) => (
                  <button
                    key={lng.code}
                    onClick={() => switchLanguage(lng.code)}
                    className={`w-full text-left px-4 py-3 text-sm hover:bg-beige-300 transition ${
                      locale === lng.code
                        ? "bg-primary-50 text-primary-600 font-medium"
                        : ""
                    }`}
                  >
                    {lng.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* SHOP BUTTON */}
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
                           bg-primary-600 text-primary-50 
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
