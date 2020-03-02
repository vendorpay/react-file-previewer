import * as R from 'ramda';
import saveFile from 'file-saver';
import React, { useState, useRef } from 'react';

import setZoomIn from './utils/setZoomIn';
import setZoomOut from './utils/setZoomOut';
import setNewRotation from './utils/setNewRotation';
import getFitToScreenScale from './utils/getFitToScreenScale';

import PreviewBar from './PreviewBar';
import ViewportControl from './ViewportControl';
import ViewportContent from './ViewportContent';

const FilePreviewer = ({ file, onFileChange }) => {
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const viewportRef = useRef(null);
  const contentRef = useRef(null);

  // Handlers for page turning.
  const handleTotalPages = totalPages => setTotalPages(totalPages);
  const handleCurrentPageChange = currentPage => setCurrentPage(currentPage);
  const handlePageUp = () =>
    setCurrentPage(prevState => R.clamp(0, totalPages, prevState - 1));
  const handlePageDown = () =>
    setCurrentPage(prevState => R.clamp(0, totalPages, prevState + 1));

  // Handlers for rotate and zooming.
  const handleZoomIn = () => onFileChange(setZoomIn(file));
  const handleZoomOut = () => onFileChange(setZoomOut(file));
  const handleRotate = () => onFileChange(setNewRotation(file));

  const handleDownload = () => {
    const url = file.url || `data:${file.mimeType};base64,${file.data}`;
    return saveFile(url, file.name || 'default.pdf');
  };

  const handleFitToScreen = () => {
    // Get the "fit to screen" scale.
    const newScale = getFitToScreenScale(
      viewportRef.current,
      contentRef.current,
    );

    onFileChange(R.assoc('scale', newScale, file));
  };

  // RENDER.
  return (
    <div className="vp-preview-wrapper">
      <PreviewBar
        onPageUp={handlePageUp}
        totalPages={totalPages}
        onRotate={handleRotate}
        currentPage={currentPage}
        onDownload={handleDownload}
        onPageDown={handlePageDown}
      />

      <ViewportContent
        file={file}
        contentRef={contentRef}
        totalPages={totalPages}
        viewportRef={viewportRef}
        currentPage={currentPage}
        onTotalPages={handleTotalPages}
        onCurrentPageChange={handleCurrentPageChange}
      />

      <ViewportControl
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onFitToScreen={handleFitToScreen}
      />
    </div>
  );
};

export default FilePreviewer;
