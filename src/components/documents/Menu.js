import React from "react";

import { ReactComponent as UserIcon } from '../../assets/user.svg';
import { ReactComponent as Search } from '../../assets/search.svg';
import { ReactComponent as DropDown } from '../../assets/dropDown.svg';
import styles from "./menu.module.scss";

const Menu = () => {
  
  return (
   <nav className={styles.nav}>
     <div className={styles.search}>
      <Search  className={styles.alignVer}/>
      <input
          type="text"
          name="search"
          placeholder="Search for documents"
          // {...register(input.name)} 
          // className={ errors[input.name] ? styles.errorField : '' }
      /> 
     </div>

     <div className={styles.user}>
       <UserIcon className={styles.alignVer} /> 
       <div>
         <p> Bright Okike</p>
         <span> brightokike@gmail.com</span>
       </div>
       <DropDown  className={styles.alignVer}/>
     </div>
   </nav>
  );
}

export default Menu;