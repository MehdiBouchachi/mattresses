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
import { useParams, useRouter } from "next/navigation";

export default function Footer({ translation }) {
  const params = useParams();
  const locale = params?.local || "en";
  const router = useRouter();
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
          <div
            className="space-y-7 cursor-pointer"
            onClick={() => router.push(`/${locale}`)}
          >
            <div className="h-16 sm:h-18 lg:h-20 flex items-center">
              <Image
                src="/images/logo.webp"
                alt="Empreinte Flex"
                width={240}
                height={100}
                className="h-full w-auto object-contain opacity-95"
              />
            </div>

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
            © {new Date().getFullYear()} Empreinte Flex. {bottomInfo.copyright}
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
