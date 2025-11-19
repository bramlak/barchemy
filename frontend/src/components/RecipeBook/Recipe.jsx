import RecipeDetails from "../RecipeDetails"
import Ingredients from "../Ingredients"
import RecipeHeader from "./RecipeHeader";

function Recipe({recipe, onPick}) {
  return (
    <div  className=" bg-green-600">
      <RecipeHeader
        recipe={recipe}
        onPick={onPick}
      />
      <RecipeDetails
        recipe={recipe}
      />
      <div>Ingredients</div>
      <Ingredients
        ingredients = {recipe.ingredients}
      />
    </div>
  )
}

export default Recipe;