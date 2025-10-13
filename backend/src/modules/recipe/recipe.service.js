import * as recipeRepository from './recipe.repository.js';
import * as unitService from '../unit/unit.service.js';

const convertStoredIngredientToIngredient = async (storedIngredient) => {
  const factor = await unitService.getFactorByUnit(storedIngredient.unit);
  const quantity = storedIngredient.quantity / factor;
  const ingredient = {
    name: storedIngredient.name,
    unit: storedIngredient.unit,
    quantity: quantity
  }
  return ingredient;
}

const convertIngredientToStoredIngredient = async (ingredient) => {
  const factor = await unitService.getFactorByUnit(ingredient.unit);
  const stored_unit = await unitService.getStoredUnitByUnit(ingredient.unit);
  const quantity = ingredient.quantity * factor;
  const storedIngredient = {
    name: ingredient.name,
    stored_unit: stored_unit,
    quantity: quantity
  }
  return storedIngredient;
}

const convertStoredRecipeToRecipe = async (storedRecipe) => {
  const ingredients = await Promise.all(
    storedRecipe.ingredients.map(async storedIngredient =>  {
      return await convertStoredIngredientToIngredient(storedIngredient);
    })
  );

  const recipe = {
    name: storedRecipe.name,
    garnish: storedRecipe.garnish,
    method: storedRecipe.method,
    ingredients: ingredients
  };

  return recipe;
};

const convertStoredRecipesToRecipes = async (storedRecipes) => {
  const recipes = await Promise.all(
    storedRecipes.map(async storedRecipe => {
      return await convertStoredRecipeToRecipe(storedRecipe);
    })
  );
  return recipes;
};


const calculateStoredIngredientChanges = (storedIngredients, factor) => {
    const ingredientChanges = storedIngredients.map(storedIngredient => {
      return {
        name: storedIngredient.name,
        stored_unit: storedIngredient.stored_unit,
        quantity: storedIngredient.quantity * factor
      };
    }); 
  return ingredientChanges;
};


const convertIngredientsToStoredIngredients = async (ingredients) => {
  const storedIngredients = await Promise.all(
    ingredients.map(async ingredient => {
      return await convertIngredientToStoredIngredient(ingredient);
    })
  );
  return storedIngredients;
};





export const getAllRecipes = async () => {
  const storedRecipes = await recipeRepository.findAll();
  const recipes = await convertStoredRecipesToRecipes(storedRecipes);
  return recipes;
};

export const getMixableRecipesByIngredients = async (ingredients) => {
  const storedRecipes = await recipeRepository.findMixableByIngredients(ingredients);
  const recipes = convertStoredRecipesToRecipes(storedRecipes);
  return recipes;
};


export const mixRecipe = async (recipe) => {
  const name = recipe.name;
  if (!name) throw new Error('Recipe name is required');
  const factor = recipe.factor ?? 1;
  const ingredients = recipe.ingredients;
  const storedIngredients = await convertIngredientsToStoredIngredients(ingredients);
  const storedIngredientChanges = calculateStoredIngredientChanges(storedIngredients, factor);
  return storedIngredientChanges;
};