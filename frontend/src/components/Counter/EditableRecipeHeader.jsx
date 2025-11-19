import LabeledQuantityInput from "./LabeledQuantityInput"
import TickBox from "../TickBox"

function EditableRecipeHeader({name, quantity, onQuantityChange, selected, onSelectedChange}) {
  return (
    <div  className="flex justify-between bg-amber-700">
      <TickBox
        selected={selected}
        onChange={onSelectedChange}
      />
      <div>{name}</div>
      <LabeledQuantityInput
        label={"qty: "}
        quantity={quantity}
        onQuantityChange={onQuantityChange}
      />
      
    </div>
  )
}

export default EditableRecipeHeader