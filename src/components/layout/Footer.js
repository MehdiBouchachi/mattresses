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

export default function Footer({ translation }) {
  const params = useParams();
  const locale = params?.local || "en";
  const {
    footer: {
      brandDescription,
      shop: shopLinks,
      company: companyLinks,
      contact: contactInfo,
      bottom: bottomInfo,
    },
  } = translation;
  return (
    <footer className="bg-white border-t border-beige-400">
      {/* ================= MAIN GRID ================= */}
      <div className="max-w-7xl mx-auto px-8 py-24">
        <div className="grid gap-16 lg:grid-cols-4 md:grid-cols-2">
          {/* ===== BRAND ===== */}
          <div className="flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <Image
                src="/images/logo.webp"
                alt="LITMAD Logo"
                width={170}
                height={70}
                className="object-contain"
              />

              <p className="text-text-body leading-relaxed max-w-sm">
                {brandDescription}
              </p>
            </div>

            {/* Social */}
            <div className="flex items-center gap-6 pt-2">
              <a
                className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center 
              text-primary-600 hover:bg-primary-600 hover:text-white 
              transition duration-300"
              >
                <FiInstagram size={18} />
              </a>

              <a
                className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center 
              text-primary-600 hover:bg-primary-600 hover:text-white 
              transition duration-300"
              >
                <FiFacebook size={18} />
              </a>
            </div>
          </div>

          {/* ===== SHOP ===== */}
          <div>
            <h4 className="text-sm font-semibold mb-8 text-text-heading tracking-wide">
              {shopLinks.title}
            </h4>

            <ul className="space-y-4 text-text-body">
              <li>
                <Link
                  href={`/${locale}/mattresses`}
                  className="hover:text-primary-600 transition"
                >
                  {shopLinks.allMattresses}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}#collections`}
                  className="hover:text-primary-600 transition"
                >
                  {shopLinks.collections}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/track-order`}
                  className="hover:text-primary-600 transition"
                >
                  {shopLinks.trackOrder}
                </Link>
              </li>
            </ul>
          </div>

          {/* ===== COMPANY ===== */}
          <div>
            <h4 className="text-sm font-semibold mb-8 text-text-heading tracking-wide">
              {companyLinks.title}
            </h4>

            <ul className="space-y-4 text-text-body">
              <li>
                <Link
                  href={`/${locale}`}
                  className="hover:text-primary-600 transition"
                >
                  {companyLinks.home}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/about`}
                  className="hover:text-primary-600 transition"
                >
                  {companyLinks.about}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/contact`}
                  className="hover:text-primary-600 transition"
                >
                  {companyLinks.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* ===== CONTACT ===== */}
          <div>
            <h4 className="text-sm font-semibold mb-8 text-text-heading tracking-wide">
              {contactInfo.title}
            </h4>

            <div className="space-y-5 text-text-body">
              <div className="flex items-start gap-4">
                <FiPhone className="text-primary-600 mt-1" />
                <span>{contactInfo.phone}</span>
              </div>

              <div className="flex items-start gap-4">
                <FiMail className="text-primary-600 mt-1" />
                <span>{contactInfo.email}</span>
              </div>

              <div className="flex items-start gap-4">
                <FiMapPin className="text-primary-600 mt-1" />
                <span>{contactInfo.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM STRIP ================= */}
      <div className="bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-white/80 text-center md:text-left">
            © {new Date().getFullYear()} LITMAD. {bottomInfo.copyright}
          </p>

          <div className="flex gap-8">
            <Link href={`/${locale}/privacy`} className="hover:underline">
              {bottomInfo.privacy}
            </Link>
            <Link href={`/${locale}/terms`} className="hover:underline">
              {bottomInfo.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
