import React, {useEffect} from "react";

import { ReactComponent as DropDown } from '../../../assets/dropDown.svg';
import { ReactComponent as Hamburger } from '../../../assets/hamburger.svg';
import { ReactComponent as Box } from '../../../assets/box.svg';
import Document from '../document/Document';


import {useGetAllUsersDocumentsQuery} from '../../../store/services/document';

import styles from "./body.module.scss";

const Body = () => {
  
    const { data, isLoading } = useGetAllUsersDocumentsQuery();

    useEffect(() => {
        console.log('data: ', data)
    }, [data])

   
    
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
                 data?.$values.map((document) =>
                 (
                    <Document  document={document} key={document.id}/>
                 )

             )
           }
       </div>
     
   </div>
  );
}

export default Body;