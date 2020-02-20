import * as R from 'ramda';

/**
 * Check if there is more than one file.
 *
 * @param  {Array} files
 * @return {Boolean}
 */
const hasManyFiles = R.o(R.gt(1), R.length);

export default hasManyFiles;
