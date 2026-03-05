"use client";

import { useSelector } from "react-redux";
import { selectCartCount } from "@/store/slices/cartSlice";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FiShoppingCart,
  FiChevronDown,
  FiMenu,
  FiX,
  FiHome,
  FiGrid,
  FiTruck,
} from "react-icons/fi";
import Image from "next/image";
import Button from "../ui/Button";
import Link from "next/link";

const languages = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "ar", label: "العربية" },
];

export default function Header({ translation }) {
  const count = useSelector(selectCartCount);
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";
  const isRTL = locale === "ar";
  const [isAtTop, setIsAtTop] = useState(true);
  const [openLang, setOpenLang] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const isHomePage = pathname === `/${locale}`;
  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      const atTop = window.scrollY < 80;
      setIsAtTop((prev) => (prev === atTop ? prev : atTop));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);
  const switchLanguage = (newLocale) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
    setOpenLang(false);
    setOpenMenu(false);
  };

  const {
    header: { shopNow, menu, navigation, language, bottomNav },
  } = translation || {};

  const isActive = (path) => pathname.includes(path);

  /* =========================================================
     HEADER
  ========================================================= */

  return (
    <>
      <header
        dir="ltr"
        className={`
    fixed top-0 left-0 w-full z-50
    transition-all duration-300 ease-in-out
  
    ${
      isAtTop
        ? "bg-transparent border-transparent"
        : "bg-white/90 backdrop-blur-xl border-b border-blue-100 shadow-sm"
    }
  `}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3 flex items-center justify-between">
          {/* LOGO */}
          <div
            onClick={() => router.push(`/${locale}`)}
            className="cursor-pointer h-14 lg:h-16 flex items-center transition-transform duration-300 hover:scale-105"
          >
            <Image
              src={
                isAtTop && isHomePage
                  ? "/images/logo-light.webp"
                  : "/images/logo.webp"
              }
              alt="Empreinte Flex"
              width={220}
              height={90}
              className="h-full w-auto object-contain"
              priority
            />
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => router.push(`/${locale}/track-order`)}
              className={`text-sm   transition   ${
                isAtTop && isHomePage
                  ? "text-white hover:text-slate-300"
                  : "hover:text-blue-950 text-slate-600"
              }`}
            >
              {navigation.trackOrder}
            </button>

            {/* Language */}
            <div className="relative">
              <button
                onClick={() => setOpenLang(!openLang)}
                className={`flex items-center gap-2 text-sm px-4 py-2 rounded-xl border  transition ${
                  isAtTop && isHomePage
                    ? "border border-blue-50/30 text-blue-50 hover:bg-blue-50/10 hover:border-blue-50/50 hover:text-blue-50 "
                    : "border-slate-300 hover:bg-blue-50"
                }`}
              >
                {languages.find((l) => l.code === locale)?.label}
                <FiChevronDown
                  className={`transition-transform ${
                    openLang ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openLang && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-blue-100 rounded-xl shadow-lg overflow-hidden">
                  {languages.map((lng) => (
                    <button
                      key={lng.code}
                      onClick={() => switchLanguage(lng.code)}
                      className={`w-full px-4 py-3 text-sm text-start ${
                        locale === lng.code
                          ? "bg-blue-50 text-blue-900 font-medium"
                          : "hover:bg-blue-100"
                      }`}
                    >
                      {lng.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Button
              size="sm"
              variant="primary"
              onClick={() => router.push(`/${locale}/mattresses`)}
            >
              {shopNow}
            </Button>

            <Button
              size="sm"
              variant={isAtTop && isHomePage ? "secondaryHero" : "secondary"}
              className="relative p-3"
              onClick={() => router.push(`/${locale}/cart`)}
            >
              <FiShoppingCart className="text-lg" />

              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-900 text-blue-50 text-[10px] px-2 py-0.5 rounded-full font-medium">
                  {count}
                </span>
              )}
            </Button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className={`md:hidden w-10 h-10 rounded-xl border  flex items-center justify-center ${isAtTop && isHomePage ? " border-blue-50/30 text-blue-50 hover:bg-blue-50/10 hover:border-blue-50/50 hover:text-blue-50 " : "text-slate-600 border-slate-200 hover:text-blue-950"}`}
            onClick={() => setOpenMenu(true)}
          >
            <FiMenu size={20} />
          </button>
        </div>
      </header>

      {/* =========================================================
         MOBILE DRAWER
      ========================================================= */}

      <div
        className={`fixed inset-0 z-50 ${openMenu ? "visible" : "invisible"}`}
      >
        <div
          className={`absolute inset-0 bg-black/40 ${
            openMenu ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpenMenu(false)}
        />

        <div
          dir={isRTL ? "rtl" : "ltr"}
          className={`absolute top-0 h-full w-72 bg-white shadow-2xl p-6 transform transition-transform duration-300 ${
            openMenu
              ? "translate-x-0"
              : isRTL
                ? "translate-x-full"
                : "-translate-x-full"
          } ${isRTL ? "right-0" : "left-0"}`}
        >
          <div className="flex justify-between items-center mb-8">
            <span className="font-semibold text-lg">{menu}</span>
            <button onClick={() => setOpenMenu(false)}>
              <FiX size={22} />
            </button>
          </div>

          <nav className="flex flex-col gap-6 text-base mb-10">
            <DrawerItem
              active={pathname === `/${locale}`}
              onClick={() => router.push(`/${locale}`)}
              isRTL={isRTL}
            >
              {navigation.home}
            </DrawerItem>

            <DrawerItem
              active={pathname.includes("mattresses")}
              onClick={() => router.push(`/${locale}/mattresses`)}
              isRTL={isRTL}
            >
              {navigation.collection}
            </DrawerItem>

            <DrawerItem
              active={pathname.includes("about")}
              onClick={() => router.push(`/${locale}/about`)}
              isRTL={isRTL}
            >
              {navigation.about}
            </DrawerItem>

            <DrawerItem
              active={pathname.includes("contact")}
              onClick={() => router.push(`/${locale}/contact`)}
              isRTL={isRTL}
            >
              {navigation.contact}
            </DrawerItem>
            <DrawerItem
              active={pathname.includes("track-order")}
              onClick={() => router.push(`/${locale}/track-order`)}
            >
              {navigation.trackOrder}
            </DrawerItem>
          </nav>

          {/* Language */}
          <div className="mt-auto pt-6 border-t border-blue-100">
            <p className="text-xs mb-4 text-slate-500">{language}</p>

            <div className="flex flex-col gap-3">
              {languages.map((lng) => (
                <button
                  key={lng.code}
                  onClick={() => switchLanguage(lng.code)}
                  className={`text-sm px-3 py-2 rounded-lg ${
                    locale === lng.code
                      ? "bg-blue-50 text-blue-900 font-medium"
                      : "hover:bg-blue-100"
                  }`}
                >
                  {lng.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
         IMPROVED BOTTOM NAV
      ========================================================= */}
      <div
        dir={isRTL ? "rtl" : "ltr"}
        className={`fixed bottom-0 left-0 w-full md:hidden z-40 transition-all duration-300
  ${
    isAtTop && isHomePage
      ? "bg-slate-50/10 backdrop-blur-xs  border-t border-slate-50/20"
      : "bg-white border-t border-blue-100"
  }`}
      >
        <div className="flex justify-around py-2">
          <Link href={`/${locale}`}>
            <NavItem
              hero={isAtTop && isHomePage}
              active={pathname === `/${locale}`}
              icon={<FiHome />}
              label={bottomNav.home}
            />
          </Link>
          <Link href={`/${locale}/mattresses`}>
            <NavItem
              hero={isAtTop && isHomePage}
              active={isActive("mattresses")}
              icon={<FiGrid />}
              label={bottomNav.shop}
            />
          </Link>
          <Link href={`/${locale}/track-order`}>
            <NavItem
              hero={isAtTop && isHomePage}
              active={isActive("track-order")}
              icon={<FiTruck />}
              label={bottomNav.track}
            />
          </Link>

          <Link href={`/${locale}/cart`}>
            <NavItem
              hero={isAtTop && isHomePage}
              active={isActive("cart")}
              icon={<FiShoppingCart />}
              label={bottomNav.cart}
              badge={count}
            />
          </Link>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   IMPROVED NAV ITEM
========================================================= */

function NavItem({ icon, label, onClick, badge, active, hero }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center text-xs relative"
    >
      <div
        className={`relative w-10 h-10 flex items-center justify-center rounded-full transition-all ${
          active
            ? "bg-blue-900 text-blue-50 shadow-md"
            : hero
              ? "text-white"
              : "text-slate-600"
        }`}
      >
        {icon}

        {badge > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] px-1.5 rounded-full">
            {badge}
          </span>
        )}
      </div>

      <span
        className={`mt-1 ${
          active
            ? "text-blue-900 font-medium"
            : hero
              ? "text-white/80"
              : "text-slate-600"
        }`}
      >
        {label}
      </span>
    </button>
  );
}

function DrawerItem({ children, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className={`text-base ${
        active ? "text-blue-900 font-medium" : "text-slate-600"
      }`}
    >
      {children}
    </button>
  );
}
