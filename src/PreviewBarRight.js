import React from 'react';
import PropTypes from 'prop-types';
import { BsCloudDownload } from 'react-icons/bs';
import { FaArrowRotateRight } from 'react-icons/fa6';

import Button from './Button';

const PreviewBarRight = props => (
  <div className="preview-bar-left">
    <Button onClick={props.onRotate}>
      <FaArrowRotateRight />
    </Button>

    <Button onClick={props.onDownload}>
      <BsCloudDownload />
    </Button>
  </div>
);

PreviewBarRight.propTypes = {
  onRotate: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
};

export default PreviewBarRight;
