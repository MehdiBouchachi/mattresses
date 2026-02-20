"use client";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
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
    primary: "bg-[#2B2D6E] text-white shadow-md hover:shadow-xl",
    secondary: "border border-[#2B2D6E]/30 text-[#2B2D6E] hover:bg-[#2B2D6E]/5",
    gold: "bg-[#C6A75E] text-white shadow-md hover:shadow-xl",
  };

  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
