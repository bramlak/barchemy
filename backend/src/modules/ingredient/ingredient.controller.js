import * as ingredientService from './ingredient.service.js';



export const getAllIngredients = async (req, res, next) => {
  try {
    const ingredients = await ingredientService.getAll();
    res.status(200).json(ingredients);
  } catch (err) {
    next(err);
  }
};

