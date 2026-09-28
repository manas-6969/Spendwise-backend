# SpendWise

SpendWise is a teenager-friendly expense tracker with a React/Vite dashboard and a secure Express REST API. It tracks expenses, budgets, savings goals, visual analytics, and transparent rule-based spending insights.

## Run locally (PowerShell)

1. Create a Supabase project, then run [`backend/migrations/001_initial_schema.sql`](backend/migrations/001_initial_schema.sql) in its SQL editor.
2. Copy `backend/.env.example` to `backend/.env` and set the Supabase URL, **service-role key**, and a long JWT secret. Do not place these in the frontend.
3. Copy `frontend/.env.example` to `frontend/.env`.
4. In two PowerShell terminals:

```powershell
cd backend
npm install
npm run dev
```

```powershell
cd frontend
npm install
npm run dev
```


Open `http://localhost:5173`
## Architecture

`React UI → Axios → Express routes/controllers/services → Supabase PostgreSQL`

The API accepts the authenticated identity only from a signed JWT and scopes every user-owned query to that identity. Passwords are bcrypt hashes. Helmet, CORS, request-size limits, validation, generic authentication errors, and auth rate limiting are enabled.

## API

Authentication: `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`.

Protected resources: expenses CRUD at `/api/expenses`, budgets at `/api/budgets`, goals at `/api/savings`, categories at `/api/categories`, insights at `/api/insights`, and analytics under `/api/analytics`.

## Deployment notes

Set `NODE_ENV=production`, use HTTPS, configure `FRONTEND_URL` to the deployed web origin, and keep `SUPABASE_SERVICE_ROLE_KEY` and `JWT_SECRET` only on the server. The included migration enables RLS; since this build sends all database requests through the trusted backend service role, no direct browser access to Supabase is needed.
