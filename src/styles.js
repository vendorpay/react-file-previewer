const button = {
  width: '40px',
  color: '#fff',
  height: '40px',
  border: 'none',
  lineHeight: '1',
  outline: 'none',
  fontSize: '24px',
  cursor: 'pointer',
  textAlign: 'center',
  borderRadius: '3px',
  backgroundColor: 'transparent',
};

export default {
  // Base wrapper.

  wrapperStyles: {
    width: '100%',
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
  },

  // Base button.

  button,
  // TODO Add hover
  // .vp-preview-button:hover {
  //   background-color: rgba(255,255,255,0.25);
  //   cursor: pointer;
  // }

  // Preview bar.

  previewBar: {
    color: '#fff',
    width: '100%',
    height: '52px',
    display: 'flex',
    minHeight: '52px',
    maxHeight: '52px',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#2B2F39',
    justifyContent: 'spaceBetween',
  },
  previewBarLeft: {
    padding: '6px',
    display: 'flex',
    alignItems: 'center',
  },
  previewBarRight: {
    padding: '6px',
    display: 'flex',
    alignItems: 'center',
  },
  previewBarLeftButton: {
    marginRight: '3px',
  },
  previewBarLeftPagecount: {
    marginLeft: '6px',
  },
  previewBarRightButton: {
    marginLeft: '6px',
  },

  icons: {
    zIndex: 999,
    right: '12px',
    bottom: '24px',
    padding: '6px',
    display: 'flex',
    borderRadius: '3px',
    position: 'absolute',
    flexDirection: 'column',
    backgroundColor: 'rgba(0, 0, 0, .5)',
  },

  iconsButton: {
    ...button,
    marginTop: '6px',
  },

  content: {
    width: '100%',
    display: 'flex',
    overflow: 'scroll',
    position: 'relative',
    backgroundColor: '#68738a',
    height: 'calc(100vh - 52px)',
  },

  file: {
    margin: 'auto',
    padding: '12px',
  },

  pdfPage: {
    marginBottom: '12px',
  },

  span: {
    width: '100%',
    clear: 'both',
    display: 'block',
    height: '8000px',
  },
};
