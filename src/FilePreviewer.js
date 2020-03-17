import * as R from 'ramda';
import saveFile from 'file-saver';
import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';

import setZoomIn from './utils/setZoomIn';
import setZoomOut from './utils/setZoomOut';
import setNewRotation from './utils/setNewRotation';
import useViewportSize from './utils/useViewportSize';
import getFitToScreenScale from './utils/getFitToScreenScale';

import PreviewBar from './PreviewBar';
import ViewportControl from './ViewportControl';
import ViewportContent from './ViewportContent';

/**
 * `FilePreviewer` react component.
 *
 * @param  {Object}   props
 * @param  {Function} props.onClick
 * @param  {Boolean}  props.thumbnail
 * @param  {Object}   props.file
 * @param  {String}   props.file.url
 * @param  {String}   props.file.data
 * @param  {String}   props.file.name
 * @param  {String}   props.file.mimeType
 * @return {Object}
 */
const FilePreviewer = props => {
  const [file, setFile] = useState(props.file);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [originalSizes, setOriginalSizes] = useState([]);
  const [usingFitToScreen, setUsingFitToScreen] = useState(false);

  const viewportRef = useRef(null);
  const containerRef = useRef(null);
  const viewportSize = useViewportSize(viewportRef);

  /**
   * Handler. Scroll to the pervious page and update the index.
   *
   * @return {Void}
   */
  const onPageUp = () => {
    const previousIndex = R.clamp(0, totalPages, currentPage - 1);

    setCurrentPage(previousIndex);

    const previousPage = document.querySelector(
      `div[data-pdfpage="${previousIndex}"]`,
    );

    // Scroll the viewport to the page position.
    containerRef.current.scrollTop = previousPage.offsetTop - 10;
  };

  /**
   * Handler. Scroll to the next page and update the index.
   *
   * @return {Void}
   */
  const onPageDown = () => {
    const nextIndex = R.clamp(0, totalPages, currentPage + 1);

    setCurrentPage(nextIndex);

    const nextPage = document.querySelector(`div[data-pdfpage="${nextIndex}"]`);

    // Scroll the viewport to the page position.
    containerRef.current.scrollTop = nextPage.offsetTop - 10;
  };

  /**
   * Handler. Scale all the pages or image
   * up by a factor of 0.25.
   *
   * @return {Void}
   */
  const onZoomIn = () => {
    setUsingFitToScreen(false);
    setFile(setZoomIn(file));
  };

  /**
   * Handler. Scale all the pages or image
   * down by a factor of 0.25.
   *
   * @return {Void}
   */
  const onZoomOut = () => {
    setUsingFitToScreen(false);
    setFile(setZoomOut(file));
  };

  /**
   * Handler. Rotate the PDF (all pages) or Image.
   *
   * @return {Void}
   */
  const onRotate = () => {
    setFile(setNewRotation(file));
  };

  /**
   * Handler. Fit to screen.
   *
   * (This activates the "using fit to screen" mode, which
   * makes the document or image resize based on the viewport size.)
   *
   * @return {Void}
   */
  const onFitToScreen = () => {
    setUsingFitToScreen(true);

    // Get the "fit to screen" scale.
    const newScale = originalSizes.map(originalSize =>
      getFitToScreenScale(viewportSize, originalSize),
    );

    setFile(prevValue => R.assoc('scale', newScale, prevValue));
  };

  /**
   * Handler. Download the current file, it can be a
   * PDF or Image, as `url` or `base64` content.
   *
   * @return {Void}
   */
  const onDownload = () => {
    const url = file.url || `data:${file.mimeType};base64,${file.data}`;
    return saveFile(url, file.name || 'download.pdf');
  };

  /**
   * Handler. Callback after the PDF gets
   * processed successfully by `react-pdf`.
   *
   * @param  {Object} pdf
   * @return {Void}
   */
  const onLoadSuccess = pdf => {
    // Wait until the original sizes gets calculated.
    const promises = R.times(async i => {
      // Wait until the original sizes gets calculated.
      const page = await pdf.getPage(i + 1);
      return R.pick(['width', 'height'], page.getViewport({ scale: 1 }));
    }, pdf.numPages);

    // Set the original sizes for this file.
    Promise.all(promises).then(setOriginalSizes);

    setTotalPages(pdf.numPages);
    setUsingFitToScreen(true);
  };

  // Set an effect to process the file resizing when the
  // viewport sizes changes and it's using "fit to screen".
  useEffect(() => {
    // Check if it's using "fit to screen".
    if (usingFitToScreen) {
      // Get the "fit to screen" scale.
      const newScale = originalSizes.map(originalSize =>
        getFitToScreenScale(viewportSize, originalSize),
      );

      // Update the scale.
      setFile(prevValue => R.assoc('scale', newScale, prevValue));
    }
  }, [usingFitToScreen, originalSizes, viewportSize]);

  // Reset all the attributes when the file prop changes.
  useEffect(() => {
    const file = props.file;

    // if file passed is uploaded file, handle it correctly
    if (props.file && props.file instanceof File) {
      file.url = URL.createObjectURL(props.file);
      file.mimeType = props.file.type;
    }

    setFile(file);
    setTotalPages(1);
    setCurrentPage(0);
  }, [props.file]);

  if (!file) {
    return null;
  }

  return (
    <div ref={viewportRef} onClick={props.onClick} className="preview-wrapper">
      <PreviewBar
        onPageUp={onPageUp}
        onRotate={onRotate}
        totalPages={totalPages}
        onDownload={onDownload}
        onPageDown={onPageDown}
        hidden={props.thumbnail}
        currentPage={currentPage}
      />

      <ViewportContent
        file={file}
        containerRef={containerRef}
        thumbnail={props.thumbnail}
        onPageChange={setCurrentPage}
        onLoadSuccess={onLoadSuccess}
      />

      <ViewportControl
        onZoomIn={onZoomIn}
        onZoomOut={onZoomOut}
        hidden={props.thumbnail}
        onFitToScreen={onFitToScreen}
      />
    </div>
  );
};

FilePreviewer.propTypes = {
  file: PropTypes.shape({
    url: PropTypes.string,
    mimeType: PropTypes.string,
    data: PropTypes.string,
    name: PropTypes.string,
  }),
  onClick: PropTypes.func,
  thumbnail: PropTypes.bool,
};

FilePreviewer.defaultProps = {
  onClick: () => {},
};

export default FilePreviewer;
