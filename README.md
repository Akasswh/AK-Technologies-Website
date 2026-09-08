# AK Technologies

## Project Structure

- `frontend/` - Vite + React + TypeScript frontend application. Communicates with backend via `frontend/src/lib/api.ts`.
- `backend/` - Express + Node.js + MongoDB backend API service. Handles authentication, contact leads, and email notifications.

## Environment Setup

- `frontend/.env.example` - Template for frontend environment variables (`VITE_API_URL`).
- `backend/.env.example` - Template for backend environment variables (`MONGODB_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, etc.).

## Quick Start / Local Development

### 1. Frontend Development Server
```bash
npm run dev:frontend
# OR cd frontend && npm run dev
```

### 2. Backend Development Server
```bash
npm run dev:backend
# OR cd backend && npm run dev
```

### 3. Build Both
```bash
npm run build
```
