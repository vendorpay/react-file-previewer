import React from 'react';

import styles from './styles';

const ImageViewer = ({ file }) => (
  <img src={file.url} style={{ transform: `rotate(${file.rotate}deg)` }} />
);

export default ImageViewer;
