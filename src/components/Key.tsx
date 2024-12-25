import React, { useContext, useEffect, useCallback } from 'react';
import { CalculatorContext } from '../context/calculator/CalculatorState';

interface Props {
  value: string;
  mod: string;
  active: boolean;
  onActivate: (key: string) => void;
}

const Key = ({ value, mod, active, onActivate }: Props) => {
  const { state, dispatch } = useContext(CalculatorContext);
  const { input, result } = state;

  const isOperator = (char: string) => ['+', '-', '*', '/'].includes(char);

  const hasTwoDots = (input: string, value: string) => {
    const regex = new RegExp(`[${['+', '\\-', '*', '/'].join('')}]`);
    const numbers = input.split(regex);
    return numbers[numbers.length - 1].indexOf('.') !== -1 && value === '.';
  };

  const handleClick = useCallback((value: string) => {
    const lastCharacter = input?.charAt(input.length - 1);
    value = value === 'x' ? '*' : value;

    // Check if there is two non-numerical symbols in a row
    if (isOperator(value) && isOperator(lastCharacter)) {
      dispatch({ type: 'SET_INPUT', payload: input.slice(0, -1) + value});
      return;
    }

    // Check if there is two dots in a row or if there's already been a dot
    if (value === '.' && (lastCharacter === '.' || hasTwoDots(input, value))) {
      dispatch({ type: 'SET_INPUT', payload: input});
      return;
    }

    // Set action according to value
    if (value === '=') {
      // Remove the last operator symbol if exists
      if (isOperator(lastCharacter)) {
        dispatch({ type: 'SET_INPUT', payload: input.slice(0, -1)});
      }
      dispatch({ type: 'EVALUATE' });
    } else if (value === 'Reset') {
      dispatch({ type: 'RESET' });
    } else if (value === 'Del') {
      dispatch({ type: 'DEL' });
    } else if (result !== '' && result !== 'Error' && isOperator(value)) {
      dispatch({ type: 'SET_INPUT', payload: result + value });
    } else {
      dispatch({ type: 'SET_INPUT', payload: input + value });
    }
  }, [dispatch, input, result]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const { key } = event;

    // Mapping key presses to calculator actions
    const keyMap: { [key: string]: string } = {
      'Enter': '=',
      '=': '=',
      'Backspace': 'Del',
      'c': 'Reset',
      'Escape': 'Reset',
      '0': '0', '1': '1', '2': '2', '3': '3',
      '4': '4', '5': '5', '6': '6', '7': '7',
      '8': '8', '9': '9', '.': '.', ',': '.',
      '+': '+', '-': '-', '*': '*', '/': '/'
    };

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
