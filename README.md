# Resu Host Backend 🦉

[![Keep Render App Awake](https://github.com/sickodev/resu-host-backend/actions/workflows/ping.yml/badge.svg)](https://github.com/sickodev/resu-host-backend/actions/workflows/ping.yml)

This is the backend service for Resu Host, built using [Hono](https://hono.dev) — a fast, lightweight web framework for building APIs.

---

## 📦 Features

- ⚡ Fast HTTP API using Hono
- 📁 File uploads streamed to [Supabase Storage](https://supabase.com/storage)
- 🔐 Secure service role integration via `.env` file
- 🧬 Prisma integration for metadata persistence (In Progress)
- 🕰 GitHub Actions uptime pinger for Render
- 🌐 CORS-enabled for frontend integration

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/sickodev/resu-host-backend.git
cd resu-host-backend
````

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file or edit `.env.example` in the root directory with the following:

```env
PORT=8080
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-secret-key
SUPABASE_BUCKET=your-bucket
DATABASE_URL=your-supabase-postgres-connection-string
```

### 4. Run the server locally

```bash
npm run dev
```

---

## 🔌 API Endpoints

| Method | Endpoint          | Description                      |
|--------|-------------------|----------------------------------|
| GET    | `/api/ping`       | Health check                     |
| GET    | `/api/ping/error` | Error check                      |
| GET    | `/api/upload`     | Upload check                     |
| POST   | `/api/upload`     | Upload a file to Supabase bucket |

---

## 🧬 Database Schema (Prisma)

```prisma
model Upload {
  id         String   @id @default(uuid(7))
  filename   String
  shortlink  String
  path       String
  createdAt  DateTime @default(now())
  expiresAt  DateTime
}
```

Run Prisma migration:

```bash
npx prisma migrate dev --name init
```

---

## 🧪 GitHub Actions

This repo includes a GitHub Actions workflow that pings the `/api/ping` endpoint every 5 minutes to keep the Render backend awake.

### `.github/workflows/ping.yml`

```yaml
name: Keep Render App Awake

on:
  schedule:
    - cron: "*/1 * * * *"
  workflow_dispatch:

jobs:
  ping:
    runs-on: ubuntu-latest
    steps:
      - name: Curl Ping Endpoint
        run: curl -s https://your-backend.onrender.com/api/ping
```

---

## 🚀 Deployment

### Hosting Backend

* Recommended: [Render](https://render.com) (generous free tier)
* Alternatives: Cloudflare Workers, Railway, DigitalOcean App Platform

### Render Build & Start Commands

```bash
# Build Command
npm install && npm run build

# Start Command
node ./dist/index.js
```

---

## 🔮 Upcoming Features

Here’s what’s planned next for the Resu Host backend:

- 🔗 **Shorter File Links**  
  Replace long public URLs with compact, secure shortlinks (e.g. `resu.host/abc123`)

- ⏳ **Custom File Expiry**  
  Allow users to set custom expiration periods per upload (e.g. 1 day, 7 days, 30 days)

- 📊 **Dashboard for Analytics**  
  A secure interface to:
    - View all uploaded files
    - Monitor usage and access logs
    - See file expiry status and remaining time

- 🔐 **Secure File Access (optional)**  
  Password protection or token-based access for private files

---

## 📜 License

MIT — feel free to use, modify, and share.

---

## ✨ Author

Built by [@sickodev](https://github.com/sickodev)
