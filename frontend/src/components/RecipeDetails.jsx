function RecipeDetails({recipe}) {
  return (
    <div>
      <div>Method</div>
      <div>{recipe.method}</div>
      <div>Garnish</div>
      <div>{recipe.garnish}</div>
    </div>
  )
}

export default RecipeDetails;