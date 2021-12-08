
import React, { useState, memo } from 'react';
import Modal from 'react-modal';

import styles from './modal.module.scss'

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      width: '50%',
      height: '30%',
      backgroundColor: '#F8F9FD',

      transform: 'translate(-50%, -50%)',
    },
  };



const SimpleModal = ({  setShowModal, showModal, setDocumentName, documentName,  handleCreateDocument, error, setError}) => {    
    
    const handleCloseModal = () => {
        setShowModal(false);
    }

    console.log(error)
    const handleInputChange = (e) => {
      const val = e.target.value;
      setDocumentName(val);
      setError('')
    }
    
      return (
        <div>
            <Modal 
                isOpen={showModal}
                contentLabel="onRequestClose Example"
                onRequestClose={handleCloseModal}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
                >
                 <button className={styles.closeButton} onClick={handleCloseModal}>Close Modal</button>
               
                <div className={styles.inputDiv}>
                    <h2> Create a new Document</h2>
                    <span className={styles.error}> {error && error}</span>
                    <input
                        type="text"
                        name="document name"
                        placeholder="enter the document name" 
                        value={documentName}
                        onChange={handleInputChange}
                        className={styles.inputError}

                    /> 
                    <button className={styles.submit} onClick={handleCreateDocument}>Create New</button>
                </div>
                
            </Modal>
        </div>
      );
    
  }

  export default memo(SimpleModal);