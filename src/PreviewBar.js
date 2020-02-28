import React from 'react';

import styles from './styles';
import PreviewBarLeft from './PreviewBarLeft';
import PreviewBarRight from './PreviewBarRight';

const PreviewBar = ({
  onPageUp,
  onRotate,
  totalPages,
  onPageDown,
  onDownload,
  currentPage,
}) => (
  <div style={styles.previewBar}>
    <PreviewBarLeft
      onPageUp={onPageUp}
      onPageDown={onPageDown}
      totalPages={totalPages}
      currentPage={currentPage}
    />

    <PreviewBarRight onRotate={onRotate} onDownload={onDownload} />
  </div>
);

export default PreviewBar;
