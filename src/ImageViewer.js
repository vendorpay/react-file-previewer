import React from 'react';

const ImageViewer = ({file}) => (
    <img
        src={file.url || `data:${file.mimeType};base64,${file.data}`}
        style={{
            transform: `rotate(${file.rotate || 0}deg) scale(${file.scale || 1})`,
        }}
    />
);

export default ImageViewer;
