"use client";

import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#E5DDD2] pt-20">
      {/* ================= MAIN FOOTER GRID ================= */}
      <div className="max-w-7xl mx-auto px-8 pb-16 grid md:grid-cols-4 gap-12">
        {/* BRAND */}
        <div className="space-y-5">
          <h3 className="text-2xl font-semibold text-[#1C1C1C]">LITMAD</h3>

          <p className="text-sm text-[#7A7A7A] leading-relaxed max-w-xs">
            Precision-crafted mattresses designed for restorative comfort and
            long-term durability.
          </p>
        </div>

        {/* SHOP */}
        <div>
          <h4 className="font-semibold mb-6 text-[#1C1C1C]">Shop</h4>

          <ul className="space-y-3 text-sm text-[#7A7A7A]">
            <li>
              <Link href="en/mattresses">Mattresses</Link>
            </li>
            <li>
              <Link href="en#collections">Collections</Link>
            </li>
            <li>
              <Link href="/offers">Special Offers</Link>
            </li>
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h4 className="font-semibold mb-6 text-[#1C1C1C]">Company</h4>

          <ul className="space-y-3 text-sm text-[#7A7A7A]">
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="en/contact">Contact</Link>
            </li>
            <li>
              <Link href="/delivery">Delivery</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy Policy</Link>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="font-semibold mb-6 text-[#1C1C1C]">Contact</h4>

          <div className="space-y-4 text-sm text-[#7A7A7A]">
            <div className="flex items-center gap-3">
              <FiPhone className="text-[#2B2D6E]" />
              <span>+213 000 000 000</span>
            </div>

            <div className="flex items-center gap-3">
              <FiMail className="text-[#2B2D6E]" />
              <span>contact@litmad.com</span>
            </div>

            <div className="flex items-center gap-3">
              <FiMapPin className="text-[#2B2D6E]" />
              <span>Algiers, Algeria</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM STRIP ================= */}
      <div className="border-t border-[#E5DDD2] py-8 text-center text-sm text-[#8A857D]">
        © {new Date().getFullYear()} Litmad. All rights reserved.
      </div>
    </footer>
  );
}
