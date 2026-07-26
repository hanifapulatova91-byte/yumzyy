# YumZy — the allergy app for people who leave their own supermarket

A full-stack allergy-safety assistant for travelers, immigrants, and anyone whose food isn't in a Western database.

Point your camera at a barcode or an ingredient list — YumZy reads it, checks it against **your** allergen profile, and tells you (in your language) whether it's safe, worth caution, or dangerous.

**Live demo:** https://hanifapulatova91-byte.github.io/yumzyy/

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

- **Frontend:** React 19 + Vite → GitHub Pages
- **Backend:** Node.js + Express, MongoDB Atlas → Render
- **AI:** OpenAI (`gpt-4o-mini` for text + vision)
- **Product data:** Open Food Facts API

If the backend isn't reachable, the frontend falls back to language-aware demo data so the deployed URL still works.

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

## Deploy to production (~15 min)

The frontend already auto-deploys to GitHub Pages on every push. To make the AI features actually work in the cloud, you need the backend live and connected. Steps:

### 1. MongoDB Atlas (~3 min)
- Create a free account at https://www.mongodb.com/cloud/atlas/register
- Build a free M0 cluster (any region).
- **Database Access → Add User** — set a username + password, save both.
- **Network Access → Add IP** → *Allow access from anywhere* (0.0.0.0/0).
- **Connect → Drivers** — copy the connection string. Replace `<password>` with the one you set.

### 2. Deploy the backend on Render (~5 min)
- Create a free account at https://render.com (sign in with GitHub).
- Dashboard → **New +** → **Blueprint** → connect this repo. Render reads `render.yaml` and provisions the `yumzy-api` service.
- On the created service page, go to **Environment** and fill in the two secrets marked `sync: false`:
  - `MONGO_URI` = the connection string from step 1
  - `OPENAI_API_KEY` = your key from https://platform.openai.com/api-keys
- Deploy. Wait ~2 min. When it's live, Render gives you a URL like `https://yumzy-api.onrender.com`.
- Sanity check: open `https://yumzy-api.onrender.com/api` in a browser — should return `{ message: "🍏 YumZy /api is reachable!" }`.

### 3. Point the frontend at the backend (~2 min)
- Go to https://github.com/hanifapulatova91-byte/yumzyy/settings/secrets/actions
- **New repository secret**:
  - Name: `VITE_API_URL`
  - Value: `https://yumzy-api.onrender.com/api` (your Render URL + `/api`)
- Trigger a rebuild: either push any commit, or go to the **Actions** tab → latest workflow run → **Re-run all jobs**.
- ~1 min later, the deployed app hits your real backend instead of demo data.

### Notes
- Render free tier spins the backend down after ~15 min of inactivity. First request after idle takes ~30 s to wake up — fine for a demo, not for production traffic.
- If judges hit demo data anyway, check Render logs — most likely CORS or `VITE_API_URL` typo.

---

## Repo layout
```
frontend/            React + Vite app
server/              Node + Express + MongoDB API
render.yaml          Render Blueprint (deploys backend)
.github/workflows/   GitHub Pages auto-deploy for frontend
```

Built for the **TKS Prompt to Product Challenge**, July 2026.
