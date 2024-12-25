// Check if character is an operator
export const isOperator = (char: string) => ['+', '-', '*', '/'].includes(char);

// Check if the last input number already has a dot
export const hasTwoDots = (input: string, value: string) => {
  const regex = new RegExp(`[${['+', '\\-', '*', '/'].join('')}]`);
  const numbers = input.split(regex);
  return numbers[numbers.length - 1].indexOf('.') !== -1 && value === '.';
};

// Check if there are two operators in a row
export const shouldReplaceLastOperator = (value: string, lastCharacter: string) => 
  isOperator(value) && isOperator(lastCharacter);

// Check if there are two dots in a row
export const shouldIgnoreDot = (value: string, lastCharacter: string, input: string) => 
  value === '.' && (lastCharacter === '.' || hasTwoDots(input, value));

// Check if the initial input is an operator (except '-')
export const shouldIgnoreInitialOperator = (value: string, input: string, result: string) => 
  isOperator(value) && input === '' && value !== '-' && result === '';
  