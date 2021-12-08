import React, {useState, useEffect} from "react";

import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from "./leftMenu.module.scss";
import { ReactComponent as HomeIcon } from '../../../assets/home.svg';
import SimpleModal from "../../modal/Modal"

import {useCreateDocumentMutation} from "../../../store/services/document";


const LeftMenu = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [documentName, setDocumentName] = useState("");
  const [documentNameError, setDocumentNameError] = useState("");

  const [createDocument, { data, error, isSuccess }] = useCreateDocumentMutation();


  const notify = () => toast("Document successfully created");

  const handleShowModal = () => {
    setShowModal(true);
    console.log('showModal', showModal);
  }

  const handleCreateDocument = () => {
    if(documentName === ""){
      setDocumentNameError(" Document can't be empty")
    } else{
      const payload = {
        "name": documentName,
      }
      createDocument(payload);
    }
  }

  useEffect(() => {
    if (isSuccess) {
      notify()
      setDocumentName("")
      setShowModal(false)
      navigate(`/documents/${data.id}`, { state: data});
    }
    if(error) setDocumentNameError("document name already exists")
    console.log('data: ', data)
  }, [isSuccess, error])

  
  
  return (
   <div className={styles.leftDiv}>
       <h2>Prodigy</h2>
       <button onClick={handleShowModal}> +  Create board </button>
        <div className={styles.homeButton}> <HomeIcon />  <Link to="/recent-documents">Home</Link> </div>
        <SimpleModal showModal={showModal} setShowModal={setShowModal} 
        setDocumentName={setDocumentName} 
        documentName={documentName}
        handleCreateDocument={handleCreateDocument}
        error={documentNameError}
        setError={setDocumentNameError}
        />
        <ToastContainer />
   </div>
  );
}

export default LeftMenu;