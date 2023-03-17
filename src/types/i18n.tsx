import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en_GB: {
    translation: {

      monday: "monDay",
      tuesday: "tuesday",
      wednesday: "wednesday",
      thursday: "thursday",
      friday: "friday",
      saturday: "saturday",
      sunday: "sunday",
      "Open - Closed at":"Open - Closed at",
      "Closed - Open at" :"Closed - Open at",
      "closed":"Closed",
      "English":"English",
      "French":"French",
      "Italian":"Italian",
      "Japaneses":"Japaneses",
      "German":"German",
    },
  },
   ja: {
    translation: {

      monday: "月曜日",
      tuesday: "火曜日",
      wednesday: "水曜日",
      thursday: "木曜日",
      friday: "金曜日",
      saturday: "土曜日",
      sunday: "日曜日",
      "Open - Closed at":"オープン - クローズ",
      "Closed - Open at" :"定休日 - 開店時刻",
      "closed":"「定休日」",
      "English":"英語",
      "French":"フランス語",
      "Italian":"イタリア語",
      "Japaneses":"日本人",
      "German":"ドイツ語",
    },
  },
  de: {
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
      "closed": "Geschlossen",
      "English":"Englisch",
      "French":"Französisch",
      "Italian":"Italienisch",
      "Japaneses":"Japaner",
      "German":"Deutsch",
    },
  },
  it: {
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
      "closed": "Chiuso",
      "English":"Inglese",
      "French":"Francese",
      "Italian":"Italiano",
      "Japaneses":"Giapponesi",
      "German":"Tedesco",
    },
  },
  fr: {
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
      "View Details": "Voir les détails",
      "closed":"Fermé",
      "English":"Anglais",
      "French":"Français",
      "Italian":"Italien",
      "Japaneses":"Japonais",
      "German":"Allemand",
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