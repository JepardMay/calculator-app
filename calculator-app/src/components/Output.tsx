import React, { useContext } from 'react';
import { CalculatorContext } from '../context/calculator/CalculatorState';

const Output: React.FC = () => {
  const { state } = useContext(CalculatorContext);
  const { input, result, previousResult } = state;

  return (
    <div className="output">
      <p className="output__previous">
        {previousResult.length > 0 && result === '' ? previousResult[previousResult.length - 1] : previousResult.length > 1 && result !== '' ? previousResult[previousResult.length - 2] : ''}
      </p>
      <p className="output__current">
        {result !== '' ? result : input}
      </p>
    </div>
  )
}

export default Output;
