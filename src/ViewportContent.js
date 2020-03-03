import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import PDFViewer from './PDFViewer';
import ImageViewer from './ImageViewer';

/**
 * Check if a file is a pdf.
 *
 * @param  {Object}
 * @return {Boolean}
 */
const isPDF = R.either(
    R.o(R.endsWith('.pdf'), R.propOr('', 'url')),
    R.propEq('mimeType', 'application/pdf'),
);

const ViewportContent = (props) => {
    return (
        <div className={classnames(props.thumbnail ? 'media-thumbnail' : 'preview-content')}
             ref={props.viewportRef}>
            <div className="preview-file" ref={props.contentRef}>
                {isPDF(props.file) ? (
                    <PDFViewer
                        file={props.file}
                        totalPages={props.totalPages}
                        currentPage={props.currentPage}
                        onTotalPages={props.onTotalPages}
                        onCurrentPageChange={props.onCurrentPageChange}
                    />
                ) : (
                    <ImageViewer file={props.file}/>
                )}
            </div>
        </div>
    )
};

ViewportContent.propTypes = {
    file: PropTypes.shape({
        url: PropTypes.string,
        mimeType: PropTypes.string,
        data: PropTypes.string,
        name: PropTypes.string
    }),
    contentRef: PropTypes.any,
    viewportRef: PropTypes.any,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onTotalPages: PropTypes.func.isRequired,
    onCurrentPageChange: PropTypes.func.isRequired,
    thumbnail: PropTypes.bool
};

export default ViewportContent;
