import React from 'react';

import getTotalFiles from './utils/getTotalFiles';

const styles = {
  position: 'fixed',
  top: '10px',
  left: '10px',
  background: 'rgba(0, 0, 0, .5)',
};

const FilesController = ({ currentFile, files }) => (
  <div styles={styles}>
    <span>
      {currentFile + 1} of {getTotalFiles(files)}
    </span>
  </div>
);

export default FilesController;
