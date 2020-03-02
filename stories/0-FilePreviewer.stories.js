import React, { useState } from 'react';

import '../src/styles.css';
import FilePreviewer from '../src/FilePreviewer';

const PDF1_URL =
  'https://cors-anywhere.herokuapp.com/http://africau.edu/images/default/sample.pdf';

const IMAGE1_URL =
  'http://blogs.ubc.ca/CourseBlogSample01/wp-content/themes/thesis/rotator/sample-1.jpg';

export default { title: 'FilePreviewer' };

export const PDFOnly = () => {
  const [file, setFile] = useState({ url: PDF1_URL, rotate: 0 });

  return <FilePreviewer file={file} onFileChange={setFile} />;
};

export const PDFRotated = () => {
  const [file, setFile] = useState({ url: PDF1_URL, rotate: 90 });

  return <FilePreviewer file={file} onFileChange={setFile} />;
};

export const PDFScaled = () => {
  const [file, setFile] = useState({ url: PDF1_URL, rotate: 0, scale: 1.25 });

  return <FilePreviewer file={file} onFileChange={setFile} />;
};

export const imageOnly = () => {
  const [file, setFile] = useState({ url: IMAGE1_URL, rotate: 0 });

  return <FilePreviewer file={file} onFileChange={setFile} />;
};

export const imageRotated = () => {
  const [file, setFile] = useState({ url: IMAGE1_URL, rotate: 90 });

  return <FilePreviewer file={file} onFileChange={setFile} />;
};

export const imageScaled = () => {
  const [file, setFile] = useState({ url: IMAGE1_URL, rotate: 0, scale: 1.25 });

  return <FilePreviewer file={file} onFileChange={setFile} />;
};
