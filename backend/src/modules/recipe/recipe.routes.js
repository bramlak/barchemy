import { Router } from 'express';
import * as recipeController from './recipe.controller.js';

const router = Router();

router.get('/', recipeController.getAllRecipes);
router.post('/mixable', recipeController.getMixableRecipesByIngredientsAndQuery);

export default router;
