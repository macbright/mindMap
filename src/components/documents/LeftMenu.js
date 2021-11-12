import React from "react";
import { Link } from "react-router-dom";

import styles from "./leftMenu.module.scss";
import { ReactComponent as HomeIcon } from '../../assets/home.svg';

const LeftMenu = () => {
  
  return (
   <div className={styles.leftDiv}>
       <h2>Prodigy</h2>
       <button> +  Create board </button>
        <div className={styles.homeButton}> <HomeIcon />  <Link to="/password-recovery">Home</Link> </div>
   </div>
  );
}

export default LeftMenu;