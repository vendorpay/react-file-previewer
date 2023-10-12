import { useState } from 'react';
import FilePreviewer from '@react-league/react-file-previewer';
import '@react-league/react-file-previewer/dist/styles.css';

function App() {
  const [numPages, setNumPages] = useState(0);
  const [file, setFile] = useState({ url: '' });
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const onFileChange = event => {
    const fileReader = new window.FileReader();
    const file = event.target.files[0];
    
    fileReader.onload = fileLoad => {
        const { result } = fileLoad.target;
        setFile({ url: result });
    };
    
    fileReader.readAsDataURL(file);
};

  console.info(file)

  return (
    <div>
      {
        file.url && (
          <FilePreviewer file={file} />
        )
      }
      <input type='file' onChange={onFileChange} />
    </div>
  );
}

export default App;
