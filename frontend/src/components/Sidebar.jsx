import "./Sidebar.css";

function Sidebar() {
  return (
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
  );
}

export default Sidebar;