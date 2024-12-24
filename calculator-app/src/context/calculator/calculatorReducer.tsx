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

const calculatorReducer = (state: State, action: Action) => {
      console.log(state.input)
  switch (action.type) {
    case SET_INPUT: 
      return {
        ...state,
        input: action.payload
      };
    case SET_RESULT:
      return {
        ...state,
        result: action.payload
      };
    case EVALUATE: 
      try {
        const evalResult = eval(state.input); 
        return {
          ...state,
          result: evalResult.toString(),
          input: '',
          previousResult: [...state.previousResult, state.result],
        };
      } catch (error) {
        return {
          ...state,
          result: 'Math Error',
          input: ''
        };
      }
    case DEL:
      return {
        ...state,
        input: state.input.substring(0, state.input.length - 1)
      }
    case RESET:
      return initialState;
    default:
      return state;
  }
};

export default calculatorReducer;
