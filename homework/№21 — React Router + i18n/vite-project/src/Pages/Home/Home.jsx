import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Home.css";

function Home() {
  const { t } = useTranslation();

  return (
    <div className="home">
      <h1>{t("home.title")}</h1>
      <p>{t("home.description")}</p>
      <Link to="/courses">{t("home.button")}</Link>
    </div>
  );
}

export default Home;