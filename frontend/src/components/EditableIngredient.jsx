import QuantityInput from "./QuantityInput";
import TickBox from "./TickBox";

function EditableIngredient({ ingredient, availableIngredients, onUpdate, onDelete }) {

  
  const handleNameChange = (e) => {
    const selectedName = e.target.value;
    const selectedIng = availableIngredients.find(ing => ing.name === selectedName);
    const newUnit = selectedIng ? selectedIng.stored_unit : 'ml';
    onUpdate({ ...ingredient, name: selectedName, unit: newUnit });
  };

  const handleQuantityChange = (quantity) => {
    onUpdate({ ...ingredient, quantity: quantity });
  };

  const handleSelectedChange = (selected) => {
    onUpdate({ ...ingredient, selected: selected });
  };

  const sortedIngredients = [...availableIngredients].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="flex items-center space-x-4 p-2 border border-gray-300 rounded-md mb-2">
      <TickBox
        selected={ingredient.selected}
        onChange={handleSelectedChange}
      />
      <select
        value={ingredient.name || ''}
        onChange={handleNameChange}
        className="border border-gray-300 rounded px-2 py-1 flex-1"
      >
        <option value="">Select Ingredient</option>
        {
          sortedIngredients.length === 0 ? (
            <option value=""> Loading ...</option>
          ): (
          sortedIngredients.map(ing => (
            <option key={ing.name} value={ing.name}>
              {ing.name}
            </option>
        )))
      }
      </select>
      <QuantityInput
        quantity={ingredient.quantity}
        onQuantityChange={handleQuantityChange}
      />
      <span className="text-gray-600">{ingredient.unit || 'ml'}</span>
      <button
        onClick={onDelete}
        className="text-red-500 hover:text-red-700 font-bold"
      >
        X
      </button>
    </div>
  );
}



export default EditableIngredient;