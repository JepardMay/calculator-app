import React, { useState, useCallback } from 'react';
import Key from './Key';
import { keysArr, setMod } from '../utils/keyUtils';

const Keys: React.FC = () => {
  const [activeKey, setActiveKey] = useState('');

  const handleKeyActivation = useCallback((key: string) => {
    setActiveKey(key);
    
    setTimeout(() => {
      setActiveKey('');
    }, 150);
  }, []);

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
