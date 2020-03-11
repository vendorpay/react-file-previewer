import React from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import classnames from 'classnames';

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
  thumbnail,
  contentRef,
  viewportRef,
  onLoadSuccess,
  onPageChange,
}) => (
  <div
    ref={viewportRef}
    className={classnames(thumbnail ? 'media-thumbnail' : 'preview-content')}
  >
    <div className="preview-file" ref={contentRef}>
      {isPDF(file) ? (
        <PDFViewer
          file={file}
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
    mimeType: PropTypes.string,
    data: PropTypes.string,
    name: PropTypes.string,
  }),
  thumbnail: PropTypes.bool,
  contentRef: PropTypes.any,
  viewportRef: PropTypes.any,
  onPageChange: PropTypes.func.isRequired,
  onLoadSuccess: PropTypes.func.isRequired,
};

export default ViewportContent;
