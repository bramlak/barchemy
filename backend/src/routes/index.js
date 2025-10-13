import { Router } from 'express';
import recipeRoutes from '../modules/recipe/recipe.routes.js';
import ingredientRoutes from '../modules/ingredient/ingredient.routes.js'
const router = Router();
router.use('/recipe', recipeRoutes);
router.use('/ingredient', ingredientRoutes);


export default router;
