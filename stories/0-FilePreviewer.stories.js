
import React, { useState } from 'react';
import FilePreviewer from '../src/FilePreviewer';

const PDF1_URL =
  'https://cors-anywhere.herokuapp.com/http://africau.edu/images/default/sample.pdf';

const IMAGE1_URL =
  'http://blogs.ubc.ca/CourseBlogSample01/wp-content/themes/thesis/rotator/sample-1.jpg';

export default { title: 'FilePreviewer' };

export const PDFOnly = () => {
  const [files, setFiles] = useState([{ url: PDF1_URL, rotate: 0 }]);

  return <FilePreviewer files={files} onFilesChange={setFiles} />;
};

export const PDFRotated = () => {
  const [files, setFiles] = useState([{ url: PDF1_URL, rotate: 90 }]);

  return <FilePreviewer files={files} onFilesChange={setFiles} />;
};

export const PDFScaled = () => {
  const [files, setFiles] = useState([
    { url: PDF1_URL, rotate: 0, scale: 1.25 },
  ]);

  return <FilePreviewer files={files} onFilesChange={setFiles} />;
};

export const imageOnly = () => {
  const [files, setFiles] = useState([{ url: IMAGE1_URL, rotate: 0 }]);

  return <FilePreviewer files={files} onFilesChange={setFiles} />;
};

export const imageRotated = () => {
  const [files, setFiles] = useState([{ url: IMAGE1_URL, rotate: 90 }]);

  return <FilePreviewer files={files} onFilesChange={setFiles} />;
};

export const imageScaled = () => {
  const [files, setFiles] = useState([
    { url: IMAGE1_URL, rotate: 0, scale: 1.25 },
  ]);

  return <FilePreviewer files={files} onFilesChange={setFiles} />;
};

export const imageAndPDF = () => {
  const [files, setFiles] = useState([
    { url: PDF1_URL, rotate: 0 },
    { url: IMAGE1_URL, rotate: 0 },
  ]);

  return <FilePreviewer files={files} onFilesChange={setFiles} />;
};
