import React from 'react';
import PlusBox from 'mdi-material-ui/PlusBox';
import MinusBox from 'mdi-material-ui/MinusBox';
import ArrowExpandHorizontal from 'mdi-material-ui/ArrowExpandHorizontal';

import Button from './Button';

const ViewportControl = ({ onZoomIn, onZoomOut, onFitToScreen }) => (
  <div className="vp-preview-icons">
    <Button onClick={onZoomIn}>
      <PlusBox />
    </Button>

    <Button onClick={onZoomOut} className="vp-preview-icons">
      <MinusBox />
    </Button>

    <Button onClick={onFitToScreen} className="vp-preview-icons">
      <ArrowExpandHorizontal />
    </Button>
  </div>
);

export default ViewportControl;
