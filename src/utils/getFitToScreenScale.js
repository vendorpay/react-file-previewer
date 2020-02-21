/**
 * Get the `scale` attribute for the "fit to screen" option.
 *
 * @param  {Object} viewportElement
 * @param  {Object} contentElement
 * @return {Number}
 */
const getFitToScreenScale = (viewportElement, contentElement) => {
  // Get the viewport ratio.
  const viewportWidth = viewportElement.clientWidth;
  const viewportHeight = viewportElement.clientHeight;
  const viewportRatio = viewportWidth / viewportHeight;

  // Get the content ratio.
  const contentWidth = contentElement.offsetWidth;
  const contentHeight = contentElement.offsetHeight;
  const contentRatio = contentWidth / contentHeight;

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
