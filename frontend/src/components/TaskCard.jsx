import "./TaskCard.css";

function TaskCard({ task, completeTask, deleteTask }) {
  return (
    <div
      className={`task-card ${
        task.status === "completed"
          ? "completed"
          : ""
      }`}
    >
      <button
        className="complete-btn"
        onClick={() => completeTask(task.id)}
      >
        {task.status === "completed" ? "✓" : ""}
      </button>

      <div className="task-content">
        <h3>{task.title}</h3>

        <div className="task-meta">
          <span
            className={`priority ${task.priority}`}
          >
            {task.priority}
          </span>

          {task.due_date && (
            <span>
              ◷{" "}
              {new Date(
                task.due_date
              ).toLocaleDateString(
                "en-IN",
                {
                  day: "numeric",
                  month: "short",
                }
              )}
            </span>
          )}
        </div>
      </div>

      <button
        className="delete-btn"
        onClick={() => deleteTask(task.id)}
      >
        ×
      </button>
    </div>
  );
}

export default TaskCard;