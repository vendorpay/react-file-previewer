import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const ImageViewer = ({ file, onLoadSuccess }) => {
  useEffect(() => {
    onLoadSuccess(1);
  }, []);

  return (
    <img
      src={file.url || `data:${file.mimeType};base64,${file.data}`}
      style={{
        transform: `rotate(${file.rotate || 0}deg) scale(${file.scale || 1})`,
      }}
    />
  );
};

ImageViewer.propTypes = {
  file: PropTypes.shape({
    url: PropTypes.string,
    mimeType: PropTypes.string,
    data: PropTypes.string,
    name: PropTypes.string,
  }),
  onLoadSuccess: PropTypes.func.isRequired,
};

export default ImageViewer;
