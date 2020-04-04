import PropTypes from 'prop-types';
import React, { useRef, useEffect } from 'react';
import { propOr, pathOr } from 'ramda';

/**
 * Get the scale for this image.
 *
 * @param  {Object} file
 * @return {Number}
 */
const getScale = pathOr(1, ['scale', 0]);

/**
 * Get the rotation for this image.
 *
 * @param  {Object} file
 * @return {Number}
 */
const getRotation = propOr(0, 'rotate');

const getResponseLikePDF = imgRef => {
  const { clientWidth, clientHeight } = imgRef.current;

  return {
    numPages: 1,
    getPage: () => ({
      getViewport: () => ({
        width: clientWidth,
        height: clientHeight,
      }),
    }),
  };
};

/**
 * `ImageViewer` react component.
 *
 * @param  {Object}   params
 * @param  {Object}   params.file
 * @param  {String}   params.file.url
 * @param  {String}   params.file.data
 * @param  {Array}    params.file.scale
 * @param  {Number}   params.file.rotate
 * @param  {String}   params.file.mimeType
 * @param  {Function} params.onLoadSuccess
 */
const ImageViewer = ({ file, onLoadSuccess }) => {
  const imgRef = useRef(null);

  return (
    <img
      ref={imgRef}
      onLoad={() => onLoadSuccess(getResponseLikePDF(imgRef))}
      src={file.url || `data:${file.mimeType};base64,${file.data}`}
      style={{
        transform: `rotate(${getRotation(file)}deg) scale(${getScale(file)})`,
        // transform: `rotate(${getRotation(file)}deg)`,
        // zoom: getScale(file),
      }}
    />
  );
};

ImageViewer.propTypes = {
  file: PropTypes.shape({
    url: PropTypes.string,
    data: PropTypes.string,
    scale: PropTypes.array,
    rotate: PropTypes.number,
    mimeType: PropTypes.string,
  }),
  onLoadSuccess: PropTypes.func.isRequired,
};

export default ImageViewer;
