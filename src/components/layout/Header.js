"use client";

import { useSelector } from "react-redux";
import { selectCartCount } from "@/store/slices/cartSlice";
import { usePathname } from "next/navigation";
import { useEffect, useState, memo } from "react";
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
import Link from "next/link";
import Button from "../ui/Button";

const languages = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "ar", label: "العربية" },
];

export default function Header({ translation }) {
  const count = useSelector(selectCartCount);
  const pathname = usePathname();

  const locale = pathname.split("/")[1] || "en";
  const isRTL = locale === "ar";

  const [isAtTop, setIsAtTop] = useState(true);
  const [openLang, setOpenLang] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const isHomePage = pathname === `/${locale}`;

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 80);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const {
    header: { shopNow, menu, navigation, language, bottomNav },
  } = translation || {};

  const isActive = (path) => pathname.includes(path);
  const switchLocalePath = (lng) => {
    const segments = pathname.split("/");
    segments[1] = lng; // replace locale segment
    return segments.join("/");
  };
  return (
    <>
      {/* ================= HEADER ================= */}

      <header
        dir="ltr"
        className={`
        fixed top-0 left-0 w-full z-50
        transition-all duration-300
        ${
          isAtTop
            ? "bg-transparent border-transparent"
            : "bg-white/90 backdrop-blur-xl border-b border-blue-100 shadow-sm"
        }
        `}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3 flex items-center justify-between">
          {/* Logo */}

          <Link
            href={`/${locale}`}
            className="cursor-pointer h-14 lg:h-16 flex items-center transition-transform hover:scale-105"
          >
            <Image
              src="/images/logo.webp"
              alt="Empreinte Flex"
              width={220}
              height={90}
              className="h-full w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav */}

          <div className="hidden md:flex items-center gap-6">
            <Link
              href={`/${locale}/track-order`}
              className={`text-sm transition ${
                isAtTop && isHomePage
                  ? "text-white hover:text-slate-300"
                  : "text-slate-600 hover:text-blue-950"
              }`}
            >
              {navigation.trackOrder}
            </Link>

            {/* Language */}

            <div className="relative">
              <button
                onClick={() => setOpenLang(!openLang)}
                className={`flex items-center gap-2 text-sm px-4 py-2 rounded-xl border transition ${
                  isAtTop && isHomePage
                    ? "border-blue-50/30 text-blue-50 hover:bg-blue-50/10"
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
                    <Link
                      onClick={() => setOpenLang(false)}
                      key={lng.code}
                      href={switchLocalePath(lng.code)}
                      className={`block px-4 py-3 text-sm ${
                        locale === lng.code
                          ? "bg-blue-50 text-blue-900 font-medium"
                          : "hover:bg-blue-100"
                      }`}
                    >
                      {lng.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href={`/${locale}/mattresses`}>
              <Button size="sm" variant="primary">
                {shopNow}
              </Button>
            </Link>

            <Link href={`/${locale}/cart`}>
              <Button
                size="sm"
                variant={isAtTop && isHomePage ? "secondaryHero" : "secondary"}
                className="relative p-3"
              >
                <FiShoppingCart className="text-lg" />

                {count > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-900 text-blue-50 text-[10px] px-2 py-0.5 rounded-full">
                    {count}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}

          <button
            className={`md:hidden w-10 h-10 rounded-xl border flex items-center justify-center ${
              isAtTop && isHomePage
                ? "border-blue-50/30 text-blue-50"
                : "border-slate-200 text-slate-600"
            }`}
            onClick={() => setOpenMenu(true)}
          >
            <FiMenu size={20} />
          </button>
        </div>
      </header>

      {/* ================= MOBILE DRAWER ================= */}

      <div
        className={`fixed inset-0 z-50 ${
          openMenu ? "visible" : "invisible"
        } md:hidden`}
      >
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${
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
            <DrawerItem href={`/${locale}`} active={pathname === `/${locale}`}>
              {navigation.home}
            </DrawerItem>

            <DrawerItem
              href={`/${locale}/mattresses`}
              active={pathname.includes("mattresses")}
            >
              {navigation.collection}
            </DrawerItem>

            <DrawerItem
              href={`/${locale}/about`}
              active={pathname.includes("about")}
            >
              {navigation.about}
            </DrawerItem>

            <DrawerItem
              href={`/${locale}/contact`}
              active={pathname.includes("contact")}
            >
              {navigation.contact}
            </DrawerItem>

            <DrawerItem
              href={`/${locale}/track-order`}
              active={pathname.includes("track-order")}
            >
              {navigation.trackOrder}
            </DrawerItem>
          </nav>

          <div className="mt-auto pt-6 border-t border-blue-100">
            <p className="text-xs mb-4 text-slate-500">{language}</p>

            <div className="flex flex-col gap-3">
              {languages.map((lng) => (
                <Link
                  key={lng.code}
                  href={switchLocalePath(lng.code)}
                  className={`text-sm px-3 py-2 rounded-lg ${
                    locale === lng.code
                      ? "bg-blue-50 text-blue-900 font-medium"
                      : "hover:bg-blue-100"
                  }`}
                >
                  {lng.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================= MOBILE BOTTOM NAV ================= */}

      <div
        dir={isRTL ? "rtl" : "ltr"}
        className="fixed bottom-0 left-0 w-full bg-white border-t border-blue-100 md:hidden z-40"
      >
        <div className="flex justify-around py-2">
          <NavItem
            active={pathname === `/${locale}`}
            icon={<FiHome />}
            label={bottomNav.home}
            href={`/${locale}`}
          />

          <NavItem
            active={isActive("mattresses")}
            icon={<FiGrid />}
            label={bottomNav.shop}
            href={`/${locale}/mattresses`}
          />

          <NavItem
            active={isActive("track-order")}
            icon={<FiTruck />}
            label={bottomNav.track}
            href={`/${locale}/track-order`}
          />

          <NavItem
            active={isActive("cart")}
            icon={<FiShoppingCart />}
            label={bottomNav.cart}
            href={`/${locale}/cart`}
            badge={count}
          />
        </div>
      </div>
    </>
  );
}

/* ================= NAV ITEM ================= */

const NavItem = memo(function NavItem({ icon, label, href, badge, active }) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center text-xs relative active:scale-95 transition"
    >
      <div
        className={`relative w-10 h-10 flex items-center justify-center rounded-full transition-all ${
          active ? "bg-blue-900 text-blue-50 shadow-md" : "text-slate-600"
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
          active ? "text-blue-900 font-medium" : "text-slate-600"
        }`}
      >
        {label}
      </span>
    </Link>
  );
});

/* ================= DRAWER ITEM ================= */

function DrawerItem({ children, href, active }) {
  return (
    <Link
      href={href}
      className={`text-base ${
        active ? "text-blue-900 font-medium" : "text-slate-600"
      }`}
    >
      {children}
    </Link>
  );
}
