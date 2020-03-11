import React, { useEffect, useCallback, useState } from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { Document, Page } from 'react-pdf';
import { useInView } from 'react-intersection-observer';

const PDFPage = ({ index, onPageChange, scale = 1 }) => {
  const [ref, inView] = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView) onPageChange(index);
  }, [inView]);

  return (
    <div ref={ref} className="preview-pdf-page" data-pdfpage={index}>
      <Page pageIndex={index} scale={scale} />
    </div>
  );
};

const PDFViewer = ({ file, onLoadSuccess, onPageChange }) => {
  const [totalPages, setTotalPages] = useState(0);

  const handleLoadSucess = useCallback(
    ({ numPages }) => {
      onLoadSuccess(numPages);
      setTotalPages(numPages);
    },
    [onLoadSuccess],
  );

  return (
    <Document
      rotate={file.rotate}
      onLoadSuccess={handleLoadSucess}
      file={file.url || `data:${file.mimeType};base64,${file.data}`}
    >
      {R.times(
        index => (
          <PDFPage
            key={index}
            index={index}
            scale={file.scale}
            onPageChange={onPageChange}
          />
        ),
        totalPages,
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
  onLoadSuccess: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default PDFViewer;
