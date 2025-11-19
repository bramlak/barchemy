import TickBox from '../TickBox'

function LabeledTickBox({selected, onChange, label}) {
  return (
    <div className='bg-red-300 flex justify-between'>
      <TickBox
        selected = {selected}
        onChange = {onChange}
      />
      <div>{label}</div>
    </div>
  )
}

export default LabeledTickBox