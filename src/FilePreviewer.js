import * as R from 'ramda';
import saveFile from 'file-saver';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

import setZoomIn from './utils/setZoomIn';
import setZoomOut from './utils/setZoomOut';
import setNewRotation from './utils/setNewRotation';
import getFitToScreenScale from './utils/getFitToScreenScale';

import PreviewBar from './PreviewBar';
import ViewportControl from './ViewportControl';
import ViewportContent from './ViewportContent';

const FilePreviewer = props => {
  const contentRef = useRef(null);

  const viewportRef = useRef(null);

  const [file, setFile] = useState(props.file);

  const [totalPages, setTotalPages] = useState(1);

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    let f = props.file;

    // if file passed is uploaded file, handle it correctly
    if (props.file && props.file instanceof File) {
      f.url = URL.createObjectURL(props.file);
      f.mimeType = props.file.type;
    }

    setFile(f);
    setCurrentPage(0);
  }, [props.file]);

  // Scroll to the pervious page and update the index.
  const handlePageUp = () => {
    const previousIndex = R.clamp(0, totalPages, currentPage - 1);

    setCurrentPage(previousIndex);

    const previousPage = document.querySelector(
      `div[data-pdfpage="${previousIndex}"]`,
    );

    // Scroll the viewport to the page position.
    viewportRef.current.scrollTop = previousPage.offsetTop - 10;
  };

  // Scroll to the next page and update the index.
  const handlePageDown = () => {
    const nextIndex = R.clamp(0, totalPages, currentPage + 1);

    setCurrentPage(nextIndex);

    const nextPage = document.querySelector(`div[data-pdfpage="${nextIndex}"]`);

    // Scroll the viewport to the page position.
    viewportRef.current.scrollTop = nextPage.offsetTop - 10;
  };

  // Handlers for rotate and zooming.
  const handleZoomIn = () => setFile(setZoomIn(file));
  const handleZoomOut = () => setFile(setZoomOut(file));
  const handleRotate = () => setFile(setNewRotation(file));

  const handleDownload = () => {
    const url = file.url || `data:${file.mimeType};base64,${file.data}`;
    return saveFile(url, file.name || 'download.pdf');
  };

  const handleFitToScreen = () => {
    // Get the "fit to screen" scale.
    const newScale = getFitToScreenScale(
      viewportRef.current,
      contentRef.current,
    );

    setFile(R.assoc('scale', newScale, file));
  };

  if (!file) {
    return null;
  }

  return (
    <div
      id={props.id}
      onClick={props.onClick}
      className="preview-wrapper"
      style={{
        height: props.height,
        width: props.width,
      }}
    >
      <PreviewBar
        onPageUp={handlePageUp}
        totalPages={totalPages}
        onRotate={handleRotate}
        hidden={props.thumbnail}
        currentPage={currentPage}
        onDownload={handleDownload}
        onPageDown={handlePageDown}
      />

      <ViewportContent
        file={file}
        contentRef={contentRef}
        viewportRef={viewportRef}
        thumbnail={props.thumbnail}
        onLoadSuccess={setTotalPages}
        onPageChange={setCurrentPage}
      />

      <ViewportControl
        onZoomIn={handleZoomIn}
        hidden={props.thumbnail}
        onZoomOut={handleZoomOut}
        onFitToScreen={handleFitToScreen}
      />
    </div>
  );
};

FilePreviewer.propTypes = {
  id: PropTypes.any,
  file: PropTypes.shape({
    url: PropTypes.string,
    mimeType: PropTypes.string,
    data: PropTypes.string,
    name: PropTypes.string,
  }),
  onClick: PropTypes.func,
  thumbnail: PropTypes.bool,
  height: PropTypes.string,
  width: PropTypes.string,
};

FilePreviewer.defaultProps = {
  height: '100%',
  width: '100%',
};

export default FilePreviewer;
