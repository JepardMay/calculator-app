import React, { useState, useEffect } from 'react';

enum Themes {
  DEFAULT = 'default',
  LIGHT = 'light',
  COLORFUL = 'colorful',
};

const ThemeSwitcher: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState(Themes.DEFAULT);
  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('selectedTheme') as Themes;
    if (savedTheme && savedTheme !== currentTheme) {
      setCurrentTheme(savedTheme);
      document.documentElement.className = savedTheme;
    }
    setIsInitialRender(false);
  }, []);

  useEffect(() => {
    if (!isInitialRender) {
      document.documentElement.className = currentTheme;
      localStorage.setItem('selectedTheme', currentTheme);
    }
  }, [currentTheme, isInitialRender]);

  const onClick = ()=> {
    if (currentTheme === Themes.DEFAULT) {
      setCurrentTheme(Themes.LIGHT);
    } else if (currentTheme === Themes.LIGHT) {
      setCurrentTheme(Themes.COLORFUL);
    } else if (currentTheme === Themes.COLORFUL) {
      setCurrentTheme(Themes.DEFAULT);
    }
  };

  return (
    <div className="theme-switcher">
      <div className="theme-switcher__label">Theme</div>
      <ul className="theme-switcher__list">
        <li>
          <button type="button" onClick={ () => setCurrentTheme(Themes.DEFAULT) }>1</button>
        </li>
        <li>
          <button type="button" onClick={ () => setCurrentTheme(Themes.LIGHT) }>2</button>
        </li>
        <li>
          <button type="button" onClick={ () => setCurrentTheme(Themes.COLORFUL) }>3</button>
        </li>
      </ul>
      <button className="theme-switcher__bar" type="button" onClick={onClick} aria-label='Switch Theme'>
      </button>
    </div>
  )
};

export default ThemeSwitcher;
