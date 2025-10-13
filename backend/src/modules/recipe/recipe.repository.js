import Recipe from './recipe.model.js';


export const findAll = async () => {
  const recipes = await Recipe.find();
  return recipes; 
};



export const findMixableByIngredients = async (ingredients) => {
  const ingredientsMap = ingredients.reduce((map, ingredient) => {
    map[ingredient.name] = ingredient.quantity;
    return map;
  }, {});

  const recipes = await Recipe.find({}).lean();

  const mixableRecipes = recipes.filter(recipe => {
    return recipe.ingredients.every(ingredient => {
      const quantity = ingredientsMap[ingredient.name];
      return quantity !== undefined && quantity >= ingredient.quantity;
    });
  });

  return mixableRecipes;
};

export const findByName = async (name) => {
  const recipe = await Recipe.findOne({ name }).lean();
  return recipe;
};

