import React, { useState, useEffect } from 'react';

enum Themes {
  DEFAULT = 'default',
  LIGHT = 'light',
  COLORFUL = 'colorful',
};

const ThemeSwitcher: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState(Themes.DEFAULT);

  useEffect(() => {
    const savedTheme = localStorage.getItem('selectedTheme') as Themes;
    if (savedTheme) {
      setCurrentTheme(savedTheme);
      document.documentElement.className = savedTheme;
    }
  }, []);

  useEffect(() => {
    document.documentElement.className = currentTheme;
    localStorage.setItem('selectedTheme', currentTheme);
  }, [currentTheme]);

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
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
      <button className="theme-switcher__bar" type="button" onClick={onClick} aria-label='Switch Theme'>
      </button>
    </div>
  )
};

export default ThemeSwitcher;
