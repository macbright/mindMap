import React from "react";

import Menu from "./Menu";
import LeftMenu from "./LeftMenu";


import styles from "./menu.module.scss";

const Main = () => {
  
  return (
   <div className={styles.body}>
    <Menu />
    <LeftMenu />
    

     
   </div>
  );
}

export default Main;