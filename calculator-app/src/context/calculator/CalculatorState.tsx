import React, { createContext, useReducer, ReactNode } from 'react';
import calculatorReducer from './calculatorReducer';

import {
  DEL,
  RESET,
  SET_INPUT,
  SET_RESULT,
  EVALUATE,
  State,
  Action
} from '../types';

const initialState: State = {
  input: '',
  result: '',
  previousResult: [],
};

export const CalculatorContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const CalculatorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  const setInput = (value: string) => {
    dispatch({
      type: SET_INPUT,
      payload: value
    });
  };

  const setResult = (value: string) => {
    dispatch({
      type: SET_RESULT,
      payload: value
    });
  };

  const evaluate = () => {
    dispatch({
      type: EVALUATE
    });
  };

  const del = () => {
    dispatch({
      type: DEL,
    });
  };

  const reset = () => {
    dispatch({
      type: RESET,
    });
  };

  return (
    <CalculatorContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {children}
    </CalculatorContext.Provider>
  )
};

export default CalculatorProvider;
