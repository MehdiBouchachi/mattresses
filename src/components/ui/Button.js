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
    "inline-flex items-center justify-center font-medium transition-all duration-300 disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed active:scale-[0.98]";

  /* =========================
     RESPONSIVE SIZE SYSTEM
  ========================== */

  const sizes = {
    sm: `
      px-3 py-1.5
      text-[11px]
      sm:px-4 sm:py-2 sm:text-xs
      md:px-5 md:py-2 md:text-sm
      rounded-full
    `,
    md: `
      px-4 py-2
      text-xs
      sm:px-5 sm:py-2.5 sm:text-sm
      md:px-6 md:py-3 md:text-base
      rounded-full
    `,
    lg: `
      px-5 py-2.5
      text-sm
      sm:px-7 sm:py-3 sm:text-base
      md:px-8 md:py-4 md:text-lg
      rounded-full
    `,
  };

  /* =========================
     VARIANTS (unchanged design)
  ========================== */

  const variants = {
    primary: "bg-blue-900 text-white shadow-md hover:bg-blue-950",

    secondary: "border border-blue-600/30 text-blue-800 hover:bg-blue-50",
    secondaryHero:
      "border border-blue-50/30 text-blue-50 hover:bg-blue-50/10 hover:border-blue-50/50 hover:text-blue-50",

    gold: "bg-amber-500 text-white shadow-md hover:bg-amber-600",

    accent: "bg-red-600 text-white shadow-md hover:bg-red-700",

    cta: "bg-blue-900 text-white shadow-lg hover:bg-blue-950 rounded-xl",

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
