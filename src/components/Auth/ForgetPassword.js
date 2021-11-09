import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


import { ReactComponent as Logo } from  '../../assets/logo.svg';
import constant from './constant';
import Slider from '../slider/Slider';
import styles from './register.module.scss';
import moreStyles from './login.module.scss';


const schema = yup.object().shape({
    email: yup.string().email().required(),
  });

const ForgetPassword = () => {

    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = (data) => console.log('data: ', data)
    

   return (
       <div className={styles.signupDiv}> 
        <Slider />
        <div className={styles.signupRight} >
            <h1> Password recovery </h1>
            <p className={styles.subheading}><Link to="/login">Back to Sign in </Link>
 </p>

            <form  onSubmit={handleSubmit(onSubmit)}>
                {
                    constant.passwordRecovery.map((input) =>
                        (
                           <div className={styles.inputUpperDiv}> <div  key={input.label} className={styles.inputDiv}>
                                <label >{input.label}</label>
                                <input
                                    type={input.type}
                                    name={input.name}
                                    placeholder={`Enter your ${input.name}`}
                                    {...register(input.name)} 
                                    className={ errors[input.name] ? styles.errorField : '' }
                                /> 
                                <p className={styles.error}>{ errors[input.name]?.message}</p>
                            </div>  </div>      
                        )

                    )
                }

                <button  type="submit" className={styles.createBtn}> Continue </button>
            </form>
            <div className={moreStyles.logoDiv}> <Logo  className={styles.logo, moreStyles.logo}/> </div>
        </div>
        
       </div>
   )
}

export default ForgetPassword;   