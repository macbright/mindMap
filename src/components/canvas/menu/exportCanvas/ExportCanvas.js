import React from 'react';

import { ReactComponent as ExportJson } from '../../../../assets/exportJson.svg';
import { ReactComponent as Cancel } from '../../../../assets/cancel.svg';

import styles from './exportCanvas.module.scss';


const ExportCanvas = ({setToggle}) => {


    const handleCancelExport = () => {
        setToggle();
    }
    return (
        <div className={styles.main}>
          <div className={styles.cancelDiv}>
              <p >  Export Dropdown as </p>
              <Cancel onClick={handleCancelExport}/>
          </div>
          <div className={styles.secondDiv} >
              <div className={styles.jsonDiv}>
                  <div className={styles.inputDiv}>
                      <input type="radio" name="exportCanvas" id="json" value="json" checked/>
                      <label for="json"> JSON</label>
                      <span> Canvas will export as JSON file.</span>
                  </div>
                  < ExportJson />
              </div>
              <div className={styles.pdfDiv}>
                  <div className={styles.inputDiv}>
                      <input type="radio" name="exportCanvas" id="pdf" value="pdf"/>
                      <label for="pdf"> PDF</label>
                      <span> Canvas will export as PDF file.</span>
                  </div>
                  < ExportJson />
              </div>
              <div className={styles.buttonDiv}>
                  <button> Continue </button>
              </div>
          </div>         
        </div>
      )
}

export default ExportCanvas;