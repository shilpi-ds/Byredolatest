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
          <option value="en_GB">{t("english")}</option>
          <option value="fr">{t("french")}</option>
          <option value="it">{t("italian")}</option>
          <option value="ja">{t("japanese")}</option>
          <option value="de">{t("german")}</option>
        </select>
      </form>
    </div>
  );
}

export default withTranslation()(LocalesDropdown);


