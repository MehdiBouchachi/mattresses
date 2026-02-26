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
  const locale = params?.locale || "en";

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
      {/* ================= MAIN ================= */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-14 sm:py-20 lg:py-24">
        <div className="grid gap-12 sm:gap-14 md:grid-cols-2 lg:grid-cols-4">
          {/* ===== BRAND ===== */}
          <div className="space-y-6">
            <Image
              src="/images/logo.webp"
              alt="LITMAD Logo"
              width={150}
              height={60}
              className="object-contain"
            />

            <p className="text-sm sm:text-base text-text-body leading-relaxed">
              {brandDescription}
            </p>

            <div className="flex items-center gap-4 pt-2">
              <SocialIcon>
                <FiInstagram size={18} />
              </SocialIcon>
              <SocialIcon>
                <FiFacebook size={18} />
              </SocialIcon>
            </div>
          </div>

          {/* ===== SHOP ===== */}
          <FooterColumn title={shopLinks.title}>
            <FooterLink href={`/${locale}/mattresses`}>
              {shopLinks.allMattresses}
            </FooterLink>
            <FooterLink href={`/${locale}#collections`}>
              {shopLinks.collections}
            </FooterLink>
            <FooterLink href={`/${locale}/track-order`}>
              {shopLinks.trackOrder}
            </FooterLink>
          </FooterColumn>

          {/* ===== COMPANY ===== */}
          <FooterColumn title={companyLinks.title}>
            <FooterLink href={`/${locale}`}>{companyLinks.home}</FooterLink>
            <FooterLink href={`/${locale}/about`}>
              {companyLinks.about}
            </FooterLink>
            <FooterLink href={`/${locale}/contact`}>
              {companyLinks.contact}
            </FooterLink>
          </FooterColumn>

          {/* ===== CONTACT ===== */}
          <FooterColumn title={contactInfo.title}>
            <ContactItem icon={<FiPhone />} text={contactInfo.phone} />
            <ContactItem icon={<FiMail />} text={contactInfo.email} />
            <ContactItem icon={<FiMapPin />} text={contactInfo.location} />
          </FooterColumn>
        </div>
      </div>

      {/* ================= BOTTOM STRIP ================= */}
      <div className="bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-5 sm:py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs sm:text-sm">
          <p className="text-white/80 text-center md:text-left">
            © {new Date().getFullYear()} LITMAD. {bottomInfo.copyright}
          </p>

          <div className="flex flex-wrap justify-center gap-6">
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

/* ================= SUB COMPONENTS ================= */

function FooterColumn({ title, children }) {
  return (
    <div>
      <h4 className="text-xs sm:text-sm font-semibold mb-5 sm:mb-6 tracking-wide text-text-heading">
        {title}
      </h4>
      <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base text-text-body">
        {children}
      </ul>
    </div>
  );
}

function FooterLink({ href, children }) {
  return (
    <li>
      <Link href={href} className="hover:text-primary-600 transition">
        {children}
      </Link>
    </li>
  );
}

function ContactItem({ icon, text }) {
  return (
    <div className="flex items-start gap-3 text-sm sm:text-base">
      <span className="text-primary-600 mt-1">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

function SocialIcon({ children }) {
  return (
    <a
      className="
        w-9 h-9 sm:w-10 sm:h-10
        rounded-full
        bg-primary-50
        flex items-center justify-center
        text-primary-600
        hover:bg-primary-600 hover:text-white
        transition duration-300
      "
    >
      {children}
    </a>
  );
}
