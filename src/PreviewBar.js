import React from 'react';

import styles from './styles';
import PreviewBarLeft from './PreviewBarLeft';
import PreviewBarRight from './PreviewBarRight';

const PreviewBar = ({
  currentPage,
  totalPages,
  onPageUp,
  onPageDown,
  onRotate,
}) => (
  <div style={styles.previewBar}>
    <PreviewBarLeft
      onPageUp={onPageUp}
      onPageDown={onPageDown}
      totalPages={totalPages}
      currentPage={currentPage}
    />

    <PreviewBarRight onRotate={onRotate} />
  </div>
);

export default PreviewBar;
