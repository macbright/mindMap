import React from "react";

import { ReactComponent as DropDown } from '../../../assets/dropDown.svg';
import { ReactComponent as Hamburger } from '../../../assets/hamburger.svg';
import { ReactComponent as Box } from '../../../assets/box.svg';
import { ReactComponent as Dots } from '../../../assets/dots.svg';
import list from "../documentList/documentList";

import styles from "./body.module.scss";

const Body = () => {
  
  return (
   <div >
       <div className={styles.heading}>
           <h4 > Recent documents </h4>
           <div className={styles.rightHeader}> 
               <div className={styles.lastModified}>
                   <p> Last modified </p>
                   <DropDown  />
               </div>
               <div className={styles.leftIcons}>
                    <Hamburger />
                    <Box  /> 
               </div>
           </div>
       </div>
       <div className={styles.docView}>
           <div className={styles.docHeading}>
               <p> Name</p>
           </div>
           {
                 list.map((document) =>
                 (
                     <div  key={document.id} className={styles.docDiv}>
                        <div className={styles.docName}>
                            <p> {document.name}</p>
                        </div>
                        <div className={styles.docDate}>
                            <p>{document.dateCreated} </p>
                            <Dots />
                        </div>
                     </div>     
                 )

             )
           }
       </div>
     
   </div>
  );
}

export default Body;