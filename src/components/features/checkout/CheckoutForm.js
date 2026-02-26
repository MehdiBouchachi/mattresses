import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

function CheckoutForm({ data, actions, i18n }) {
  const { form, isSubmitting } = data;
  const { change, submit } = actions;
  const { contact, shipping, payment, button } = i18n;

  return (
    <div className="space-y-8 sm:space-y-10 lg:space-y-12">
      {/* CONTACT */}
      <section className="space-y-4 sm:space-y-5">
        <h2 className="text-base sm:text-lg font-semibold">{contact.title}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <Input
            name="firstName"
            placeholder={contact.firstName}
            onChange={change}
          />
          <Input
            name="lastName"
            placeholder={contact.lastName}
            onChange={change}
          />
        </div>

        <Input name="email" placeholder={contact.email} onChange={change} />
        <Input name="phone" placeholder={contact.phone} onChange={change} />
      </section>

      {/* SHIPPING */}
      <section className="space-y-4 sm:space-y-5">
        <h2 className="text-base sm:text-lg font-semibold">{shipping.title}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <Input
            name="wilaya"
            placeholder={shipping.wilaya}
            onChange={change}
          />
          <Input name="city" placeholder={shipping.city} onChange={change} />
        </div>

        <Input name="street" placeholder={shipping.street} onChange={change} />
        <Input
          name="mapLink"
          placeholder={shipping.mapLink}
          onChange={change}
        />
      </section>

      {/* PAYMENT */}
      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-base sm:text-lg font-semibold">{payment.title}</h2>

        <div
          className="
            border border-beige-500
            rounded-lg sm:rounded-xl
            p-4 sm:p-5 lg:p-6
            bg-white
          "
        >
          <p className="font-medium text-sm sm:text-base">{payment.method}</p>

          <p className="text-xs sm:text-sm text-text-muted mt-1">
            {payment.description}
          </p>
        </div>
        <div className="pt-4 sm:pt-6">
          <Button
            variant="cta"
            size="lg"
            fullWidth
            loading={isSubmitting}
            loadingLabel={button.processing}
            onClick={submit}
          >
            {button.submit}
          </Button>
        </div>
      </section>

      {/* SUBMIT */}
    </div>
  );
}

export default CheckoutForm;
