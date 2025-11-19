function EditableIngredient({ingredient}) {

  return (
    <div className="flex items-center space-x-4 p-2 border border-gray-300 rounded-md mb-2">
        <div>{ingredient.name}</div>
        <div>{ingredient.quantity}</div>
        <div>{ingredient.unit}</div>
    </div>
  );
}


export default EditableIngredient;