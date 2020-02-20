import React from 'react';
import PlusBox from 'mdi-material-ui/PlusBox';
import MinusBox from 'mdi-material-ui/MinusBox';
import ArrowExpandHorizontal from 'mdi-material-ui/ArrowExpandHorizontal';

import Button from './Button';
import styles from './styles';

const ViewportControl = () => (
  <div style={styles.icons}>
    <Button>
      <PlusBox />
    </Button>

    <Button style={styles.iconsButton}>
      <MinusBox />
    </Button>

    <Button style={styles.iconsButton}>
      <ArrowExpandHorizontal />
    </Button>
  </div>
);

export default ViewportControl;
