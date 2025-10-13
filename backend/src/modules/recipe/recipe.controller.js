import * as recipeService from './recipe.service.js';

export const getAllRecipes = async (req, res, next) => {
  try {
    const recipes = await recipeService.getAllRecipes();
    res.status(200).json(recipes);
  } catch (err) {
    next(err);
  }
};

export const getMixableRecipesByIngredients = async (req, res, next) => {
  try {
    const ingredients = req.body;
    const recipes = await recipeService.getMixableRecipesByIngredients(ingredients);
    res.status(200).json(recipes);
  } catch (err) {
    next(err);
  }
};


export const mixRecipe = async (req, res, next) => {
  try {
    const recipe = req.body;
    const storedIngredientChanges = await recipeService.mixRecipe(recipe);
    res.status(200).json(storedIngredientChanges);
  } catch (err) {
    next(err);
  }
};
