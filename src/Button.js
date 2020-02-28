import React from 'react';

import styles from './styles';

const Button = ({ children, onClick, disabled, style = {} }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    style={{ ...styles.button, ...style }}
  >
    {children}
  </button>
);

export default Button;
