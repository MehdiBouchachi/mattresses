"use client";

import { useState } from "react";
const mattresses = [
  /* ================= CLASSIQUE ================= */

  {
    id: "d30",
    name: "D30",
    range: "Classique",
    support: "Balanced everyday support",
    density: "30 kg/m³ polyurethane core",
    firmness: "Medium",
    technology:
      "Monobloc polyurethane foam designed for structural consistency and reliable comfort.",
    airflow: "Standard passive airflow",
    durability: "Good long-term resistance for daily adult use",
    motionIsolation: "Moderate",
    edgeSupport: "Standard foam edge stability",
    bestFor:
      "Ideal for daily adult use, guest rooms, and users seeking balanced firmness without contour-adaptive layers.",
  },

  {
    id: "d36",
    name: "D36",
    range: "Classique",
    support: "High structural support (Orthopedic profile)",
    density: "36 kg/m³ high-density polyurethane core",
    firmness: "Firm",
    technology:
      "High-density polyurethane foam engineered for enhanced spinal alignment and sag resistance.",
    airflow: "Standard passive airflow",
    durability: "High structural durability and compression resistance",
    motionIsolation: "Moderate",
    edgeSupport: "Reinforced foam edge stability",
    bestFor:
      "Recommended for users requiring firm support, back alignment stability, and long-term structural resistance.",
  },

  /* ================= MULTI-COUCHES ================= */

  {
    id: "visco-flex",
    name: "Visco Flex",
    range: "Multi-couches",
    support: "Contour-adaptive support",
    density: "Layered foam construction with visco-elastic comfort layer",
    firmness: "Medium",
    technology:
      "Flexible visco-elastic top layer combined with supportive polyurethane base for pressure redistribution.",
    airflow: "Improved airflow through layered ventilation",
    durability: "Enhanced resilience compared to monobloc foam",
    motionIsolation: "High",
    edgeSupport: "Standard foam edge stability",
    bestFor:
      "Suitable for side sleepers and individuals experiencing shoulder or hip pressure who require adaptive contouring.",
  },

  {
    id: "visco-hr",
    name: "Visco HR",
    range: "Multi-couches",
    support: "Adaptive support with high resilience recovery",
    density: "Visco-elastic comfort layer + HR (High Resilience) base foam",
    firmness: "Medium-Firm",
    technology:
      "Combination of visco-elastic foam and high-resilience base foam to optimize recovery rate and structural longevity.",
    airflow: "Improved ventilation channels",
    durability: "High resilience and long-term recovery performance",
    motionIsolation: "High",
    edgeSupport: "Improved foam edge integrity",
    bestFor:
      "Recommended for sleepers seeking contour comfort with faster recovery and stronger structural support.",
  },

  {
    id: "visco-plus",
    name: "Visco Plus",
    range: "Multi-couches",
    support: "Maximum pressure-relief configuration",
    density: "Triple-layer structure with increased visco-elastic thickness",
    firmness: "Medium",
    technology:
      "Extended visco-elastic layer thickness combined with supportive foam base for superior pressure absorption.",
    airflow: "Enhanced airflow between layers",
    durability: "High durability with reinforced internal layering",
    motionIsolation: "Very High",
    edgeSupport: "Standard foam edge support",
    bestFor:
      "Ideal for users requiring maximum pressure relief and improved sleep comfort, particularly side and combination sleepers.",
  },

  /* ================= RESSORTS ================= */

  {
    id: "ressort-confort",
    name: "Ressort Confort",
    range: "Ressorts",
    support: "Responsive spring support",
    density: "Interconnected spring core with foam padding layers",
    firmness: "Medium",
    technology:
      "Traditional interconnected spring system providing responsive bounce and structural airflow.",
    airflow: "Natural ventilation through spring core",
    durability: "Good durability under regular use",
    motionIsolation: "Low to Moderate",
    edgeSupport: "Standard perimeter stability",
    bestFor:
      "Suitable for sleepers who prefer responsive bounce and traditional spring feel with breathable structure.",
  },

  {
    id: "ressort-premium",
    name: "Ressort Premium",
    range: "Ressorts",
    support: "Reinforced spring support with edge-to-edge stability",
    density: "Upgraded spring unit with high-density foam encasement",
    firmness: "Medium-Firm",
    technology:
      "Reinforced spring core combined with high-density foam perimeter for improved structural integrity.",
    airflow: "Advanced spring ventilation system",
    durability: "High durability and enhanced edge resistance",
    motionIsolation: "Moderate",
    edgeSupport: "Enhanced edge-to-edge support",
    bestFor:
      "Recommended for couples or users requiring stronger edge stability and balanced spring responsiveness.",
  },

  {
    id: "ressort-prestige",
    name: "Ressort Prestige",
    range: "Ressorts",
    support: "Advanced structural and comfort optimization",
    density: "Premium-grade spring gauge with insulated comfort layers",
    firmness: "Medium-Firm",
    technology:
      "High-performance spring system with premium insulation layers to reduce motion transfer and improve airflow.",
    airflow: "Maximum airflow through advanced spring architecture",
    durability: "Very high structural longevity",
    motionIsolation:
      "Improved motion reduction compared to standard spring systems",
    edgeSupport: "Premium reinforced perimeter system",
    bestFor:
      "Ideal for users seeking premium airflow, structural durability, and improved motion reduction in a spring-based mattress.",
  },
];
const specs = [
  { key: "range", label: "Range" },
  { key: "support", label: "Support Profile" },
  { key: "density", label: "Core Structure" },
  { key: "firmness", label: "Firmness Level" },
  { key: "technology", label: "Technology" },
  { key: "airflow", label: "Airflow System" },
  { key: "durability", label: "Durability" },
  { key: "bestFor", label: "Best For" },
];

