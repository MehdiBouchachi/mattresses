/* ================= CATEGORY STRUCTURE ================= */

export const categories = [
  {
    value: "foam",
    translations: {
      en: "Foam Mattresses",
      fr: "Matelas en mousse",
      ar: "مراتب إسفنجية",
    },
    subcategories: [
      {
        value: "classic",
        translations: {
          en: "Firm Foam",
          fr: "Mousse ferme",
          ar: "مرتبة إسفنجية صلبة",
        },
      },
      {
        value: "hr",
        translations: {
          en: "Orthopedic Foam",
          fr: "Mousse orthopédique",
          ar: "مرتبة طبية للظهر",
        },
      },
    ],
  },

  {
    value: "hybrid",
    translations: {
      en: "Multi-Layer Mattresses",
      fr: "Matelas multicouches",
      ar: "مراتب متعددة الطبقات",
    },
    subcategories: [
      {
        value: "visco",
        translations: {
          en: "Memory Foam Comfort",
          fr: "Confort mémoire de forme",
          ar: "مرتبة ميموري فوم مريحة",
        },
      },
      {
        value: "visco-plus",
        translations: {
          en: "Premium Comfort",
          fr: "Confort premium",
          ar: "مرتبة فاخرة متعددة الطبقات",
        },
      },
    ],
  },

  {
    value: "spring",
    translations: {
      en: "Spring Mattresses",
      fr: "Matelas à ressorts",
      ar: "مراتب بنوابض",
    },
    subcategories: [
      {
        value: "confort",
        translations: {
          en: "Standard Spring",
          fr: "Ressort standard",
          ar: "مرتبة بنوابض عادية",
        },
      },
      {
        value: "premium",
        translations: {
          en: "Reinforced Spring",
          fr: "Ressort renforcé",
          ar: "مرتبة بنوابض قوية",
        },
      },
      {
        value: "prestige",
        translations: {
          en: "Luxury Spring",
          fr: "Ressort luxe",
          ar: "مرتبة بنوابض فاخرة",
        },
      },
    ],
  },
];

