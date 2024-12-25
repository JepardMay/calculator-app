import React, { useContext } from 'react';
import { CalculatorContext } from '../context/calculator/CalculatorState';

interface Props {
  setHistoryState: (boolean: boolean) => void;
}

const Output = ({setHistoryState}: Props) => {
  const { state } = useContext(CalculatorContext);
  const { previousResult } = state;

  return (
    <div className="history">
      <button className="history__close-btn" onClick={ () => setHistoryState(false) } aria-label="Close History">
        <span>X</span>
      </button>
      { previousResult.map((result) => {
        return (
          <p key={ result }>
            {result}
          </p>
        );
      })}
    </div>
  )
}

export default Output;
