

function TickBox({selected, onChange}) {
  
  const handleChange = (e) => {
    onChange(e.target.checked);
  }

  return (
    <div>
      <input
        type="checkbox"
        checked={selected || false}
        onChange={handleChange}
        className="h-4 w-4"
      />
    </div>
  )
}

export default TickBox;