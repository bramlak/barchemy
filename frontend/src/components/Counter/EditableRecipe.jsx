import EditableIngredients from "../EditableIngredients";
import RecipeDetails from "../RecipeDetails";
import EditableRecipeHeader from "./EditableRecipeHeader";


function EditableRecipe({recipe, onRecipeUpdate}) {

  const handleIngredientsUpdate = (updatedIngredients) => {
    onRecipeUpdate({...recipe, ingredients: updatedIngredients});
  }

  const handleQuantityChange = (quantity) => {
    onRecipeUpdate({...recipe, quantity: quantity});
  }

  const handleSelectedChange = (selected) => {
    onRecipeUpdate({...recipe, selected: selected});
  }


  return (
    <div>
      <EditableRecipeHeader
        name={recipe.name}
        quantity={recipe.quantity}
        onQuantityChange={handleQuantityChange}
        selected={recipe.selected}
        onSelectedChange={handleSelectedChange}
      />
      <RecipeDetails
        recipe={recipe}
      />
      <EditableIngredients
        ingredients={recipe.ingredients}
        onIngredientsUpdate={handleIngredientsUpdate}
      />
    </div>
  )
}

export default EditableRecipe;