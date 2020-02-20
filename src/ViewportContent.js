import React, { useState } from 'react';
import * as R from 'ramda';
import { Document, Page } from 'react-pdf';

import styles from './styles';

/**
 * Check if a file is a pdf.
 *
 * @param  {Object}
 * @return {Boolean}
 */
const isPDF = R.o(R.endsWith('.pdf'), R.prop('url'));

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

const PDFViewer = ({ file }) => {
  const [totalPages, setTotalPages] = useState(1);

  return (
    <Document
      file={file.url}
      rotate={file.rotate}
      onLoadSuccess={({ numPages }) => setTotalPages(numPages)}
    >
      {getPDFPage(totalPages)}
    </Document>
  );
};

const ImageViewer = ({ file }) => (
  <img src={file.url} style={{ transform: `rotate(${file.rotate}deg)` }} />
);

const FileContainer = ({ file }) => (
  <div style={styles.file}>
    {isPDF(file) ? <PDFViewer file={file} /> : <ImageViewer file={file} />}
  </div>
);

const ViewportContent = ({ currentPage, files = [] }) => (
  <div style={styles.content}>
    <FileContainer file={R.nth(currentPage - 1, files)} />
  </div>
);

export const ViewportContentDisplayAll = ({ files = [] }) => (
  <div style={styles.content}>
    {files.map(file => (
      <FileContainer file={file} />
    ))}
  </div>
);

export default ViewportContent;