export const products = [
  {
    id: 1,
    slug: "firm-foam-classic",
    name: "Firm Foam Classic",
    description:
      "Solid and durable foam mattress designed for everyday comfort at an affordable price.",

    category: "foam",
    subcategory: "classic",
    available: true,
    featured: false,

    basePrice: 105000,
    oldPrice: null,
    discount: 0,

    images: ["/images/mattresses.png"],

    details: {
      thickness: 22,
      firmness: 8,
      dimensions: [
        { size: "90 x 190", price: 105000 },
        { size: "140 x 190", price: 135000 },
        { size: "160 x 200", price: 155000 },
      ],
      technicalSpecs: [
        { label: "Core", value: "High-density foam" },
        { label: "Support", value: "Firm support structure" },
        { label: "Warranty", value: "5 years" },
      ],
      advantages: [
        "Firm and stable support",
        "Budget friendly",
        "Good durability",
      ],
      faq: [],
    },
  },

  {
    id: 2,
    slug: "orthopedic-foam-support",
    name: "Orthopedic Foam Support",
    description:
      "Firm mattress specially designed to support the back and maintain proper spine alignment.",

    category: "foam",
    subcategory: "hr",
    available: true,
    featured: true,

    basePrice: 125000,
    oldPrice: null,
    discount: 0,

    images: ["/images/mattresses.png"],

    details: {
      thickness: 24,
      firmness: 9,
      dimensions: [
        { size: "90 x 190", price: 125000 },
        { size: "140 x 190", price: 155000 },
        { size: "160 x 200", price: 175000 },
      ],
      technicalSpecs: [
        { label: "Core", value: "High-resilience foam" },
        { label: "Support", value: "Orthopedic structure" },
        { label: "Warranty", value: "8 years" },
      ],
      advantages: [
        "Extra firm support",
        "Recommended for back pain",
        "Long-lasting shape retention",
      ],
      faq: [],
    },
  },

  {
    id: 3,
    slug: "memory-comfort",
    name: "Memory Comfort",
    description:
      "Comfortable mattress that adapts to your body shape and reduces pressure while sleeping.",

    category: "hybrid",
    subcategory: "visco",
    available: true,
    featured: true,

    basePrice: 145000,
    oldPrice: 165000,
    discount: 12,

    images: ["/images/mattresses.png"],

    details: {
      thickness: 26,
      firmness: 6,
      dimensions: [
        { size: "90 x 190", price: 145000 },
        { size: "140 x 190", price: 175000 },
        { size: "160 x 200", price: 195000 },
      ],
      technicalSpecs: [
        { label: "Top Layer", value: "Memory comfort layer" },
        { label: "Base", value: "Support foam core" },
        { label: "Warranty", value: "10 years" },
      ],
      advantages: [
        "Adapts to body shape",
        "Balanced comfort",
        "Reduced pressure points",
      ],
      faq: [],
    },
  },

  {
    id: 4,
    slug: "premium-multilayer",
    name: "Premium Multi-Layer",
    description:
      "High-end mattress combining multiple comfort layers for a refined and supportive sleep experience.",

    category: "hybrid",
    subcategory: "visco-plus",
    available: true,
    featured: false,

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
        { label: "Structure", value: "Multi-layer comfort system" },
        { label: "Support", value: "Reinforced base layer" },
        { label: "Warranty", value: "12 years" },
      ],
      advantages: [
        "Premium comfort feel",
        "Strong body support",
        "Long durability",
      ],
      faq: [],
    },
  },

  {
    id: 5,
    slug: "spring-standard",
    name: "Spring Standard",
    description:
      "Traditional spring mattress offering reliable support and good airflow.",

    category: "spring",
    subcategory: "confort",
    available: true,
    featured: false,

    basePrice: 99000,
    oldPrice: null,
    discount: 0,

    images: ["/images/mattresses.png"],

    details: {
      thickness: 22,
      firmness: 7,
      dimensions: [
        { size: "90 x 190", price: 99000 },
        { size: "140 x 190", price: 119000 },
      ],
      technicalSpecs: [
        { label: "Structure", value: "Classic spring system" },
        { label: "Warranty", value: "5 years" },
      ],
      advantages: ["Good ventilation", "Affordable option", "Reliable support"],
      faq: [],
    },
  },

  {
    id: 6,
    slug: "spring-strong",
    name: "Spring Strong Support",
    description:
      "Reinforced spring mattress providing stronger support and improved durability.",

    category: "spring",
    subcategory: "premium",
    available: true,
    featured: true,

    basePrice: 145000,
    oldPrice: null,
    discount: 0,

    images: ["/images/mattresses.png"],

    details: {
      thickness: 26,
      firmness: 8,
      dimensions: [
        { size: "90 x 190", price: 145000 },
        { size: "140 x 190", price: 175000 },
        { size: "160 x 200", price: 195000 },
      ],
      technicalSpecs: [
        { label: "Structure", value: "Reinforced spring system" },
        { label: "Support", value: "Stronger coil density" },
        { label: "Warranty", value: "8 years" },
      ],
      advantages: ["Strong support", "Better durability", "Good airflow"],
      faq: [],
    },
  },

  {
    id: 7,
    slug: "spring-luxury",
    name: "Spring Luxury",
    description:
      "Premium spring mattress designed for maximum comfort and long-term performance.",

    category: "spring",
    subcategory: "prestige",
    available: true,
    featured: false,

    basePrice: 175000,
    oldPrice: null,
    discount: 0,

    images: ["/images/mattresses.png"],

    details: {
      thickness: 28,
      firmness: 7,
      dimensions: [
        { size: "140 x 190", price: 175000 },
        { size: "160 x 200", price: 205000 },
      ],
      technicalSpecs: [
        { label: "Structure", value: "Premium spring system" },
        { label: "Comfort", value: "Enhanced top padding" },
        { label: "Warranty", value: "10 years" },
      ],
      advantages: ["Luxury comfort", "Balanced support", "High durability"],
      faq: [],
    },
  },
  {
    id: 8,
    slug: "spring-standard-bonnell",
    name: "Spring Standard Bonnell",
    description:
      "Traditional spring mattress offering reliable support and good ventilation at an affordable price.",

    category: "spring",
    subcategory: "confort",
    available: false,
    featured: false,

    basePrice: 99000,
    oldPrice: null,
    discount: 0,

    images: ["/images/mattresses.png"],

    details: {
      thickness: 22,
      firmness: 7,
      dimensions: [
        { size: "90 x 190", price: 99000 },
        { size: "140 x 190", price: 119000 },
      ],
      technicalSpecs: [
        { label: "Structure", value: "Standard Bonnell spring system" },
        { label: "Warranty", value: "5 years" },
      ],
      advantages: ["Good airflow", "Affordable price", "Reliable support"],
      faq: [],
    },
  },
];

/* ================= PRODUCTS ================= */

export const itemsPerPage = 6;
