import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import {Document, Page} from 'react-pdf';

/**
 * Get a PDF `<Page />` per total pages.
 *
 * @param {Number} totalPages
 * @return {Array}
 */
const getPDFPage = R.times(index => (
    <div className="preview-pdf-page">
        <Page pageIndex={index}/>
    </div>
));

const PDFViewer = (props) => {
    // Check if the viewer is set to display all pages and scroll.
    if (props.displayAll) {
        // Show all pages at once.
        return (
            <Document
                rotate={props.file.rotate}
                onLoadSuccess={({numPages}) => props.onTotalPages(numPages)}
                file={props.file.url || `data:${props.file.mimeType};base64,${props.file.data}`}
            >
                {getPDFPage(props.totalPages)}
            </Document>
        );
    }

    // Displays a single page at a time.
    return (
        <Document
            rotate={props.file.rotate}
            onLoadSuccess={({numPages}) => props.onTotalPages(numPages)}
            file={props.file.url || `data:${props.file.mimeType};base64,${props.file.data}`}
        >
            <div className="preview-pdf-page">
                <Page pageNumber={props.currentPage + 1} scale={props.file.scale || 1}/>
            </div>
        </Document>
    );
};

PDFViewer.propTypes = {
    file: PropTypes.shape({
        url: PropTypes.string,
        mimeType: PropTypes.string,
        data: PropTypes.string,
        name: PropTypes.string
    }),
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onTotalPages: PropTypes.func.isRequired,
    displayAll: PropTypes.bool
};

export default PDFViewer;
