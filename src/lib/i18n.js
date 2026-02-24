import en from "../messages/en.json";
import fr from "../messages/fr.json";
import ar from "../messages/ar.json";

const messages = { en, fr, ar };

export function getTranslations(locale) {
  return messages[locale] || messages.en;
}
