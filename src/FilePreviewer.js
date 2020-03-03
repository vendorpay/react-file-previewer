import * as R from 'ramda';
import saveFile from 'file-saver';
import PropTypes from 'prop-types';
import React, {useEffect, useRef, useState} from 'react';

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
    const [file, setFile] = useState(props.file);
    const [currentPage, setCurrentPage] = useState(0);
    const viewportRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        let f = props.file;
        if (props.file instanceof File) {
            f.url = URL.createObjectURL(props.file);
        }
        setFile(f);
    }, [props.file]);

    // Handlers for page turning.
    const handleTotalPages = totalPages => setTotalPages(totalPages);
    const handleCurrentPageChange = currentPage => setCurrentPage(currentPage);
    const handlePageUp = () => setCurrentPage(prevState => R.clamp(0, totalPages, prevState - 1));
    const handlePageDown = () => setCurrentPage(prevState => R.clamp(0, totalPages, prevState + 1));

    // Handlers for rotate and zooming.
    const handleZoomIn = () => setFile(setZoomIn(file));
    const handleZoomOut = () => setFile(setZoomOut(file));
    const handleRotate = () => setFile(setNewRotation(file));

    const handleDownload = () => {
        const url = file.url || `data:${file.mimeType};base64,${file.data}`;
        return saveFile(url, file.name || 'download.pdf');
    };

    const handleFitToScreen = (f) => {
        // Get the "fit to screen" scale.
        const newScale = getFitToScreenScale(
            viewportRef.current,
            contentRef.current,
        );

        setFile(R.assoc('scale', newScale, f));
    };

    return (
        <div className="preview-wrapper"
             id={props.id}
             onClick={props.onClick}
             style={{
                 height: props.height,
                 width: props.width
             }}
        >
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
                file={file}
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
    onClick: PropTypes.func,
    thumbnail: PropTypes.bool,
    height: PropTypes.string,
    width: PropTypes.string
};

FilePreviewer.defaultProps = {
    height: '100%',
    width: '100%'
};

export default FilePreviewer;
