export const formatPrice = (price, locale) =>
  new Intl.NumberFormat("fr-DZ").format(price) +
  (locale === "ar" ? " د.ج" : " DA");
