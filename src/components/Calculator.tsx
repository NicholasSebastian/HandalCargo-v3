/* eslint-disable @typescript-eslint/ban-types */
import React from 'react'

interface CalculatorProps {
  close: Function
}

const Calculator = ({ close }: CalculatorProps): JSX.Element => {
  return (
    <div id="calculator">
      <button onClick={() => close()}>✕</button>
      Feature In Progress
    </div>
  )
}

export default Calculator
