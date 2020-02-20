import * as R from 'ramda';

/**
 * Get the amount of files.
 *
 * @param  {Array} files
 * @return {Number}
 */
const getTotalFiles = R.o(R.max(1), R.length);

export default getTotalFiles;
