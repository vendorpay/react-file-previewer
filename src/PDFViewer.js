import React from 'react';
import * as R from 'ramda';
import { Document, Page } from 'react-pdf';

import styles from './styles';

/**
 * Get a PDF `<Page />` per total pages.
 *
 * @param {Number} totalPages
 * @return {Array}
 */
const getPDFPage = R.times(index => (
  <div style={styles.pdfPage}>
    <Page pageIndex={index} />
  </div>
));

const PDFViewer = ({
  file,
  totalPages,
  currentPage,
  onTotalPages,
  onCurrentPageChange,

  displayAll = false,
}) => {
  // Check if the viewer is set to display all pages and scroll.
  if (displayAll) {
    // Show all pages at once.
    return (
      <Document
        file={file.url}
        rotate={file.rotate}
        onLoadSuccess={({ numPages }) => onTotalPages(numPages)}
      >
        {getPDFPage(totalPages)}
      </Document>
    );
  }

  // Displays a single page at a time.
  return (
    <Document
      file={file.url}
      rotate={file.rotate}
      onLoadSuccess={({ numPages }) => onTotalPages(numPages)}
    >
      <div style={styles.pdfPage}>
        <Page pageNumber={currentPage} scale={file.scale || 1} />
      </div>
    </Document>
  );
};

export default PDFViewer;
