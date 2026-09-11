const express = require("express");
const cors = require("cors");

const pool = require("./db");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "LifeOS backend is running 🚀"
    });
});

// Get all tasks
app.get("/api/tasks", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM tasks ORDER BY id ASC"
        );

        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to fetch tasks"
        });
    }
});

// Get a single task by ID
app.get("/api/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "SELECT * FROM tasks WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Task not found"
            });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to fetch task"
        });
    }
});

// Update a task
app.put("/api/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, priority, status, due_date } = req.body;

        const result = await pool.query(
            `UPDATE tasks
             SET title = COALESCE($1, title),
                 priority = COALESCE($2, priority),
                 status = COALESCE($3, status),
                 due_date = COALESCE($4, due_date),
                 completed_at = CASE
                     WHEN $3 = 'completed' THEN CURRENT_TIMESTAMP
                     WHEN $3 = 'pending' THEN NULL
                     ELSE completed_at
                 END
             WHERE id = $5
             RETURNING *`,
            [title, priority, status, due_date, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Task not found"
            });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to update task"
        });
    }
});

// Create a new task
app.post("/api/tasks", async (req, res) => {
    try {
        const { title, priority, status, due_date } = req.body;

        const result = await pool.query(
            `INSERT INTO tasks (title, priority, status, due_date)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [title, priority || "medium", status || "pending", due_date || null]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to create task"
        });
    }
});

// Delete a task
app.delete("/api/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "DELETE FROM tasks WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Task not found"
            });
        }

        res.json({
            message: "Task deleted successfully",
            task: result.rows[0]
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to delete task"
        });
    }
});

app.listen(PORT, () => {
    console.log(`LifeOS backend running on http://localhost:${PORT}`);
});