export default function MattressComparison() {
  const [first, setFirst] = useState("d30");
  const [second, setSecond] = useState("visco-flex");

  const A = mattresses.find((m) => m.id === first);
  const B = mattresses.find((m) => m.id === second);

  return (
    <section className="py-20 sm:py-24 lg:py-28  bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* HEADER */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-blue-950">
            Mattress Comparison
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Compare structural composition, comfort profile, and intended usage
            to determine which mattress best aligns with your sleep preferences.
          </p>
        </div>

        {/* SELECTORS */}
        <div className="grid sm:grid-cols-2 gap-6 mb-14">
          <Select value={first} setValue={setFirst} />
          <Select value={second} setValue={setSecond} />
        </div>

        {/* TABLE */}
        <div className="mt-16 hidden sm:block">
          {/* HEADER */}
          <div className="grid grid-cols-[220px_1fr_1fr] gap-8 pb-6 border-b border-blue-100">
            <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
              Specification
            </div>
            <div className="text-sm font-semibold text-blue-950">{A.name}</div>
            <div className="text-sm font-semibold text-blue-950">{B.name}</div>
          </div>

          {/* ROWS */}
          {specs.map((spec, i) => {
            const different = A[spec.key] !== B[spec.key];

            return (
              <div
                key={spec.key}
                className="grid grid-cols-[220px_1fr_1fr] gap-8 py-10 border-b border-blue-100 hover:bg-blue-50/40 transition duration-300"
              >
                {/* LABEL */}
                <div className="text-sm font-medium text-slate-500">
                  {spec.label}
                </div>

                {/* VALUE A */}
                <div
                  className={`text-sm leading-relaxed ${
                    different ? "text-blue-950 font-medium" : "text-slate-600"
                  }`}
                >
                  {A[spec.key]}
                </div>

                {/* VALUE B */}
                <div
                  className={`text-sm leading-relaxed ${
                    different ? "text-blue-950 font-medium" : "text-slate-600"
                  }`}
                >
                  {B[spec.key]}
                </div>
              </div>
            );
          })}
        </div>

        {/* MOBILE */}
        <div className="sm:hidden space-y-8">
          {[A, B].map((mattress) => (
            <div
              key={mattress.id}
              className="bg-white border border-blue-100 rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-blue-950 mb-6">
                {mattress.name}
              </h3>

              {specs.map((spec) => (
                <div key={spec.key} className="mb-5">
                  <p className="text-xs uppercase tracking-wide font-semibold text-blue-800 mb-1">
                    {spec.label}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {mattress[spec.key]}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Select({ value, setValue }) {
  return (
    <select
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full p-4 rounded-xl border border-blue-100 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
    >
      {mattresses.map((m) => (
        <option key={m.id} value={m.id}>
          {m.name} – {m.range}
        </option>
      ))}
    </select>
  );
}
