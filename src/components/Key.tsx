import React, { useContext, useEffect, useCallback } from 'react';
import { CalculatorContext } from '../context/calculator/CalculatorState';
import { isOperator, shouldReplaceLastOperator, shouldIgnoreDot, shouldIgnoreInitialOperator } from '../utils/calculatorUtils';
import { keyMap } from '../utils/keyUtils';

interface Props {
  value: string;
  mod: string;
  active: boolean;
  onActivate: (key: string) => void;
}

const Key = ({ value, mod, active, onActivate }: Props) => {
  const { state, dispatch } = useContext(CalculatorContext);
  const { input, result } = state;

  const handleClick = useCallback((value: string) => {
    const lastCharacter = input?.charAt(input.length - 1);
    value = value === 'x' ? '*' : value;

    const setInput = (payload: string) => dispatch({ type: 'SET_INPUT', payload });

    if (shouldReplaceLastOperator(value, lastCharacter)) {
      setInput(input.slice(0, -1) + value);
      return;
    }

    if (shouldIgnoreDot(value, lastCharacter, input)) {
      setInput(input);
      return;
    }

    if (shouldIgnoreInitialOperator(value, input)) {
      return;
    }

    if (value === '=') {
      if (input === '') return;

      if (isOperator(lastCharacter)) {
        setInput(input.slice(0, -1));
      }
      dispatch({ type: 'EVALUATE' });
    } else if (value === 'Reset') {
      dispatch({ type: 'RESET' });
    } else if (value === 'Del') {
      dispatch({ type: 'DEL' });
    } else if (result !== '' && result !== 'Error' && isOperator(value) && value !== '-') {
      setInput(result + value);
    } else {
      setInput(input + value);
    }
  }, [dispatch, input, result]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const { key } = event;

    // Mapping key presses to calculator actions
    if (key in keyMap) {
      handleClick(keyMap[key]);
      const activeKey = keyMap[key] === '*' ? 'x' : keyMap[key];
      onActivate(activeKey);
    }
  }, [handleClick, onActivate]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
  
  return (
    <button
      className={`key ${active ? 'key--active' : ''} ${mod ? 'key--' + mod : ''}`}
      type='button'
      onClick={ () => handleClick(value)}
    >
      <span>{value}</span>
    </button>
  )
};

export default Key;
