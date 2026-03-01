/* ================= CATEGORY STRUCTURE ================= */

export const categories1 = [
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

export const categories = [
  {
    value: "classic",
    translations: {
      en: "Classic Range",
      fr: "Gamme Classique",
      ar: "الفئة الكلاسيكية",
    },
    subcategories: [
      {
        value: "d30",
        translations: {
          en: "Mattress Density D30",
          fr: "Matelas Densité D30",
          ar: "مرتبة كثافة D30",
        },
      },
      {
        value: "d36",
        translations: {
          en: "Mattress Density D36",
          fr: "Matelas Densité D36",
          ar: "مرتبة كثافة D36",
        },
      },
    ],
  },

  {
    value: "multi-layer",
    translations: {
      en: "Multi-Layer Range",
      fr: "Gamme Multi-couches",
      ar: "فئة متعددة الطبقات",
    },
    subcategories: [
      {
        value: "hr",
        translations: {
          en: "HR Mattress",
          fr: "Matelas HR",
          ar: "مرتبة HR",
        },
      },
      {
        value: "visco",
        translations: {
          en: "Visco Mattress",
          fr: "Matelas Visco",
          ar: "مرتبة فيسكو",
        },
      },
      {
        value: "visco-plus",
        translations: {
          en: "Visco Plus (D36 + HR + Visco)",
          fr: "Matelas Visco Plus (D36 + HR + Visco)",
          ar: "مرتبة فيسكو بلس (D36 + HR + Visco)",
        },
      },
    ],
  },

  {
    value: "spring",
    translations: {
      en: "Spring Range",
      fr: "Gamme Ressorts",
      ar: "فئة النوابض",
    },
    subcategories: [
      {
        value: "confort",
        translations: {
          en: "Spring Confort",
          fr: "Ressort Confort",
          ar: "نوابض كونفور",
        },
      },
      {
        value: "premium",
        translations: {
          en: "Spring Premium",
          fr: "Ressort Premium",
          ar: "نوابض بريميوم",
        },
      },
      {
        value: "prestige",
        translations: {
          en: "Spring Prestige",
          fr: "Ressort Prestige",
          ar: "نوابض بريستيج",
        },
      },
    ],
  },
];

export const products1 = [
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

export const products2 = [
  /* ================= CLASSIC RANGE ================= */

  {
    id: 1,
    slug: "classic-d30",
    name: "Matelas Densité D30",
    description:
      "Durable foam mattress with D30 density, designed for everyday comfort and long-term support.",

    category: "classic",
    subcategory: "d30",
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
        { label: "Density", value: "D30 High-density foam" },
        { label: "Support", value: "Firm support core" },
        { label: "Warranty", value: "5 years" },
      ],
      advantages: [
        "Firm and stable support",
        "Affordable solution",
        "Good durability",
      ],
      faq: [],
    },
  },

  {
    id: 2,
    slug: "classic-d36",
    name: "Matelas Densité D36",
    description:
      "Higher-density foam mattress offering enhanced durability and stronger support.",

    category: "classic",
    subcategory: "d36",
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
        { label: "Density", value: "D36 Reinforced foam" },
        { label: "Support", value: "Extra firm support" },
        { label: "Warranty", value: "8 years" },
      ],
      advantages: [
        "Stronger core support",
        "Better lifespan",
        "Ideal for heavier sleepers",
      ],
      faq: [],
    },
  },

  /* ================= MULTI-LAYER RANGE ================= */

  {
    id: 3,
    slug: "hr-mattress",
    name: "Matelas HR",
    description:
      "High-Resilience mattress designed for dynamic support and improved comfort.",

    category: "multi-layer",
    subcategory: "hr",
    available: true,
    featured: false,

    basePrice: 135000,
    oldPrice: null,
    discount: 0,

    images: ["/images/mattresses.png"],

    details: {
      thickness: 25,
      firmness: 7,
      dimensions: [
        { size: "90 x 190", price: 135000 },
        { size: "140 x 190", price: 165000 },
        { size: "160 x 200", price: 185000 },
      ],
      technicalSpecs: [
        { label: "Core", value: "High-Resilience foam" },
        { label: "Structure", value: "Multi-layer support system" },
        { label: "Warranty", value: "8 years" },
      ],
      advantages: ["Responsive comfort", "Good airflow", "Balanced support"],
      faq: [],
    },
  },

  {
    id: 4,
    slug: "visco-mattress",
    name: "Matelas Visco",
    description:
      "Memory foam mattress that adapts to body shape and reduces pressure points.",

    category: "multi-layer",
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
        { label: "Top Layer", value: "Memory foam layer" },
        { label: "Base", value: "Support foam core" },
        { label: "Warranty", value: "10 years" },
      ],
      advantages: [
        "Adapts to body shape",
        "Reduced pressure points",
        "Comfortable sleep feel",
      ],
      faq: [],
    },
  },

  {
    id: 5,
    slug: "visco-plus",
    name: "Matelas Visco Plus",
    description:
      "Premium mattress combining D36 + HR + Visco layers for superior comfort and support.",

    category: "multi-layer",
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
        { label: "Structure", value: "D36 + HR + Visco multi-layer system" },
        { label: "Support", value: "Reinforced base layer" },
        { label: "Warranty", value: "12 years" },
      ],
      advantages: [
        "Premium layered comfort",
        "Excellent body support",
        "Long durability",
      ],
      faq: [],
    },
  },

  /* ================= SPRING RANGE ================= */

  {
    id: 6,
    slug: "ressort-confort",
    name: "Ressort Confort",
    description:
      "Traditional spring mattress offering reliable support and good ventilation.",

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
    id: 7,
    slug: "ressort-premium",
    name: "Ressort Premium",
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
        { label: "Warranty", value: "8 years" },
      ],
      advantages: ["Strong support", "Better durability", "Good airflow"],
      faq: [],
    },
  },

  {
    id: 8,
    slug: "ressort-prestige",
    name: "Ressort Prestige",
    description:
      "High-end spring mattress designed for maximum comfort and longevity.",

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
        { label: "Comfort", value: "Enhanced padding layer" },
        { label: "Warranty", value: "10 years" },
      ],
      advantages: ["Luxury comfort", "Balanced support", "High durability"],
      faq: [],
    },
  },
];

