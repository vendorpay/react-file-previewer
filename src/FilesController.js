import React from 'react';

import getTotalFiles from './utils/getTotalFiles';

const styles = {
  position: 'fixed',
  top: '10px',
  left: '10px',
  background: 'rgba(0, 0, 0, .5)',
};

const FilesController = ({ currentPage, files }) => (
  <div styles={styles}>
    <span>
      {currentPage} of {getTotalFiles(files)}
    </span>
  </div>
);

export default FilesController;
