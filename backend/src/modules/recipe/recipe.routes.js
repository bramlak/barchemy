import { Router } from 'express';
import * as recipeController from './recipe.controller.js';

const router = Router();

router.get('/', recipeController.getAllRecipes);
router.post('/mixable', recipeController.getMixableRecipesByIngredientsAndQuery);
router.post('/areMixable', recipeController.areRecipesMixableByIngredients);
router.post('/mix', recipeController.mixRecipes);

export default router;
