"use client";

import Link from "next/link";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  href,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300";

  const sizes = {
    sm: "px-6 py-2 text-sm",
    md: "px-8 py-3 text-sm",
    lg: "px-10 py-4 text-base",
  };

  const variants = {
    primary: "bg-primary-600 text-white shadow-md hover:shadow-xl",
    secondary:
      "border border-primary-600/30 text-primary-600 hover:bg-primary-600/5",
    gold: "bg-[#C6A75E] text-white shadow-md hover:shadow-xl",
  };

  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  // If href exists → render Link (anchor)
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  // Otherwise render button
  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
