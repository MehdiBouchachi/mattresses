"use client";
import { FiActivity, FiLayers, FiWind, FiMoon } from "react-icons/fi";
export default function WhyLitmadSection() {
  return (
    <section className="py-44 bg-beige-300">
      <div className="max-w-7xl mx-auto px-8">
        {/* ===== TOP HEADLINE BLOCK ===== */}
        <div className="text-center mb-24">
          <h2 className="text-4xl font-semibold tracking-tight mb-6">
            Why Choose LITMAD?
          </h2>
          <p className="text-text-body max-w-2xl mx-auto leading-relaxed">
            Designed with precision engineering and premium materials, LITMAD
            mattresses redefine comfort, durability, and sleep quality.
          </p>
        </div>

        {/* ===== MAIN GRID ===== */}
        <div className="grid lg:grid-cols-2 gap-24 items-center mb-28">
          {/* LEFT IMAGE */}
          <div
            className="relative rounded-[40px] overflow-hidden 
            shadow-[0_40px_80px_rgba(0,0,0,0.08)]"
          >
            <img
              src="/images/mattresses.png"
              alt="LITMAD Mattress"
              className="w-full h-[520px] object-cover"
            />

            {/* subtle overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-t 
              from-black/15 via-transparent to-transparent"
            />
          </div>

          {/* RIGHT STATEMENT BLOCK */}
          <div className="space-y-8">
            <div className="border-l-4 border-primary-600 pl-6">
              <h3 className="text-xl font-semibold mb-3">
                Engineered for Alignment
              </h3>
              <p className="text-text-body leading-relaxed">
                Every layer is structured to support natural spine posture while
                maintaining adaptive comfort.
              </p>
            </div>

            <div className="border-l-4 border-primary-600 pl-6">
              <h3 className="text-xl font-semibold mb-3">Built to Last</h3>
              <p className="text-text-body leading-relaxed">
                High-resilience foam and durable materials preserve shape,
                performance, and structure over time.
              </p>
            </div>

            <div className="border-l-4 border-primary-600 pl-6">
              <h3 className="text-xl font-semibold mb-3">
                Refined Comfort Experience
              </h3>
              <p className="text-text-body leading-relaxed">
                Breathable construction ensures airflow and optimal hygiene
                night after night.
              </p>
            </div>
          </div>
        </div>

        {/* ===== BENEFITS GRID (STRONG VISUAL IMPACT) ===== */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-28">
          {[
            {
              icon: FiActivity,
              title: "Perfect Spine Alignment",
            },
            {
              icon: FiLayers,
              title: "High Resilience Foam",
            },
            {
              icon: FiWind,
              title: "Breathable Structure",
            },
            {
              icon: FiMoon,
              title: "Motion Isolation",
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="group bg-beige-50 rounded-3xl p-8 
        border border-beige-600
        shadow-[0_15px_40px_rgba(0,0,0,0.04)]
        hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)]
        transition duration-500
        flex flex-col items-center text-center"
              >
                <div
                  className="w-14 h-14 mb-6 rounded-full
                  bg-primary-600/10 
                  flex items-center justify-center
                  text-primary-600 text-xl
                  group-hover:bg-primary-600
                  group-hover:text-primary-50
                  transition duration-500"
                >
                  <Icon />
                </div>

                <h4 className="text-lg font-semibold">{item.title}</h4>
              </div>
            );
          })}
        </div>

        {/* ===== TRUST STRIP ===== */}
        <div className="grid grid-cols-3 text-center border-t border-beige-650 pt-10">
          <div>
            <p className="text-3xl font-semibold">10+</p>
            <p className="text-sm text-text-body mt-2">
              Years of Expertise
            </p>
          </div>

          <div>
            <p className="text-3xl font-semibold">98%</p>
            <p className="text-sm text-text-body mt-2">
              Customer Satisfaction
            </p>
          </div>

          <div>
            <p className="text-3xl font-semibold">100%</p>
            <p className="text-sm text-text-body mt-2">
              Premium Materials
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
