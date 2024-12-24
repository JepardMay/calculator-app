import React from 'react';
import Output from './Output';
import Keys from './Keys';

const Calculator: React.FC = () => {
  return (
    <div className="calculator">
      <Output />
      <Keys />
    </div>
  )
}

export default Calculator;
