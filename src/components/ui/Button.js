"use client";

import Link from "next/link";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  loadingLabel,
  className = "",
  href,
  disabled,
  ...props
}) {
  const base =
    "cursor-pointer inline-flex items-center justify-center font-medium transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed";

  const sizes = {
    sm: "px-5 py-2 text-xs sm:text-sm rounded-full",
    md: "px-6 py-3 text-sm sm:text-base rounded-full",
    lg: "px-8 py-4 text-base sm:text-lg rounded-full",
  };

  const variants = {
    // 🔵 PRIMARY (Main Brand Button)
    primary:
      "bg-blue-900 text-white shadow-lg shadow-blue-50 hover:bg-blue-900 hover:shadow-black-50",

    // ⚪ SECONDARY (Outline Clean)
    secondary: "border border-blue-600/30 text-blue-800 hover:bg-blue-50",

    // 🟡 GOLD (If you still need it)
    gold: "bg-amber-500 text-white shadow-md hover:bg-amber-600",

    // 🔴 ACCENT CTA (Use only when needed)
    accent: "bg-red-600 text-white shadow-lg shadow-red-200 hover:bg-red-700",
    cta: "bg-blue-900  text-white shadow-lg hover:shadow-2xl hover:bg-blue-950 rounded-xl",

    // 💎 SOFT BLUE (Optional Premium Style)
    soft: "bg-blue-50 text-blue-700 hover:bg-blue-100",
  };

  const widthClass = fullWidth ? "w-full" : "";

  const classes = `
    ${base}
    ${sizes[size]}
    ${variants[variant]}
    ${widthClass}
    ${className}
  `;

  const content = loading ? loadingLabel : children;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {content}
    </button>
  );
}
