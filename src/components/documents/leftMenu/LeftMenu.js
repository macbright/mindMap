import React, {useState} from "react";
import { Link } from "react-router-dom";

import styles from "./leftMenu.module.scss";
import { ReactComponent as HomeIcon } from '../../../assets/home.svg';
import SimpleModal from "../../modal/Modal"

const LeftMenu = () => {

  const [showModal, setShowModal] = useState(false)

  const handleShowModal = () => {
    setShowModal(true);
    console.log('showModal', showModal);
  }

  
  
  return (
   <div className={styles.leftDiv}>
       <h2>Prodigy</h2>
       <button onClick={handleShowModal}> +  Create board </button>
        <div className={styles.homeButton}> <HomeIcon />  <Link to="/password-recovery">Home</Link> </div>
        <SimpleModal showModal={showModal} setShowModal={setShowModal} />
   </div>
  );
}

export default LeftMenu;