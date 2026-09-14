import "./AISection.css";

function AISection() {
  return (
    <div className="ai-card">

      <div className="ai-glow"></div>

      <div className="ai-header">
        <div className="ai-icon">
          ✦
        </div>

        <span>
          AI ASSISTANT
        </span>
      </div>

      <h2>
        Your life,
        <br />
        organized by AI.
      </h2>

      <p>
        Turn messy thoughts into clear
        actions, priorities and plans.
      </p>

      <button className="ai-button">
        Ask LifeOS AI
        <span>→</span>
      </button>

    </div>
  );
}

export default AISection;
