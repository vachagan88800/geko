import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import courses from "../../courses";
import "./CourseDetails.css";

function CourseDetails() {
  const { id } = useParams();
  const { t } = useTranslation();

  const course = courses.find((c) => c.id === Number(id));

  if (!course) {
    return (
      <div className="course-details">
        <h1>Course not found</h1>
        <Link to="/courses">{t("details.back")}</Link>
      </div>
    );
  }

  return (
    <div className="course-details">
      <h1>{course.title}</h1>
      <p><strong>{t("details.teacher")}:</strong> {course.teacher}</p>
      <p><strong>{t("details.description")}:</strong> {course.description}</p>
      <Link to="/courses">{t("details.back")}</Link>
    </div>
  );
}

export default CourseDetails;