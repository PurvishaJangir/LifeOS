import { useEffect, useState } from "react";
import "./App.css";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import StatCard from "./components/StatCard";
import GoalCard from "./components/GoalCard";
import BrainDump from "./components/BrainDump";
import AISection from "./components/AISection";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import AddGoal from "./components/AddGoal";

import {
  getTasks,
  getGoals,
  createTask,
  updateTask,
  deleteTask as deleteTaskAPI,
  processBrainDump,
  createGoal,
} from "./services/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");

  const [brainDump, setBrainDump] = useState("");
  const [brainDumpLoading, setBrainDumpLoading] = useState(false);
  const [brainDumpMessage, setBrainDumpMessage] = useState("");

  const [goals, setGoals] = useState([]);
  const [goalTitle, setGoalTitle] = useState("");
  const [goalDescription, setGoalDescription] = useState("");
  const [goalDeadline, setGoalDeadline] = useState("");

  // ==================== FETCH TASKS ====================

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // ==================== FETCH GOALS ====================

  const fetchGoals = async () => {
    try {
      const data = await getGoals();
      setGoals(data);
    } catch (error) {
      console.error(
        "Failed to fetch goals:",
        error
      );
    }
  };

  // ==================== ADD GOAL ====================

  const addGoal = async (event) => {
    event.preventDefault();

    if (!goalTitle.trim()) return;

    try {
      await createGoal({
        title: goalTitle,
        description: goalDescription,
        deadline: goalDeadline || null,
      });

      setGoalTitle("");
      setGoalDescription("");
      setGoalDeadline("");

      fetchGoals();
    } catch (error) {
      console.error("Error adding goal:", error);
    }
  };

  // ==================== INITIAL LOAD ====================

  useEffect(() => {
    fetchTasks();
    fetchGoals();
  }, []);

  // ==================== BRAIN DUMP ====================

  const handleBrainDump = async () => {
    if (!brainDump.trim()) return;

    setBrainDumpLoading(true);
    setBrainDumpMessage("");

    try {
      await processBrainDump(brainDump);

      setBrainDump("");

      setBrainDumpMessage(
        "Tasks created successfully! 🚀"
      );

      // Refresh tasks
      const updatedTasks = await getTasks();
      setTasks(updatedTasks);
    } catch (error) {
      console.error(error);

      setBrainDumpMessage(
        "Something went wrong. Please try again."
      );
    } finally {
      setBrainDumpLoading(false);
    }
  };

  // ==================== ADD TASK ====================

  const addTask = async (event) => {
    event.preventDefault();

    if (!title.trim()) return;

    try {
      await createTask({
        title: title,
        priority: priority,
        status: "pending",
      });

      setTitle("");
      setPriority("medium");

      fetchTasks();
    } catch (error) {
      console.error(
        "Error adding task:",
        error
      );
    }
  };

  // ==================== COMPLETE TASK ====================

  const completeTask = async (id) => {
    try {
      await updateTask(id, {
        status: "completed",
      });

      fetchTasks();
    } catch (error) {
      console.error(
        "Error completing task:",
        error
      );
    }
  };

  // ==================== DELETE TASK ====================

  const deleteTask = async (id) => {
    try {
      await deleteTaskAPI(id);

      fetchTasks();
    } catch (error) {
      console.error(
        "Error deleting task:",
        error
      );
    }
  };

  // ==================== STATISTICS ====================

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status !== "completed"
  ).length;

  const highPriorityTasks = tasks.filter(
    (task) =>
      task.priority === "high" &&
      task.status !== "completed"
  ).length;

  // ==================== UI ====================

  return (
    <div className="app">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="main">

        {/* Topbar */}
        <Topbar />

        {/* ==================== STATS ==================== */}

        <div className="stats-grid">

          <StatCard
            icon="✓"
            label="Total Tasks"
            value={tasks.length}
            variant="purple"
          />

          <StatCard
            icon="◷"
            label="Pending"
            value={pendingTasks}
            variant="blue"
          />

          <StatCard
            icon="✓"
            label="Completed"
            value={completedTasks}
            variant="green"
          />

          <StatCard
            icon="!"
            label="High Priority"
            value={highPriorityTasks}
            variant="red"
          />

        </div>

        {/* ==================== GOALS ==================== */}

        <div className="goals-section">

          <div className="section-header">

            <div>
              <span className="section-label">
                YOUR GOALS
              </span>

              <h2>Goals 🎯</h2>
            </div>

          </div>

          <AddGoal
            title={goalTitle}
            setTitle={setGoalTitle}
            description={goalDescription}
            setDescription={setGoalDescription}
            deadline={goalDeadline}
            setDeadline={setGoalDeadline}
            addGoal={addGoal}
          />

          <div className="goals-grid">
            {goals.length === 0 ? (
              <p>No goals yet.</p>
            ) : (
              goals.map((goal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                />
              ))
            )}
          </div>
        </div>

        {/* ==================== DASHBOARD ==================== */}

        <section className="dashboard-grid">

          {/* ==================== TASKS ==================== */}

          <div className="panel tasks-panel">

            <div className="panel-header">

              <div>
                <p className="eyebrow">
                  YOUR WORK
                </p>

                <h2>
                  Today's Tasks
                </h2>
              </div>

              <span className="task-count">
                {pendingTasks} pending
              </span>

            </div>

            {/* Add Task */}

            <AddTask
              title={title}
              setTitle={setTitle}
              priority={priority}
              setPriority={setPriority}
              addTask={addTask}
            />

            {/* Task List */}

            <TaskList
              tasks={tasks}
              completeTask={completeTask}
              deleteTask={deleteTask}
            />

          </div>

          {/* ==================== RIGHT COLUMN ==================== */}

          <div className="right-column">

            {/* AI CARD */}

            <AISection />

            <BrainDump
              brainDump={brainDump}
              setBrainDump={setBrainDump}
              brainDumpLoading={brainDumpLoading}
              brainDumpMessage={brainDumpMessage}
              handleBrainDump={handleBrainDump}
            />

            {/* PRODUCTIVITY */}

            <div className="panel progress-panel">

              <div className="panel-header">

                <div>

                  <p className="eyebrow">
                    TODAY
                  </p>

                  <h2>
                    Productivity
                  </h2>

                </div>

              </div>

              <div className="progress-circle">

                <div>

                  <strong>
                    {tasks.length
                      ? Math.round(
                        (completedTasks /
                          tasks.length) *
                        100
                      )
                      : 0}
                    %
                  </strong>

                  <span>
                    complete
                  </span>

                </div>

              </div>

              <p className="progress-text">

                {completedTasks ===
                  tasks.length &&
                  tasks.length > 0
                  ? "Everything is done. Nice work! 🎉"
                  : `${pendingTasks} task${pendingTasks !== 1
                    ? "s"
                    : ""
                  } still to go.`}

              </p>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default App;