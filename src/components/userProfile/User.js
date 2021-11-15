import React, {useEffect} from "react";
import { useForm } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


import { ReactComponent as UserRectangle } from '../../assets/userRectangle.svg';
import {useGetUserInfo, useChangePasswordMutation, useUpdateUserMutation} from "../../store/services/users";

import styles from "./user.module.scss";


const schema = yup.object().shape({
    password: yup.string(),
    newPassword: yup.string(),
    userName: yup.string(),
    location: yup.string()
  });

const User = () => {

    const { data, isLoading } = useGetUserInfo();
    const [changePassword, {  error: passwordError, isSuccess: passwordSuccess }] = useChangePasswordMutation();
    const [updateUser, {  error: userUpdateError, isSuccess: userUpdateSuccess }] = useUpdateUserMutation();

    const { register, reset, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(schema)
    })

  useEffect(() => {
    reset({ 
        userName: data.userName,
        location: data.location || 'Chicago'
    })
  }, [data])

  const saveChanges = (inputs) => {
      const payload = {
         userName: inputs.userName,
         avatarFileId: null
      }
      const userId = data.id
      updateUser({payload, userId})
  }

  const updatePassword = (inputs) => {
      console.log('inputs: ', inputs)
      const payload = {
          password: inputs.password,
          newPassword: inputs.newPassword,
          email: data.email
      }
      changePassword(payload)
  }

  return (
   <main className={styles.body}>
       <p className={styles.heading}> User Management</p>
       <p className={styles.error}>{ passwordError?.data || userUpdateError?.data}  </p>
       <p className={styles.success}> {passwordSuccess && 'Password Successfully updated'} 
        {userUpdateSuccess && 'User details successfuly updated'}</p>
       
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
                    <input type="text" name="userName" 
                    {...register("userName")} 
                    /> 
                    
                </div>
                <div className={styles.inputDiv}>
                    <label >Change location</label> 
                    <input type="text" name="location" 
                     {...register("location")}  /> 
                </div>
           </div>
           <button className={styles.saveChanges} onClick={handleSubmit(saveChanges)}>Save changes</button>
         </div>
       </section>
       <section className={styles.secondSection}>
         <p className={styles.subHeading}>Change password</p>
           <div className={styles.secondSectionWrapperDiv}>
                <div className={styles.inputDiv}>
                        <label >Current password </label> 
                        <input type="password"
                         {...register("password")} 
                        name="password" className={  styles.errorField } /> 
                </div>
                <div className={styles.inputDiv}>
                    <label >New password</label> 
                    <input type="password"
                    placeholder={`Enter new password `}
                    {...register("newPassword")} 
                    name="newPassword" className={  styles.errorField } /> 
                </div>
                <button  onClick={handleSubmit(updatePassword)}>Update password</button>
           </div>
       </section>


   </main>
  );
}

export default User;