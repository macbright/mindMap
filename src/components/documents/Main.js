import React from "react";

import Menu from "./menu/Menu";
import LeftMenu from "./leftMenu/LeftMenu";


import styles from "./main.module.scss";

const Main = () => {
  
  return (
   <div className={styles.body}>
    <Menu />
    <LeftMenu />
   </div>
  );
}

export default Main;