import React from 'react';
import PropTypes from 'prop-types';

const ImageViewer = props => (
  <img
    src={
      props.file.url || `data:${props.file.mimeType};base64,${props.file.data}`
    }
    style={{
      transform: `rotate(${props.file.rotate || 0}deg) scale(${props.file
        .scale || 1})`,
    }}
  />
);

ImageViewer.propTypes = {
  file: PropTypes.shape({
    url: PropTypes.string,
    mimeType: PropTypes.string,
    data: PropTypes.string,
    name: PropTypes.string,
  }),
};

export default ImageViewer;
