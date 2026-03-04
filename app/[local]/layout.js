import {
  Playfair_Display,
  Inter,
  IBM_Plex_Sans_Arabic,
} from "next/font/google";

import "@/styles/globals.css";
import Providers from "../providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getTranslations } from "@/lib/i18n";
/* LATIN */
const headingFont = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-heading",
});

const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

/* ARABIC */

const arabicFont = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
});

export default async function RootLayout({ children, params }) {
  const { local } = await params;
  const isArabic = local === "ar";
  const translation = getTranslations(local);

  return (
    <html lang={local} dir={isArabic ? "rtl" : "ltr"}>
      <body
        className={`
          ${headingFont.variable}
          ${bodyFont.variable}
          ${arabicFont.variable}
          antialiased
          bg-white
          text-blue-950
          
          pb-19 md:pb-0
        `}
      >
        <Providers>
          <Header translation={translation} />
          {children}
          <Footer translation={translation} />
        </Providers>
      </body>
    </html>
  );
}
