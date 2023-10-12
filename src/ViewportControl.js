import React from 'react';
import PropTypes from 'prop-types';
import { BsFillPlusSquareFill } from 'react-icons/bs';
import { PiMinusSquareFill } from 'react-icons/pi';
import { BiExpandHorizontal } from 'react-icons/bi';

import Button from './Button';

const ViewportControl = props => {
  if (props.hidden) {
    return null;
  }

  return (
    <div className="preview-icons">
      <Button onClick={props.onZoomIn}>
        <BsFillPlusSquareFill />
      </Button>

      <Button onClick={props.onZoomOut} className="preview-icons">
        <PiMinusSquareFill />
      </Button>

      <Button onClick={props.onFitToScreen} className="preview-icons">
        <BiExpandHorizontal />
      </Button>
    </div>
  );
};

ViewportControl.propTypes = {
  onZoomIn: PropTypes.func.isRequired,
  onZoomOut: PropTypes.func.isRequired,
  onFitToScreen: PropTypes.func.isRequired,
  hidden: PropTypes.bool,
};

export default ViewportControl;
