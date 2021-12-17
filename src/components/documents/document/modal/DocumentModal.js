
import React, {  memo } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { ReactComponent as TrashIcon } from '../../../../assets/trash.svg';

import styles from './documentModal.module.scss';


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      width: '30%',
      height: '35%',
      backgroundColor: '#F8F9FD',
      position: 'absolute',
      transform: 'translate(-50%, -50%)',
    },
  };



const DocumentModal = ({  
    setShowModal, 
    showModal, 
    documentName,
    setDocumentName,  
    handleDeleteDocument,
    handleRenameDocument,
    handleCancel,
    eventName,
    error, 
    }) => {    
    
    const handleCloseModal = () => {
        setShowModal(false);
    }

    console.log(error)
    const handleChange = (e) => {
      const val = e.target.value;
      setDocumentName(val);
    
    }
    console.log(eventName)
    
      return (
        <div>
            <Modal 
                isOpen={showModal}
                contentLabel="onRequestClose Example"
                onRequestClose={handleCloseModal}
                style={customStyles}

                ariaHideApp={false}
                >
                {eventName !== " Change Name" ? 
                
                 (<div className={styles.deleteDiv}>
                    <TrashIcon />
                    <h5> Delete this Document ?</h5>
                    <span> this file will be permanently deleted</span>
                    <button className={styles.deleteButton} onClick={handleDeleteDocument} >Delete</button>
                    <button className={styles.cancelButton} onClick={handleCancel}>Cancel</button>
                </div>):
                 (<div className={styles.edit}> 
                    <div className={styles.name}> <h5> Rename Document</h5></div>
                    <div> 
                        <span> 
                            Enter your new document name 
                        </span>
                        <input  value={documentName} onChange={handleChange}/> 
                    </div>
                    <div> 
                        <button className={styles.rename} onClick={handleRenameDocument}> Rename</button>
                        <button className={styles.cancel} onClick={handleCancel}>  Cancel </button>
                    </div>
                 </div>)
                }
                
            </Modal>
        </div>
      );
    
  }

  DocumentModal.propTypes = {
    setShowModal: PropTypes.func, 
    showModal: PropTypes.bool, 
    documentName: PropTypes.string,
    setDocumentName: PropTypes.func,  
    handleDeleteDocument: PropTypes.func,
    handleRenameDocument: PropTypes.func,
    handleCancel: PropTypes.func,
    eventName: PropTypes.string,
    error: PropTypes.string, 
};
  export default memo(DocumentModal);