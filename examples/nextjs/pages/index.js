import React, { useState } from 'react';
import FilePreviewer, { FilePreviewerThumbnail } from '@react-league/react-file-previewer';

const SAMPLE_PDF = 'https://cors-anywhere.herokuapp.com/https://www.africau.edu/images/default/sample.pdf';

const SAMPLE_IMG =
  'http://blogs.ubc.ca/CourseBlogSample01/wp-content/themes/thesis/rotator/sample-1.jpg';

const wrapper = {
  display: 'grid',
  maxHeight: '100vh',
  overflow: 'hidden',
  position: 'relative',
  gridTemplateRows: '90% 10%',
  gridTemplateColumns: '80% 20%',
};

const main = {
  gridRowEnd: 2,
  display: 'flex',
  gridRowStart: 1,
  gridColumnEnd: 2,
  gridColumnStart: 1,
  overflow: 'hidden',
  flexDirection: 'column',
};

const sidebar = {
  gridRowEnd: 2,
  gridRowStart: 1,
  gridColumnEnd: 3,
  gridColumnStart: 2,
  padding: '20px 6px',
};

const footer = {
  gridRowEnd: 3,
  gridRowStart: 2,
  gridColumnEnd: 3,
  gridColumnStart: 1,
};

export default () => {
  const [pdf, setPdf] = useState({
    url: SAMPLE_PDF,
  });

  const onFileChange = event => {
    const fileReader = new window.FileReader();
    const file = event.target.files[0];

    fileReader.onload = fileLoad => {
      const { result } = fileLoad.target;

      setPdf({ url: result });
    };

    fileReader.readAsDataURL(file);
  };

  const onSetPdf = () => {
    setPdf({ url: SAMPLE_PDF });
  };

  const onSetImage = () => {
    setPdf({
      url: SAMPLE_IMG,
    });
  };

  const onSetUrl = e => {
    setPdf({
      url: e.target.value,
    });
  };

  return (
    <div style={wrapper}>
      <style jsx global>{`
        body {
          margin: 0;
        }
      `}</style>

      <div style={main}>
        <FilePreviewer file={pdf} />
      </div>

      <div style={sidebar}>
        <h1>Testing React File Previewer in next.js</h1>

        <h2>Upload PDF or Image</h2>
        <input type="file" onChange={onFileChange} />

        <h2>Set a two pages PDF</h2>
        <FilePreviewerThumbnail onClick={onSetPdf} file={{ url: SAMPLE_PDF }} />

        <h2>Set an image</h2>
        <FilePreviewerThumbnail
          onClick={onSetImage}
          file={{ url: SAMPLE_IMG }}
        />

        <h2>Use an URL</h2>
        <input type="text" onChange={onSetUrl} />
      </div>

      <footer style={footer}>
        This footer is to check the integrity of the viewer, and make sure it
        doesn't extend its bounderies.
      </footer>
    </div>
  );
};
