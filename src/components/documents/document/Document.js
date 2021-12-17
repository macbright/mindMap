import React, {memo, useState, useRef, useEffect} from 'react';
import {  useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import PropTypes from 'prop-types';

import DocumentModal from './modal/DocumentModal';
import {useChangeDocumentNameMutation, useDeleteDocumentMutation} from '../../../store/services/document';
import {formatDate, listenForOutsideClicks} from "./hook";
import { ReactComponent as Dots } from '../../../assets/dots.svg';
import { ReactComponent as EditIcon } from '../../../assets/edit.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/delete.svg';

import styles from "./document.module.scss";


const Document = ({document}) => { 
    
    const [changeDocumentName, {  isSuccess: changeSuccess }] = useChangeDocumentNameMutation();
    const [deleteDocument, {   isSuccess: deleteSuccess }] = useDeleteDocumentMutation();
    const navigate = useNavigate();

    const menuRef = useRef(null);
    const [listening, setListening] = useState(false);
    const [dropDown, setDropDown] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [eventName, setEventName] = useState('')
    const [documentName, setDocumentName] = useState(document.name)

    const notifyDelete = () => toast("Document successfully Deleted");
    const notifyChange = () => toast("Document Name successfully changed");
    

    useEffect(() => {
        if(changeSuccess) notifyChange();
        if(deleteSuccess) notifyDelete();
    }, [deleteSuccess, changeSuccess])

     const displayDropDown = () => {
        return (
        <div className={styles.dropDown}>
            <div className={styles.edit}>
                <EditIcon /> <p onClick={handleModalDisplay}> Change Name</p>
            </div>
            <div className={styles.delete}>
                <DeleteIcon /> <p onClick={handleModalDisplay}> Delete Document</p>
            </div>
        </div>)
     }
     useEffect( listenForOutsideClicks(
        listening,
        setListening,
        menuRef,
        setDropDown,
      ));

      const handleModalDisplay = (event) => {
        setEventName(event.target.innerHTML)
        setDropDown(false)
        setShowModal(!showModal)
      }

     const handleClick = () => {
         setDropDown(!dropDown)
     }
     const handleCancel = () => {
        setDropDown(false)
        setShowModal(false)
    }
    const handleDeleteDocument = () => {
        deleteDocument(document.id)
        setShowModal(false);      
    }
    const handleRenameDocument = () => {
        const newName = {
            payload: {
                "Name" :  documentName,
            },
            id: document.id
            }
        changeDocumentName(newName);
        setShowModal(false);
    }
 
    const handleNameClick = () => {
        navigate(`/documents/${document.id}`, { state: document})
    }

    return (
        <div  key={document.id} className={styles.docDiv} ref={menuRef} >
            <div className={styles.docName} onClick={handleNameClick}>
                <p > {document.name}</p>
            </div>
            <div className={styles.docDate}>
                <p>{formatDate(document.created)} </p>
                <Dots className={styles.dotIcon} onClick={handleClick}/>
                <DocumentModal  showModal={showModal} setShowModal={setShowModal} 
                 handleCancel={handleCancel}
                 eventName={eventName}
                 handleDeleteDocument={handleDeleteDocument}
                 handleRenameDocument={handleRenameDocument}
                 documentName={documentName}
                 setDocumentName={setDocumentName}
                />
                 <ToastContainer />
            </div>
            { dropDown && displayDropDown()}
           
            
        </div>     
    )
}

Document.propTypes = {
    document: PropTypes.object
};
export default memo(Document);