import Recipe from './recipe.model.js';
import Fuse from 'fuse.js';



export const findAll = async () => {
  const recipes = await Recipe.find();
  return recipes; 
};



export const findMixableByIngredientsAndQuery = async (ingredients, query) => {
  const recipes = await Recipe.find({}).lean();

  const fuse = new Fuse(recipes, {
    keys: ['name'],
    threshold: 0.3,
  });
  
  let filteredRecipes = recipes;
  if (query && query.trim()) {
    filteredRecipes = fuse.search(query).map(result => result.item);
  }

  let mixableRecipes = filteredRecipes;
  if (ingredients && ingredients.length !== 0){
      const ingredientsMap = ingredients.reduce((map, ingredient) => {
        map[ingredient.name] = ingredient.quantity;
        return map;
      }, {});

    mixableRecipes = filteredRecipes.filter(recipe => {
      return recipe.ingredients.every(ingredient => {
        const quantity = ingredientsMap[ingredient.name];
        return quantity !== undefined && quantity >= ingredient.quantity;
      });
    });
  }
  


  return mixableRecipes;
};

export const findByName = async (name) => {
  const recipe = await Recipe.findOne({ name }).lean();
  return recipe;
};

