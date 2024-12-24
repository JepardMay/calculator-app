import React from 'react';
import CalculatorProvider from './context/calculator/CalculatorState';
import ThemeSwitcher from './components/ThemeSwitcher';
import Calculator from './components/Calculator';

function App() {
  return (
    <CalculatorProvider>
      <main className="main">
        <div className="container">
          <header className="header">
            <h1 className="header__title">Calc</h1>
            <ThemeSwitcher/>
          </header>
          <Calculator/>
          <footer className="attribution">
            Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel="noopener noreferrer">Frontend Mentor</a>. Coded by <a href="https://github.com/JepardMay" target="_blank" rel="noopener noreferrer">JepardMay</a>.
          </footer>
        </div>
      </main>
    </CalculatorProvider>
  );
}

export default App;
