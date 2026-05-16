import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./CourseCard.css";

function CourseCard({ id, title, teacher }) {
  const { t } = useTranslation();

  return (
    <div className="course-card">
      <h2>{title}</h2>
      <p>{t("courses.teacher")}: {teacher}</p>
      <Link to={`/courses/${id}`}>View Details →</Link>
    </div>
  );
}

export default CourseCard;