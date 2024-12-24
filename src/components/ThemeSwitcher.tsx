import React from 'react';

const ThemeSwitcher: React.FC = () => {
  const onClick = (evt: React.MouseEvent<HTMLElement>) => {
  };

  return (
    <div className="theme-switcher">
      <div className="theme-switcher__label">Theme</div>
      <ul className="theme-switcher__list">
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
      <button className="theme-switcher__bar" type="button" onClick={onClick}>
      </button>
    </div>
  )
};

export default ThemeSwitcher;
