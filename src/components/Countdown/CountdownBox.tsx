type CountdownBoxProps = {
  left: string | number
  label: string
}

const CountdownBox: React.FC<CountdownBoxProps> = ({ left }) => {
  const leftSplit = left.toString().split('')
  return (
    <div className="countdown__box">
      <div className="countdown__box-square">
        <div className="countdown__box-left">{leftSplit[0]}</div>
        <div className="countdown__box-left">{leftSplit[1]}</div>
      </div>
    </div>
  )
}

export default CountdownBox
