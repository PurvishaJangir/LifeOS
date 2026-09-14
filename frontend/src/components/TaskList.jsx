import "./TaskList.css";
import TaskCard from "./TaskCard";

function TaskList({
  tasks,
  completeTask,
  deleteTask,
}) {
  return (
    <div className="task-list">

      {tasks.length === 0 ? (
        <div className="empty-state">
          <div>✦</div>

          <h3>
            Your task list is clear
          </h3>

          <p>
            Add your first task above.
          </p>
        </div>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            completeTask={completeTask}
            deleteTask={deleteTask}
          />
        ))
      )}

    </div>
  );
}

export default TaskList;