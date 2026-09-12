# 🧠 LifeOS

> An AI-powered personal operating system for managing tasks, goals, thoughts, and everyday productivity.

LifeOS is a full-stack productivity platform designed to bring personal planning, task management, automation, and AI assistance into one place.

The goal is simple:

**Turn scattered thoughts into organized actions.**

## ✨ Features

### ✅ Task Management

- Create tasks
- Set task priority
- Mark tasks as completed
- Delete tasks
- Track pending and completed tasks

### 📊 Productivity Dashboard

- Total task count
- Pending tasks
- Completed tasks
- High-priority tasks
- Daily productivity progress

### 🤖 AI Assistant

Planned AI capabilities include:

- Task prioritization
- Brain dump → task conversion
- Task decomposition
- Productivity suggestions
- Weekly personal insights

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- JavaScript
- CSS

### Backend

- Node.js
- Express.js
- REST APIs

### Database

- PostgreSQL

### Automation

- n8n

### AI

- LLM integration planned

## 🏗️ Architecture

```text
React Frontend
      ↓
   REST API
      ↓
Node.js + Express
      ↓
 PostgreSQL
      ↕
     n8n
      ↕
   AI / LLM



📁 Project Structure

LifeOS/
│
├── backend/
│   ├── db.js
│   ├── server.js
│   ├── test-db.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md



🚀 Getting Started

1. Clone the repository
    git clone https://github.com/PurvishaJangir/LifeOS.git
    cd LifeOS

2. Setup the backend
    cd backend
    npm install

    Create a .env file using .env.example:
    DB_HOST=localhost
    DB_PORT=5433
    DB_NAME=lifeos
    DB_USER=postgres
    DB_PASSWORD=your_postgres_password

3. Start the backend
    node server.js

    The backend runs on:
    http://localhost:5000

4. Start the frontend
    Open another terminal:
        cd frontend
        npm install
        npm run dev

    The frontend runs on:
        http://localhost:5173

