import React from 'react';
import PlusBox from 'mdi-material-ui/PlusBox';
import MinusBox from 'mdi-material-ui/MinusBox';
import ArrowExpandHorizontal from 'mdi-material-ui/ArrowExpandHorizontal';

import Button from './Button';
import styles from './styles';

const ViewportControl = ({ onZoomIn, onZoomOut, onFitToScreen }) => (
  <div style={styles.icons}>
    <Button onClick={onZoomIn}>
      <PlusBox />
    </Button>

    <Button onClick={onZoomOut} style={styles.iconsButton}>
      <MinusBox />
    </Button>

    <Button onClick={onFitToScreen} style={styles.iconsButton}>
      <ArrowExpandHorizontal />
    </Button>
  </div>
);

export default ViewportControl;
