import * as R from 'ramda';
import saveFile from 'file-saver';
import React, { useState, useRef } from 'react';

import styles from './styles';
import setZoomIn from './utils/setZoomIn';
import setZoomOut from './utils/setZoomOut';
import hasManyFiles from './utils/hasManyFiles';
import setNewRotation from './utils/setNewRotation';
import getFitToScreenScale from './utils/getFitToScreenScale';

import PreviewBar from './PreviewBar';
import ViewportControl from './ViewportControl';
import ViewportContent from './ViewportContent';
import FilesController from './FilesController';

const FilePreviewer = ({ files, currentFileIndex = 0, onFilesChange }) => {
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageUp = () => {
    setCurrentPage(prevState => R.clamp(0, totalPages, prevState - 1));
  };

  const handlePageDown = () => {
    setCurrentPage(prevState => R.clamp(0, totalPages, prevState + 1));
  };

  const handleTotalPages = totalPages => {
    setTotalPages(totalPages);
  };

  const handleCurrentPageChange = currentPage => {
    setCurrentPage(currentPage);
  };

  const handleRotate = () => {
    const updatedFiles = R.adjust(
      currentFileIndex,
      setNewRotation,
      files,
    );

    onFilesChange(updatedFiles);
  };

  const handleZoomIn = () => {
    const updatedFiles = R.adjust(currentFileIndex, setZoomIn, files);
    onFilesChange(updatedFiles);
  };

  const handleZoomOut = () => {
    const updatedFiles = R.adjust(currentFileIndex, setZoomOut, files);
    onFilesChange(updatedFiles);
  };

  const viewportRef = useRef(null);
  const contentRef = useRef(null);

  const handleFitToScreen = () => {
    const fts = getFitToScreenScale(viewportRef.current, contentRef.current);

    const updatedFiles = R.adjust(
      currentFileIndex,
      R.assoc('scale', fts),
      files,
    );

    onFilesChange(updatedFiles);
  };

  const handleDownload = () => {
    const currentFile = R.nth(currentFileIndex - 1, filesProxy);

    const url =
      currentFile.url ||
      `data:${currentFile.mimeType};base64,${currentFile.data}`;

    return saveFile(url, currentFile.name || 'default.pdf');
  };

  // RENDER.
  return (
    <div style={styles.wrapperStyles}>
      <PreviewBar
        onPageUp={handlePageUp}
        totalPages={totalPages}
        onRotate={handleRotate}
        currentPage={currentPage}
        onDownload={handleDownload}
        onPageDown={handlePageDown}
      />

      <ViewportContent
        contentRef={contentRef}
        totalPages={totalPages}
        viewportRef={viewportRef}
        currentPage={currentPage}
        onTotalPages={handleTotalPages}
        onCurrentPageChange={handleCurrentPageChange}
        file={R.nth(currentFileIndex, files)}
      />

      <ViewportControl
        files={files}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        currentPage={currentFileIndex}
        onFitToScreen={handleFitToScreen}
      />

      {hasManyFiles(files) && (
        <FilesController
          files={files}
          currentFile={currentFileIndex}
        />
      )}
    </div>
  );
};

export default FilePreviewer;
