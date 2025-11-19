import * as recipeService from './recipe.service.js';

export const getAllRecipes = async (req, res, next) => {
  try {
    const recipes = await recipeService.getAllRecipes();
    res.status(200).json(recipes);
  } catch (err) {
    next(err);
  }
};

export const getMixableRecipesByIngredientsAndQuery = async (req, res, next) => {
  try {
    const query = req.query.q
    const ingredients = Array.isArray(req.body) ? req.body : [];
    const recipes = await recipeService.getMixableRecipesByIngredientsAndQuery(ingredients, query);
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
