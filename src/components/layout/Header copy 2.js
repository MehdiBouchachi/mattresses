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
} from "react-icons/fi";
import Image from "next/image";
import Button from "../ui/Button";

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

  const [scrolled, setScrolled] = useState(false);
  const [openLang, setOpenLang] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  return (
    <>
      {/* ================= HEADER ================= */}
      <header
        dir={isRTL ? "rtl" : "ltr"}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white/80 backdrop-blur-xl shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* LOGO */}
          <div
            onClick={() => router.push(`/${locale}`)}
            className="cursor-pointer"
          >
            <Image
              src="/images/logo.webp"
              alt="Litmad"
              width={130}
              height={40}
              priority
            />
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-6">
            {/* Language */}
            <div className="relative">
              <button
                onClick={() => setOpenLang(!openLang)}
                className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl border border-beige-600 hover:bg-beige-100 transition"
              >
                {languages.find((l) => l.code === locale)?.label}
                <FiChevronDown
                  className={`transition-transform ${
                    openLang ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openLang && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-beige-500 rounded-xl shadow-lg overflow-hidden">
                  {languages.map((lng) => (
                    <button
                      key={lng.code}
                      onClick={() => switchLanguage(lng.code)}
                      className={`w-full px-4 py-3 text-sm transition text-left ${
                        locale === lng.code
                          ? "bg-primary-50 text-primary-600 font-medium"
                          : "hover:bg-beige-100"
                      }`}
                    >
                      {lng.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Button
              variant="primary"
              onClick={() => router.push(`/${locale}/mattresses`)}
            >
              {shopNow}
            </Button>

            <button
              onClick={() => router.push(`/${locale}/cart`)}
              className="relative w-10 h-10 rounded-xl border border-beige-600 flex items-center justify-center hover:bg-beige-100 transition"
            >
              <FiShoppingCart size={18} />
              {count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-primary-600 text-white text-[10px] px-1.5 py-[1px] rounded-full shadow">
                  {count}
                </span>
              )}
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden w-10 h-10 rounded-xl border border-beige-600 flex items-center justify-center"
            onClick={() => setOpenMenu(true)}
          >
            <FiMenu size={20} />
          </button>
        </div>
      </header>

      {/* ================= MOBILE DRAWER ================= */}
      <div
        className={`fixed inset-0 z-50 transition ${
          openMenu ? "visible" : "invisible"
        }`}
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
          </nav>

          <div className="mt-auto pt-6 border-t border-beige-400">
            <p className="text-xs mb-4 text-text-subtle">{language}</p>

            <div className="flex flex-col gap-3">
              {languages.map((lng) => (
                <button
                  key={lng.code}
                  onClick={() => switchLanguage(lng.code)}
                  className={`text-sm px-3 py-2 rounded-lg transition ${
                    locale === lng.code
                      ? "bg-primary-50 text-primary-600 font-medium"
                      : "hover:bg-beige-100"
                  } ${isRTL ? "text-right" : "text-left"}`}
                >
                  {lng.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM NAV ================= */}
      <div
        dir={isRTL ? "rtl" : "ltr"}
        className="fixed bottom-0 left-0 w-full bg-white border-t border-beige-500 md:hidden z-40"
      >
        <div className="flex justify-around py-3">
          {isRTL ? (
            <>
              <NavItem
                active={isActive("cart")}
                icon={<FiShoppingCart />}
                label={bottomNav.cart}
                onClick={() => router.push(`/${locale}/cart`)}
                badge={count}
              />

              <NavItem
                active={isActive("mattresses")}
                icon={<FiGrid />}
                label={bottomNav.shop}
                onClick={() => router.push(`/${locale}/mattresses`)}
              />

              <NavItem
                active={pathname === `/${locale}`}
                icon={<FiHome />}
                label={bottomNav.home}
                onClick={() => router.push(`/${locale}`)}
              />
            </>
          ) : (
            <>
              <NavItem
                active={pathname === `/${locale}`}
                icon={<FiHome />}
                label={bottomNav.home}
                onClick={() => router.push(`/${locale}`)}
              />

              <NavItem
                active={isActive("mattresses")}
                icon={<FiGrid />}
                label={bottomNav.shop}
                onClick={() => router.push(`/${locale}/mattresses`)}
              />

              <NavItem
                active={isActive("cart")}
                icon={<FiShoppingCart />}
                label={bottomNav.cart}
                onClick={() => router.push(`/${locale}/cart`)}
                badge={count}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

/* ================= NAV ITEM ================= */

function NavItem({ icon, label, onClick, badge, active }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center text-xs relative transition ${
        active ? "text-primary-600" : "text-text-muted"
      }`}
    >
      <div className="relative text-lg">
        {icon}
        {badge > 0 && (
          <span className="absolute -top-2 -right-3 bg-primary-600 text-white text-[9px] px-1.5 rounded-full">
            {badge}
          </span>
        )}
      </div>
      <span className="mt-1">{label}</span>
    </button>
  );
}

function DrawerItem({ children, onClick, active, isRTL }) {
  return (
    <button
      onClick={onClick}
      className={`text-base transition ${
        active ? "text-primary-600 font-medium" : "text-text-body"
      } ${isRTL ? "text-right" : "text-left"}`}
    >
      {children}
    </button>
  );
}
