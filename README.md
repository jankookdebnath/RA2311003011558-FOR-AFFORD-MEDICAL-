# 🚀 Priority Inbox System

A sophisticated notification management system designed to filter, prioritize, and display critical academic and placement alerts using a custom weight-based algorithm and a modern React-based dashboard.

## 📖 Project Overview
This project was developed to solve the problem of "notification fatigue." In a busy academic environment, students often miss critical placement offers or exam results because they are buried under general event updates. Our system ensures that the most important information always stays at the top.

## 🛠️ Tech Stack & Language
- **Language:** JavaScript (ES6+)
- **Frontend Framework:** Next.js 14 (React)
- **UI Library:** Material UI (MUI)
- **Backend/Scripting:** Node.js
- **API Communication:** Axios

## 🧠 How We Did It: The Logic
We implemented a **Two-Stage Architecture**:

1.  **Stage 1 (Algorithm):** A standalone Node.js script that connects to the Afford Medical evaluation server. It fetches raw notification data and applies a **Priority Weighting Algorithm**:
    - **Placement Offers (Weight 3):** Highest priority.
    - **Exam Results (Weight 2):** Medium priority.
    - **General Events (Weight 1):** Low priority.
    - *Secondary Sort:* For items with the same weight, the most recent timestamp takes precedence.

2.  **Stage 2 (Frontend):** A high-performance Next.js dashboard that visualizes this data. We implemented "Client-Side Hydration" to ensure the UI remains snappy while handling large volumes of notifications.

## ⚖️ Why We Chose This Stack (and why not others)

### Why Next.js instead of Create React App (CRA)?
- **Performance:** Next.js uses Server-Side Rendering (SSR) and optimized bundling. CRA is now deprecated and lacks the built-in routing and performance optimizations required for modern web apps.
- **App Router:** We used the new Next.js 13+ App Router for better layout management and faster transitions.

### Why Material UI (MUI) instead of Vanilla CSS or Tailwind?
- **Professionalism:** MUI provides a "Premium" enterprise feel right out of the box. While Tailwind is great for custom designs, MUI ensures accessibility (A11y) and a consistent design language (Material Design) that is widely recognized in professional software.
- **Development Speed:** High-quality components like Data Tables, Snackbars, and Filter chips are pre-built, allowing us to focus on the **algorithm** rather than reinventing the wheel for basic UI elements.

### Why Node.js for the Algorithm?
- **Unified Language:** Using JavaScript for both the frontend and backend simplifies the codebase and allows for shared logic/types.
- **Non-blocking I/O:** Node.js is exceptionally fast at handling API requests, which is critical when fetching and processing large notification sets.

---

## 🚀 How to Run the Project

### Prerequisites
- Node.js installed on your machine.
- An active `ACCESS_TOKEN` for the evaluation server.

### 1. Setup
Navigate to the project folder and install dependencies:
```powershell
cd notification-priority-system
npm install
cd frontend
npm install
```

### 2. Run the Priority Algorithm (Backend)
Navigate back to the `notification-priority-system` folder and run:
```powershell
# Set your token
$env:ACCESS_TOKEN="your_token_here"

# Run the fetcher
node src/stage1-priority-algorithm.js
```

### 3. Start the Dashboard (Frontend)
Navigate to the `frontend` folder and run:
```powershell
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---
**Developed by:** Janhavi Debnath
**Roll No:** RA2311003011558
