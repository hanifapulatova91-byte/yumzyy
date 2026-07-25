# YumZy — the allergy app for people who leave their own supermarket

A full-stack allergy-safety assistant for travelers, immigrants, and anyone whose food isn't in a Western database.

Point your camera at a barcode or an ingredient list — YumZy reads it, checks it against **your** allergen profile, and tells you (in your language) whether it's safe, worth caution, or dangerous.

## What it does

- **Barcode scanner** — instant lookup via Open Food Facts + GPT-4o-mini allergen matching.
- **Photo scanner (no barcode needed)** — GPT-4o vision reads any ingredient list, even in a foreign language.
- **AI nutritionist chat** — ask anything about food, ingredients, or recipes; answers respect your allergy profile.
- **Allergen-safe recipe generator** — tell it what's in your fridge, it returns 3 recipes that skip every allergen you listed.
- **Symptom checker** — describe a reaction, the AI names the likely allergen.
- **Emergency screen** — one-tap 103, doctor and close-contact numbers, printable allergen summary.
- **Grocery list, health articles.**
- **Full trilingual UI** — English, Русский, O'zbek. Every AI response also respects the chosen language.

## Tech

- **Frontend:** React 19 + Vite
- **Backend:** Node.js + Express, MongoDB Atlas
- **AI:** OpenAI (`gpt-4o-mini` for text + vision)
- **Product data:** Open Food Facts API

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

## Built for the TKS Prompt to Product Challenge — July 2026.
