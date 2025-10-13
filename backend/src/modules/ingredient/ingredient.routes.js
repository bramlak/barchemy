import { Router } from 'express';
import * as ingredientController from './ingredient.controller.js';

const router = Router();

router.get('/', ingredientController.getAllIngredients);

export default router;