export const products = [
  /* ================= CLASSIC RANGE ================= */

  {
    id: 1,
    slug: "classic-d30",
    name: "Matelas Densité D30",
    description:
      "Durable foam mattress with D30 density, designed for everyday comfort and long-term support.",

    category: "classic",
    subcategory: "d30",
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
        {
          size: "90 x 190",
          options: [
            { thickness: 20, price: 14500 },
            { thickness: 25, price: 16500 },
            { thickness: 30, price: 20000 },
          ],
        },
        {
          size: "140 x 190",
          options: [
            { thickness: 20, price: 24000 },
            { thickness: 25, price: 26500 },
            { thickness: 30, price: 29000 },
          ],
        },
        {
          size: "160 x 190",
          options: [
            { thickness: 20, price: 26000 },
            { thickness: 25, price: 28000 },
            { thickness: 30, price: 33000 },
          ],
        },
        {
          size: "180 x 200",
          options: [
            { thickness: 20, price: 30000 },
            { thickness: 25, price: 33500 },
            { thickness: 30, price: 38000 },
          ],
        },
      ],
      technicalSpecs: [
        { label: "Density", value: "D30 High-density foam" },
        { label: "Support", value: "Firm support core" },
        { label: "Warranty", value: "5 years" },
      ],
      advantages: [
        "Firm and stable support",
        "Affordable solution",
        "Good durability",
      ],
      faq: [],
    },
  },

  {
    id: 2,
    slug: "classic-d36",
    name: "Matelas Densité D36",
    description:
      "Higher-density foam mattress offering enhanced durability and stronger support.",

    category: "classic",
    subcategory: "d36",
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
        {
          size: "90 x 190",
          options: [
            { thickness: 20, price: 17500 },
            { thickness: 25, price: 20000 },
            { thickness: 30, price: 24500 },
          ],
        },
        {
          size: "140 x 190",
          options: [
            { thickness: 20, price: 26000 },
            { thickness: 25, price: 30500 },
            { thickness: 30, price: 36000 },
          ],
        },
        {
          size: "160 x 190",
          options: [
            { thickness: 20, price: 29500 },
            { thickness: 25, price: 34500 },
            { thickness: 30, price: 39500 },
          ],
        },
        {
          size: "180 x 200",
          options: [
            { thickness: 20, price: 35000 },
            { thickness: 25, price: 39500 },
            { thickness: 30, price: 42000 },
          ],
        },
      ],
      technicalSpecs: [
        { label: "Density", value: "D36 Reinforced foam" },
        { label: "Support", value: "Extra firm support" },
        { label: "Warranty", value: "8 years" },
      ],
      advantages: [
        "Stronger core support",
        "Better lifespan",
        "Ideal for heavier sleepers",
      ],
      faq: [],
    },
  },

  /* ================= MULTI-LAYER RANGE ================= */

  {
    id: 3,
    slug: "hr-mattress",
    name: "Matelas HR",
    description:
      "High-Resilience mattress designed for dynamic support and improved comfort.",

    category: "multi-layer",
    subcategory: "hr",
    available: true,
    featured: false,

    basePrice: 135000,
    oldPrice: null,
    discount: 0,

    images: ["/images/mattresses.png"],

    details: {
      thickness: 25,
      firmness: 7,
      dimensions: [
        {
          size: "90 x 190",
          options: [
            { thickness: 20, price: 20000 },
            { thickness: 25, price: 23000 },
            { thickness: 30, price: 28000 },
          ],
        },
        {
          size: "140 x 190",
          options: [
            { thickness: 20, price: 29500 },
            { thickness: 25, price: 34500 },
            { thickness: 30, price: 41000 },
          ],
        },
        {
          size: "160 x 190",
          options: [
            { thickness: 20, price: 33500 },
            { thickness: 25, price: 39500 },
            { thickness: 30, price: 45500 },
          ],
        },
        {
          size: "180 x 200",
          options: [
            { thickness: 20, price: 38500 },
            { thickness: 25, price: 45500 },
            { thickness: 30, price: 50000 },
          ],
        },
      ],
      technicalSpecs: [
        { label: "Core", value: "High-Resilience foam" },
        { label: "Structure", value: "Multi-layer support system" },
        { label: "Warranty", value: "8 years" },
      ],
      advantages: ["Responsive comfort", "Good airflow", "Balanced support"],
      faq: [],
    },
  },

  {
    id: 4,
    slug: "visco-mattress",
    name: "Matelas Visco",
    description:
      "Memory foam mattress that adapts to body shape and reduces pressure points.",

    category: "multi-layer",
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
        {
          size: "90 x 190",
          options: [
            { thickness: 20, price: 20000 },
            { thickness: 25, price: 23000 },
            { thickness: 30, price: 28000 },
          ],
        },
        {
          size: "140 x 190",
          options: [
            { thickness: 20, price: 29500 },
            { thickness: 25, price: 34500 },
            { thickness: 30, price: 41000 },
          ],
        },
        {
          size: "160 x 190",
          options: [
            { thickness: 20, price: 33500 },
            { thickness: 25, price: 39500 },
            { thickness: 30, price: 45500 },
          ],
        },
        {
          size: "180 x 200",
          options: [
            { thickness: 20, price: 38500 },
            { thickness: 25, price: 45500 },
            { thickness: 30, price: 50000 },
          ],
        },
      ],
      technicalSpecs: [
        { label: "Top Layer", value: "Memory foam layer" },
        { label: "Base", value: "Support foam core" },
        { label: "Warranty", value: "10 years" },
      ],
      advantages: [
        "Adapts to body shape",
        "Reduced pressure points",
        "Comfortable sleep feel",
      ],
      faq: [],
    },
  },

  {
    id: 5,
    slug: "visco-plus",
    name: "Matelas Visco Plus",
    description:
      "Premium mattress combining D36 + HR + Visco layers for superior comfort and support.",

    category: "multi-layer",
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
        {
          size: "90 x 190",
          options: [
            { thickness: 20, price: 24500 },
            { thickness: 25, price: 26600 },
          ],
        },
        {
          size: "140 x 190",
          options: [
            { thickness: 20, price: 36000 },
            { thickness: 25, price: 42000 },
          ],
        },
        {
          size: "160 x 190",
          options: [
            { thickness: 20, price: 41000 },
            { thickness: 25, price: 48000 },
          ],
        },
        {
          size: "180 x 200",
          options: [
            { thickness: 20, price: 47000 },
            { thickness: 25, price: 55000 },
          ],
        },
      ],
      technicalSpecs: [
        { label: "Structure", value: "D36 + HR + Visco multi-layer system" },
        { label: "Support", value: "Reinforced base layer" },
        { label: "Warranty", value: "12 years" },
      ],
      advantages: [
        "Premium layered comfort",
        "Excellent body support",
        "Long durability",
      ],
      faq: [],
    },
  },

  /* ================= SPRING RANGE ================= */

  {
    id: 6,
    slug: "ressort-confort",
    name: "Ressort Confort",
    description:
      "Traditional spring mattress offering reliable support and good ventilation.",

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
        {
          size: "90 x 190",
          options: [
            { thickness: 25, price: 28500 },
            { thickness: 30, price: 34000 },
          ],
        },
        {
          size: "140 x 190",
          options: [
            { thickness: 25, price: 44000 },
            { thickness: 30, price: 49500 },
          ],
        },
        {
          size: "160 x 190",
          options: [
            { thickness: 25, price: 48000 },
            { thickness: 30, price: 55000 },
          ],
        },
        {
          size: "180 x 200",
          options: [
            { thickness: 25, price: 55000 },
            { thickness: 30, price: 60000 },
          ],
        },
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
    id: 7,
    slug: "ressort-premium",
    name: "Ressort Premium",
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
        {
          size: "90 x 190",
          options: [
            { thickness: 25, price: 36000 },
            { thickness: 30, price: 40000 },
          ],
        },
        {
          size: "140 x 190",
          options: [
            { thickness: 25, price: 53000 },
            { thickness: 30, price: 62500 },
          ],
        },
        {
          size: "160 x 190",
          options: [
            { thickness: 25, price: 60000 },
            { thickness: 30, price: 68000 },
          ],
        },
        {
          size: "180 x 200",
          options: [
            { thickness: 25, price: 69000 },
            { thickness: 30, price: 75000 },
          ],
        },
      ],
      technicalSpecs: [
        { label: "Structure", value: "Reinforced spring system" },
        { label: "Warranty", value: "8 years" },
      ],
      advantages: ["Strong support", "Better durability", "Good airflow"],
      faq: [],
    },
  },

  {
    id: 8,
    slug: "ressort-prestige",
    name: "Ressort Prestige",
    description:
      "High-end spring mattress designed for maximum comfort and longevity.",

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
        {
          size: "90 x 190",
          options: [
            { thickness: 25, price: 45000 },
            { thickness: 30, price: 50000 },
          ],
        },
        {
          size: "140 x 190",
          options: [
            { thickness: 25, price: 66000 },
            { thickness: 30, price: 78000 },
          ],
        },
        {
          size: "160 x 190",
          options: [
            { thickness: 25, price: 75000 },
            { thickness: 30, price: 82000 },
          ],
        },
        {
          size: "180 x 200",
          options: [
            { thickness: 25, price: 82000 },
            { thickness: 30, price: 88000 },
          ],
        },
      ],
      technicalSpecs: [
        { label: "Structure", value: "Premium spring system" },
        { label: "Comfort", value: "Enhanced padding layer" },
        { label: "Warranty", value: "10 years" },
      ],
      advantages: ["Luxury comfort", "Balanced support", "High durability"],
      faq: [],
    },
  },
];

/* ================= PRODUCTS ================= */

export const itemsPerPage = 6;
