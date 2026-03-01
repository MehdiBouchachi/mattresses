import { FiPhone, FiMail, FiMapPin, FiClock } from "react-icons/fi";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { getTranslations } from "@/lib/i18n";

export default async function ContactPage({ params }) {
  const { local } = await params;

  const {
    contactPage: { hero, form, info },
  } = getTranslations(local);

  return (
    <main className="bg-white min-h-screen">
      <ContactHero hero={hero} />
      <ContactSection locale={local} form={form} info={info} />
    </main>
  );
}

/* =========================================================
   HERO SECTION
========================================================= */

function ContactHero({ hero }) {
  return (
    <section className="relative pt-28 sm:pt-36 lg:pt-44 pb-20 text-center overflow-hidden">
      {/* Soft Blue Glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-175 h-175 bg-blue-100 rounded-full blur-[180px] opacity-40" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-6 text-blue-950">
          {hero.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          {hero.description}
        </p>
      </div>
    </section>
  );
}

/* =========================================================
   CONTACT SECTION
========================================================= */

function ContactSection({ locale, form, info }) {
  const isRTL = locale === "ar";

  return (
    <section className="pb-20 sm:pb-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          dir={isRTL ? "rtl" : "ltr"}
          className="
            bg-white
            rounded-3xl
            shadow-[0_30px_70px_rgba(0,0,0,0.05)]
            border border-blue-100
            p-6 sm:p-10 lg:p-14
            grid
            grid-cols-1
            md:grid-cols-2
            gap-12
          "
        >
          <ContactForm form={form} />

          <ContactInfo locale={locale} info={info} isRTL={isRTL} />
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   FORM SIDE
========================================================= */

function ContactForm({ form }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-8 text-blue-950">
        {form.title}
      </h2>

      <form className="space-y-7">
        <Input name="fullName" placeholder={form.fullName} />
        <Input name="email" type="email" placeholder={form.email} />

        <Textarea placeholder={form.message} />

        <Button variant="cta" size="lg" fullWidth>
          {form.button}
        </Button>
      </form>
    </div>
  );
}

/* =========================================================
   TEXTAREA
========================================================= */

function Textarea({ placeholder }) {
  return (
    <textarea
      rows={5}
      placeholder={placeholder}
      className="
        w-full
        rounded-xl
        border border-blue-100
        bg-white
        px-4 py-3
        text-base
        focus:border-blue-800
        focus:ring-1 focus:ring-blue-800
        outline-none
        transition
      "
    />
  );
}

/* =========================================================
   INFO SIDE
========================================================= */

function ContactInfo({ locale, info, isRTL }) {
  return (
    <div
      className={`
        space-y-10
        pt-6 md:pt-0
        ${!isRTL ? "md:pl-12 md:border-l" : "md:pr-12 md:border-r"}
        md:border-blue-100
      `}
    >
      <ContactItem
        icon={<FiPhone />}
        title={info.phone}
        text="+213 000 000 000"
      />

      <ContactItem
        icon={<FiMail />}
        title={info.email}
        text="contact@emprienteflex.com"
      />

      <ContactItem
        icon={<FiMapPin />}
        title={info.location}
        text={info.locationValue}
      />

      <ContactItem
        icon={<FiClock />}
        title={info.hours}
        text={info.hoursValue}
      />
    </div>
  );
}

/* =========================================================
   CONTACT ITEM
========================================================= */

function ContactItem({ icon, title, text }) {
  return (
    <div className="flex items-start gap-5">
      <div
        className="
          w-11 h-11
          rounded-full
          bg-blue-50
          flex items-center justify-center
          text-blue-950
          text-lg
        "
      >
        {icon}
      </div>

      <div>
        <h3 className="font-semibold mb-1 text-base text-blue-950">{title}</h3>

        <p className="text-slate-600 text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
