import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import inputs from './inputs';
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
            <form  onSubmit={handleSubmit(onSubmit)}>
                {
                    inputs.map((input) =>
                        (
                            <div  key={input.label}>
                                <label >{input.label}</label>
                                <input
                                    type={input.type}
                                    name={input.name}
                                    placeholder={`Enter your ${input.name}`}
                                    {...register(input.name)} 
                                />
                                <p>{ errors[input.name]?.message}</p>
                            </div>        
                        )

                    )
                }
                <button  type="submit"> submit</button>
            </form>
        </div>
        
       </div>
   )
}

export default Register;   