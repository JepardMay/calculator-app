import React from 'react';
import Key from './Key';

const Keys: React.FC = () => {
  const keysArr = [
    '7', '8', '9', 'Del', '4', '5', '6', '+', '1', '2', '3', '-', '.', '0', '/', 'x', 'Reset', '='
  ]; 

  return (
    <ul className='keys'>
      {keysArr.map((key, i) => {
        return <li className={`${i === keysArr.length - 1 || i === keysArr.length - 2 ? 'double' : ''}`} key={i}><Key value={key} mod={key === 'Del' || key === 'Reset' ? 'dark' : key === '=' ? 'bright' : ''}/></li>
      })}
    </ul>
  )
}

export default Keys;
