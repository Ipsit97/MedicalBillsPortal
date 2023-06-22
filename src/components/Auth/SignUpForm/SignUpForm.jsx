import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector  } from 'react-redux';
import {activeAccount, storeLoginInformation } from '../../../actions/actions';
import { useNavigate} from 'react-router-dom';
import { useState } from 'react';
import './SignUpForm.css';

function SignUpForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const loginInfo = useSelector((state) => state.form.loginInfo);
    const [usernameExists, setUsernameExists] = useState(false);
    const navigateToHome = useNavigate();
    const navigateToLogin = useNavigate();


    const onSubmit = (formData) => {

        const loginInfoKeys = Object.keys(loginInfo);
        if (loginInfoKeys.includes(formData.username)) {
            setUsernameExists(true);
        } else {
            dispatch(storeLoginInformation(formData));
            dispatch(activeAccount(formData.username));
            setUsernameExists(false);
            navigateToHome('/home');
        }
    };


    const handleLogin = () => {
        navigateToLogin('/login');
    };

    return (
    <div>
        <div className="container d-flex justify-content-center custom-boxSignUp">
            <div className='row col-sm-4'>
                <form onSubmit={handleSubmit(onSubmit)}>
                <h4>SignUp!</h4><br/>

                    <div className="form-group">
                    <label>UserName:</label>
                    <input type="text" className="form-control" 
                    {...register("username",{ required: true })}
                    />
                    {errors.username && <span style={{color:"red"}}>UserName is required</span>}
                    {usernameExists && (
                    <div style={{ color: 'red' }}>Username already exists</div>
                    )}
                    </div>

                    <div className="form-group">
                    <label>Password:</label>
                    <input type="password" className="form-control"
                    {...register("password",{ required: true })}
                    />
                    {errors.password && <span style={{color:"red"}}>Password is required</span>}
                    </div>
                    <br/>

                    <button type="submit" className="btn btn-signUp-custom">Sign Up</button><br/><br/>      
                </form>
                <button type ="button" className="btn btn-login-custom" onClick={handleLogin}>Already have an account? Login!</button>
            </div>    
        </div>
            
        </div>
    );
}

export default SignUpForm;