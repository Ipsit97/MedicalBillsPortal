import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate} from 'react-router-dom';
import { useDispatch, useSelector  } from 'react-redux';
import {activeAccount } from '../../../actions/actions';
import { useState } from 'react';
import './LoginForm.css'



function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigateToSignUp = useNavigate();
    const loginInfo = useSelector((state) => state.form.loginInfo);
    const [usernameExists, setUsernameExists] = useState(false);
    const navigateToHome = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = (formData) => {
        const loginInfoKeys = Object.keys(loginInfo);

        if (loginInfoKeys.includes(formData.username) && loginInfo[formData.username] === formData.password) 
        {   
            setUsernameExists(false);
            dispatch(activeAccount(formData.username));
            navigateToHome('/home');
        }
        else
        {
            setUsernameExists(true);
        }
    };
    
    const handleSignUp = () => {
        navigateToSignUp('/signUp');
    };

    return (
        <div>
        <div className="container d-flex justify-content-center custom-boxLogin">
        <form onSubmit={handleSubmit(onSubmit)}>
             <h4>Login</h4><br/>
 
                 <div className="form-group">
                 <label>UserName:</label>
                 <input type="text" className="form-control" 
                 {...register("username",{ required: true })}
                 />
                 {errors.username && <span style={{color:"red"}}>UserName is required</span>}
                 </div>
 
                 <div className="form-group">
                 <label>Password:</label>
                 <input type="password" className="form-control"
                 {...register("password",{ required: true })}
                 />
                 {errors.password && <span style={{color:"red"}}>Password is required</span>}
                 </div>
                 <br/>

                {usernameExists && (
                <div style={{ color: 'red' }}>Username doesn't exist or Password incorrect!</div>
                )}
 
                 <button type="submit" className="btn btn-loginBtn-custom">Login</button><br/><br/>
                 <button type = "button" className="btn btn-signUpBtn-custom" onClick={handleSignUp}>Don't have an account? Sign Up!</button>
             </form>
         </div>
     </div>
    );
}

export default LoginForm;