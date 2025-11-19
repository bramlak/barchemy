import { useMixableRecipes } from "../../api/hooks/useMixableRecipes"
import Recipe from './Recipe';

function Recipes({query, isQueryChosen, inventory, isInventoryChosen, onPick}) {
  const {recipes} = useMixableRecipes(inventory, isInventoryChosen, query, isQueryChosen);



  return (
    <div>
      {recipes.map((recipe, index) => (
        <Recipe
          key = {index}
          recipe = {recipe}
          onPick={onPick}
        />
      ))}
    </div>
  )
}

export default Recipes;