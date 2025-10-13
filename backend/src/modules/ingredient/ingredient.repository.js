import Ingredient from './ingredient.model.js';


export const findAll = async () => {
  const ingredients = await Ingredient.find();
  return ingredients; 
};
