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
    "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed";

  const sizes = {
    sm: "px-5 py-2 text-xs sm:text-sm",
    md: "px-6 py-3 text-sm sm:text-base",
    lg: "px-8 py-4 text-base sm:text-lg",
  };

  const variants = {
    primary:
      "bg-primary-600 text-white shadow-md hover:shadow-xl hover:bg-primary-700",

    secondary:
      "border border-primary-600/30 text-primary-600 hover:bg-primary-600/5",

    gold: "bg-[#C6A75E] text-white shadow-md hover:shadow-xl",

    // 🔥 NEW CHECKOUT / CTA VARIANT
    cta: "bg-primary-600 text-white shadow-lg hover:shadow-2xl hover:bg-primary-700 rounded-xl",
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
