import React, {useState, useEffect} from 'react';
import { useParams} from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from 'react-redux';
import { jsPDF } from "jspdf";

import { ReactComponent as ExportJson } from '../../../../assets/exportJson.svg';
import { ReactComponent as ExportPdf } from '../../../../assets/pdf.svg';
import { ReactComponent as Cancel } from '../../../../assets/cancel.svg';

import styles from './exportCanvas.module.scss';

import { useExportingToJsonQuery } from '../../../../store/services/document';
import { downloadFile, escapeString } from './hooks';

           /*eslint-disable */

const ExportCanvas = ({setToggle}) => {
    const {id} = useParams();

    const selector = useSelector((state) => state.canvasElements.elements)
    const { data = [] } = useExportingToJsonQuery(id);
    const [exportType, setExportType] = useState('json');

    const handleChange = (e) => {
        const val = e.target.value
        setExportType(val)
    }

    

    useEffect(() => {
        
        if(data.length > 0) console.log('dataaaaa: ', escapeString(data))
    }, [data])

    const handleCancelExport = () => {
        setToggle();
    }

    const exportPdf = () => {
        let doc = new jsPDF();
        doc.text("Octonyan loves jsPDF", 35, 25);
        doc.save()
        doc.addImage(selector.pdfImageSrc, "PNG", 0, 0, 5, 1);
        // console.log(selector.pdfImageSrc,)
    }
    const  downloadJson = (data) => {
        downloadFile({
          data: JSON.stringify(data),
          fileName: `${data[0]?.ShapeId}`,
          fileType: 'text/json',
        })
      }
    

    const handleExportCanvas = (e) => {
        e.preventDefault();
        if(data) {
            if(exportType === 'json') downloadJson(escapeString(data));
            if(exportType === 'pdf') exportPdf()
        }
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
                      <label htmlFor="json"> JSON</label>
                      <span> Canvas will export as JSON file.</span>
                  </div>
                  < ExportJson />
              </div>
              <div className={styles.pdfDiv}>
                  <div className={styles.inputDiv}>
                      <input type="radio" name="exportCanvas" id="pdf" value="pdf" onChange={handleChange}/>
                      <label htmlFor="pdf"> PDF</label>
                      <span> Canvas will export as PDF file.</span>
                  </div>
                  < ExportPdf />
              </div>
              <div className={styles.buttonDiv}>
                  <button onClick={handleExportCanvas}> Continue </button>
              </div>
          </div>         
        </div>
      )
}

ExportCanvas.propTypes = {
    setToggle: PropTypes.func,
};

export default ExportCanvas;