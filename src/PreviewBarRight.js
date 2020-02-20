import React from 'react';
import Download from 'mdi-material-ui/Download';
import RotateRight from 'mdi-material-ui/RotateRight';

import styles from './styles';
import Button from './Button';

const PreviewBarRight = ({ onRotate }) => (
  <div style={styles.previewBarRight} onClick={onRotate}>
    <Button>
      <RotateRight />
    </Button>

    <Button>
      <Download />
    </Button>
  </div>
);

export default PreviewBarRight;
