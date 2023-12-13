import './style.css'

type Props = {
  text: string
  onClick: () => void
  icon: string
  isDisabled?: boolean
}

const ActionButton = ({ icon, onClick, text, isDisabled }: Props) => {
  return (
    <button onClick={onClick} disabled={isDisabled} className='projectTree__actionButton'>
      <img src={icon} alt={text} />
      {!isDisabled && <div className="hint">{text}</div>}
    </button>
  )
}

export default ActionButton