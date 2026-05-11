import { useState } from "react";
import StudentForm from "./components/StudentForm/StudentForm";
import StudentList from "./components/StudentList/StudentList";
import "./index.css";

const COLORS = ["#ffd43b", "#74c0fc", "#8ce99a", "#ffa94d", "#da77f2", "#f783ac"];

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: "Arman", age: 20, profession: "Frontend", color: "#ffd43b" },
  ]);
  const [search, setSearch] = useState("");

  function addStudent(studentData) {
    const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    const newStudent = {
      id: Date.now(),
      ...studentData,
      color: randomColor,
    };
    setStudents([...students, newStudent]);
  }

  function deleteStudent(id) {
    setStudents(students.filter((s) => s.id !== id));
  }

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <h1>Student Card Manager</h1>
      <StudentForm onAdd={addStudent} />
      <input
        className="search-input"
        type="text"
        placeholder="Փնտրել ուսանող..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <StudentList students={filteredStudents} onDelete={deleteStudent} />
    </div>
  );
}

export default App;