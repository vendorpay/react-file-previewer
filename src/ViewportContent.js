import React from 'react';
import * as R from 'ramda';

import PDFViewer from './PDFViewer';
import ImageViewer from './ImageViewer';

/**
 * Check if a file is a pdf.
 *
 * @param  {Object}
 * @return {Boolean}
 */
const isPDF = R.either(
  R.o(R.endsWith('.pdf'), R.propOr('', 'url')),
  R.propEq('mimeType', 'application/pdf'),
);

const ViewportContent = ({
  file,
  contentRef,
  totalPages,
  viewportRef,
  currentPage,
  onTotalPages,
  onCurrentPageChange,
}) => (
  <div className="vp-preview-content" ref={viewportRef}>
    <div className="vp-preview-file" ref={contentRef}>
      {isPDF(file) ? (
        <PDFViewer
          file={file}
          totalPages={totalPages}
          currentPage={currentPage}
          onTotalPages={onTotalPages}
          onCurrentPageChange={onCurrentPageChange}
        />
      ) : (
        <ImageViewer file={file} />
      )}
    </div>
  </div>
);

export default ViewportContent;
