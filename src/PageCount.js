import React from 'react';

import styles from './styles';

const PageCount = ({ current, total }) => (
  <span style={styles.previewBarLeftPagecount}>
    {current + 1} of {total}
  </span>
);

export default PageCount;
