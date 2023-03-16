import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en_GB: {
    translation: {

      monday: "MonDay",
      tuesday: "tuesday",
      wednesday: "wednesday",
      thursday: "thursday",
      friday: "friday",
      saturday: "saturday",
      sunday: "sunday",
      "Open - Closed at":"Open - Closed at",
      "Closed - Open at" :"Closed - Open at",
    },
  },
   ja_JP: {
    translation: {
      monday: "getsuyobi",
      tuesday: "kayobi",
      wednesday: "suiyobi",
      thursday: "mokuyobi",
      friday: "kinyobi",
      saturday: "doyobi",
      sunday: "nichiyobi",
      "Open - Closed at":"open - close",
      "Closed - Open at" :"teikyuubi - kaiten jikoku",
    },
  },
  de_DE: {
    translation: {

      monday: "Montag",
      tuesday: "Dienstag",
      wednesday: "Mittwoch",
      thursday: "Donnerstag",
      friday: "Freitag",
      saturday: "Samstag",
      sunday: "Sonntag",
      "Open - Closed at":"Öffnen - Geschlossen um",
      "Closed - Open at" :"Geschlossen - Geöffnet um",
    },
  },
  it_IT: {
    translation: {

      monday: "Lunedì",
      tuesday: "Martedì",
      wednesday: "Mercoledì",
      thursday: "Giovedì",
      friday: "Venerdì",
      saturday: "Sabato",
      sunday: "Domenica",
      "Open - Closed at":"Aperto - Chiuso alle",
      "Closed - Open at" :"Chiuso - Aperto alle",
    },
  },
  fr_FR: {
    translation: {
    
      monday: "Lundi",
      tuesday: "mardi",
      wednesday: "mercredi",
      thursday: "jeudi",
      friday: "Vendredi",
      saturday: "samedi",
      sunday: "dimanche",
      "Open - Closed at":"Ouvert - Fermé à",
      "Closed - Open at" :"Fermé - Ouvert à",
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
      lng: "en_GB", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });
export default i18n;