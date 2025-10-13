import { Router } from 'express';
import recipeRoutes from '../modules/recipe/recipe.routes.js';

const router = Router();
router.use('/recipe', recipeRoutes);


export default router;
