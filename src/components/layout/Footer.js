"use client";

export default function Footer() {
  return (
    <footer className="border-t border-[#E5DDD2] py-16 text-center text-sm text-[#7A7A7A] bg-white">
      © {new Date().getFullYear()} Litmad. All rights reserved.
    </footer>
  );
}
