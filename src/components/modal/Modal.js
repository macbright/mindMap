
import React, { useState } from 'react';
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



const SimpleModal = ({  setShowModal, showModal }) => {    
    
    const handleCloseModal = () => {
        setShowModal(false);
    }
    
      return (
        <div>
            <Modal 
                isOpen={showModal}
                contentLabel="onRequestClose Example"
                onRequestClose={handleCloseModal}
                // className={styles.modal}
                style={customStyles}
                // overlayClassName={styles.overlay}
                contentLabel="Example Modal"
                >
                 <button className={styles.closeButton} onClick={handleCloseModal}>Close Modal</button>
               
                <div className={styles.inputDiv}>
                    <h2> Create a new Document</h2>

                    <input
                        type="text"
                        name="document name"
                        placeholder="enter the document name"
                       
                        
                    /> 
                    <button className={styles.submit} onClick={handleCloseModal}>Create New</button>
                </div>
                
            </Modal>
        </div>
      );
    
  }

  export default SimpleModal;