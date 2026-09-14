import "./AddGoal.css";

function AddGoal({
  title,
  setTitle,
  description,
  setDescription,
  deadline,
  setDeadline,
  addGoal,
}) {
  return (
    <form className="add-goal" onSubmit={addGoal}>
      <input
        type="text"
        placeholder="What do you want to achieve?"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <input
        type="text"
        placeholder="Add a short description..."
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      <input
        type="date"
        value={deadline}
        onChange={(event) => setDeadline(event.target.value)}
      />

      <button type="submit">
        + Add Goal
      </button>
    </form>
  );
}

export default AddGoal;