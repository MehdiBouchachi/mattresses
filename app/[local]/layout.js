import {
  Playfair_Display,
  Inter,
  IBM_Plex_Sans_Arabic,
} from "next/font/google";

import "@/styles/globals.css";
import Providers from "../providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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

  return (
    <html lang={local} dir={isArabic ? "rtl" : "ltr"}>
      <body
        className={`
          ${headingFont.variable}
          ${bodyFont.variable}
          ${arabicFont.variable}
          antialiased
          bg-beige-300
          text-text-primary
        `}
      >
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
