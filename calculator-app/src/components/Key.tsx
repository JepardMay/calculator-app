import React, { useContext } from 'react';
import { CalculatorContext } from '../context/calculator/CalculatorState';
import PropTypes from 'prop-types';

interface Props {
  value: string;
  mod: string;
}

const Key = ({ value, mod }: Props) => {
  const { state, dispatch } = useContext(CalculatorContext);
  const { input, result, previousResult } = state;

  const handleClick = (value: string) => {
    if (value === '=') {
      dispatch({ type: 'EVALUATE' });
    } else if (value === 'Reset') {
      dispatch({ type: 'RESET' });
    } else if (value === 'Del') {
      dispatch({ type: 'DEL' });
    } else if (result !== '') {
       if (value === 'x') {
        dispatch({ type: 'SET_INPUT', payload: previousResult[previousResult.length - 1] + '*' });
      } else {
        dispatch({ type: 'SET_INPUT', payload: previousResult[previousResult.length - 1] + value });
      }
    } else {
       if (value === 'x') {
        dispatch({ type: 'SET_INPUT', payload: input + '*' });
      } else {
        dispatch({ type: 'SET_INPUT', payload: input + value });
      }
    }
  };
  
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
