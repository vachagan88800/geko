import { useTranslation } from "react-i18next";
import CourseCard from "../../components/CourseCard/CourseCard";
import courses from "../../courses";
import "./Courses.css";

function Courses() {
  const { t } = useTranslation();

  return (
    <div className="courses">
      <h1>{t("courses.title")}</h1>
      <div className="courses__grid">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            id={course.id}
            title={course.title}
            teacher={course.teacher}
          />
        ))}
      </div>
    </div>
  );
}

export default Courses;