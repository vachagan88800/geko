import StudentCard from "../StudentCard/StudentCard";
import "./StudentList.css";

function StudentList({ students, onDelete }) {
  if (students.length === 0) {
    return <p className="student-list__empty">Ուսանողներ չկան</p>;
  }

  return (
    <div className="student-list">
      {students.map((student) => (
        <StudentCard
          key={student.id}
          name={student.name}
          age={student.age}
          profession={student.profession}
          color={student.color}
          onDelete={() => onDelete(student.id)}
        />
      ))}
    </div>
  );
}

export default StudentList;