"use client";

import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiInstagram,
  FiFacebook,
} from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function Footer() {
  const params = useParams();
  const locale = params?.locale || "en";

  return (
    <footer className="bg-beige-200 border-t border-primary-600/10">
      {/* ================= MAIN GRID ================= */}
      <div className="max-w-7xl mx-auto px-8 py-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-20 gap-y-20">
          {/* ===== BRAND ===== */}
          <div className="flex flex-col gap-10">
            <Image
              src="/images/logo.webp"
              alt="LITMAD Logo"
              width={170}
              height={70}
              className="object-contain"
            />

            <p className="text-text-body leading-relaxed max-w-xs">
              Premium mattress manufacturing focused on durability, precision,
              and long-term comfort engineered for restorative sleep.
            </p>

            <div className="flex items-center gap-5 pt-2">
              <a
                className="w-10 h-10 rounded-full bg-primary-50 
              flex items-center justify-center 
              text-primary-600 
              hover:bg-primary-600 hover:text-white 
              transition duration-300 cursor-pointer"
              >
                <FiInstagram size={18} />
              </a>

              <a
                className="w-10 h-10 rounded-full bg-primary-50 
              flex items-center justify-center 
              text-primary-600 
              hover:bg-primary-600 hover:text-white 
              transition duration-300 cursor-pointer"
              >
                <FiFacebook size={18} />
              </a>
            </div>
          </div>

          {/* ===== SHOP ===== */}
          <div className="flex flex-col gap-10">
            <h4 className="text-sm font-semibold tracking-wide text-text-heading">
              Shop
            </h4>

            <ul className="space-y-6 text-text-body">
              <li>
                <Link
                  href={`/${locale}/mattresses`}
                  className="hover:text-primary-600 transition"
                >
                  All Mattresses
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}#collections`}
                  className="hover:text-primary-600 transition"
                >
                  Collections
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/track-order`}
                  className="hover:text-primary-600 transition"
                >
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* ===== COMPANY ===== */}
          <div className="flex flex-col gap-10">
            <h4 className="text-sm font-semibold tracking-wide text-text-heading">
              Company
            </h4>

            <ul className="space-y-6 text-text-body">
              <li>
                <Link
                  href={`/${locale}`}
                  className="hover:text-primary-600 transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/about`}
                  className="hover:text-primary-600 transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/contact`}
                  className="hover:text-primary-600 transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* ===== CONTACT ===== */}
          <div className="flex flex-col gap-10">
            <h4 className="text-sm font-semibold tracking-wide text-text-heading">
              Contact
            </h4>

            <div className="space-y-6 text-text-body">
              <div className="flex items-start gap-4">
                <FiPhone className="text-primary-600 mt-1" />
                <span>+213 000 000 000</span>
              </div>

              <div className="flex items-start gap-4">
                <FiMail className="text-primary-600 mt-1" />
                <span>contact@litmad.com</span>
              </div>

              <div className="flex items-start gap-4">
                <FiMapPin className="text-primary-600 mt-1" />
                <span>Algiers, Algeria</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="bg-primary-600 text-primary-50">
        <div
          className="max-w-7xl mx-auto px-8 py-8 
        flex flex-col md:flex-row 
        items-center justify-between gap-6 text-sm"
        >
          <p>© {new Date().getFullYear()} LITMAD. All rights reserved.</p>

          <div className="flex items-center gap-10">
            <Link
              href={`/${locale}/privacy`}
              className="hover:text-white/80 transition"
            >
              Privacy Policy
            </Link>
            <Link
              href={`/${locale}/terms`}
              className="hover:text-white/80 transition"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
