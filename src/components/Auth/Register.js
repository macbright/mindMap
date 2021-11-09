import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


import { ReactComponent as Logo } from  '../../assets/logo.svg';
import constant from './constant';
import Slider from '../slider/Slider';
import styles from './register.module.scss';


const schema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
    location: yup.string().required()
  });

const Register = () => {

    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = (data) => console.log('data: ', data)
    

   return (
       <div className={styles.signupDiv}> 
        <Slider />
        <div className={styles.signupRight} >
            <h1> Let's get started </h1>
            <p className={styles.subheading}>Already have an account? <Link to="/login">Sign in</Link>
 </p>

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