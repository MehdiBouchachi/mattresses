"use client";

import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiInstagram,
  FiFacebook,
} from "react-icons/fi";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Footer() {
  const params = useParams();
  const locale = params?.locale || "en";

  return (
    <footer className="relative bg-beige-300 border-t border-beige-700 pt-28 shadow-[0_-20px_60px_rgba(0,0,0,0.05)]">
      {/* Top separator glow */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-primary-600/10" />

      <div className="max-w-7xl mx-auto px-8 pb-24 grid md:grid-cols-4 gap-20">
        {/* BRAND */}
        <div className="space-y-7">
          <h3 className="text-3xl font-semibold tracking-tight text-text-primary">
            LITMAD
          </h3>

          <p className="text-sm leading-relaxed text-text-body max-w-xs">
            Precision-crafted mattresses designed for restorative comfort,
            structured support, and long-term durability.
          </p>

          <div className="flex gap-5 pt-3">
            <FiInstagram className="text-primary-600 hover:text-primary-500 hover:scale-110 transition duration-300 cursor-pointer" />
            <FiFacebook className="text-primary-600 hover:text-primary-500 hover:scale-110 transition duration-300 cursor-pointer" />
          </div>
        </div>

        {/* SHOP */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] mb-8 text-text-muted">
            Shop
          </h4>

          <ul className="space-y-5 text-sm text-text-body">
            <li>
              <Link
                href={`/${locale}/mattresses`}
                className="hover:text-primary-600 transition"
              >
                Mattresses
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
                href={`/${locale}/cart`}
                className="hover:text-primary-600 transition"
              >
                Cart
              </Link>
            </li>
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] mb-8 text-text-muted">
            Company
          </h4>

          <ul className="space-y-5 text-sm text-text-body">
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
                href={`/${locale}/contact`}
                className="hover:text-primary-600 transition"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/checkout`}
                className="hover:text-primary-600 transition"
              >
                Checkout
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] mb-8 text-text-muted">
            Contact
          </h4>

          <div className="space-y-6 text-sm text-text-body">
            <div className="flex items-center gap-4">
              <FiPhone className="text-primary-600" />
              <span>+213 000 000 000</span>
            </div>

            <div className="flex items-center gap-4">
              <FiMail className="text-primary-600" />
              <span>contact@litmad.com</span>
            </div>

            <div className="flex items-center gap-4">
              <FiMapPin className="text-primary-600" />
              <span>Algiers, Algeria</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-beige-700/60 py-12">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-text-soft">
          <p>© {new Date().getFullYear()} Litmad. All rights reserved.</p>

          <div className="flex gap-10">
            <Link
              href={`/${locale}/privacy`}
              className="hover:text-primary-600 transition"
            >
              Privacy
            </Link>
            <Link
              href={`/${locale}/terms`}
              className="hover:text-primary-600 transition"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
