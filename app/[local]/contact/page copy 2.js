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
    <main className="bg-beige-300 min-h-screen">
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
    <section className="relative pt-24 sm:pt-32 lg:pt-40 pb-16 sm:pb-20 text-center overflow-hidden">
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-72 sm:w-96 lg:w-[700px] h-72 sm:h-96 lg:h-[700px] bg-beige-400 rounded-full blur-[160px] opacity-60" />

      <div className="relative max-w-2xl lg:max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight mb-4 sm:mb-5">
          {hero.title}
        </h1>

        <p className="text-sm sm:text-base text-text-muted leading-relaxed">
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
    <section className="pb-16 sm:pb-24 lg:pb-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="
            bg-white
            rounded-2xl sm:rounded-[36px] lg:rounded-[48px]
            shadow-[0_30px_80px_rgba(0,0,0,0.06)]
            p-6 sm:p-8 lg:p-14
            grid
            grid-cols-1
            md:grid-cols-2
            gap-10 sm:gap-12 lg:gap-16
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
      <h2 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8">
        {form.title}
      </h2>

      <form className="space-y-6 sm:space-y-7">
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
   TEXTAREA (Using same design system as Input)
========================================================= */

function Textarea({ placeholder }) {
  return (
    <textarea
      rows={5}
      placeholder={placeholder}
      className="
        w-full
        rounded-xl
        border border-beige-500
        bg-white
        px-4 py-3
        text-sm sm:text-base
        focus:border-primary-600
        focus:ring-1 focus:ring-primary-600
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
        space-y-8 sm:space-y-10
        pt-6 md:pt-0
        ${!isRTL ? "md:pl-10 lg:pl-12 md:border-l" : "md:pr-10 lg:pr-12 md:border-r"}
        md:border-beige-500
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
        text="contact@litmad.com"
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
    <div className="flex items-start gap-4 sm:gap-5">
      <div
        className="
          w-10 h-10 sm:w-11 sm:h-11
          rounded-full
          bg-primary-100
          flex items-center justify-center
          text-primary-600
          text-base sm:text-lg
        "
      >
        {icon}
      </div>

      <div>
        <h3 className="font-semibold mb-1 text-sm sm:text-base">{title}</h3>

        <p className="text-text-muted text-xs sm:text-sm leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
}
