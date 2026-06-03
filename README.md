# 📚 Pirxey - Book Management App

Modern Book Management Application built with **React (TypeScript)** on the frontend and **Node.js (Express + TypeScript)** on the backend, using **MongoDB** as a local persistent database.

---

## 🛠️ Prerequisites & Local Deployment

Follow the steps below to set up and run the project locally on your machine.

### 1. Backend Configuration & Database Setup (Linux)

Before running the backend, you need to install and activate the local MongoDB service on your Linux machine.

```bash
# Update package list
sudo apt update

# Install MongoDB Community Server
sudo apt install -y mongodb-org

# Start the MongoDB service in the background
sudo systemctl start mongod

# Enable MongoDB to start automatically on system boot
sudo systemctl enable mongod
```

### 2. Running the Backend Server

```bash
# Navigate to the backend directory
cd backend

# Install project dependencies
npm install

# Start the backend server in development mode
npm run dev
```

_The backend server will automatically connect to MongoDB and start listening on port `3000`._

### 3. Running the Frontend Application

Open a new terminal window or tab, then execute the following:

```bash
# Navigate to the frontend directory
cd frontend

# Install project dependencies
npm install

# Start the frontend development server
npm run dev
```

_Open the provided local URL (usually `http://localhost:5173`) in your web browser to view the application._

---

## 📝 Project Features Implemented

- **Robust Global Validation**: Integrated client and server-side validation powered by **Zod**.
- **Global Error Handling**: Centralized Express middleware that captures Zod validation issues and formats clear JSON responses.
- **Persistent Storage**: Fully compliant with local deployment rules using a dedicated, non-in-memory MongoDB setup.
- **State Management**: Asynchronous state management and caching powered by **TanStack React Query** and **Axios**.
- **Strict Type Safety**: End-to-end typing from database documents to frontend React components via TypeScript.

## 🤖 AI Acknowledgement

This project was developed with the assistance of an AI collaborator. AI tools were utilized specifically for:

- **Zod Schemas**: Generating and structuring strict validation rules for the book data models.
- **Component Styling**: Designing and implementing clean, responsive UI styles for the frontend layout.
