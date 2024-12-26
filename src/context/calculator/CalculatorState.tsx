import React, { createContext, useReducer, ReactNode, useMemo } from 'react';
import calculatorReducer from './calculatorReducer';

import {
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
  const value = useMemo(() => ({
    state,
    dispatch,
  }), [state, dispatch]);

  return (
    <CalculatorContext.Provider value={value}>
      {children}
    </CalculatorContext.Provider>
  )
};

export default CalculatorProvider;
