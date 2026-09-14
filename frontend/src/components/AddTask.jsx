import "./AddTask.css";

function AddTask({
  title,
  setTitle,
  priority,
  setPriority,
  addTask,
}) {
  return (
    <form className="add-task" onSubmit={addTask}>
      <input
        type="text"
        placeholder="What needs to be done?"
        value={title}
        onChange={(event) =>
          setTitle(event.target.value)
        }
      />

      <select
        value={priority}
        onChange={(event) =>
          setPriority(event.target.value)
        }
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button type="submit">
        + Add
      </button>
    </form>
  );
}

export default AddTask;