import React from 'react';

import styles from './styles';

const Button = ({ children, onClick, style = {} }) => (
  <button
    type="button"
    onClick={onClick}
    style={{ ...styles.button, ...style }}
  >
    {children}
  </button>
);

export default Button;
