import { useState } from "react";
import "./GoalCard.css";

function GoalCard({ goal, completeGoal, deleteGoal, editGoal }) {
  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState(goal.title);
  const [description, setDescription] = useState(goal.description || "");
  const [deadline, setDeadline] = useState(goal.deadline || "");

  const handleSave = async () => {
    if (!title.trim()) return;

    await editGoal(goal.id, {
      title,
      description,
      deadline: deadline || null,
    });

    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="goal-card">

        <input
          className="edit-goal-input"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Goal title"
        />

        <input
          className="edit-goal-input"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Description"
        />

        <input
          className="edit-goal-input"
          type="date"
          value={deadline}
          onChange={(event) => setDeadline(event.target.value)}
        />

        <div className="goal-actions">
          <button
            className="complete-goal-btn"
            onClick={handleSave}
          >
            ✓ Save
          </button>

          <button
            className="delete-goal-btn"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </div>

      </div>
    );
  }

  return (
    <div className="goal-card">

      <h3>{goal.title}</h3>

      {goal.description && (
        <p>{goal.description}</p>
      )}

      {goal.deadline && (
        <span>
          Deadline:{" "}
          {new Date(goal.deadline).toLocaleDateString()}
        </span>
      )}

      <div className="goal-status">
        {goal.status}
      </div>

      <div className="goal-actions">

        {goal.status !== "completed" && (
          <button
            className="complete-goal-btn"
            onClick={() => completeGoal(goal.id)}
          >
            ✓ Complete Goal
          </button>
        )}

        <button
          className="complete-goal-btn"
          onClick={() => setIsEditing(true)}
        >
          ✏️ Edit
        </button>

        <button
          className="delete-goal-btn"
          onClick={() => deleteGoal(goal.id)}
        >
          🗑 Delete
        </button>

      </div>

    </div>
  );
}

export default GoalCard;