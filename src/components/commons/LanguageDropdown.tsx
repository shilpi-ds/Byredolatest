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
          <option>{t("Select Language")}</option>
          <option value="en_GB">{t("English")}</option>
          <option value="fr_FR">{t("French")}</option>
          <option value="it_IT">{t("Italian")}</option>
          <option value="ja_JP">{t("Japanese")}</option>
          <option value="de_DE">{t("German")}</option>
        </select>
      </form>
    </div>
  );
}

export default withTranslation()(LocalesDropdown);


