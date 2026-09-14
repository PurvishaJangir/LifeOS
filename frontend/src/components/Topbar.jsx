import "./Topbar.css";

function Topbar() {
  return (
    <header className="topbar">
      <div>
        <h1>Good morning, Purvisha 👋</h1>
        <p>Here's what's happening with your life today.</p>
      </div>

      <div className="topbar-actions">
        <button className="icon-button">⌕</button>
        <button className="icon-button">🔔</button>

        <div className="profile">
          <div className="profile-avatar">P</div>

          <div>
            <strong>Purvisha</strong>
            <span>Personal Workspace</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;