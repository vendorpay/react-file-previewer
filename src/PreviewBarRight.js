import React from 'react';
import Download from 'mdi-material-ui/Download';
import RotateRight from 'mdi-material-ui/RotateRight';

import Button from './Button';

const PreviewBarRight = ({ onRotate, onDownload }) => (
  <div className="preview-bar-left">
    <Button onClick={onRotate}>
      <RotateRight />
    </Button>

    <Button onClick={onDownload}>
      <Download />
    </Button>
  </div>
);

export default PreviewBarRight;
