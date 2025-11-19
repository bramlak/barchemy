function QuantityInput({quantity, onQuantityChange}) {
  
    const handleQuantityChange = (e) => {
      const newQuantity = parseFloat(e.target.value) || 0;
      onQuantityChange(newQuantity);
    };
  
  return (
    <input
      type="number"
      value={quantity || ''}
      onChange={handleQuantityChange}
      min="0"
      step="1"
      className="border border-gray-300 rounded px-2 py-1 w-20"
    />
  )
}

export default QuantityInput;