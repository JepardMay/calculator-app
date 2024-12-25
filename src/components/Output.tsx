import React, { useState, useContext } from 'react';
import { CalculatorContext } from '../context/calculator/CalculatorState';

import History from './History';

const Output: React.FC = () => {
  const [historyState, setHistoryState] = useState(false);
  const { state } = useContext(CalculatorContext);
  const { input, result, previousResult } = state;

  const getPreviousResult = () => {
    if (previousResult.length > 0 && result === '') {
      return previousResult[previousResult.length - 1];
    } else if (previousResult.length > 1 && result !== '') {
      return previousResult[previousResult.length - 2];
    }
    return '';
  };
  
  return (
    <div className="output">
      <button className="output__previous" type="button" onClick={() => setHistoryState(true)}>
        {getPreviousResult()}
      </button>
      <p className="output__current">
        {result !== '' ? result : input}
      </p>
      {historyState && <History setHistoryState={setHistoryState}></History>}
    </div>
  )
}


export default Output;
