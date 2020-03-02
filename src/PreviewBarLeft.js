import React from 'react';
import ChevronUp from 'mdi-material-ui/ChevronUp';
import ChevronDown from 'mdi-material-ui/ChevronDown';

import Button from './Button';
import PageCount from './PageCount';

const disabledButton = {
  opacity: '.5',
  cursor: 'default',
};

const PreviewBarLeft = ({ totalPages, currentPage, onPageUp, onPageDown }) => (
  <div className="vp-preview-bar-left">
    {/* Page to go up means going back. */}
    <Button
      onClick={onPageUp}
      disabled={currentPage === 0}
      style={currentPage === 0 ? disabledButton : {}}
    >
      <ChevronUp />
    </Button>

    {/* Page to go down means going next. */}
    <Button
      onClick={onPageDown}
      disabled={currentPage + 1 === totalPages}
      style={currentPage + 1 === totalPages ? disabledButton : {}}
    >
      <ChevronDown />
    </Button>

    <PageCount current={currentPage} total={totalPages} />
  </div>
);

export default PreviewBarLeft;
