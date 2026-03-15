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

/* ─── Animation variants ─── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] },
  },
};

const linkVariants = {
  hidden: { opacity: 0, x: -15 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, delay: i * 0.08, ease: "easeOut" },
  }),
};

const bottomStripVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.3, ease: "easeOut" },
  },
};

export default function Footer({ translation }) {
  const params = useParams();
  const locale = params?.local || "en";
  const router = useRouter();
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.15 });

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
      className="bg-white border-t border-blue-100 overflow-hidden"
      id="site-footer"
    >
      {/* ================= MAIN ================= */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-14 sm:py-20 lg:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-12 sm:gap-14 md:grid-cols-2 lg:grid-cols-4"
        >
          {/* ===== BRAND ===== */}
          <motion.div
            variants={itemVariants}
            className="space-y-7 cursor-pointer"
            onClick={() => router.push(`/${locale}`)}
          >
            <motion.div
              className="h-16 sm:h-18 lg:h-20 flex items-center"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Image
                src="/images/logo.webp"
                alt="Empreinte Flex"
                width={240}
                height={100}
                className="h-full w-auto object-contain opacity-95"
              />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base text-slate-600 leading-relaxed"
            >
              {brandDescription}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 pt-2"
            >
              <SocialIcon delay={0}>
                <FiInstagram size={18} />
              </SocialIcon>
              <SocialIcon delay={0.1}>
                <FiFacebook size={18} />
              </SocialIcon>
            </motion.div>
          </motion.div>

          {/* ===== SHOP ===== */}
          <motion.div variants={itemVariants}>
            <FooterColumn title={shopLinks.title}>
              <FooterLink href={`/${locale}/mattresses`} index={0}>
                {shopLinks.allMattresses}
              </FooterLink>
              <FooterLink href={`/${locale}#collections`} index={1}>
                {shopLinks.collections}
              </FooterLink>
              <FooterLink href={`/${locale}/track-order`} index={2}>
                {shopLinks.trackOrder}
              </FooterLink>
            </FooterColumn>
          </motion.div>

          {/* ===== COMPANY ===== */}
          <motion.div variants={itemVariants}>
            <FooterColumn title={companyLinks.title}>
              <FooterLink href={`/${locale}`} index={0}>
                {companyLinks.home}
              </FooterLink>
              <FooterLink href={`/${locale}/about`} index={1}>
                {companyLinks.about}
              </FooterLink>
              <FooterLink href={`/${locale}/contact`} index={2}>
                {companyLinks.contact}
              </FooterLink>
            </FooterColumn>
          </motion.div>

          {/* ===== CONTACT ===== */}
          <motion.div variants={itemVariants}>
            <FooterColumn title={contactInfo.title}>
              <ContactItem
                icon={<FiPhone />}
                text={contactInfo.phone}
                index={0}
              />
              <ContactItem
                icon={<FiMail />}
                text={contactInfo.email}
                index={1}
              />
              <ContactItem
                icon={<FiMapPin />}
                text={contactInfo.location}
                index={2}
              />
            </FooterColumn>
          </motion.div>
        </motion.div>
      </div>

      {/* ================= BOTTOM STRIP ================= */}
      <motion.div
        variants={bottomStripVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="bg-blue-900 text-white"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-5 sm:py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs sm:text-sm">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-white/80 text-center md:text-left"
          >
            © {new Date().getFullYear()} Empreinte Flex. {bottomInfo.copyright}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <Link
              href={`/${locale}/privacy`}
              className="relative hover:underline group"
            >
              {bottomInfo.privacy}
              <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-white/50 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href={`/${locale}/terms`}
              className="relative hover:underline group"
            >
              {bottomInfo.terms}
              <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-white/50 group-hover:w-full transition-all duration-300" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
}

/* ================= SUB COMPONENTS ================= */

function FooterColumn({ title, children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref}>
      <motion.h4
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-xs sm:text-sm font-semibold mb-5 sm:mb-6 tracking-wide text-slate-800"
      >
        {title}
      </motion.h4>
      <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base text-slate-600">
        {children}
      </ul>
    </div>
  );
}

function FooterLink({ href, children, index = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.li
      ref={ref}
      custom={index}
      variants={linkVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <Link
        href={href}
        className="relative group inline-block transition-colors duration-200 hover:text-blue-800"
      >
        <motion.span
          whileHover={{ x: 4 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="inline-block"
        >
          {children}
        </motion.span>
        <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-blue-800/40 group-hover:w-full transition-all duration-300 rounded-full" />
      </Link>
    </motion.li>
  );
}

function ContactItem({ icon, text, index = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -15 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
      className="flex items-start gap-3 text-sm sm:text-base group"
    >
      <motion.span
        className="text-blue-800 mt-1"
        whileHover={{ scale: 1.25, rotate: 10 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        {icon}
      </motion.span>
      <span className="group-hover:text-slate-800 transition-colors duration-200">
        {text}
      </span>
    </motion.div>
  );
}

function SocialIcon({ children, delay = 0 }) {
  return (
    <motion.a
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: 0.5 + delay,
        type: "spring",
        stiffness: 400,
        damping: 15,
      }}
      whileHover={{
        scale: 1.15,
        y: -3,
        boxShadow: "0 6px 20px rgba(30, 64, 175, 0.25)",
      }}
      whileTap={{ scale: 0.9 }}
      className="
        w-9 h-9 sm:w-10 sm:h-10
        rounded-full
        bg-blue-50
        flex items-center justify-center
        text-blue-800
        hover:bg-blue-800 hover:text-white
        transition-colors duration-300
        cursor-pointer
      "
    >
      {children}
    </motion.a>
  );
}
