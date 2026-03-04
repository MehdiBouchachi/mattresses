import { motion } from "framer-motion";

function ProductGallery({
  images,
  selectedImage,
  setSelectedImage,
  zoomStyle,
  handleMouseMove,
  handleMouseLeave,
  product,
}) {
  return (
    <div className="w-full max-w-full overflow-hidden">
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full aspect-[4/3] bg-white rounded-3xl shadow-md overflow-hidden cursor-zoom-in"
      >
        <motion.img
          key={selectedImage}
          src={selectedImage}
          alt={product.name}
          style={zoomStyle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300"
        />
      </div>

      {images.length > 1 && (
        <div className="mt-5 relative">
          <div className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide pb-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(img)}
                className={`snap-start flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border transition-all duration-200 ${
                  selectedImage === img
                    ? "border-blue-900 ring-2 ring-blue-900/20"
                    : "border-blue-100"
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductGallery;
