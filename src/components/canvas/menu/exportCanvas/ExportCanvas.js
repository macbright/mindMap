import React, {useState, useEffect} from 'react';
import { useParams} from "react-router-dom";

import { ReactComponent as ExportJson } from '../../../../assets/exportJson.svg';
import { ReactComponent as Cancel } from '../../../../assets/cancel.svg';

import styles from './exportCanvas.module.scss';

import { useExportToJsonQuery } from '../../../../store/services/document';
import { downloadFile } from './hooks';



const ExportCanvas = ({setToggle}) => {
    const {id} = useParams();

    const {data, error} = useExportToJsonQuery(id);
    const [exportType, setExportType] = useState('json');

    const handleChange = (e) => {
        const val = e.target.value
        setExportType(val)
    }

    const handleCancelExport = () => {
        setToggle();
    }

    const  downloadJson = (data) => {
        downloadFile({
          data: JSON.stringify(data),
          fileName: `${data?.Name}`,
          fileType: 'text/json',
        })
      }
    

    const handleExportCanvas = (e) => {
        if(data) downloadJson(data);
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
                      <input type="radio" name="exportCanvas" id="json" value="json" checked 
                      onChange={handleChange}
                      />
                      <label for="json"> JSON</label>
                      <span> Canvas will export as JSON file.</span>
                  </div>
                  < ExportJson />
              </div>
              <div className={styles.pdfDiv}>
                  <div className={styles.inputDiv}>
                      <input type="radio" name="exportCanvas" id="pdf" value="pdf" onChange={handleChange}/>
                      <label for="pdf"> PDF</label>
                      <span> Canvas will export as PDF file.</span>
                  </div>
                  < ExportJson />
              </div>
              <div className={styles.buttonDiv}>
                  <button onClick={handleExportCanvas}> Continue </button>
              </div>
          </div>         
        </div>
      )
}

export default ExportCanvas;