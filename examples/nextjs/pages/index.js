import React from 'react';
import FilePreviewer from 'react-file-previewer';

const PDF1_URL =
  'https://cors-anywhere.herokuapp.com/http://africau.edu/images/default/sample.pdf';
const IMAGE1_URL =
  'http://blogs.ubc.ca/CourseBlogSample01/wp-content/themes/thesis/rotator/sample-1.jpg';

export default () => {
  const pdf = { url: PDF1_URL, rotate: 0 };
  const image = { url: IMAGE1_URL, rotate: 180 };
  return (
    <div>
      <h1>Testing React File Previewer in next.js</h1>
      <h2>Two pages PDF</h2>
      <div style={{ width: 650 }}>
        <FilePreviewer file={pdf} />
      </div>
      <h2>Sample Image</h2>
      <div style={{ maxWidth: 650 }}>
        <FilePreviewer file={image} />
      </div>
    </div>
  );
};
