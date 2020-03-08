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

const ViewportContent = props => (
  <div
    ref={props.viewportRef}
    className={classnames(
      props.thumbnail ? 'media-thumbnail' : 'preview-content',
    )}
  >
    <div className="preview-file" ref={props.contentRef}>
      {isPDF(props.file) ? (
        <PDFViewer
          file={props.file}
          totalPages={props.totalPages}
          currentPage={props.currentPage}
          onTotalPages={props.onTotalPages}
          scrollableElement={props.contentRef}
          onCurrentPageChange={props.onCurrentPageChange}
        />
      ) : (
        <ImageViewer file={props.file} />
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
  contentRef: PropTypes.any,
  viewportRef: PropTypes.any,
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onTotalPages: PropTypes.func.isRequired,
  onCurrentPageChange: PropTypes.func.isRequired,
  thumbnail: PropTypes.bool,
};

export default ViewportContent;
