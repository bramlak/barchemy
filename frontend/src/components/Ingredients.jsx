import Ingredient from './Ingredient';



function Ingredients({ingredients}){

  return (
    <div className="bg-amber-100">
        {ingredients.map(ingredient => (
          <Ingredient
            key={ingredient.id}
            ingredient={ingredient}
          />
        ))}
    </div>
  );
}

export default Ingredients;