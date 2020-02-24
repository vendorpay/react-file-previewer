import React from 'react';
import * as R from 'ramda';

import styles from './styles';
import PDFViewer from './PDFViewer';
import ImageViewer from './ImageViewer';

/**
 * Check if a file is a pdf.
 *
 * @param  {Object}
 * @return {Boolean}
 */
const isPDF = R.o(R.endsWith('.pdf'), R.prop('url'));

const ViewportContent = ({
  file,
  contentRef,
  totalPages,
  viewportRef,
  currentPage,
  onTotalPages,
  onCurrentPageChange,
}) => (
  <div style={styles.content} ref={viewportRef}>
    <div style={styles.file} ref={contentRef}>
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

export const ViewportContentDisplayAll = ({
  files = [],
  contentRef,
  totalPages,
  viewportRef,
  currentPage,
  onTotalPages,
  onCurrentPageChange,
}) => (
  <div style={styles.content} ref={viewportRef}>
    {files.map(file => (
      <div style={styles.file} ref={contentRef}>
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
    ))}
  </div>
);

export default ViewportContent;
