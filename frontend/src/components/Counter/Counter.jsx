import CounterHeader from "./CounterHeader";
import EditableRecipes from "./EditableRecipes";

function Counter ({recipes, onRecipesUpdate, recipesVerificationStatus, onMix}){

  return (
    <div className="flex flex-col bg-gray-500">
      <CounterHeader
        onMix={onMix}
        status ={recipesVerificationStatus}
      />
      <EditableRecipes
        recipes={recipes}
        onRecipesUpdate={onRecipesUpdate}
      />
    </div>
  );
}

export default Counter;

  