"use client";

import { useEffect, useRef } from "react";
import Lottie from "lottie-react";
import gsap from "gsap";
import featherAnimation from "../../../public/video/Feather-falling.json";

export default function Feather({ delay = 0, size = 120, startX = 50 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, {
      xPercent: -50,
      y: -200,
      left: `${startX}%`,
    });

    gsap.to(el, {
      y: "120vh",
      duration: 12 + Math.random() * 6,
      ease: "none",
      repeat: -1,
      delay,
    });

    gsap.to(el, {
      x: "+=80",
      rotation: 20,
      duration: 4,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });
  }, [delay, startX]);

  return (
    <div
      ref={ref}
      className="absolute pointer-events-none opacity-50"
      style={{ width: size }}
    >
      <Lottie animationData={featherAnimation} loop />
    </div>
  );
}
