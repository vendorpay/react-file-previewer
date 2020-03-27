import React from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';

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
  totalPages,
  containerRef,
  onPageChange,
  onLoadSuccess,
}) => (
  <div ref={containerRef} className={'preview-content'}>
    <div className="preview-file">
      {isPDF(file) ? (
        <PDFViewer
          file={file}
          totalPages={totalPages}
          onPageChange={onPageChange}
          onLoadSuccess={onLoadSuccess}
        />
      ) : (
        <ImageViewer file={file} onLoadSuccess={onLoadSuccess} />
      )}
    </div>
  </div>
);

ViewportContent.propTypes = {
  file: PropTypes.shape({
    url: PropTypes.string,
    data: PropTypes.string,
    name: PropTypes.string,
    mimeType: PropTypes.string,
  }),
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  onLoadSuccess: PropTypes.func.isRequired,
};

export default ViewportContent;
