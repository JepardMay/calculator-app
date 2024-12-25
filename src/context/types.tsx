export const DEL = 'DEL';
export const RESET = 'RESET';
export const SET_INPUT = 'SET_INPUT';
export const SET_RESULT = 'SET_RESULT';
export const EVALUATE = 'EVALUATE';

export type Action =
  | { type: typeof SET_INPUT; payload: string }
  | { type: typeof SET_RESULT; payload: string }
  | { type: typeof EVALUATE }
  | { type: typeof DEL }
  | { type: typeof RESET };

export interface State {
  input: string;
  result: string;
  previousResult: string[];
};
