import React from 'react';

import '../src/styles.css';
import FilePreviewer from '../src/FilePreviewer';

const PDF1_URL =
    'https://cors-anywhere.herokuapp.com/http://africau.edu/images/default/sample.pdf';

const IMAGE1_URL =
    'http://blogs.ubc.ca/CourseBlogSample01/wp-content/themes/thesis/rotator/sample-1.jpg';

export default {title: 'FilePreviewer'};

export const PDFOnly = () => {
    return <FilePreviewer file={{url: PDF1_URL}}/>;
};

export const PDFRotated = () => {
    return <FilePreviewer file={{url: PDF1_URL, rotate: 90}}/>;
};

export const PDFScaled = () => {
    return <FilePreviewer file={{url: PDF1_URL, rotate: 0, scale: 1.25}}/>;
};

export const imageOnly = () => {
    return <FilePreviewer file={{url: IMAGE1_URL, rotate: 0}}/>;
};

export const imageRotated = () => {
    return <FilePreviewer file={{url: IMAGE1_URL, rotate: 90}}/>;
};

export const imageScaled = () => {
    return <FilePreviewer file={{url: IMAGE1_URL, rotate: 0, scale: 1.25}}/>;
};
