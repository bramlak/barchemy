import Ingredient from './ingredient.model.js';


export const findAll = async () => {
  const ingredients = await Ingredient.find();
  return ingredients; 
};


export const getStoredUnitByName = async (name) => {
  const ingredient = await Ingredient.findOne({name});
  return ingredient.stored_unit; 
};
