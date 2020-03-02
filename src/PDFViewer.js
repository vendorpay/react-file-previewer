import React from 'react';
import * as R from 'ramda';
import { Document, Page } from 'react-pdf';

/**
 * Get a PDF `<Page />` per total pages.
 *
 * @param {Number} totalPages
 * @return {Array}
 */
const getPDFPage = R.times(index => (
  <div className="vp-preview-pdf-page">
    <Page pageIndex={index} />
  </div>
));

const PDFViewer = ({
  file,
  totalPages,
  currentPage,
  onTotalPages,
  displayAll = false,
}) => {
  // Check if the viewer is set to display all pages and scroll.
  if (displayAll) {
    // Show all pages at once.
    return (
      <Document
        rotate={file.rotate}
        onLoadSuccess={({ numPages }) => onTotalPages(numPages)}
        file={file.url || `data:${file.mimeType};base64,${file.data}`}
      >
        {getPDFPage(totalPages)}
      </Document>
    );
  }

  // Displays a single page at a time.
  return (
    <Document
      rotate={file.rotate}
      onLoadSuccess={({ numPages }) => onTotalPages(numPages)}
      file={file.url || `data:${file.mimeType};base64,${file.data}`}
    >
      <div className="vp-preview-pdf-page">
        <Page pageNumber={currentPage + 1} scale={file.scale || 1} />
      </div>
    </Document>
  );
};

export default PDFViewer;
