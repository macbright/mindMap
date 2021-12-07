import React, {useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from "react-router-dom";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


import { ReactComponent as Logo } from  '../../assets/logo.svg';
import constant from './constant';
import Slider from '../slider/Slider';
import {useCreateUserMutation} from "../../store/services/users";

import styles from './register.module.scss';


const schema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
    location: yup.string().required()
  });

const Register = () => {
    const navigate = useNavigate();
    const [createUser, { error, isSuccess }] =
    useCreateUserMutation();
 
    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(schema)
    })

    useEffect(() => {
        console.log('error: ', error)
        if(isSuccess) {
            navigate("/login")
        }
    }, [error, isSuccess])

    const onSubmit = (data) => {
        const userDetails = {
            username: data.username,
            email: data.email,
            password: data.password,
        }
        createUser(userDetails)
    }
    

   return (
       <div className={styles.signupDiv}> 
        <Slider />
        <div className={styles.signupRight} >
            <h1> Let's get started </h1>
            <p className={styles.subheading}>Already have an account? <Link to="/login">Sign in</Link>
            </p>
            <p className={styles.error}>{ error?.data}</p>

            <form  onSubmit={handleSubmit(onSubmit)}>
                {
                    constant.signupInputs.map((input) =>
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
                <div className={styles.termService}>
                    <input type="checkbox" />
                    <label >I agree to <a> Terms of Use</a> and  <a> Privacy Policy </a> </label>
                </div>

                <button  type="submit" className={styles.createBtn}> Create Account </button>
            </form>
            <Logo  className={styles.logo}/>
        </div>
        
       </div>
   )
}

export default Register;   