import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";


import Body from "../body/Body";
import UserProfile from "../../userProfile/User";

import { ReactComponent as UserIcon } from '../../../assets/user.svg';
import { ReactComponent as Search } from '../../../assets/search.svg';
import { ReactComponent as DropDown } from '../../../assets/dropDown.svg';
import { ReactComponent as Logout } from '../../../assets/logout.svg';
import { ReactComponent as Setting } from '../../../assets/setting.svg';
import {useGetUserInfo} from "../../../store/services/users";

import styles from "./menu.module.scss";

const Menu = () => {
  const navigate = useNavigate();
  const { data } = useGetUserInfo();
  const [toggle, setToggle] = useState(false)
  const [userInfo, setUserInfo] = useState(false)


  useEffect(() => {
    if(!userInfo){
      navigate('/recent-documents');
    }
  }, [userInfo])

  useEffect(() => {
    setTimeout(()=> {
      handleLogout();
      }, 6000000 );
  })

  
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login")
  }
  const handleUserSetting = () => {
    setUserInfo(!userInfo)
    setToggle(!toggle);
    navigate(`/user/${data.id}`, {skipLocationChange: true});
  }

  const displayDropDown = () => {
      return (
        <div className={styles.logoutDiv}>
          <div>
           <p onClick={handleUserSetting}> <Setting className={styles.alignVer} /> User management</p>
          </div>
          <div>
            <p onClick={handleLogout}>     <Logout className={styles.alignVer} />   Logout</p> 
          </div>         
        </div>
      )
  }
  
  const handleClick = () => {
    setToggle(!toggle);
  }

  return (
   <nav className={styles.nav}>
     <div className={styles.search}>
      <Search  className={styles.alignVer}/>
      <input
          type="text"
          name="search"
          placeholder="Search for documents"
      /> 
     </div>
     <div className={styles.user}>

       {!data &&  <UserIcon className={styles.alignVer} /> }
       {data && <img src={`data:image/png;base64, ${data.avatarContent}`} />}
       <div>
         <p> {data?.userName} </p>
         <span> {data?.email}</span>
       </div>
       <DropDown  className={`${styles.alignVer}, ${styles.dropDown}`} onClick={handleClick}/>
       { toggle && displayDropDown() }
     </div>
     <div className={styles.clearFix }></div>
     <div className={ toggle ? styles.pushDown : ""}></div>
      {!userInfo &&  <Body />}
     {userInfo && <UserProfile />}
   </nav>
  );
}

export default Menu;