import React from 'react';
import FilePreviewer from '../src/FilePreviewer';

const PDF1_URL =
  'https://cors-anywhere.herokuapp.com/http://africau.edu/images/default/sample.pdf';

const IMAGE1_URL =
  'http://blogs.ubc.ca/CourseBlogSample01/wp-content/themes/thesis/rotator/sample-1.jpg';

export default { title: 'FilePreviewer' };

export const pdfOnly = () => (
  <FilePreviewer
    files={[{ url: PDF1_URL, rotate: 0 }]}
    onFilesChange={console.log}
  />
);

export const imageOnly = () => (
  <FilePreviewer files={[{ url: IMAGE1_URL, rotate: 0 }]} />
);

export const imageAndPdf = () => (
  <FilePreviewer
    files={[
      { url: PDF1_URL, rotate: 0 },
      { url: IMAGE1_URL, rotate: 0 },
    ]}
    onFilesChange={console.log}
  />
);
