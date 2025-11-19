import { useState } from 'react';
import Inventory from '../components/Inventory/Inventory';
import RecipeBook from '../components/RecipeBook/RecipeBook';
import Counter from '../components/Counter/Counter';
import { fetchAreMixable, fetchMix } from '../api/utils';


function BarPage() {
  const [inventory, setInventory] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [recipesVerificationStatus, setRecipesVerificationStatus] = useState("UNCHECKED");

  const getSelectedInventory = (inventory) => {
    return inventory.filter(ingredient => {
      return ingredient.selected;
    });
  }

  const filterInventory = (inventory) => {
    const selectedInventory = getSelectedInventory(inventory);
    return selectedInventory.filter(ingredient => {
      return ingredient?.name.length !== 0;
    })
  }

  const handleRecipesUpdate = (updatedRecipes) => {
    setRecipesVerificationStatus("UNCHECKED");
    setRecipes(updatedRecipes);
  }

  const handleInventoryUpdate = (updatedInventory) => {
    setRecipesVerificationStatus("UNCHECKED");
    setInventory(updatedInventory);
  }


  const handlePick = (pickedRecipe) => {
    setRecipesVerificationStatus("UNCHECKED");

    setRecipes(prev => {
      const alreadyExists = prev.some(recipe => recipe.name === pickedRecipe.name);
      if (alreadyExists) return prev;

      const recipeId = crypto.randomUUID();
      const ingredientsWithIds = pickedRecipe.ingredients.map(ingredient => ({
        ...ingredient,
        id: crypto.randomUUID(),
        selected: true
      }));

      return [
        ...prev,
        {
          ...pickedRecipe,
          selected: true,
          quantity: 1,
          id: recipeId,
          ingredients: ingredientsWithIds
        }
      ];
    });
  };

  

  const handleMix = async () => {
    if (recipesVerificationStatus === "MIXABLE"){
      const changesOfIngredients = await fetchMix(recipes);
      setInventory(previousInventory =>{
        return previousInventory.map(ingredient => {
          const foundIngredient = changesOfIngredients.find(changesOfIngredient => changesOfIngredient.name === ingredient.name);
          if (foundIngredient){
            const newIngredient = {
              ...ingredient,
              quantity: ingredient.quantity - foundIngredient.quantity
            };
            return newIngredient;
          } else {
            return ingredient;
          }
        });
      });
    } else if (recipesVerificationStatus === "UNCHECKED"){
      const isMixable = await fetchAreMixable(inventory, recipes)
      if (isMixable){
        setRecipesVerificationStatus("MIXABLE");
      } else {
        setRecipesVerificationStatus("UNMIXABLE");
      }
    }

  }

  return (
    <div className='flex flex-col items-center bg-amber-200'>
      <div className=''>
        <Inventory
          inventory = {inventory}
          onInventoryUpdate={handleInventoryUpdate}
        />
        
      </div>
      <div className='flex  bg-amber-400'>
        <RecipeBook
          inventory={filterInventory(inventory)}
          onPick={handlePick}
        />
        <Counter
          recipes={recipes}
          onRecipesUpdate={handleRecipesUpdate}
          recipesVerificationStatus={recipesVerificationStatus}
          onMix={handleMix}
        />
      </div>
    </div>
  );
}



export default BarPage;