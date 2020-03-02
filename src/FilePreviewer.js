import * as R from 'ramda';
import saveFile from 'file-saver';
import PropTypes from 'prop-types';
import React, {useRef, useState} from 'react';

import setZoomIn from './utils/setZoomIn';
import setZoomOut from './utils/setZoomOut';
import setNewRotation from './utils/setNewRotation';
import getFitToScreenScale from './utils/getFitToScreenScale';

import PreviewBar from './PreviewBar';
import ViewportControl from './ViewportControl';
import ViewportContent from './ViewportContent';

const FilePreviewer = (props) => {
    if (!props.file) {
        return null;
    }

    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const viewportRef = useRef(null);
    const contentRef = useRef(null);

    // Handlers for page turning.
    const handleTotalPages = totalPages => setTotalPages(totalPages);
    const handleCurrentPageChange = currentPage => setCurrentPage(currentPage);
    const handlePageUp = () =>
        setCurrentPage(prevState => R.clamp(0, totalPages, prevState - 1));
    const handlePageDown = () =>
        setCurrentPage(prevState => R.clamp(0, totalPages, prevState + 1));

    // Handlers for rotate and zooming.
    const handleZoomIn = () => {
        if (props.onFileChange) props.onFileChange(setZoomIn(props.file));
        else setZoomIn(props.file);
    };
    const handleZoomOut = () => {
        if (props.onFileChange) props.onFileChange(setZoomOut(props.file));
        else setZoomOut(props.file);
    };
    const handleRotate = () => {
        if (props.onFileChange) props.onFileChange(setNewRotation(props.file));
        else setNewRotation(props.file);
    };

    const handleDownload = () => {
        const url = props.file.url || `data:${props.file.mimeType};base64,${props.file.data}`;
        return saveFile(url, props.file.name || 'download.pdf');
    };

    const handleFitToScreen = () => {
        // Get the "fit to screen" scale.
        const newScale = getFitToScreenScale(
            viewportRef.current,
            contentRef.current,
        );

        if (props.onFileChange) props.onFileChange(R.assoc('scale', newScale, props.file));
    };

    return (
        <div className="preview-wrapper"
             id={props.id}
             onClick={props.onClick}
             style={{
                 height: props.height,
                 width: props.width
             }}>
            <PreviewBar
                onPageUp={handlePageUp}
                totalPages={totalPages}
                onRotate={handleRotate}
                currentPage={currentPage}
                onDownload={handleDownload}
                onPageDown={handlePageDown}
                hidden={props.thumbnail}
            />

            <ViewportContent
                file={props.file}
                contentRef={contentRef}
                totalPages={totalPages}
                viewportRef={viewportRef}
                currentPage={currentPage}
                onTotalPages={handleTotalPages}
                onCurrentPageChange={handleCurrentPageChange}
                thumbnail={props.thumbnail}
            />

            <ViewportControl
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
                onFitToScreen={handleFitToScreen}
                hidden={props.thumbnail}
            />
        </div>
    );
};

FilePreviewer.propTypes = {
    id: PropTypes.any,
    file: PropTypes.shape({
        url: PropTypes.string,
        mimeType: PropTypes.string,
        data: PropTypes.string,
        name: PropTypes.string
    }),
    onFileChange: PropTypes.func,
    onClick: PropTypes.func,
    thumbnail: PropTypes.bool
};

export default FilePreviewer;
