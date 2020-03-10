import React from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { Document, Page } from 'react-pdf';
import { useInView } from 'react-intersection-observer';

const PDFPage = ({ index, onCurrentPageChange, scale = 1 }) => {
  const [ref, inView] = useInView({ threshold: 0.75 });

  if (inView) {
    onCurrentPageChange(index);
  }

  return (
    <div ref={ref} className="preview-pdf-page" data-pdfpage={index}>
      <Page pageIndex={index} scale={scale} />
    </div>
  );
};

const PDFViewer = props => {
  return (
    <Document
      rotate={props.file.rotate}
      onLoadSuccess={({ numPages }) => props.onTotalPages(numPages)}
      file={
        props.file.url ||
        `data:${props.file.mimeType};base64,${props.file.data}`
      }
    >
      {R.times(
        index => (
          <PDFPage
            key={index}
            index={index}
            scale={props.file.scale}
            onCurrentPageChange={props.onCurrentPageChange}
          />
        ),
        props.totalPages,
      )}
    </Document>
  );
};

PDFViewer.propTypes = {
  file: PropTypes.shape({
    url: PropTypes.string,
    mimeType: PropTypes.string,
    data: PropTypes.string,
    name: PropTypes.string,
  }),
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onTotalPages: PropTypes.func.isRequired,
  displayAll: PropTypes.bool,
};

export default PDFViewer;
