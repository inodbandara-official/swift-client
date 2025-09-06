# Swift Logistics - SwiftTrack

Monorepo with:
- `frontend/`: Next.js (TypeScript + Tailwind) single-page application for SwiftTrack
- `backend/`: Node.js + Express server with PostgreSQL connection (skeleton)

## Prerequisites
- Node.js 18+
- PostgreSQL 14+

## Setup

### Frontend
1. cd frontend
2. npm install
3. Create `.env` (see `.env.example`)
4. npm run dev

### Backend
1. cd backend
2. npm install
3. Create `.env` (see `.env.example`)
4. npm run dev

## Environments
- Frontend expects `NEXT_PUBLIC_API_BASE_URL` to reach the API (e.g. http://localhost:4000/api)
- Backend uses PostgreSQL env vars (see backend/.env.example)

## Notes
- Keep it simple: SPA with tabs for Overview, My Orders, Billing, Contracts.
- Redux Toolkit + Context are wired in the frontend.
- Backend includes controllers/routes and a DB connection skeleton; define models later.
