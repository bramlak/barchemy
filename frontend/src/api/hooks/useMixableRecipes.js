import { useState, useEffect } from 'react';
import { fetchMixableRecipes } from '../utils';

export function useMixableRecipes(inventory, isInventoryChosen, query, isQueryChosen) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ingredients = []; 
    if (isInventoryChosen){
      ingredients = inventory;
    }

    let queryString = "";
    if (isQueryChosen){
      queryString = query;
    }

    async function fetchMixable(){
      setLoading(true);
      try {
        const recipes = await fetchMixableRecipes(ingredients, queryString);
        const recipesWithIdsAndIngredientIds = recipes.map(recipe => ({
          ...recipe,
          id: crypto.randomUUID(),
          ingredients: recipe.ingredients.map(ingredient=> ({...ingredient, id: crypto.randomUUID()}))
        }));

        setRecipes(recipesWithIdsAndIngredientIds);
      } catch (error) {
        setError(error.message);
      } finally{
        setLoading(false);
      }

    }
    fetchMixable()

  }, [inventory, isInventoryChosen, query, isQueryChosen]);

  return { recipes, loading, error };
}