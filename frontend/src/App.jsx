import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [brainDump, setBrainDump] = useState("");
  const [brainDumpLoading, setBrainDumpLoading] = useState(false);
  const [brainDumpMessage, setBrainDumpMessage] = useState("");

  const handleBrainDump = async () => {
    if (!brainDump.trim()) return;

    setBrainDumpLoading(true);
    setBrainDumpMessage("");

    try {
      const response = await fetch(
        "http://localhost:5678/webhook-test/472bc513-f588-425d-9b43-8a99afb4ebb9",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: brainDump,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to process brain dump");
      }

      await response.json();

      setBrainDump("");
      setBrainDumpMessage("Tasks created successfully! 🚀");

      // Refresh tasks from PostgreSQL through the backend
      const tasksResponse = await fetch(
        "http://localhost:5000/api/tasks"
      );

      const updatedTasks = await tasksResponse.json();
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

  const fetchTasks = () => {
    fetch("http://localhost:5000/api/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (event) => {
    event.preventDefault();

    if (!title.trim()) return;

    try {
      await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          priority: priority,
          status: "pending",
        }),
      });

      setTitle("");
      setPriority("medium");
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const completeTask = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "completed",
        }),
      });

      fetchTasks();
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "DELETE",
      });

      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status !== "completed"
  ).length;

  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "high" && task.status !== "completed"
  ).length;

  return (
    <div className="app">

      {/* Sidebar */}
      <aside className="sidebar">

        <div className="logo">
          <div className="logo-icon">✦</div>
          <div>
            <h2>LifeOS</h2>
            <span>Personal OS</span>
          </div>
        </div>

        <nav>
          <p className="nav-label">WORKSPACE</p>

          <button className="nav-item active">
            <span>⌂</span>
            Dashboard
          </button>

          <button className="nav-item">
            <span>✓</span>
            Tasks
          </button>

          <button className="nav-item">
            <span>◎</span>
            Goals
          </button>

          <button className="nav-item">
            <span>🧠</span>
            Brain Dump
          </button>

          <p className="nav-label">INTELLIGENCE</p>

          <button className="nav-item ai-nav">
            <span>✦</span>
            LifeOS AI
          </button>
        </nav>

        <div className="sidebar-bottom">
          <div className="system-status">
            <span className="status-dot"></span>
            <div>
              <strong>System Online</strong>
              <small>All systems operational</small>
            </div>
          </div>
        </div>

      </aside>

      {/* Main Content */}
      <main className="main">

        {/* Top Bar */}
        <header className="topbar">
          <div>
            <p className="eyebrow">PERSONAL COMMAND CENTER</p>
            <h1>Good evening, Purvisha 👋</h1>
          </div>

          <div className="topbar-right">
            <div className="date-box">
              <span>◷</span>
              <div>
                <small>Today</small>
                <strong>
                  {new Date().toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </strong>
              </div>
            </div>

            <div className="avatar">P</div>
          </div>
        </header>

        {/* Stats */}
        <section className="stats-grid">

          <div className="stat-card">
            <div className="stat-icon purple">✓</div>
            <div>
              <span>Total Tasks</span>
              <strong>{tasks.length}</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon blue">◔</div>
            <div>
              <span>Pending</span>
              <strong>{pendingTasks}</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">✓</div>
            <div>
              <span>Completed</span>
              <strong>{completedTasks}</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon red">!</div>
            <div>
              <span>High Priority</span>
              <strong>{highPriorityTasks}</strong>
            </div>
          </div>

        </section>

        {/* Dashboard Grid */}
        <section className="dashboard-grid">

          {/* Tasks */}
          <div className="panel tasks-panel">

            <div className="panel-header">
              <div>
                <p className="eyebrow">YOUR WORK</p>
                <h2>Today's Tasks</h2>
              </div>

              <span className="task-count">
                {pendingTasks} pending
              </span>
            </div>

            {/* Add Task */}
            <form className="add-task" onSubmit={addTask}>

              <input
                type="text"
                placeholder="What needs to be done?"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />

              <select
                value={priority}
                onChange={(event) => setPriority(event.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>

              <button type="submit">
                + Add
              </button>

            </form>

            {/* Task List */}
            <div className="task-list">

              {tasks.length === 0 ? (
                <div className="empty-state">
                  <div>✦</div>
                  <h3>Your task list is clear</h3>
                  <p>Add your first task above.</p>
                </div>
              ) : (
                tasks.map((task) => (

                  <div
                    className={`task-card ${task.status === "completed"
                        ? "completed"
                        : ""
                      }`}
                    key={task.id}
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
                            {new Date(task.due_date).toLocaleDateString(
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

                ))
              )}

            </div>

          </div>

          {/* AI Card */}
          <div className="right-column">

            <div className="ai-card">

              <div className="ai-glow"></div>

              <div className="ai-header">
                <div className="ai-icon">✦</div>

                <span>AI ASSISTANT</span>
              </div>

              <h2>Your life,<br />organized by AI.</h2>

              <p>
                Turn messy thoughts into clear actions,
                priorities and plans.
              </p>

              <button className="ai-button">
                Ask LifeOS AI
                <span>→</span>
              </button>

            </div>

            <div className="brain-dump-card">
              <div className="brain-dump-header">
                <div>
                  <span className="section-label">LIFEOS AI</span>
                  <h2>Brain Dump 🧠</h2>
                  <p>
                    Dump everything on your mind. LifeOS will turn it into tasks.
                  </p>
                </div>
              </div>

              <textarea
                value={brainDump}
                onChange={(e) => setBrainDump(e.target.value)}
                placeholder="What's on your mind? e.g. Finish Java assignment tomorrow, apply for internship on Sunday..."
                rows="5"
              />

              <div className="brain-dump-actions">
                <button
                  onClick={handleBrainDump}
                  disabled={brainDumpLoading || !brainDump.trim()}
                >
                  {brainDumpLoading ? "Processing..." : "Organize my thoughts ✨"}
                </button>

                {brainDumpMessage && (
                  <span className="brain-dump-message">
                    {brainDumpMessage}
                  </span>
                )}
              </div>
            </div>

            {/* Progress */}
            <div className="panel progress-panel">

              <div className="panel-header">
                <div>
                  <p className="eyebrow">TODAY</p>
                  <h2>Productivity</h2>
                </div>
              </div>

              <div className="progress-circle">
                <div>
                  <strong>
                    {tasks.length
                      ? Math.round(
                        (completedTasks / tasks.length) * 100
                      )
                      : 0}
                    %
                  </strong>
                  <span>complete</span>
                </div>
              </div>

              <p className="progress-text">
                {completedTasks === tasks.length && tasks.length > 0
                  ? "Everything is done. Nice work! 🎉"
                  : `${pendingTasks} task${pendingTasks !== 1 ? "s" : ""
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