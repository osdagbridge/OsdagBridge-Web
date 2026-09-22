# OsdagBridge-Web

Modern Web Application for Highway & Railway Steel Bridge Design (IRC & Indian Standards), powered by FastAPI, React 19, Three.js, and the `osdagbridge-core` calculation engine.

---

## 🏗 Architecture Overview

```
OsdagBridge-Web/
├── backend/          # FastAPI API server, schema adapter, validation bridge & RQ workers
├── frontend/         # React 19 + TypeScript + Vite modern engineering CAD workbench
└── .env.example      # Configuration template
```

### Core Separation
- Calculation engine and IRC design logic live in `osdagbridge-core`.
- This repo focuses solely on the **Web API**, **UI/UX Workbench**, **3D WebGL Visualization**, and **Job Execution**.

---

## 🚀 Quick Start (Development)

### 1. Backend (FastAPI)
```bash
cd backend
# Create virtual environment or activate conda environment
python -m venv .venv
source .venv/bin/activate   # or .venv\Scripts\activate on Windows
pip install -r requirements.txt

# Run development server
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```
- Interactive Swagger API docs: **http://127.0.0.1:8000/docs**

### 2. Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
- Web Workbench: **http://localhost:5173**

---