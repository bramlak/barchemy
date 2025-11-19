export async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(error.message || 'API request failed');
  }
  return response.json();
}

const selectInventory = (inventory) => {
  const selectedInventory = selectIngredients(inventory);
  return selectedInventory;
}

const selectRecipes = (recipes) => {
  const selectedRecipes = recipes
  .filter(recipe => recipe.selected)
  .map(recipe=>{
    return {
      ...recipe,
      ingredients: selectIngredients(recipe.ingredients)
    };
  }).filter(recipe => recipe.ingredients.length > 0);
  console.log(selectedRecipes)
  return selectedRecipes;
}



export async function fetchAreMixable(inventory, recipes) {
  try {
    const selectedInventory = selectInventory(inventory);
    const selectedRecipes = selectRecipes(recipes);
    const load = {
      ingredients: selectedInventory,
      recipes: selectedRecipes
    };
    return fetchPost(`/api/recipe/areMixable`, load);
  } catch (error) {
    throw new Error(error.message);
  }
}
