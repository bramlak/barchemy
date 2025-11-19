import * as recipeRepository from './recipe.repository.js';
import * as unitService from '../unit/unit.service.js';
import * as ingredientService from '../ingredient/ingredient.service.js';

const convertStoredIngredientToIngredient = async (storedIngredient) => {
  const storedUnit = await ingredientService.getStoredUnitByName(storedIngredient.name);
  const factor = await unitService.getFactorByUnit(storedUnit);
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
    storedUnit: stored_unit,
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
    ...storedRecipe,
    ingredients: ingredients
  };

  return recipe;
};


const convertRecipeToStoredRecipe = async (recipe) => {
  const storedIngredients = await Promise.all(
    recipe.ingredients.map(async ingredient =>  {
      return await convertStoredIngredientToIngredient(ingredient);
    })
  );

  const storedRecipe = {
    ...recipe,
    ingredients: storedIngredients
  };

  return storedRecipe;
};


const convertStoredRecipesToRecipes = async (storedRecipes) => {
  const recipes = await Promise.all(
    storedRecipes.map(async storedRecipe => {
      return await convertStoredRecipeToRecipe(storedRecipe);
    })
  );
  return recipes;
};

const convertRecipesToStoredRecipes = async (recipes) => {
  const storedRecipes = await Promise.all(
    recipes.map(async recipe => {
      return await convertRecipeToStoredRecipe(recipe);
    })
  );
  return recipes;
};


const calculateStoredIngredientChanges = (storedIngredients, quantity) => {
    const ingredientChanges = storedIngredients.map(storedIngredient => {
      return {
        name: storedIngredient.name,
        stored_unit: storedIngredient.stored_unit,
        quantity: storedIngredient.quantity * quantity
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

export const getMixableRecipesByIngredientsAndQuery = async (ingredients, query) => {
  const storedRecipes = await recipeRepository.findMixableByIngredientsAndQuery(ingredients, query);
  const recipes = await convertStoredRecipesToRecipes(storedRecipes);
  return recipes;
};


const sumIngredientsOfRecipes = (recipes) => {
  const map = recipes.reduce((map, recipe) => {
    recipe.ingredients.forEach(ingredient => {
      const quantity = ingredient.quantity * recipe.quantity;
      if (map.has(ingredient.name)) {
        map.get(ingredient.name).quantity += quantity;
      } else {
        map.set(ingredient.name, { ...ingredient, quantity: quantity });
      }
    });
    return map;
  }, new Map());

  return Array.from(map.values());
};


const getIngredientByName = (ingredients, name) => {
  return ingredients.find(ingredient => ingredient.name === name); 
}


export const areRecipesMixableByIngredients = async (ingredients, recipes) => {
  const storedRecipes = await convertRecipesToStoredRecipes(recipes);
  const summedIngredients = sumIngredientsOfRecipes(storedRecipes);

  const areMixable = summedIngredients.every(summedIngredient => {
    const foundIngredient = getIngredientByName(ingredients, summedIngredient.name)
    if (!foundIngredient){
      return false;
    } else if (summedIngredient.quantity <= foundIngredient.quantity) {
      return true;
    } else {
      return false;
    }
  });
  return areMixable;
};
};