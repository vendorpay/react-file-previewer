import * as R from 'ramda';
import React, { useState, useEffect } from 'react';

import styles from './styles';
import PreviewBar from './PreviewBar';
import ViewportControl from './ViewportControl';
import ViewportContent from './ViewportContent';

/**
 * Get the amount of pages.
 *
 * @param  {Array} pages
 * @return {Number}
 */
const getGetTotalPages = R.o(R.max(1), R.length);

/**
 *
 */
const setNewRotation = R.converge(R.assoc('rotate'), [
  R.compose(R.modulo(R.__, 360), R.add(90), R.propOr(0, 'rotate')),
  R.identity,
]);

const FilePreviewer = ({ files, onFilesChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filesProxy, setFilesChangeProxy] = useState(files);

  useEffect(() => {
    if (R.is(Function, onFilesChange)) {
      onFilesChange(filesProxy);
    }

    return;
  }, [filesProxy]);

  // Get the total pages amount.
  const totalPages = getGetTotalPages(files);

  // Get a function to range the `currentPage` possible values.
  const clampPage = R.clamp(1, totalPages);

  const handlePageUp = () =>
    setCurrentPage(prevState => clampPage(prevState - 1));

  const handlePageDown = () =>
    setCurrentPage(prevState => clampPage(prevState + 1));

  const handleRotate = () => {
    const updatedfiles = R.adjust(currentPage - 1, setNewRotation, filesProxy);
    setFilesChangeProxy(updatedfiles);
  };

  return (
    <div style={styles.wrapperStyles}>
      <PreviewBar
        onPageUp={handlePageUp}
        totalPages={totalPages}
        onRotate={handleRotate}
        currentPage={currentPage}
        onPageDown={handlePageDown}
      />

      <ViewportControl currentPage={currentPage} files={filesProxy} />

      <ViewportContent currentPage={currentPage} files={filesProxy} />
    </div>
  );
};

export default FilePreviewer;
