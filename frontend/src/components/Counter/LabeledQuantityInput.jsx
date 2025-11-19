import QuantityInput from "../QuantityInput"

function LabeledQuantityInput({label, quantity, onQuantityChange}) {
  return (
    <div  className="flex justify-between bg-green-300">
      <div>{label}</div>
      <QuantityInput
        quantity={quantity}
        onQuantityChange={onQuantityChange}
      />
    </div>
  )
}

export default LabeledQuantityInput