import React from 'react';
import PropTypes from 'prop-types';

interface Props {
  value: string;
  mod: string;
}

const Key = ({ value, mod }: Props) => {
  const onClick = (evt: React.MouseEvent<HTMLElement>) => {
  };
  
  return (
    <button className={mod ? 'key key--' + mod : 'key'} type='button' onClick={onClick}>
      <span>{value}</span>
    </button>
  )
};

Key.propTypes = {
  value: PropTypes.string.isRequired,
  mod: PropTypes.string,
};

export default Key;
