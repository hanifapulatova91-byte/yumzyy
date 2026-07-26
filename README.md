# YumZy — the allergy app for people who leave their own supermarket

A full-stack allergy-safety assistant for travelers, immigrants, and anyone whose food isn't in a Western database.

Point your camera at a barcode or an ingredient list — YumZy reads it, checks it against **your** allergen profile, and tells you (in your language) whether it's safe, worth caution, or dangerous.

## Two live URLs

| URL | What it is |
|---|---|
| **https://hanifapulatova91-byte.github.io/yumzyy/** | GitHub Pages build. Frontend only, backend calls fall back to language-aware **demo data**. Always up, no cold start. |
| **https://yumzy-web.onrender.com** | Render build. Same frontend, wired to the real backend — real GPT-4o, real Mongo, real allergen analysis. |

## What it does

- **Barcode scanner** — instant lookup via Open Food Facts + GPT-4o-mini allergen matching.
- **Photo scanner (no barcode needed)** — GPT-4o vision reads any ingredient list, even in a foreign language.
- **AI nutritionist chat** — ask anything about food, ingredients, or recipes; answers respect your allergy profile.
- **Allergen-safe recipe generator** — tell it what's in your fridge, it returns 3 recipes that skip every allergen you listed.
- **Symptom checker** — describe a reaction, the AI names the likely allergen.
- **Emergency screen** — one-tap 103, doctor and close-contact numbers, allergen summary.
- **Grocery list, health articles.**
- **Full trilingual UI** — English, Русский, O'zbek. Every AI response also respects the chosen language.

## Tech

- **Frontend:** React 19 + Vite → deployed to GitHub Pages (demo) and Render (real)
- **Backend:** Node.js + Express, MongoDB Atlas → Render
- **AI:** OpenAI (`gpt-4o-mini` for text + vision)
- **Product data:** Open Food Facts API

---

## Run locally

```bash
# Backend
cd server
cp .env.example .env    # fill in MONGO_URI, JWT_SECRET, OPENAI_API_KEY
npm install
node server.js

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

Open http://localhost:5173.

---

## Deploy the "real" version to Render (~15 min)

The Pages build already auto-deploys on every push. This section is only if you want the second URL where AI features actually run.

### 1. MongoDB Atlas (~3 min)
- Create a free account at https://www.mongodb.com/cloud/atlas/register
- Build a free M0 cluster (any region).
- **Database Access → Add User** — set a username + password, save both.
- **Network Access → Add IP** → *Allow access from anywhere* (`0.0.0.0/0`).
- **Connect → Drivers** — copy the connection string. Replace `<password>` with the one you set.

### 2. Deploy the Blueprint on Render (~10 min)
- Create a free account at https://render.com (sign in with GitHub).
- Dashboard → **New +** → **Blueprint** → connect this repo. Render reads `render.yaml` and provisions **two** services: `yumzy-api` (backend) and `yumzy-web` (frontend static site).
- On the `yumzy-api` service page → **Environment** tab → fill in the two secrets marked `sync: false`:
  - `MONGO_URI` = the connection string from step 1
  - `OPENAI_API_KEY` = your key from https://platform.openai.com/api-keys
- Deploy. Wait ~2 min for the backend, another ~2 min for the frontend.
- Your two URLs:
  - Backend: `https://yumzy-api.onrender.com` (health check: `/api`)
  - Frontend (real): `https://yumzy-web.onrender.com`

### Notes
- Render free tier spins the backend down after ~15 min of inactivity. First request after idle takes ~30 s to wake — fine for a demo, not for production traffic.
- The Pages URL stays live and functional regardless (demo mode). Use it as a backup link if the Render service is asleep during judging.

---

## Repo layout
```
frontend/            React + Vite app
server/              Node + Express + MongoDB API
render.yaml          Render Blueprint (deploys backend + frontend)
.github/workflows/   GitHub Pages auto-deploy for the demo frontend
```

Built for the **TKS Prompt to Product Challenge**, July 2026.
