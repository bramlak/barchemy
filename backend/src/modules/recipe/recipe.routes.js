import { Router } from 'express';
import * as recipeController from './recipe.controller.js';

const router = Router();

router.get('/', recipeController.getAllRecipes);
router.post('/mixable', recipeController.getMixableRecipesByIngredients);
router.post('/mix', recipeController.mixRecipe);

export default router;
