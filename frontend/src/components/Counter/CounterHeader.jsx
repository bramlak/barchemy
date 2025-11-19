import CounterMixButton from "./CounterMixButton";

function CounterHeader({onMix, status}) {
  return (
    <div className="flex justify-between bg-blue-300">
      <div>Counter</div>
      <CounterMixButton
        onPress = {onMix}
        status = {status}
      />
    </div>
  )
}

export default CounterHeader;