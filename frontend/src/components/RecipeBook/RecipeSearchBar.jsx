import TickBox from "../TickBox"

function RecipeSearchBar({query, onQueryChange, selected, onSelectedChange, placeholder= "Search"}) {
  
    const handleQueryChange = (e) => {
      onQueryChange(e.target.value);
    };

  return (
    <div className="flex bg-blue-500">
      <TickBox
        selected={selected}
        onChange={onSelectedChange}
      />
      <input
        type="text"
        value={query}
        onChange={handleQueryChange}
        placeholder={placeholder}/>
    </div>
  )
}

export default RecipeSearchBar