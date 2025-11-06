# FlavorForge-AI
# 🍳 FlavorForge AI

**An AI-powered full-stack recipe generator** that crafts personalized dishes using  
your ingredients, cuisine preferences, and dietary needs — powered by **Google Gemini LLM**  
and built with the **MERN stack**.

---

## 🚀 Overview

FlavorForge AI is an intelligent recipe assistant that uses **Generative AI** to create, refine, and manage cooking recipes.  
Users can input ingredients, select cuisine types, or specify dietary restrictions to generate a recipe in real-time.  
Each recipe is saved, rated, and modifiable — allowing for AI-driven refinements like _“make it spicier”_ or _“reduce calories”_.

---

## 🧠 Key Features

- 🍴 **AI Recipe Generation** – Generates detailed, structured recipes (title, ingredients, instructions, prep time, difficulty).  
- 🔁 **Recipe Modification** – Users can refine recipes using natural language commands (e.g., “make it vegan”).  
- ⚡ **Real-Time Streaming** – See recipes being generated live, token by token.  
- 💾 **Recipe Management** – Save, delete, and rate recipes stored securely in MongoDB Atlas.  
- 🌐 **Fully Responsive Frontend** – Built with React and Bootstrap for a clean, modern UI.  
- 🔐 **Secure Backend** – RESTful API with input validation, error handling, and rate limiting.  

---

## 🧩 Tech Stack

**Frontend:**
- React.js  
- React-Bootstrap (UI Components)  
- Axios (API Calls)  

**Backend:**
- Node.js + Express.js  
- MongoDB Atlas (Cloud Database)  
- Zod (Input Validation)  
- Helmet, CORS, Morgan, Compression  

**AI Integration:**
- Google Gemini LLM via `@google/generative-ai`  
- Supports both synchronous and streaming recipe generation  

---

## 🧱 Project Structure

FlavorForgeAI/
├── backend/
│ ├── src/
│ │ ├── server.js
│ │ ├── config/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── controllers/
│ │ └── services/
│ ├── .env
│ ├── package.json
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ ├── api.js
│ │ └── App.jsx
│ ├── .env
│ ├── package.json
│
└── README.md
## ⚙️ Environment Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/<your-username>/flavorforge-ai.git
cd flavorforge-ai

### 2️⃣ Backend Setup
cd backend
npm install
Create a .env file inside /backend:
PORT=8000
MONGODB_URI=your_mongodb_atlas_connection_string
GEMINI_API_KEY=your_gemini_api_key
NODE_ENV=development
Run backend:

npm run dev


Backend runs on http://localhost:8000
3️⃣ Frontend Setup
cd ../frontend
npm install


Create a .env file inside /frontend:

VITE_API_BASE=http://localhost:8000/api


Run frontend:

npm run dev


Frontend runs on http://localhost:5173

🧠 AI Prompt Design
Recipe Generation Prompt

Gemini is instructed to produce a structured recipe JSON:

{
  "title": "string",
  "ingredients": [{"name": "string", "quantity": "string"}],
  "instructions": ["step 1", "step 2"],
  "prep_time": "e.g. 20 minutes",
  "difficulty": "easy|medium|hard"
}

Recipe Modification Prompt

Modify the following recipe according to user instruction.
Example: “Make it spicier” → “Add chili powder”, “Increase pepper”.
