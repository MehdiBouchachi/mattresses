/* ================= CATEGORY STRUCTURE ================= */

export const categories1 = [
  { name: "Foam", value: "foam", subcategories: ["memory", "orthopedic"] },
  { name: "Spring", value: "spring", subcategories: ["pocket", "bonnell"] },
  { name: "Hybrid", value: "hybrid", subcategories: ["luxury", "cooling"] },
  {
    name: "Accessories",
    value: "accessories",
    subcategories: ["pillow", "protector"],
  },
];

export const categories = [
  {
    value: "foam",
    translations: {
      en: "Foam",
      fr: "Mousse",
      ar: "مراتب إسفنجية",
    },
    subcategories: [
      {
        value: "memory",
        translations: {
          en: "Memory",
          fr: "Mémoire",
          ar: "مراتب ميموري فوم",
        },
      },
      {
        value: "orthopedic",
        translations: {
          en: "Orthopedic",
          fr: "Orthopédique",
          ar: "مراتب طبية",
        },
      },
    ],
  },
  {
    value: "spring",
    translations: {
      en: "Spring",
      fr: "Ressort",
      ar: "مراتب بنوابض",
    },
    subcategories: [
      {
        value: "pocket",
        translations: {
          en: "Pocket",
          fr: "Ressorts ensachés",
          ar: "نوابض منفصلة",
        },
      },
      {
        value: "bonnell",
        translations: {
          en: "Bonnell",
          fr: "Bonnell",
          ar: "نوابض متصلة",
        },
      },
    ],
  },
  {
    value: "hybrid",
    translations: {
      en: "Hybrid",
      fr: "Hybride",
      ar: "مراتب مختلطة",
    },
    subcategories: [
      {
        value: "luxury",
        translations: {
          en: "Luxury",
          fr: "Luxe",
          ar: "تصميم فاخر",
        },
      },
      {
        value: "cooling",
        translations: {
          en: "Cooling",
          fr: "Refroidissant",
          ar: "تقنية تبريد",
        },
      },
    ],
  },
  {
    value: "accessories",
    translations: {
      en: "Accessories",
      fr: "Accessoires",
      ar: "مستلزمات النوم",
    },
    subcategories: [
      {
        value: "pillow",
        translations: {
          en: "Pillow",
          fr: "Oreiller",
          ar: "وسائد",
        },
      },
      {
        value: "protector",
        translations: {
          en: "Protector",
          fr: "Protège-matelas",
          ar: "واقي المرتبة",
        },
      },
    ],
  },
];
/* ================= PRODUCTS ================= */
export const products = [
  {
    id: 1,
    slug: "memory-foam-deluxe",
    name: "Memory Foam Deluxe",
    description:
      "Pressure-relief memory foam with breathable comfort and orthopedic support designed for optimal spinal alignment.",

    category: "foam",
    subcategory: "memory",
    available: true,
    featured: true,

    basePrice: 115000,
    oldPrice: null,
    discount: 0,

    images: ["/images/mattresses.png", "/images/mattresses.png"],

    details: {
      thickness: 25,
      firmness: 7,
      dimensions: [
        { size: "90 x 190", price: 115000 },
        { size: "140 x 190", price: 145000 },
        { size: "160 x 200", price: 165000 },
      ],
      technicalSpecs: [
        { label: "Technology", value: "Memory foam core" },
        { label: "Density", value: "D30 orthopedic support" },
        { label: "Fabric", value: "Breathable stretch textile" },
        { label: "Warranty", value: "10 years" },
      ],
      advantages: [
        "Balanced pressure relief",
        "Breathable structure",
        "Ideal for daily comfort",
      ],
      faq: [],
    },
  },

  {
    id: 2,
    slug: "orthopedic-foam-pro",
    name: "Orthopedic Foam Pro",
    description:
      "Firm support engineered for spinal alignment and posture correction.",

    category: "foam",
    subcategory: "orthopedic",
    available: true,
    featured: false,

    basePrice: 128000,
    oldPrice: null,
    discount: 0,

    images: ["/images/mattresses.png"],

    details: {
      thickness: 23,
      firmness: 9,
      dimensions: [
        { size: "90 x 190", price: 128000 },
        { size: "140 x 190", price: 158000 },
        { size: "160 x 200", price: 178000 },
      ],
      technicalSpecs: [
        { label: "Technology", value: "High-density orthopedic foam" },
        { label: "Density", value: "D35 firm support" },
        { label: "Warranty", value: "8 years" },
      ],
      advantages: [
        "Extra firm support",
        "Recommended for back pain",
        "Long durability",
      ],
      faq: [],
    },
  },

  {
    id: 3,
    slug: "pocket-spring-elite",
    name: "Pocket Spring Elite",
    description:
      "Individual pocket coils for motion isolation and advanced airflow.",

    category: "spring",
    subcategory: "pocket",
    available: true,
    featured: true,

    basePrice: 149000,
    oldPrice: 179000,
    discount: 17,

    images: ["/images/mattresses.png"],

    details: {
      thickness: 28,
      firmness: 6,
      dimensions: [
        { size: "90 x 190", price: 149000 },
        { size: "140 x 190", price: 179000 },
        { size: "160 x 200", price: 199000 },
      ],
      technicalSpecs: [
        { label: "Technology", value: "Pocket coil suspension" },
        { label: "Ventilation", value: "Airflow core system" },
        { label: "Warranty", value: "10 years" },
      ],
      advantages: ["Motion isolation", "Balanced support", "Enhanced airflow"],
      faq: [],
    },
  },

  {
    id: 4,
    slug: "bonnell-classic",
    name: "Bonnell Classic",
    description:
      "Traditional Bonnell spring structure with consistent durability.",

    category: "spring",
    subcategory: "bonnell",
    available: false,
    featured: false,

    basePrice: 99000,
    oldPrice: null,
    discount: 0,

    images: ["/images/mattresses.png"],

    details: {
      thickness: 22,
      firmness: 6,
      dimensions: [
        { size: "90 x 190", price: 99000 },
        { size: "140 x 190", price: 119000 },
      ],
      technicalSpecs: [
        { label: "Technology", value: "Bonnell spring system" },
        { label: "Warranty", value: "5 years" },
      ],
      advantages: ["Durable construction", "Affordable comfort"],
      faq: [],
    },
  },

  {
    id: 5,
    slug: "luxury-hybrid-max",
    name: "Luxury Hybrid Max",
    description:
      "Premium hybrid combining foam and pocket coils for refined comfort.",

    category: "hybrid",
    subcategory: "luxury",
    available: true,
    featured: true,

    basePrice: 175000,
    oldPrice: null,
    discount: 0,

    images: ["/images/mattresses.png"],

    details: {
      thickness: 30,
      firmness: 7,
      dimensions: [
        { size: "140 x 190", price: 175000 },
        { size: "160 x 200", price: 205000 },
      ],
      technicalSpecs: [
        { label: "Technology", value: "Hybrid foam + coils" },
        { label: "Comfort Layer", value: "Memory foam top layer" },
        { label: "Warranty", value: "12 years" },
      ],
      advantages: ["Premium finish", "Luxury feel", "Long-term durability"],
      faq: [],
    },
  },

  {
    id: 6,
    slug: "cooling-hybrid-breeze",
    name: "Cooling Hybrid Breeze",
    description:
      "Temperature-regulated hybrid mattress designed for hot sleepers.",

    category: "hybrid",
    subcategory: "cooling",
    available: true,
    featured: false,

    basePrice: 162000,
    oldPrice: null,
    discount: 0,

    images: ["/images/mattresses.png"],

    details: {
      thickness: 27,
      firmness: 6,
      dimensions: [
        { size: "140 x 190", price: 162000 },
        { size: "160 x 200", price: 189000 },
      ],
      technicalSpecs: [
        { label: "Cooling Layer", value: "Gel-infused memory foam" },
        { label: "Airflow", value: "Ventilated coil structure" },
      ],
      advantages: ["Cooling performance", "Balanced comfort"],
      faq: [],
    },
  },

  {
    id: 7,
    slug: "luxury-pillow",
    name: "Luxury Pillow",
    description: "Ergonomic pillow designed for neck alignment and comfort.",

    category: "accessories",
    subcategory: "pillow",
    available: true,
    featured: false,

    basePrice: 9000,
    oldPrice: null,
    discount: 0,

    images: ["/images/mattresses.png"],

    details: {
      thickness: 12,
      firmness: 5,
      dimensions: [{ size: "Standard", price: 9000 }],
      technicalSpecs: [
        { label: "Material", value: "High-resilience foam" },
        { label: "Cover", value: "Breathable fabric" },
      ],
      advantages: ["Neck support", "Soft breathable cover"],
      faq: [],
    },
  },

  {
    id: 8,
    slug: "mattress-protector",
    name: "Mattress Protector",
    description:
      "Waterproof breathable protection layer for long mattress life.",

    category: "accessories",
    subcategory: "protector",
    available: true,
    featured: false,

    basePrice: 6500,
    oldPrice: null,
    discount: 0,

    images: ["/images/mattresses.png"],

    details: {
      thickness: 2,
      firmness: 1,
      dimensions: [
        { size: "90 x 190", price: 6500 },
        { size: "140 x 190", price: 8500 },
      ],
      technicalSpecs: [
        { label: "Material", value: "Waterproof breathable layer" },
        { label: "Protection", value: "Anti-liquid barrier" },
      ],
      advantages: ["Extends mattress lifespan", "Easy to clean"],
      faq: [],
    },
  },
];

export const itemsPerPage = 6;
