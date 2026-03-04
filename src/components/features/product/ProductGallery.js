"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useProduct } from "./ProductContext";

const MotionImage = motion(Image);

export default function ProductGallery() {
  const { product, state, dispatch } = useProduct();

  const { selectedImage } = state;
  const images = product.images ?? [];

  /* =========================
     LOCAL ZOOM STATE (NOT GLOBAL)
  ========================== */

  const [zoomStyle, setZoomStyle] = useState({});

  const handleMouseMove = (e) => {
    if (window.innerWidth < 1024) return;

    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(1.8)",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transform: "scale(1)",
      transformOrigin: "center",
    });
  };

  /* =========================
     RENDER
  ========================== */

  return (
    <div className="w-full max-w-full overflow-hidden">
      {/* MAIN IMAGE */}
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full aspect-[4/3] bg-white rounded-3xl shadow-md overflow-hidden cursor-zoom-in"
      >
        <MotionImage
          key={selectedImage}
          src={selectedImage}
          alt={product.name}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          style={zoomStyle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="object-cover transition-transform duration-300"
          priority
        />
      </div>

      {/* THUMBNAILS */}
      {images.length > 1 && (
        <div className="mt-5">
          <div className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide pb-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => dispatch({ type: "SET_IMAGE", payload: img })}
                className={`relative snap-start flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border transition-all duration-200 ${
                  selectedImage === img
                    ? "border-blue-900 ring-2 ring-blue-900/20"
                    : "border-blue-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${i + 1}`}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
