import { useState } from "react";
import "./StudentForm.css";

function StudentForm({ onAdd }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [profession, setProfession] = useState("Frontend");

  function handleSubmit() {
    if (!name.trim() || !age) return;
    onAdd({ name, age: Number(age), profession });
    setName("");
    setAge("");
    setProfession("Frontend");
  }

  return (
    <div className="student-form">
      <input
        type="text"
        placeholder="Անուն"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Տարիք"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <select value={profession} onChange={(e) => setProfession(e.target.value)}>
        <option>Frontend</option>
        <option>Backend</option>
        <option>Design</option>
        <option>DevOps</option>
        <option>Mobile</option>
      </select>
      <button onClick={handleSubmit}>Add Student</button>
    </div>
  );
}

export default StudentForm;