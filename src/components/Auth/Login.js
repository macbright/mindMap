import React, {useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


import { ReactComponent as Logo } from  '../../assets/logo.svg';
import constant from './constant';
import Slider from '../slider/Slider';
import styles from './register.module.scss';
import {useLoginUserMutation} from "../../store/services/users";

import moreStyles from './login.module.scss';


const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

const Login = () => {

    const [loginUser, { error, isSuccess: createSuccess }] =
    useLoginUserMutation();
 

    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(schema)
    })

    useEffect(() => {
        console.log('error message: ', error)
    }, [error])

    const onSubmit = (data) => {
        console.log('login details', data)
        loginUser(data)
    }
    

   return (
       <div className={styles.signupDiv}> 
        <Slider />
        <div className={styles.signupRight} >
            <h1> Sign in to Prodigy </h1>
            <p className={styles.subheading}>Don't have an account yet? <Link to="/signup">Sign Up </Link>
 </p>

            <form  onSubmit={handleSubmit(onSubmit)}>
                {
                    constant.signinInputs.map((input) =>
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
                <div>
                <div className={moreStyles.forgetUpperDiv}>
                    <div className={moreStyles.rememberMe}>
                        <input type="checkbox" />
                        <label >Remember me </label>
                    </div>
                    <div className={moreStyles.forgetPassword}>
                        <Link to="/password-recovery">Forgot password</Link>
                    </div>
                </div>
                <div className={moreStyles.clearFix}></div>
                </div>

                <button  type="submit" className={styles.createBtn}> Sign in </button>
            </form>
            <div className={moreStyles.logoDiv}> <Logo  className={styles.logo, moreStyles.logo}/> </div>
        </div>
        
       </div>
   )
}

export default Login;   