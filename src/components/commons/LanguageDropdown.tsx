import * as React from "react";
import { useTranslation } from "react-i18next";
import { withTranslation } from "react-i18next";
import "../../types/i18n.tsx";

function LocalesDropdown(props: any) {
  const [color, setColor] = React.useState(null);
  const onColorChange = (e: any) => props.updatelocale(e.target.value);
  const { t, i18n } = useTranslation();
  return (
    <div>
      <form>
        <select onChange={onColorChange} value={color}>
          <option>{t("select_language")}</option>
          <option value="en-GB">{t("English")}</option>
          <option value="fr-FR">{t("French")}</option>
          <option value="it-IT">{t("Italian")}</option>
          <option value="ja-JP">{t("Japanese")}</option>
          <option value="de-DE">{t("German")}</option>
        </select>
      </form>
    </div>
  );
}

export default withTranslation()(LocalesDropdown);


