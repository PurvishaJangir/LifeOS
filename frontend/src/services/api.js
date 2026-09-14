const API_URL = "http://localhost:5000/api";

// ==================== TASKS ====================

// Get all tasks
export const getTasks = async () => {
  const response = await fetch(`${API_URL}/tasks`);

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return response.json();
};

// Create a task
export const createTask = async (task) => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Failed to create task");
  }

  return response.json();
};

// Update a task
export const updateTask = async (id, task) => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Failed to update task");
  }

  return response.json();
};

// Delete a task
export const deleteTask = async (id) => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }

  return response.json();
};


// ==================== GOALS ====================

// Get all goals
export const getGoals = async () => {
  const response = await fetch(`${API_URL}/goals`);

  if (!response.ok) {
    throw new Error("Failed to fetch goals");
  }

  return response.json();
};

// Create a goal
export const createGoal = async (goal) => {
  const response = await fetch(`${API_URL}/goals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(goal),
  });

  if (!response.ok) {
    throw new Error("Failed to create goal");
  }

  return response.json();
};

// Update a goal
export const updateGoal = async (id, goal) => {
  const response = await fetch(`${API_URL}/goals/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(goal),
  });

  if (!response.ok) {
    throw new Error("Failed to update goal");
  }

  return response.json();
};

// Delete a goal
export const deleteGoal = async (id) => {
  const response = await fetch(`${API_URL}/goals/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete goal");
  }

  return response.json();
};

// ==================== BRAIN DUMP ====================

export const processBrainDump = async (message) => {
  const response = await fetch(
    "http://localhost:5678/webhook-test/472bc513-f588-425d-9b43-8a99afb4ebb9",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to process brain dump");
  }

  return response.json();
};