import RecipeSearchBar from "./RecipeSearchBar";
import LabeledTickBox from "./LabeledTickBox";

function RecipeBookHeader({query, onQueryChange, isQueryChosen, onIsQueryChosenChange, isInventoryChosen, onIsInventoryChosenChange}) {


  return (
    <div className="flex justify-between bg-blue-300">
      <div>Recipe Book</div>
      <RecipeSearchBar
        query = {query}
        onQueryChange = {onQueryChange}
        selected = {isQueryChosen}
        onSelectedChange = {onIsQueryChosenChange}
      />
      <LabeledTickBox
        selected={isInventoryChosen}
        onChange={onIsInventoryChosenChange}
        label = "Affordable"
      />
    </div>
  )
}

export default RecipeBookHeader;