/* ================= CATEGORY STRUCTURE ================= */

export const categories1 = [
  /* ================= CLASSIC ROLL ================= */
  {
    value: "classic-roll",
    translations: {
      en: "Classic Roll Range",
      fr: "Gamme Classique Roulée",
      ar: "الفئة الكلاسيكية (ملفوفة)",
    },
    subcategories: [
      {
        value: "d30-roll",
        translations: {
          en: "Mattress D30 (Roll)",
          fr: "Matelas D30 (Roulé)",
          ar: "مرتبة D30 (ملفوفة)",
        },
      },
      {
        value: "d36-roll",
        translations: {
          en: "Mattress D36 (Roll)",
          fr: "Matelas D36 (Roulé)",
          ar: "مرتبة D36 (ملفوفة)",
        },
      },
    ],
  },

  /* ================= CLASSIC OPEN ================= */
  {
    value: "classic-open",
    translations: {
      en: "Classic Open Range",
      fr: "Gamme Classique Ouverte",
      ar: "الفئة الكلاسيكية (مفتوحة)",
    },
    subcategories: [
      {
        value: "d30-open",
        translations: {
          en: "Mattress D30 (Open)",
          fr: "Matelas D30 (Ouvert)",
          ar: "مرتبة D30 (مفتوحة)",
        },
      },
      {
        value: "d36-open",
        translations: {
          en: "Mattress D36 (Open)",
          fr: "Matelas D36 (Ouvert)",
          ar: "مرتبة D36 (مفتوحة)",
        },
      },
    ],
  },

  /* ================= MULTI LAYER ================= */
  {
    value: "multi-layer",
    translations: {
      en: "Multi-Layer Range",
      fr: "Gamme Multi-couches",
      ar: "فئة متعددة الطبقات",
    },
    subcategories: [
      {
        value: "confort",
        translations: {
          en: "Comfort Mattress",
          fr: "Matelas Confort",
          ar: "مرتبة كونفورت",
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

  /* ================= SPRING ================= */
  {
    value: "spring",
    translations: {
      en: "Hybrid Spring Range",
      fr: "Gamme Ressorts Hybride",
      ar: "فئة النوابض (هجين)",
    },
    subcategories: [
      {
        value: "spring-confort",
        translations: {
          en: "Spring Confort",
          fr: "Ressort Confort",
          ar: "نوابض كونفور",
        },
      },
      {
        value: "spring-premium",
        translations: {
          en: "Spring Premium",
          fr: "Ressort Premium",
          ar: "نوابض بريميوم",
        },
      },
      {
        value: "spring-prestige",
        translations: {
          en: "Spring Prestige",
          fr: "Ressort Prestige",
          ar: "نوابض بريستيج",
        },
      },
    ],
  },
];

/* ================= CATEGORY STRUCTURE ================= */

export const categories = [
  /* ================= CLASSIC ================= */
  {
    value: "classic",
    translations: {
      en: "Classic Range",
      fr: "Gamme Classique",
      ar: "الفئة الكلاسيكية",
    },
    subcategories: [
      {
        value: "roll",
        translations: {
          en: "Roll Packed",
          fr: "Roulé",
          ar: "ملفوفة",
        },
        types: [
          {
            value: "d30",
            translations: {
              en: "D30",
              fr: "D30",
              ar: "D30",
            },
          },
          {
            value: "d36",
            translations: {
              en: "D36",
              fr: "D36",
              ar: "D36",
            },
          },
        ],
      },
      {
        value: "open",
        translations: {
          en: "Open Form",
          fr: "Ouvert",
          ar: "مفتوحة",
        },
        types: [
          {
            value: "d30",
            translations: {
              en: "D30",
              fr: "D30",
              ar: "D30",
            },
          },
          {
            value: "d36",
            translations: {
              en: "D36",
              fr: "D36",
              ar: "D36",
            },
          },
        ],
      },
    ],
  },

  /* ================= MULTI LAYER ================= */
  {
    value: "multi-layer",
    translations: {
      en: "Multi-Layer Range",
      fr: "Gamme Multi-couches",
      ar: "فئة متعددة الطبقات",
    },
    subcategories: [
      {
        value: "confort",
        translations: { en: "Comfort", fr: "Confort", ar: "كونفورت" },
      },
      {
        value: "visco",
        translations: { en: "Visco", fr: "Visco", ar: "فيسكو" },
      },
      {
        value: "visco-plus",
        translations: { en: "Visco Plus", fr: "Visco Plus", ar: "فيسكو بلس" },
      },
    ],
  },

  /* ================= SPRING ================= */
  {
    value: "spring",
    translations: {
      en: "Spring Range",
      fr: "Gamme Ressorts",
      ar: "فئة النوابض",
    },
    subcategories: [
      {
        value: "spring-confort",
        translations: { en: "Confort", fr: "Confort", ar: "كونفور" },
      },
      {
        value: "spring-premium",
        translations: { en: "Premium", fr: "Premium", ar: "بريميوم" },
      },
      {
        value: "spring-prestige",
        translations: { en: "Prestige", fr: "Prestige", ar: "بريستيج" },
      },
    ],
  },
];

export const products1 = [
  /* ================= CLASSIC RANGE ================= */

  /* ================= CLASSIC OPEN RANGE ================= */

  {
    id: 1,
    slug: "classic-open-d30",
    name: "Matelas Densité D30 (Ouvert)",
    description:
      "Traditional open foam mattress with D30 density, designed for stable everyday comfort and long-term durability.",

    category: "classic-open",
    subcategory: "d30-open",
    available: true,
    featured: false,

    basePrice: 105000,
    oldPrice: null,
    discount: 0,

    images: [
      "/images/classic/classic-D30-5.jpeg",

      "/images/classic/classic-D30-4.jpeg",
      "/images/classic/classic-D30-6.jpeg",
    ],

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
        { label: "Packaging", value: "Delivered flat (Open form)" },
        { label: "Support", value: "Firm support core" },
        { label: "Warranty", value: "5 years" },
      ],
      advantages: [
        "Firm and stable support",
        "Better structural integrity",
        "Good durability",
      ],
      faq: [],
    },
  },

  {
    id: 2,
    slug: "classic-open-d36",
    name: "Matelas Densité D36 (Ouvert)",
    description:
      "Higher-density open foam mattress offering enhanced durability and stronger support.",

    category: "classic-open",
    subcategory: "d36-open",
    available: true,
    featured: true,

    basePrice: 125000,
    oldPrice: null,
    discount: 10,

    images: [
      "/images/classic/classic-D36-2.jpeg",
      "/images/classic/classic-D36-1.jpeg",
    ],

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
        { label: "Packaging", value: "Delivered flat (Open form)" },
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

  /* ================= CLASSIC ROLL RANGE ================= */

  {
    id: 9,
    slug: "classic-roll-d30",
    name: "Matelas Densité D30 (Roulé)",
    description:
      "Compressed roll-packed D30 mattress, practical and affordable with reliable everyday comfort.",

    category: "classic-roll",
    subcategory: "d30-roll",
    available: true,
    featured: false,

    basePrice: 95000,
    oldPrice: null,
    discount: 0,

    images: [
      "/images/classic/classic-D30-6.jpeg",

      "/images/classic/classic-D30-4.jpeg",
      "/images/classic/classic-D30-5.jpeg",
    ],

    details: {
      thickness: 22,
      firmness: 8,
      dimensions: [
        {
          size: "90 x 190",
          options: [
            { thickness: 20, price: 13500 },
            { thickness: 25, price: 15500 },
            { thickness: 30, price: 19000 },
          ],
        },
        {
          size: "140 x 190",
          options: [
            { thickness: 20, price: 22500 },
            { thickness: 25, price: 25000 },
            { thickness: 30, price: 28000 },
          ],
        },
        {
          size: "160 x 190",
          options: [
            { thickness: 20, price: 24500 },
            { thickness: 25, price: 27000 },
            { thickness: 30, price: 31000 },
          ],
        },
        {
          size: "180 x 200",
          options: [
            { thickness: 20, price: 28500 },
            { thickness: 25, price: 32000 },
            { thickness: 30, price: 36000 },
          ],
        },
      ],
      technicalSpecs: [
        { label: "Density", value: "D30 High-density foam" },
        { label: "Packaging", value: "Compressed & Roll-packed" },
        { label: "Support", value: "Firm support core" },
        { label: "Warranty", value: "5 years" },
      ],
      advantages: [
        "Easy transport",
        "Space-saving packaging",
        "Affordable solution",
      ],
      faq: [],
    },
  },

  {
    id: 10,
    slug: "classic-roll-d36",
    name: "Matelas Densité D36 (Roulé)",
    description:
      "Compressed D36 roll mattress offering reinforced support with convenient delivery format.",

    category: "classic-roll",
    subcategory: "d36-roll",
    available: true,
    featured: false,

    basePrice: 115000,
    oldPrice: null,
    discount: 0,

    images: [
      "/images/classic/classic-D36-1.jpeg",
      "/images/classic/classic-D36-2.jpeg",
    ],

    details: {
      thickness: 24,
      firmness: 9,
      dimensions: [
        {
          size: "90 x 190",
          options: [
            { thickness: 20, price: 16500 },
            { thickness: 25, price: 18500 },
            { thickness: 30, price: 22500 },
          ],
        },
        {
          size: "140 x 190",
          options: [
            { thickness: 20, price: 24500 },
            { thickness: 25, price: 28500 },
            { thickness: 30, price: 33000 },
          ],
        },
        {
          size: "160 x 190",
          options: [
            { thickness: 20, price: 28000 },
            { thickness: 25, price: 32500 },
            { thickness: 30, price: 37000 },
          ],
        },
        {
          size: "180 x 200",
          options: [
            { thickness: 20, price: 33000 },
            { thickness: 25, price: 37000 },
            { thickness: 30, price: 40500 },
          ],
        },
      ],
      technicalSpecs: [
        { label: "Density", value: "D36 Reinforced foam" },
        { label: "Packaging", value: "Compressed & Roll-packed" },
        { label: "Support", value: "Extra firm support" },
        { label: "Warranty", value: "8 years" },
      ],
      advantages: ["Strong support", "Cost-effective", "Compact delivery"],
      faq: [],
    },
  },
  /* ================= MULTI-LAYER RANGE ================= */

  {
    id: 3,
    slug: "hr-mattress",
    name: "Matelas Confort",
    description:
      "High-Resilience mattress designed for dynamic support and improved comfort.",

    category: "multi-layer",
    subcategory: "confort",
    available: true,
    featured: false,

    basePrice: 135000,
    oldPrice: null,
    discount: 0,

    images: [
      "/images/vissco/confort.jpeg",
      "/images/vissco/confort-3.jpeg",
      "/images/vissco/confort-4.jpeg",
      "/images/vissco/confort-5.jpeg",
      "/images/vissco/confort-1.jpeg",
      "/images/vissco/confort-2.jpeg",
    ],

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

    images: [
      "/images/vissco/vissco-1.jpeg",
      "/images/vissco/vissco.jpeg",
      "/images/vissco/vissco-2.jpeg",
      "/images/vissco/vissco-3.jpeg",
    ],

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

    images: [
      "/images/vissco/vissco-plus-1.jpeg",
      "/images/vissco/vissco-plus-4.jpeg",
      "/images/vissco/vissco-plus-5.jpeg",
      "/images/vissco/vissco-plus-6.jpeg",
      "/images/vissco/vissco-plus-7.jpeg",
      "/images/vissco/vissco-plus-8.jpeg",
    ],

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
    subcategory: "spring-confort",
    available: true,
    featured: false,

    basePrice: 99000,
    oldPrice: null,
    discount: 0,

    images: [
      "/images/ressort/ressort-confort-1.jpeg",
      "/images/ressort/ressort-confort.jpeg",
    ],

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
    subcategory: "spring-premium",
    available: true,
    featured: true,

    basePrice: 145000,
    oldPrice: null,
    discount: 0,

    images: [
      "/images/ressort/ressort-premium-1.jpeg",
      "/images/ressort/ressort-premium-2.jpeg",
      "/images/ressort/ressort-premium-3.jpeg",
      "/images/ressort/ressort-premium-4.jpeg",
      "/images/ressort/ressort-premium-5.jpeg",
      "/images/ressort/ressort-premium-6.jpeg",
      "/images/ressort/ressort-premium-7.jpeg",
    ],

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
    subcategory: "spring-prestige",
    available: true,
    featured: false,

    basePrice: 175000,
    oldPrice: null,
    discount: 0,

    images: [
      "/images/ressort/ressort-prestige-1.jpeg",
      "/images/ressort/ressort-prestige-2.jpeg",
      "/images/ressort/ressort-prestige-3.jpeg",
    ],

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

export const products = [
  /* ================= CLASSIC OPEN RANGE ================= */

  {
    id: 1,
    slug: "classic-open",
    name: "Matelas Classique (Ouvert)",
    description:
      "Classic open foam mattress available in D30 and D36 densities.",

    category: "classic",
    subcategory: "open",

    available: true,
    featured: false,

    basePrice: 105000,
    oldPrice: null,
    discount: 0,

    images: [
      "/images/classic/classic-D30-5.jpeg",
      "/images/classic/classic-D36-1.jpeg",
    ],

    details: {
      thickness: 22,
      firmness: 8,

      // 👇 Density becomes selectable option
      densities: [
        { value: "D30", label: "D30 High-density foam" },
        { value: "D36", label: "D36 Reinforced foam" },
      ],

      dimensions: [
        {
          size: "90 x 190",
          options: [
            { density: "D30", thickness: 20, price: 14500 },
            { density: "D36", thickness: 20, price: 17500 },
            { density: "D30", thickness: 25, price: 16500 },
            { density: "D36", thickness: 25, price: 20000 },
          ],
        },
        {
          size: "160 x 190",
          options: [
            { density: "D30", thickness: 20, price: 26000 },
            { density: "D36", thickness: 20, price: 29500 },
          ],
        },
      ],

      technicalSpecs: [
        { label: "Packaging", value: "Delivered flat (Open form)" },
        { label: "Warranty", value: "5–8 years depending on density" },
      ],

      advantages: [
        "Choice between D30 and D36",
        "Stable structure",
        "Durable foam core",
      ],

      faq: [],
    },
  },
  {
    id: 2,
    slug: "classic-roll",
    name: "Matelas Classique (Roulé)",
    description:
      "Classic roll-packed mattress available in D30 and D36 densities.",

    category: "classic",
    subcategory: "roll",

    available: true,
    featured: false,

    basePrice: 95000,
    oldPrice: null,
    discount: 0,

    images: [
      "/images/classic/classic-D30-6.jpeg",
      "/images/classic/classic-D36-2.jpeg",
    ],

    details: {
      thickness: 22,
      firmness: 8,

      densities: [
        { value: "D30", label: "D30 High-density foam" },
        { value: "D36", label: "D36 Reinforced foam" },
      ],

      dimensions: [
        {
          size: "90 x 190",
          options: [
            { density: "D30", thickness: 20, price: 13500 },
            { density: "D36", thickness: 20, price: 16500 },
          ],
        },
      ],

      technicalSpecs: [
        { label: "Packaging", value: "Compressed & Roll-packed" },
        { label: "Warranty", value: "5–8 years depending on density" },
      ],

      advantages: [
        "Easy transport",
        "Space saving",
        "Density choice available",
      ],

      faq: [],
    },
  },

  /* ================= MULTI-LAYER RANGE ================= */

  {
    id: 3,
    slug: "hr-mattress",
    name: "Matelas Confort",
    description:
      "High-Resilience mattress designed for dynamic support and improved comfort.",

    category: "multi-layer",
    subcategory: "confort",
    available: true,
    featured: false,

    basePrice: 135000,
    oldPrice: null,
    discount: 0,

    images: [
      "/images/vissco/confort.jpeg",
      "/images/vissco/confort-3.jpeg",
      "/images/vissco/confort-4.jpeg",
      "/images/vissco/confort-5.jpeg",
      "/images/vissco/confort-1.jpeg",
      "/images/vissco/confort-2.jpeg",
    ],

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

    images: [
      "/images/vissco/vissco-1.jpeg",
      "/images/vissco/vissco.jpeg",
      "/images/vissco/vissco-2.jpeg",
      "/images/vissco/vissco-3.jpeg",
    ],

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

    images: [
      "/images/vissco/vissco-plus-1.jpeg",
      "/images/vissco/vissco-plus-4.jpeg",
      "/images/vissco/vissco-plus-5.jpeg",
      "/images/vissco/vissco-plus-6.jpeg",
      "/images/vissco/vissco-plus-7.jpeg",
      "/images/vissco/vissco-plus-8.jpeg",
    ],

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
    subcategory: "spring-confort",
    available: true,
    featured: false,

    basePrice: 99000,
    oldPrice: null,
    discount: 0,

    images: [
      "/images/ressort/ressort-confort-1.jpeg",
      "/images/ressort/ressort-confort.jpeg",
    ],

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
    subcategory: "spring-premium",
    available: true,
    featured: true,

    basePrice: 145000,
    oldPrice: null,
    discount: 0,

    images: [
      "/images/ressort/ressort-premium-1.jpeg",
      "/images/ressort/ressort-premium-2.jpeg",
      "/images/ressort/ressort-premium-3.jpeg",
      "/images/ressort/ressort-premium-4.jpeg",
      "/images/ressort/ressort-premium-5.jpeg",
      "/images/ressort/ressort-premium-6.jpeg",
      "/images/ressort/ressort-premium-7.jpeg",
    ],

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
    subcategory: "spring-prestige",
    available: true,
    featured: false,

    basePrice: 175000,
    oldPrice: null,
    discount: 0,

    images: [
      "/images/ressort/ressort-prestige-1.jpeg",
      "/images/ressort/ressort-prestige-2.jpeg",
      "/images/ressort/ressort-prestige-3.jpeg",
    ],

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
