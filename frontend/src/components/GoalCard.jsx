import "./GoalCard.css";

function GoalCard({ goal }) {
  return (
    <div className="goal-card">

      <h3>{goal.title}</h3>

      {goal.description && (
        <p>{goal.description}</p>
      )}

      {goal.deadline && (
        <span>
          Deadline:{" "}
          {new Date(
            goal.deadline
          ).toLocaleDateString()}
        </span>
      )}

      <div className="goal-status">
        {goal.status}
      </div>

    </div>
  );
}

export default GoalCard;
