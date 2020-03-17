import * as R from 'ramda';

const SCALE_FACTOR = 0.25;
const SCALE_ABSOLUTE_MAX = 3.75;

/**
 * Scale the document by 25%.
 *
 * @param  {Object} files
 * @return {Object}
 */
const setZoomIn = R.converge(R.assoc('scale'), [
  R.compose(
    R.map(R.min(SCALE_ABSOLUTE_MAX)),
    R.map(R.add(SCALE_FACTOR)),
    R.when(R.is(Number), R.of),
    R.propOr([1], 'scale'),
  ),
  R.identity,
]);

export default setZoomIn;
