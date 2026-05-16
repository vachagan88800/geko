import { useTranslation } from "react-i18next";
import "./LanguageSwitcher.css";

function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  return (
    <div className="language-switcher">
      <span>{t("language")}:</span>
      <button
        className={i18n.language === "en" ? "active" : ""}
        onClick={() => i18n.changeLanguage("en")}
      >
        EN
      </button>
      <button
        className={i18n.language === "hy" ? "active" : ""}
        onClick={() => i18n.changeLanguage("hy")}
      >
        HY
      </button>
    </div>
  );
}

export default LanguageSwitcher;