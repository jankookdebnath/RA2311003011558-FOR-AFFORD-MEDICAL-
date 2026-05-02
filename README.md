# Notification Priority Management System

An enterprise-grade solution designed for the systematic prioritisation and management of academic and corporate notifications. This system employs a sophisticated weighting algorithm to ensure critical communications are presented with appropriate prominence within a modern web-based interface.

## Project Summary
The primary objective of this project is to mitigate information overload within academic environments. By categorising incoming data streams, the system ensures that high-stakes information—such as career placements and formal examination results—is never obscured by routine administrative updates.

## Technical Specifications
- **Core Language:** JavaScript (ECMAScript 2023)
- **Frontend Architecture:** Next.js 14 (React Framework)
- **Design System:** Material UI (MUI) 
- **Server-Side Runtime:** Node.js
- **Network Protocol:** Axios-based REST API integration

## Methodological Approach
The implementation follows a two-tier architectural pattern:

1.  **Stage 1: Algorithmic Prioritisation**
    A bespoke Node.js integration script handles the ingestion of data from the evaluation server. It applies a deterministic sorting logic based on predefined priority indices:
    - **Tier 1 (Placement):** Weighted at index 3 (Highest).
    - **Tier 2 (Result):** Weighted at index 2 (Intermediate).
    - **Tier 3 (Event):** Weighted at index 1 (Standard).
    - *Temporal Sorting:* A secondary chronometric sort is applied to ensure that the most contemporary data within each tier is prioritised.

2.  **Stage 2: Frontend Visualisation**
    The user interface is constructed using Next.js to facilitate efficient rendering. The system utilises client-side state management to maintain a responsive user experience while processing complex data sets.

## Strategic Selection of Technology

### The Rationale for Next.js
In contrast to standard React applications, Next.js provides superior performance through advanced bundling and routing optimisations. The choice of the App Router architecture ensures a modular codebase that supports future scalability and robust server-side integration.

### Material UI (MUI) vs. Alternative Styling Solutions
While utility-first frameworks such as Tailwind offer flexibility, Material UI was selected for its adherence to established design principles and superior component accessibility. This ensures a professional, standardised aesthetic that aligns with corporate software expectations, whilst significantly reducing development latency for complex UI elements.

### Node.js for Backend Operations
Node.js was selected as the preferred runtime environment to maintain a unified language stack across the application. Its asynchronous, non-blocking architecture is particularly well-suited for high-concurrency API operations and efficient data processing.

---

## Deployment and Execution Instructions

### Prerequisites
- Node.js Runtime Environment
- Valid Evaluation Server Access Credentials

### Initial Configuration
Execute the following commands within the terminal to initialise the environment:
```powershell
cd notification-priority-system
npm install
cd frontend
npm install
```

### Execution of the Prioritisation Algorithm
To ingest and process notification data, navigate to the root directory and execute:
```powershell
# Assign the authorisation token
$env:ACCESS_TOKEN="your_token_here"

# Execute the processing script
node src/stage1-priority-algorithm.js
```
### pic of the web site 
<img width="1917" height="844" alt="image" src="https://github.com/user-attachments/assets/595c0425-fe26-45c7-bda4-19cf21e54328" />
<img width="1911" height="842" alt="image" src="https://github.com/user-attachments/assets/e5e41caf-5f0e-42b9-a2cb-4c495a50dd74" />
<img width="1906" height="847" alt="image" src="https://github.com/user-attachments/assets/0e372350-1dbd-4bf6-a2d6-377ee3d8b1b1" />
<img width="1903" height="714" alt="image" src="https://github.com/user-attachments/assets/e4bef7ae-e9c4-4573-98cf-be81162b16ed" />






### Initialisation of the Web Interface
To launch the development server for the frontend dashboard:
```powershell
cd frontend
npm run dev
```
The application will be accessible via the local loopback address: **[http://localhost:3000](http://localhost:3000)**

---
**Principal Developer:** Janhavi Debnath  
**Candidate Identifier:** RA2311003011558
