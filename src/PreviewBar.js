import React from 'react';

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
  <div className="vp-preview-bar">
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
