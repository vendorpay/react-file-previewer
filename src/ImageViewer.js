import React from 'react';

const ImageViewer = ({ file }) => (
  <img
    src={file.url}
    style={{
      transform: `rotate(${file.rotate || 0}deg) scale(${file.scale || 1})`,
    }}
  />
);

export default ImageViewer;
