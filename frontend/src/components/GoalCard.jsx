import "./GoalCard.css";

function GoalCard({ goal, completeGoal }) {
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

      {goal.status !== "completed" && (
        <button
          className="complete-goal-btn"
          onClick={() => completeGoal(goal.id)}
        >
          ✓ Complete Goal
        </button>
      )}

    </div>
  );
}

export default GoalCard;