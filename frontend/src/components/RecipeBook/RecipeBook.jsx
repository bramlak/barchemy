import { useState } from "react";
import RecipeBookHeader from "./RecipeBookHeader";
import Recipes from "./Recipes";


function RecipeBook({inventory, onPick}) {
  const [query, setQuery] = useState("")
  const [isQueryChosen, setIsQueryChosen] = useState(false)
  const [isInventoryChosen, setIsInventoryChosen] = useState(false)
  
  
  return (
    <div>
      <RecipeBookHeader
        query={query}
        onQueryChange={(query)=>setQuery(query)}

        isQueryChosen = {isQueryChosen}
        onIsQueryChosenChange = {(isQueryChosen) => setIsQueryChosen(isQueryChosen)}

        isInventoryChosen = {isInventoryChosen}
        onIsInventoryChosenChange = {(isInventoryChosen) => setIsInventoryChosen(isInventoryChosen)}
      />
      <Recipes
        isQueryChosen = {isQueryChosen}
        query = {query}
        isInventoryChosen = {isInventoryChosen}
        inventory = {inventory}
        onPick={onPick}
      />
    </div>
  )
}

export default RecipeBook;