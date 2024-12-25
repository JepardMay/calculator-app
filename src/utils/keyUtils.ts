export const keysArr = [
  '7', '8', '9', 'Del', '4', '5', '6', '+', '1', '2', '3', '-', '.', '0', '/', 'x', 'Reset', '='
];

export const setMod = (key: string) => {
  switch (key) {
    case 'Del':
    case 'Reset':
      return 'dark';
    case '=':
      return 'bright';
    default:
      return '';
  }
};

export const keyMap: { [key: string]: string } = {
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
