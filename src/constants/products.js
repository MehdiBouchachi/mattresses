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

/* ================= PRODUCTS ================= */

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
      whyChoose: [
        "Soutien ferme recommandé pour maintenir correctement la colonne vertébrale",
        "Disponible en D30 pour un confort équilibré ou D36 pour une durabilité renforcée",
        "Conçu pour résister à l’affaissement même après plusieurs années d’usage",
        "Double face réversible pour prolonger la durée de vie du matelas",
        "Idéal pour adultes recherchant un couchage stable et structuré",
      ],

      technicalSpecs: [
        {
          label: "Type de mousse",
          value: "Mousse polyuréthane expansée haute densité",
        },
        { label: "Densité", value: "D30 (30 kg/m³) ou D36 (36 kg/m³)" },
        { label: "Structure interne", value: "Bloc monobloc haute résilience" },
        { label: "Indice de fermeté", value: "7/10 à 8/10" },
        { label: "Portance", value: "Adaptée aux charges élevées" },
        { label: "Faces", value: "Double face utilisable" },
        { label: "Hauteur totale", value: "20 à 25 cm selon option" },
        { label: "Conditionnement", value: "Livré à plat (non compressé)" },
        { label: "Garantie fabricant", value: "5 à 8 ans selon densité" },
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
      "/images/classic/classic-D36-2.jpeg",
      "/images/classic/classic-D30-6.jpeg",
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
      whyChoose: [
        "Même qualité de soutien que le modèle classique ouvert",
        "Format compressé idéal pour appartements et espaces difficiles d’accès",
        "Installation rapide : reprend sa forme naturelle après ouverture",
        "Disponible en D30 pour confort équilibré ou D36 pour soutien renforcé",
        "Parfait pour jeunes couples, studios et déménagements fréquents",
      ],
      technicalSpecs: [
        { label: "Type de mousse", value: "Mousse polyuréthane haute densité" },
        { label: "Densité", value: "D30 (30 kg/m³) ou D36 (36 kg/m³)" },
        {
          label: "Structure interne",
          value: "Bloc monobloc compressible sous vide",
        },
        { label: "Indice de fermeté", value: "7/10 à 8/10" },
        {
          label: "Hauteur totale",
          value: "20 cm ou 25 cm selon configuration",
        },
        {
          label: "Conditionnement",
          value: "Compressé, roulé et scellé sous vide",
        },
        {
          label: "Temps de reprise",
          value: "Expansion complète en 24 à 48 heures",
        },
        { label: "Garantie fabricant", value: "5 à 8 ans selon densité" },
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
      whyChoose: [
        "Balanced comfort – not too hard and not too soft",
        "Keeps your back well supported during the night",
        "Breathable design that stays fresh while you sleep",
        "Comfortable for most sleeping positions",
        "Great choice for daily family use",
      ],
      technicalSpecs: [
        { label: "Bottom Layer", value: "High-density D36 foam" },
        { label: "Middle Layer", value: "High-resilience foam" },
        { label: "Top Layer", value: "Memory foam (50 kg/m³)" },
        { label: "Firmness Level", value: "Medium-firm" },
        { label: "Motion Isolation", value: "Very high" },
        { label: "Thickness Options", value: "20 cm / 25 cm" },
        { label: "Warranty", value: "12 years" },
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

      whyChoose: [
        "Soft top layer that gently shapes to your body",
        "Reduces pressure on shoulders and hips",
        "Very comfortable for people with back discomfort",
        "Absorbs movement so your partner won’t disturb you",
        "Gives a cozy and relaxing sleep feeling",
      ],

      technicalSpecs: [
        { label: "Top Layer", value: "Memory foam comfort layer" },
        { label: "Memory Foam Density", value: "50 kg/m³" },
        { label: "Support Base", value: "High-density foam core" },
        { label: "Firmness Level", value: "Medium comfort" },
        {
          label: "Motion Isolation",
          value: "High – reduces partner disturbance",
        },
        { label: "Thickness Options", value: "20 cm / 25 cm / 30 cm" },
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
      whyChoose: [
        "Stronger support than standard memory foam mattresses",
        "Comfort layer that adapts without deep sinking",
        "Very stable even for heavier body weight",
        "Premium construction designed to last for many years",
        "Perfect balance between support and comfort",
      ],
      technicalSpecs: [
        { label: "Base Layer", value: "Reinforced D36 high-density foam" },
        { label: "Middle Layer", value: "High-resilience stability foam" },
        { label: "Top Layer", value: "50 kg/m³ memory foam" },
        { label: "Firmness Level", value: "Medium-firm" },
        { label: "Motion Isolation", value: "Very high" },
        { label: "Thickness Options", value: "20 cm / 25 cm" },
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
      whyChoose: [
        "Traditional spring support with a comfortable feel",
        "Naturally breathable – stays cooler during sleep",
        "Stable surface that does not sink easily",
        "Good choice for people who prefer a classic mattress feel",
        "Affordable option with reliable durability",
      ],
      technicalSpecs: [
        {
          label: "Support System",
          value: "Classic interconnected spring system",
        },
        { label: "Comfort Layer", value: "Foam padding layer" },
        { label: "Firmness Level", value: "Medium-firm" },
        { label: "Air Circulation", value: "High natural airflow" },
        { label: "Thickness Options", value: "25 cm / 30 cm" },
        { label: "Recommended Use", value: "Daily adult use" },
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
      whyChoose: [
        "Stronger spring structure for better long-term support",
        "More stable sleeping surface with less movement transfer",
        "Comfortable balance between firmness and softness",
        "Good option for couples",
        "Designed to maintain its shape for years",
      ],
      technicalSpecs: [
        {
          label: "Support System",
          value: "Reinforced interconnected spring system",
        },
        {
          label: "Spring Gauge",
          value: "Thicker steel springs for durability",
        },
        { label: "Comfort Layer", value: "Multi-layer foam padding" },
        { label: "Firmness Level", value: "Firm" },
        { label: "Motion Control", value: "Improved stability" },
        { label: "Thickness Options", value: "25 cm / 30 cm" },
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
      whyChoose: [
        "Premium spring system for strong and stable support",
        "Extra comfort layers for a softer sleeping surface",
        "Excellent airflow for a fresher sleep environment",
        "Balanced feel – supportive yet comfortable",
        "Built for long-term performance and durability",
      ],
      technicalSpecs: [
        { label: "Support System", value: "Premium reinforced spring core" },
        {
          label: "Comfort Layers",
          value: "Enhanced multi-layer padding system",
        },
        { label: "Firmness Level", value: "Medium to firm" },
        {
          label: "Air Circulation",
          value: "High ventilation through spring core",
        },
        { label: "Thickness Options", value: "25 cm / 30 cm" },
        { label: "Recommended For", value: "Adults and couples" },
        { label: "Warranty", value: "10 years" },
      ],
      advantages: ["Luxury comfort", "Balanced support", "High durability"],
      faq: [],
    },
  },
];

export const itemsPerPage = 6;
