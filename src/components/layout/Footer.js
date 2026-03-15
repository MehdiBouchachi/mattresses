"use client";

import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiInstagram,
  FiFacebook,
} from "react-icons/fi";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

/* Single set of variants — no per-item useInView */
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
  },
};

export default function Footer({ translation }) {
  const params = useParams();
  const locale = params?.local || "en";
  const router = useRouter();

  /* ONE useInView for the entire footer — performant */
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.1 });

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
    <footer
      ref={footerRef}
      className="bg-white border-t border-blue-100"
      id="site-footer"
    >
      {/* ================= MAIN ================= */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-14 sm:py-20 lg:py-24">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-12 sm:gap-14 md:grid-cols-2 lg:grid-cols-4"
        >
          {/* ===== BRAND ===== */}
          <motion.div
            variants={fadeUp}
            className="space-y-6 cursor-pointer"
            onClick={() => router.push(`/${locale}`)}
          >
            <div className="h-14 sm:h-16 w-auto flex items-center">
              <Image
                src="/images/logo.webp"
                alt="Empreinte Flex"
                width={180}
                height={60}
                className="h-full w-auto object-contain"
              />
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {brandDescription}
            </p>

            <div className="flex items-center gap-3 pt-1">
              <SocialIcon>
                <FiInstagram size={17} />
              </SocialIcon>
              <SocialIcon>
                <FiFacebook size={17} />
              </SocialIcon>
            </div>
          </motion.div>

          {/* ===== SHOP ===== */}
          <motion.div variants={fadeUp}>
            <h4 className="text-xs sm:text-sm font-semibold mb-5 sm:mb-6 tracking-wide text-slate-800">
              {shopLinks.title}
            </h4>
            <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base text-slate-600">
              <FooterLink href={`/${locale}/mattresses`}>
                {shopLinks.allMattresses}
              </FooterLink>
              <FooterLink href={`/${locale}#collections`}>
                {shopLinks.collections}
              </FooterLink>
              <FooterLink href={`/${locale}/track-order`}>
                {shopLinks.trackOrder}
              </FooterLink>
            </ul>
          </motion.div>

          {/* ===== COMPANY ===== */}
          <motion.div variants={fadeUp}>
            <h4 className="text-xs sm:text-sm font-semibold mb-5 sm:mb-6 tracking-wide text-slate-800">
              {companyLinks.title}
            </h4>
            <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base text-slate-600">
              <FooterLink href={`/${locale}`}>{companyLinks.home}</FooterLink>
              <FooterLink href={`/${locale}/about`}>
                {companyLinks.about}
              </FooterLink>
              <FooterLink href={`/${locale}/contact`}>
                {companyLinks.contact}
              </FooterLink>
            </ul>
          </motion.div>

          {/* ===== CONTACT ===== */}
          <motion.div variants={fadeUp}>
            <h4 className="text-xs sm:text-sm font-semibold mb-5 sm:mb-6 tracking-wide text-slate-800">
              {contactInfo.title}
            </h4>
            <div className="space-y-3 sm:space-y-4">
              <ContactItem icon={<FiPhone />} text={contactInfo.phone} />
              <ContactItem icon={<FiMail />} text={contactInfo.email} />
              <ContactItem icon={<FiMapPin />} text={contactInfo.location} />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ================= BOTTOM STRIP ================= */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-blue-900 text-white"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-5 sm:py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs sm:text-sm">
          <p className="text-white/80 text-center md:text-left">
            © {new Date().getFullYear()} Empreinte Flex. {bottomInfo.copyright}
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href={`/${locale}/privacy`}
              className="text-white/80 hover:text-white transition-colors"
            >
              {bottomInfo.privacy}
            </Link>
            <Link
              href={`/${locale}/terms`}
              className="text-white/80 hover:text-white transition-colors"
            >
              {bottomInfo.terms}
            </Link>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}

/* ================= SUB COMPONENTS ================= */

function FooterLink({ href, children }) {
  return (
    <li>
      <Link
        href={href}
        className="inline-block hover:text-blue-800 hover:translate-x-1 transition-all duration-200"
      >
        {children}
      </Link>
    </li>
  );
}

function ContactItem({ icon, text }) {
  return (
    <div className="flex items-start gap-3 text-sm sm:text-base">
      <span className="text-blue-800 mt-1 flex-shrink-0">{icon}</span>
      <span className="text-slate-600">{text}</span>
    </div>
  );
}

function SocialIcon({ children }) {
  return (
    <a
      className="
        w-9 h-9 sm:w-10 sm:h-10
        rounded-full bg-blue-50
        flex items-center justify-center
        text-blue-800
        hover:bg-blue-800 hover:text-white
        hover:scale-110
        transition-all duration-300
        cursor-pointer
      "
    >
      {children}
    </a>
  );
}
