import React from 'react';

const ImageViewer = ({ file }) => (
  <img
    src={file.url}
    style={{ transform: `rotate(${file.rotate}deg) scale(${file.scale})` }}
  />
);

export default ImageViewer;
