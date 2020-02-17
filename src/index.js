import React from 'react';

import PlusBox from 'mdi-material-ui/PlusBox';
import MinusBox from 'mdi-material-ui/MinusBox';
import Download from 'mdi-material-ui/Download';
import ChevronUp from 'mdi-material-ui/ChevronUp';
import ChevronDown from 'mdi-material-ui/ChevronDown';
import RotateRight from 'mdi-material-ui/RotateRight';
import ArrowExpandHorizontal from 'mdi-material-ui/ArrowExpandHorizontal';

import styles from './styles';

const FilePreviewer = () => {
  return (
    <div style={styles.wrapperStyles}>
      <div style={styles.previewBar}>
        <div style={styles.previewBarLeft}>
          <button type="button" style={styles.button}>
            <ChevronUp />
          </button>
          <button type="button" style={styles.button}>
            <ChevronDown />
          </button>
          <span style={styles.previewBarLeftPagecount}>1 of 2</span>
        </div>
        <div style={styles.previewBarRight}>
          <button type="button" style={styles.button}>
            <RotateRight />
          </button>
          <button type="button" style={styles.button}>
            <Download />
          </button>
        </div>
      </div>

      <div style={styles.icons}>
        <button type="button" style={styles.button}>
          <PlusBox />
        </button>
        <button type="button" style={styles.iconsButton}>
          <MinusBox />
        </button>
        <button type="button" style={styles.iconsButton}>
          <ArrowExpandHorizontal />
        </button>
      </div>

      <div style={styles.content}>
        <div style={styles.file}>
          file
          <span style={styles.span}></span>
          more
        </div>
      </div>
    </div>
  );
};

export default FilePreviewer;
