import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./NotFound.css";

function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="not-found">
      <h1>{t("notFound.title")}</h1>
      <Link to="/">{t("notFound.back")}</Link>
    </div>
  );
}

export default NotFound;