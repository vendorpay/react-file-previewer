import * as R from 'ramda';
import PropTypes from 'prop-types';
import { Document, Page, pdfjs } from 'react-pdf';
import React, { useEffect, useCallback } from 'react';
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

const PDFViewer = ({ file, totalPages, onLoadSuccess, onPageChange }) => {
  const handleLoadSuccess = useCallback(onLoadSuccess, [onLoadSuccess]);

  return (
    <Document
      rotate={file.rotate}
      onLoadSuccess={handleLoadSuccess}
      file={file.url || `data:${file.mimeType};base64,${file.data}`}
      options={{
        cMapPacked: true,
        cMapUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
      }}
    >
      {R.times(
        index => (
          <PDFPage
            key={index}
            index={index}
            onPageChange={onPageChange}
            scale={Array.isArray(file.scale) ? file.scale[index] : file.scale}
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
    data: PropTypes.string,
    name: PropTypes.string,
    mimeType: PropTypes.string,
  }),
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  onLoadSuccess: PropTypes.func.isRequired,
};

export default PDFViewer;
