import {
  DEL,
  RESET,
  SET_INPUT,
  SET_RESULT,
  EVALUATE,
  State,
  Action
} from '../types';

const calculatorReducer = (state: State, action: Action) => {
  switch (action.type) {
    case SET_INPUT: 
      return {
        ...state,
        input: action.payload,
        result: ''
      };
    case SET_RESULT:
      return {
        ...state,
        result: action.payload
      };
    case EVALUATE: 
      try {
        const evalResult = eval(state.input).toString(); 
        const newPreviousResults = [...state.previousResult, state.input + '=' + evalResult];
        return {
          ...state,
          result: evalResult,
          input: '',
          previousResult: newPreviousResults
        };
      } catch (error) {
        return {
          ...state,
          result: 'Error',
          input: ''
        };
      }
    case DEL:
      return {
        ...state,
        input: state.input.substring(0, state.input.length - 1)
      };
    case RESET:
      return {
        ...state,
        result: '',
        input: ''
      };
    default:
      return state;
  }
};

export default calculatorReducer;
