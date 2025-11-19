import EditableRecipe from "./EditableRecipe";

function EditableRecipes({recipes, onRecipesUpdate}) {

  const handleRecipeUpdate = (updatedRecipe) => {
    onRecipesUpdate((prevRecipes) => 
      prevRecipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      )
    );
  };
    


  return (
    <div>
      {recipes.map((recipe) => (
        <EditableRecipe
          key = {recipe.id}
          recipe = {recipe}
          onRecipeUpdate={handleRecipeUpdate}
        />
      ))}
    </div>
  )
}

export default EditableRecipes;