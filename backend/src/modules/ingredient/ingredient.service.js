import * as ingredientRepository from './ingredient.repository.js';



export const getAll = async () => {
  const ingredients = await ingredientRepository.findAll();
  return ingredients;
};

export const getStoredUnitByName = async (name) => {
  const unit = await ingredientRepository.getStoredUnitByName(name);
  return unit;
};