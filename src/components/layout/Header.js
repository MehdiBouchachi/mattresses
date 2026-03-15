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
import { motion, AnimatePresence } from "framer-motion";
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
    const handleScroll = () => setIsAtTop(window.scrollY < 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const {
    header: { shopNow, menu, navigation, language, bottomNav },
  } = translation || {};

  const isActive = (path) => pathname.includes(path);
  const switchLocalePath = (lng) => {
    const segments = pathname.split("/");
    segments[1] = lng;
    return segments.join("/");
  };

  /* ─── Animation variants ─── */
  const headerItems = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.1 + i * 0.08,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  const langDropdown = {
    hidden: { opacity: 0, y: -8, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.2, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -8,
      scale: 0.95,
      transition: { duration: 0.15 },
    },
  };

  const drawerOverlay = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const drawerPanel = {
    hidden: { x: isRTL ? "100%" : "-100%" },
    visible: {
      x: 0,
      transition: { type: "spring", damping: 28, stiffness: 300 },
    },
    exit: {
      x: isRTL ? "100%" : "-100%",
      transition: { duration: 0.25, ease: "easeIn" },
    },
  };

  const drawerItem = {
    hidden: { opacity: 0, x: isRTL ? 20 : -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.35, delay: 0.15 + i * 0.06, ease: "easeOut" },
    }),
  };

  return (
    <>
      {/* ================= HEADER ================= */}
      <motion.header
        dir="ltr"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        className={`
          fixed top-0 left-0 w-full z-50
          transition-all duration-500
          ${
            isAtTop
              ? "bg-transparent border-transparent"
              : "bg-white/90 backdrop-blur-xl border-b border-blue-100 shadow-sm"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            custom={0}
            variants={headerItems}
            initial="hidden"
            animate="visible"
          >
            <Link href={`/${locale}`}>
              <motion.div
                className="cursor-pointer h-14 lg:h-16 flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Image
                  src="/images/logo.webp"
                  alt="Empreinte Flex"
                  width={220}
                  height={90}
                  className="h-full w-auto object-contain"
                  priority
                />
              </motion.div>
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {/* Track Order */}
            <motion.div
              custom={1}
              variants={headerItems}
              initial="hidden"
              animate="visible"
            >
              <Link
                href={`/${locale}/track-order`}
                className={`relative text-sm transition group ${
                  isAtTop && isHomePage
                    ? "text-white hover:text-slate-300"
                    : "text-slate-600 hover:text-blue-950"
                }`}
              >
                {navigation.trackOrder}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-300 ${
                    isAtTop && isHomePage ? "bg-white/50" : "bg-blue-900/40"
                  }`}
                />
              </Link>
            </motion.div>

            {/* Language */}
            <motion.div
              custom={2}
              variants={headerItems}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setOpenLang(!openLang)}
                className={`flex items-center gap-2 text-sm px-4 py-2 rounded-xl border transition ${
                  isAtTop && isHomePage
                    ? "border-blue-50/30 text-blue-50 hover:bg-blue-50/10"
                    : "border-slate-300 hover:bg-blue-50"
                }`}
              >
                {languages.find((l) => l.code === locale)?.label}
                <motion.span
                  animate={{ rotate: openLang ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <FiChevronDown />
                </motion.span>
              </motion.button>

              <AnimatePresence>
                {openLang && (
                  <motion.div
                    variants={langDropdown}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute right-0 mt-2 w-44 bg-white border border-blue-100 rounded-xl shadow-lg overflow-hidden"
                  >
                    {languages.map((lng, i) => (
                      <motion.div
                        key={lng.code}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.2 }}
                      >
                        <Link
                          onClick={() => setOpenLang(false)}
                          href={switchLocalePath(lng.code)}
                          className={`block px-4 py-3 text-sm transition-colors duration-200 ${
                            locale === lng.code
                              ? "bg-blue-50 text-blue-900 font-medium"
                              : "hover:bg-blue-50"
                          }`}
                        >
                          {lng.label}
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Shop Button */}
            <motion.div
              custom={3}
              variants={headerItems}
              initial="hidden"
              animate="visible"
            >
              <Link href={`/${locale}/mattresses`}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="sm" variant="primary">
                    {shopNow}
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Cart Button */}
            <motion.div
              custom={4}
              variants={headerItems}
              initial="hidden"
              animate="visible"
            >
              <Link href={`/${locale}/cart`}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative"
                >
                  <Button
                    size="sm"
                    variant={
                      isAtTop && isHomePage ? "secondaryHero" : "secondary"
                    }
                    className="relative p-3"
                  >
                    <FiShoppingCart className="text-lg" />

                    <AnimatePresence>
                      {count > 0 && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 20,
                          }}
                          className="absolute -top-2 -right-2 bg-blue-900 text-blue-50 text-[10px] px-2 py-0.5 rounded-full"
                        >
                          {count}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <motion.button
            custom={1}
            variants={headerItems}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9, rotate: 90 }}
            className={`md:hidden w-10 h-10 rounded-xl border flex items-center justify-center ${
              isAtTop && isHomePage
                ? "border-blue-50/30 text-blue-50"
                : "border-slate-200 text-slate-600"
            }`}
            onClick={() => setOpenMenu(true)}
          >
            <FiMenu size={20} />
          </motion.button>
        </div>
      </motion.header>

      {/* ================= MOBILE DRAWER ================= */}
      <AnimatePresence>
        {openMenu && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Overlay */}
            <motion.div
              variants={drawerOverlay}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setOpenMenu(false)}
            />

            {/* Panel */}
            <motion.div
              variants={drawerPanel}
              initial="hidden"
              animate="visible"
              exit="exit"
              dir={isRTL ? "rtl" : "ltr"}
              className={`absolute top-0 h-full w-72 bg-white shadow-2xl p-6 ${
                isRTL ? "right-0" : "left-0"
              }`}
            >
              {/* Close */}
              <div className="flex justify-between items-center mb-8">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="font-semibold text-lg"
                >
                  {menu}
                </motion.span>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setOpenMenu(false)}
                >
                  <FiX size={22} />
                </motion.button>
              </div>

              {/* Nav Links */}
              <nav className="flex flex-col gap-6 text-base mb-10">
                {[
                  {
                    href: `/${locale}`,
                    active: pathname === `/${locale}`,
                    label: navigation.home,
                  },
                  {
                    href: `/${locale}/mattresses`,
                    active: pathname.includes("mattresses"),
                    label: navigation.collection,
                  },
                  {
                    href: `/${locale}/about`,
                    active: pathname.includes("about"),
                    label: navigation.about,
                  },
                  {
                    href: `/${locale}/contact`,
                    active: pathname.includes("contact"),
                    label: navigation.contact,
                  },
                  {
                    href: `/${locale}/track-order`,
                    active: pathname.includes("track-order"),
                    label: navigation.trackOrder,
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.href}
                    custom={i}
                    variants={drawerItem}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpenMenu(false)}
                      className={`relative text-base transition-colors duration-200 group ${
                        item.active
                          ? "text-blue-900 font-medium"
                          : "text-slate-600 hover:text-blue-900"
                      }`}
                    >
                      <span className="relative">
                        {item.label}
                        {item.active && (
                          <motion.span
                            layoutId="drawer-active"
                            className="absolute -bottom-1 left-0 right-0 h-[2px] bg-blue-900 rounded-full"
                          />
                        )}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Language */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-auto pt-6 border-t border-blue-100"
              >
                <p className="text-xs mb-4 text-slate-500">{language}</p>

                <div className="flex flex-col gap-3">
                  {languages.map((lng, i) => (
                    <motion.div
                      key={lng.code}
                      initial={{ opacity: 0, x: isRTL ? 15 : -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.55 + i * 0.07, duration: 0.3 }}
                    >
                      <Link
                        href={switchLocalePath(lng.code)}
                        onClick={() => setOpenMenu(false)}
                        className={`block text-sm px-3 py-2 rounded-lg transition-colors duration-200 ${
                          locale === lng.code
                            ? "bg-blue-50 text-blue-900 font-medium"
                            : "hover:bg-blue-50"
                        }`}
                      >
                        {lng.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= MOBILE BOTTOM NAV ================= */}
      <motion.div
        dir={isRTL ? "rtl" : "ltr"}
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
        className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-xl border-t border-blue-100 md:hidden z-40"
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
      </motion.div>
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
      <motion.div
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.85 }}
        className={`relative w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${
          active ? "bg-blue-900 text-blue-50 shadow-md" : "text-slate-600"
        }`}
      >
        <motion.div
          animate={active ? { scale: [1, 1.15, 1] } : {}}
          transition={{ duration: 0.4 }}
        >
          {icon}
        </motion.div>

        <AnimatePresence>
          {badge > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
              className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] px-1.5 rounded-full"
            >
              {badge}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      <span
        className={`mt-1 transition-colors duration-200 ${
          active ? "text-blue-900 font-medium" : "text-slate-600"
        }`}
      >
        {label}
      </span>
    </Link>
  );
});
