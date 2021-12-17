import React, {useEffect, useState, useRef} from "react";
import {  useForm } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


import { ReactComponent as UserRectangle } from '../../assets/userRectangle.svg';
import {useGetUserInfo, useChangePasswordMutation, 
    useUpdateUserMutation, useChangeUserAvatarMutation} from "../../store/services/users";

import styles from "./user.module.scss";


const schema = yup.object().shape({
    password: yup.string(),
    newPassword: yup.string(),
    userName: yup.string(),
    location: yup.string()
  });

const User = () => {

    const avatarData = new FormData();
    const inputFile = useRef('');

    const { data } = useGetUserInfo();
    const [changePassword, {  error: passwordError, isSuccess: passwordSuccess }] = useChangePasswordMutation();
    const [updateUser, {  error: userUpdateError, isSuccess: userUpdateSuccess }] = useUpdateUserMutation();
    const [changeUserAvatar, {  isSuccess: avatarUpdateSuccess }] = useChangeUserAvatarMutation();

    const [avatar, setAvatar] = useState('');

    const { register, reset, handleSubmit, } = useForm({
        resolver: yupResolver(schema)
    })

  useEffect(() => {
    reset({ 
        userName: data.userName,
        location: data.location || 'Chicago'
    })
  }, [data])

  const handleAvatarChange = (result) => {
    setAvatar(result.target.files[0])
  }

  const handleAvatarUpload = () => {
    avatarData.append('avatarFile', avatar)
    const payload = {
        id: data.id,
        avatarData
    }
    if(avatar){
        changeUserAvatar(payload)
        console.log('ref: ', inputFile.current.value)
        inputFile.current.value = ''
    } 
  }

  const saveChanges = (inputs) => {
      const payload = {
         userName: inputs.userName,
         avatarFileId: null
      }
      const userId = data.id
      updateUser({payload, userId})
  }

  const updatePassword = (inputs) => {
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
        {userUpdateSuccess && 'User details successfuly updated'}
        {avatarUpdateSuccess && 'User Avatar successfully updated'}
        </p>
       
       <section className={styles.firstSection}>
        <p className={styles.subHeading}> Profile information</p>
        <div className={styles.firstSectionWrapperDiv}>
            <div className={styles.profileImage}>
                <div className={styles.imageDiv}>
                    <p>Change photo</p>
                    {!data.avatarContent && <UserRectangle />}
                    {data && <img src={`data:image/png;base64, ${data.avatarContent}`} />}
                </div>
                <div className={styles.imageButtonDiv}>
                    <input className={styles.ok} type="file" name="avatar" accept="image/*" onChange={handleAvatarChange}  ref={inputFile}/>
                    <button className={styles.uploadBtn} type="submit" onClick={handleAvatarUpload} >Upload </button>
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