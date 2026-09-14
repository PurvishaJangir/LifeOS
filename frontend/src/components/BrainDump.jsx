import "./BrainDump.css";

function BrainDump({
  brainDump,
  setBrainDump,
  brainDumpLoading,
  brainDumpMessage,
  handleBrainDump,
}) {
  return (
    <div className="brain-dump-card">

      <div className="brain-dump-header">
        <div>
          <span className="section-label">
            LIFEOS AI
          </span>

          <h2>Brain Dump 🧠</h2>

          <p>
            Dump everything on your mind.
            LifeOS will turn it into tasks.
          </p>
        </div>
      </div>

      <textarea
        value={brainDump}
        onChange={(event) =>
          setBrainDump(event.target.value)
        }
        placeholder="What's on your mind? e.g. Finish Java assignment tomorrow, apply for internship on Sunday..."
        rows="5"
      />

      <div className="brain-dump-actions">

        <button
          onClick={handleBrainDump}
          disabled={
            brainDumpLoading ||
            !brainDump.trim()
          }
        >
          {brainDumpLoading
            ? "Processing..."
            : "Organize my thoughts ✨"}
        </button>

        {brainDumpMessage && (
          <span className="brain-dump-message">
            {brainDumpMessage}
          </span>
        )}

      </div>

    </div>
  );
}

export default BrainDump;