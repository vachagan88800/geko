import "./StudentCard.css";

function StudentCard({ name, age, profession, color, onDelete }) {
  return (
    <div className="student-card" style={{ backgroundColor: color }}>
      <div className="student-card__info">
        <h2>{name}</h2>
        <p>Տարիք: {age}</p>
        <p>Մասնագիտություն: {profession}</p>
      </div>
      <button className="student-card__delete" onClick={onDelete}>
        ✕
      </button>
    </div>
  );
}

export default StudentCard;