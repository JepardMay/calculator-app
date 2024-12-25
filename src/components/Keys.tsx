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
      {keysArr.map((key) => {
        const isDouble = key === 'Reset' || key === '=';
        return (
          <li className={isDouble ? 'double' : ''} key={key}>
            <Key
              value={key}
              mod={setMod(key)}
              active={activeKey === key}
              onActivate={(k: string) => handleKeyActivation(k)}
            />
          </li>
        );
      })}
    </ul>
  )

}

export default Keys;
