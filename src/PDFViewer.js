import * as R from 'ramda';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useInView } from 'react-intersection-observer';

// Get the pdf.js worker from cloudflare content delivery network.
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const options = {
  cMapPacked: true,
  cMapUrl: `//unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
  standardFontDataUrl: `//unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts`,
};

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
  return (
    <Document
      rotate={file.rotate}
      onLoadSuccess={onLoadSuccess}
      file={file.url || `data:${file.mimeType};base64,${file.data}`}
      options={options}
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
