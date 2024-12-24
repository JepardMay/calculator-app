import React, { useContext, useEffect, useCallback } from 'react';
import { CalculatorContext } from '../context/calculator/CalculatorState';
import PropTypes from 'prop-types';

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
    value = value === 'x' ? '*' : value;

    if (value === '=') {
      dispatch({ type: 'EVALUATE' });
    } else if (value === 'Reset') {
      dispatch({ type: 'RESET' });
    } else if (value === 'Del') {
      dispatch({ type: 'DEL' });
    } else if (result !== '' && result !== 'Error' && ['+', '-', '*', '/'].includes(value)) {
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

Key.propTypes = {
  value: PropTypes.string.isRequired,
  mod: PropTypes.string,
  active: PropTypes.bool.isRequired,
  onActivate: PropTypes.func.isRequired,
};

export default Key;
