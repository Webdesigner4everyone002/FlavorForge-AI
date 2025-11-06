import { Recipe } from '../models/Recipe.js';
import { generateRecipeLLM } from '../services/llmService.js';

export async function generateRecipe(req, res, next) {
  try {
    const { ingredients, dietary_restrictions, cuisine_type } = req.validated;

    // Call Gemini API
    const data = await generateRecipeLLM({ ingredients, dietary_restrictions, cuisine_type });

    // 🧠 Normalize ingredients in case Gemini returns ["tomato", "onion"]
    const normalizedIngredients = (data.ingredients || []).map(item => {
      if (typeof item === 'string') {
        return { name: item, quantity: 'to taste' }; // default fallback
      }
      return item;
    });

    const recipe = await Recipe.create({
      title: data.title,
      ingredients: normalizedIngredients,
      instructions: data.instructions || [],
      prep_time: data.prep_time || 'N/A',
      difficulty: data.difficulty || 'easy',
      cuisine_type,
      dietary_restrictions,
      saved: false
    });

    res.json({
      recipe_id: recipe._id,
      title: recipe.title,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      prep_time: recipe.prep_time,
      difficulty: recipe.difficulty
    });

  } catch (err) {
    console.error(err);
    next(err);
  }
}


export async function getAllRecipes(req, res) {
  const recipes = await Recipe.find({ saved: true }).sort({ createdAt: -1 });
  res.json(recipes);
}

export async function getRecipeById(req, res) {
  const recipe = await Recipe.findById(req.params.id);
  recipe ? res.json(recipe) : res.status(404).json({ error: 'Not found' });
}

export async function saveRecipe(req, res) {
  const updated = await Recipe.findByIdAndUpdate(req.params.id, { saved: true }, { new: true });
  res.json(updated);
}

export async function deleteRecipe(req, res) {
  await Recipe.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
}

export async function rateRecipe(req, res) {
  const { value } = req.body;
  if (![1,2,3,4,5].includes(Number(value))) return res.status(400).json({ error: 'Invalid rating' });
  const doc = await Recipe.findByIdAndUpdate(req.params.id, { $push: { ratings: { value } } }, { new: true });
  res.json({ averageRating: doc.averageRating });
}
