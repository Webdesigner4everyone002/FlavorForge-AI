import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from '../config/env.js';

const genAI = new GoogleGenerativeAI(env.geminiKey);

export async function generateRecipeLLM({ ingredients, dietary_restrictions, cuisine_type }) {
  const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-pro" });


  const prompt = `
You are a master chef. Create a structured JSON recipe using:
- Ingredients: ${ingredients.join(', ') || 'any'}
- Cuisine type: ${cuisine_type || 'any'}
- Dietary restrictions: ${dietary_restrictions.join(', ') || 'none'}

Return ONLY valid JSON in this format:
{
  "title": "string",
  "ingredients": [{"name":"string","quantity":"string"}],
  "instructions": ["step 1", "step 2", "..."],
  "prep_time": "e.g., 20 minutes",
  "difficulty": "easy|medium|hard"
}`;

  const result = await model.generateContent(prompt);
  const text = result.response.text().replace(/^```json|```$/g, '').trim();
  return JSON.parse(text);
}
