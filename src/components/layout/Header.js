"use client";

import Button from "../ui/Button";
import { useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { selectCartCount } from "@/store/slices/cartSlice";

export default function Header() {
  const count = useSelector(selectCartCount);
  const router = useRouter();
  const pathname = usePathname();

  const locale = pathname.split("/")[1]; // gets 'en'

  return (
    <header className="absolute top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-8 py-8 flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-[0.12em]">LITMAD</h1>

        <div className="flex items-center gap-5">
          <Button variant="secondary" size="md">
            Collection
          </Button>

          <Button variant="primary" size="md">
            Shop Now
          </Button>

          <Button
            variant="secondary"
            className="relative"
            onClick={() => router.push(`/${locale}/cart`)}
          >
            🛒
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#2B2D6E] text-white text-xs px-2 rounded-full">
                {count}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
