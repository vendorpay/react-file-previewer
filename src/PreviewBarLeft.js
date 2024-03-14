import React from 'react';
import PropTypes from 'prop-types';
import { BiSolidChevronUp, BiSolidChevronDown } from 'react-icons/bi';

import Button from './Button';
import PageCount from './PageCount';

const PreviewBarLeft = props => {
  return (
    <div className="preview-bar-left">
      {/* Page to go up means going back. */}
      <Button onClick={props.onPageUp} disabled={props.currentPage === 0}>
        <BiSolidChevronUp />
      </Button>

      {/* Page to go down means going next. */}
      <Button
        onClick={props.onPageDown}
        disabled={props.currentPage + 1 === props.totalPages}
      >
        <BiSolidChevronDown />
      </Button>

      <PageCount current={props.currentPage} total={props.totalPages} />
    </div>
  );
};

PreviewBarLeft.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageUp: PropTypes.func.isRequired,
  onPageDown: PropTypes.func.isRequired,
};

export default PreviewBarLeft;
