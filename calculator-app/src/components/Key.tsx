import React, { useContext, useEffect, useCallback } from 'react';
import { CalculatorContext } from '../context/calculator/CalculatorState';
import PropTypes from 'prop-types';

interface Props {
  value: string;
  mod: string;
}

const Key = ({ value, mod }: Props) => {
  const { state, dispatch } = useContext(CalculatorContext);
  const { input, result } = state;

  const handleClick = useCallback((value: string) => {
    value = value === 'x' ? '*' : value;

    if (value === '=') {
      dispatch({ type: 'EVALUATE' });
    } else if (value === 'Reset') {
      dispatch({ type: 'RESET' });
    } else if (value === 'Del') {
      dispatch({ type: 'DEL' });
    } else if (result !== '' && ['+', '-', '*', '/'].includes(value)) {
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
    }
  }, [handleClick]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
  
  return (
    <button className={mod ? 'key key--' + mod : 'key'} type='button' onClick={() => handleClick(value)}>
      <span>{value}</span>
    </button>
  )
};

Key.propTypes = {
  value: PropTypes.string.isRequired,
  mod: PropTypes.string,
};

export default Key;
