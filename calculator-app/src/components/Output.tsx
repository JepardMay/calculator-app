import React, { useContext } from 'react';
import { CalculatorContext } from '../context/calculator/CalculatorState';

const Output: React.FC = () => {
  const { state } = useContext(CalculatorContext);
  const { input, result, previousResult } = state;

  return (
    <div className="output">
      <p className="output__previous">
        {previousResult[previousResult.length - 1]}
      </p>
      <p className="output__current">
        {result !== '' ? result : input}
      </p>
    </div>
  )
}

export default Output;
