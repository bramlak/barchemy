function CounterMixButton({onPress, status}) {

  const getTextForStatus = (status) =>{
    if (status === "UNCHECKED"){
      return "Check";
    } else if (status === "MIXABLE"){
      return "Mix";
    } else {
      return "Not Enough";
    }
  }

  const isDisabled = status !== "UNCHECKED" && status !== "MIXABLE";

  return (
    <button
      onClick={onPress}
      disabled={isDisabled}
      className={`px-4 py-2 rounded-md text-white ${
        status === "MIXABLE"
          ? "bg-green-500 hover:bg-green-600"
          : status === "UNCHECKED"
          ? "bg-blue-500 hover:bg-blue-600"
          : "bg-gray-400 cursor-not-allowed"
      }`}
    >
      {getTextForStatus(status)}
    </button>
  );
}

export default CounterMixButton;