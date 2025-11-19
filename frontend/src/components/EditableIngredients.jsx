import { useIngredients } from '../api/hooks/useIngredients';
import EditableIngredient from './EditableIngredient';



function EditableIngredients({ingredients, onIngredientsUpdate}){
  const { ingredients: availableIngredients} = useIngredients();

  const addIngredient = () => {
    const newId = crypto.randomUUID();
    onIngredientsUpdate([...ingredients, { id: newId, name: '', quantity: 0, unit: '', selected: false }]);
  };

  const updateIngredient = (updated) => {
    onIngredientsUpdate(ingredients.map(item => {
      return item.id === updated.id ? updated : item
    }));
  };

  const deleteIngredient = (id) => {
    onIngredientsUpdate(ingredients.filter(item => item.id !== id));
  };


  const getAvailableIngredientsForItem = (item, ingredients, availableIngredients) => {
    return availableIngredients.filter((availableIngredient) =>
      availableIngredient.name === item.name ||
      !ingredients.some(
        (invItem) =>
          invItem.name === availableIngredient.name && invItem.id !== item.id
      )
    );
  };

  return (
    <div className="bg-amber-100">
        {ingredients.map(item => (
          <EditableIngredient
            key={item.id}
            ingredient={item}
            availableIngredients={getAvailableIngredientsForItem(
              item,
              ingredients,  
              availableIngredients
            )}
            onUpdate={updateIngredient}
            onDelete={() => deleteIngredient(item.id)}
          />
        ))}
      <button onClick={addIngredient} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
        Add Ingredient
      </button>
    </div>
  );
}

export default EditableIngredients;