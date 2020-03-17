/**
 * Get the `scale` attribute for the "fit to screen" option.
 *
 * @param  {Object} viewportElem
 * @param  {Object} contentElem
 * @return {Number}
 */
const getFitToScreenScale = (viewportElem, contentElem) => {
  // Get the preview bar height.
  const previewBarHeight = 52;

  // Get the viewport ratio.
  const viewportWidth = viewportElem.width || viewportElem.clientWidth;

  const viewportHeight =
    (viewportElem.height || viewportElem.clientHeight) - previewBarHeight - 35;

  const viewportRatio = viewportWidth / viewportHeight;

  // Get the content ratio.
  const contentWidth = contentElem.width || contentElem.offsetWidth;
  const contentHeight = contentElem.height || contentElem.offsetHeight;
  const contentRatio = contentWidth / contentHeight;

  if (contentHeight > viewportHeight) {
    return viewportHeight / contentHeight;
  }

  if (contentWidth > viewportWidth) {
    return viewportWidth / contentHeight;
  }

  // Get the scaling ratio in `0.25` steps.
  return (
    Math.round(
      (viewportRatio > contentRatio
        ? viewportHeight / contentHeight
        : viewportWidth / contentWidth) * 4,
    ) / 4
  );
};

export default getFitToScreenScale;
