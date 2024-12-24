import React, { useState, useCallback } from 'react';
import Key from './Key';

const Keys: React.FC = () => {
  const keysArr = [
    '7', '8', '9', 'Del', '4', '5', '6', '+', '1', '2', '3', '-', '.', '0', '/', 'x', 'Reset', '='
  ];

  const [activeKey, setActiveKey] = useState('');

  const handleKeyActivation = useCallback((key: string) => {
    setActiveKey(key);
    
    setTimeout(() => {
      setActiveKey('');
    }, 150);
  }, []);

  const setMod = (key: string) => {
    switch (key) {
      case 'Del':
      case 'Reset':
        return 'dark';
      case '=':
        return 'bright';
      default:
        return '';
    }
  };

  return (
    <ul className='keys'>
      {keysArr.map((key, i) => {
        return <li className={ `${i === keysArr.length - 1 || i === keysArr.length - 2 ? 'double' : ''}` } key={ i }>
          <Key
            value={ key }
            mod={setMod(key)}
            active={ activeKey === key }
            onActivate={(key: string) => handleKeyActivation(key)}
          />
        </li>
      })}
    </ul>
  )
}

export default Keys;
