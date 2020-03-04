# react-file-previewer
A browser/device-agnostic file previewer for PDF and image file types built on top of React-PDF.

## Installation
```
npm i react-file-previewer
```

## Usage
This component supports URLs and base64 encoded data.

### Basic Usage
```javascript
import ReactFilePreviewer from 'react-file-previewer';

export const App = () => (
    <div>
        <h1>My App</h1>
        <ReactFilePreviewer file={{url: "https://cors-anywhere.herokuapp.com/http://africau.edu/images/default/sample.pdf"}}/>
    </div>
);
```

### Base64 Usage
```javascript
import ReactFilePreviewer from 'react-file-previewer';

export const App = () => (
    <div>
        <h1>My App</h1>
        <ReactFilePreviewer 
            file={{
                data: "<base64 string>",
                mimeType: 'application/pdf',
                name: 'sample.pdf' // for download
            }}
        />
    </div>
);
```
