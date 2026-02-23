"use client";

import { FiPhone, FiMail, FiMapPin, FiClock } from "react-icons/fi";
import Button from "@/components/ui/Button";

export default function ContactPage() {
  return (
    <main className="bg-beige-300 min-h-screen">
      {/* ================= HERO ================= */}
      <section className="relative pt-40 pb-20 text-center overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-175 h-175 bg-beige-400 rounded-full blur-[160px] opacity-60" />

        <div className="relative max-w-3xl mx-auto px-8">
          <h1 className="text-4xl font-semibold tracking-tight mb-5">
            Let’s Begin the Conversation
          </h1>

          <p className="text-base text-text-muted leading-relaxed">
            Whether you have questions about comfort, materials, or delivery —
            our team is ready to assist you.
          </p>
        </div>
      </section>

      {/* ================= CONTACT CARD ================= */}
      <section className="pb-28">
        <div className="max-w-6xl mx-auto px-8">
          <div
            className="bg-white rounded-[48px] 
            shadow-[0_50px_120px_rgba(0,0,0,0.06)]
            p-14 grid md:grid-cols-2 gap-16"
          >
            {/* LEFT FORM */}
            <div>
              <h2 className="text-2xl font-semibold mb-8">Send Us a Message</h2>

              <form className="space-y-7">
                <FormField label="Full Name" />
                <FormField label="Email Address" type="email" />
                <FormTextarea label="Message" />

                <Button
                  size="lg"
                  className="w-full bg-primary-600 text-white 
                  hover:bg-primary-700 
                  shadow-[0_18px_40px_rgba(43,45,110,0.25)]"
                >
                  Submit Inquiry
                </Button>
              </form>
            </div>

            {/* RIGHT INFO */}
            <div className="space-y-10 border-l border-beige-900 pl-12">
              <ContactItem
                icon={<FiPhone />}
                title="Phone"
                text="+213 000 000 000"
              />

              <ContactItem
                icon={<FiMail />}
                title="Email"
                text="contact@litmad.com"
              />

              <ContactItem
                icon={<FiMapPin />}
                title="Location"
                text="Algiers, Algeria"
              />

              <ContactItem
                icon={<FiClock />}
                title="Working Hours"
                text="Saturday – Thursday | 9:00 AM – 6:00 PM"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ================= FORM COMPONENTS ================= */

function FormField({ label, type = "text" }) {
  return (
    <div>
      <label className="text-sm text-text-muted block mb-2">{label}</label>
      <input
        type={type}
        className="w-full border border-beige-300 rounded-xl px-5 py-3 text-sm 
        focus:outline-none focus:ring-2 focus:ring-primary-600/20 
        focus:border-primary-600 transition"
      />
    </div>
  );
}

function FormTextarea({ label }) {
  return (
    <div>
      <label className="text-sm text-text-muted block mb-2">{label}</label>
      <textarea
        rows="5"
        className="w-full border border-beige-600 rounded-xl px-5 py-3 text-sm 
        focus:outline-none focus:ring-2 focus:ring-primary-600/20 
        focus:border-primary-600 transition"
      />
    </div>
  );
}

/* ================= CONTACT ITEM ================= */

function ContactItem({ icon, title, text }) {
  return (
    <div className="flex items-start gap-5">
      <div
        className="w-11 h-11 rounded-full bg-primary-100 
        flex items-center justify-center text-primary-600 text-lg"
      >
        {icon}
      </div>

      <div>
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-text-muted text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
