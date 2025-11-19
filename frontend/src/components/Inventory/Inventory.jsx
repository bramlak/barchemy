import EditableIngredients from "../EditableIngredients"

function Inventory({inventory, onInventoryUpdate}) {
  
  return (
    <div>
      <div>Inventory</div>
      <EditableIngredients
        ingredients={inventory}
        onIngredientsUpdate={onInventoryUpdate}
      />
    </div>
  )
}

export default Inventory
