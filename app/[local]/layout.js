import { Playfair_Display, Inter } from "next/font/google";
import "@/styles/globals.css";
import Providers from "../providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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

export const metadata = {
  title: "Litmad – Premium Comfort",
  description: "Modern mattresses designed for better sleep.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${headingFont.variable} ${bodyFont.variable} antialiased bg-[#F5EFE6] text-[#1E1E1E] transition-colors duration-300`}
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
