export async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(error.message || 'API request failed');
  }
  return response.json();
}

export async function fetchMixableRecipes(ingredients, query) {
  let url = `/api/recipe/mixable`;
  if (query && query.length !== 0){
    url += `?q=${query}`;
  }

  return fetchPost(url, ingredients);
}


const selectIngredients = (ingredients) => {
  return ingredients
  .filter(ingredient=> ingredient.selected)
  .filter(ingredient => ingredient?.name != "");
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


const fetchPost = async (url, load) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(load),
  });
  const data = await handleResponse(response);
  return data;
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


export async function fetchMix(recipes) {
  try {
    const selectedRecipes = selectRecipes(recipes)
    return fetchPost(`/api/recipe/mix`, selectedRecipes);
  } catch (error) {
    throw new Error(error.message);
  }
}