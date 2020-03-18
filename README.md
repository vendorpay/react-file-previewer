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

## Props

| Prop name    | Type     | Description |
|:-------------|:---------|:------------|
| file         | object   | Refer to [file object](#file-object) |
| onClick      | function | Event handler for when viewer is clicked |
| hideControls | bool  | If 'true', viewer won't display the zoom, page up/down, and fit-to-screen controls |
| height       | string   | Height of the viewer passed to the css styles |
| width        | string   | Width of the viewer passed to the css styles |

### File Object

| Prop name | Type   | Description |
|:----------|:-------|:------------|
| url       | string | This can be used by itself with no other prop |
| data      | string | Base64 encoded string of file. If used, `mimeType` must also be provided |
| mimeType  | string | Type of the file |
| name      | string | Used to specify the filename when download button is clicked |
