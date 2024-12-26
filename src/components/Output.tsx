import React, { useState, useContext } from 'react';
import { CalculatorContext } from '../context/calculator/CalculatorState';

import History from './History';

const Output: React.FC = () => {
  const [historyState, setHistoryState] = useState(false);
  const { state } = useContext(CalculatorContext);
  const { input, result } = state;
  
  return (
    <div className="output">
      <button className="output__previous" type="button" onClick={() => setHistoryState(true)}>
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
        </svg>
      </button>
      <p className="output__current">
        {result !== '' ? result : input}
      </p>
      {historyState && <History setHistoryState={setHistoryState}></History>}
    </div>
  )
}


export default Output;
