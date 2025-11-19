function RecipeHeader({recipe, onPick}) {
  return (
    <div className="flex justify-between bg-blue-300">
      <div>{recipe.name}</div>
      <button onClick={()=>onPick(recipe)}>Pick</button>
    </div>
  )
}

export default RecipeHeader