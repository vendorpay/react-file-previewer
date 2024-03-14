import * as R from 'ramda';

/**
 * Check if a file is a pdf.
 *
 * @param  {Object}
 * @return {Boolean}
 */
const isPDF = R.either(
  R.o(R.endsWith('.pdf'), R.propOr('', 'url')),
  R.propEq('application/pdf', 'mimeType')
);

export default isPDF;
