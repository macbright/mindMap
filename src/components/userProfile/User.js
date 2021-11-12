import React from "react";


import { ReactComponent as UserRectangle } from '../../assets/userRectangle.svg';
import styles from "./user.module.scss";

const User = () => {
  
  return (
   <main className={styles.body}>
       <p className={styles.heading}> User Management</p>
       <section className={styles.firstSection}>
        <p className={styles.subHeading}> Profile information</p>
        <div className={styles.firstSectionWrapperDiv}>
            <div className={styles.profileImage}>
                <div className={styles.imageDiv}>
                    <p>Change photo</p>
                    <UserRectangle />
                </div>
                <div className={styles.imageButtonDiv}>
                    <button className={styles.uploadBtn}> + Upload new</button>
                    <button className={styles.removeBtn}>Remove</button>
                </div>
            </div>
            <div className={styles.profileInfoRight}>
                <div className={styles.inputDiv}>
                    <label >Change name</label> 
                    <input type="text" name="username"  /> 
                </div>
                <div className={styles.inputDiv}>
                    <label >Change location</label> 
                    <input type="text" name="location"  /> 
                </div>
           </div>
         </div>
       </section>
       <section className={styles.secondSection}>
           <div className={styles.secondSectionWrapperDiv}>

            <div className={styles.secondUpperInput}>
                <p className={styles.subHeading}>Change email addres</p>
                <div className={styles.inputDiv} >
                    <label >New email address </label> 
                    <input type="text"
                    placeholder={`Enter new e-mail `}
                    name="email" /> 
                </div>
                <div className={styles.inputDiv} >
                    <label >Current password </label> 
                    <input type="text"
                    placeholder={`Enter your password `}
                    name="password" /> 
                </div>
                <button>Update email</button>
            </div>
            <div  className={styles.secondUpperInput}>
                <p className={styles.subHeading}>Change password</p>
                <div className={styles.inputDiv}>
                    <label >Current password </label> 
                    <input type="password"
                    placeholder={`Enter your password `}
                    name="email" className={  styles.errorField } /> 
                </div>
                <div className={styles.inputDiv}>
                    <label >New password</label> 
                    <input type="password"
                    placeholder={`Enter new password `}
                    name="password" className={  styles.errorField } /> 
                </div>
                <button>Update password</button>
            </div>
           </div>
           <div> 
           <button>Save changes</button>
           </div>
       </section>


   </main>
  );
}

export default User;