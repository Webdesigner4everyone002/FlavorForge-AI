import { Router } from 'express';
import { generateRecipe, getAllRecipes, getRecipeById, saveRecipe, deleteRecipe, rateRecipe } from '../controllers/recipesController.js';
import { validateBody, generateSchema } from '../middleware/validate.js';

const router = Router();

router.post('/generate', validateBody(generateSchema), generateRecipe);
router.get('/', getAllRecipes);
router.get('/:id', getRecipeById);
router.post('/:id/save', saveRecipe);
router.delete('/:id', deleteRecipe);
router.post('/:id/rate', rateRecipe);

export default router;
