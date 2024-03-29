import React, { useState, useRef, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import useAuth from '../../hooks/useAuth';
import './common.css'
import axios from 'axios';

function Signup() {
    const [firstName, setFirstName] = useState('');
    const [validFirstName, setValidFirstName] = useState(true);
    const firstNameRef = useRef();

    const [lastName, setLastName] = useState('');
    const [validLastName, setValidLastName] = useState(true);

    // check if user name is already present
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(true);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(true);
    const [passwordMatch, setPasswordMatch] = useState(true);

    const [toggleValue, setToggleValue] = useState('user');

    const { getAuthData, setAuthData, isSessionValid } = useAuth();
    const reqCancelRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(isSessionValid()){
            navigate(getAuthData()?.role === "user"? "/": "/dashboard", {replace: true});
        }

        firstNameRef.current.focus();
    }, []);

    function validateFirstNameAndSet(e){
        const inputFn = e.target.value;
        const fName = inputFn.trim();
        const fNameRegex = /^[a-zA-Z ]+$/;

        if(fNameRegex.test(fName)){
            setValidFirstName(true);
            setFirstName(fName);
        } else {
            setValidFirstName(false);
        }
    }

    function validateLastNameAndSet(e){
        const inputLn = e.target.value;
        const lName = inputLn.trim();
        const lNameRegex = /^[a-zA-Z ]+$/;

        if(lNameRegex.test(lName)){
            setValidLastName(true);
            setLastName(lName);
        } else {
            setValidLastName(false);
        }
    }

    function validateEmailAndSet(e) {
        const inputEmail = e.target.value;
        
        const email = inputEmail.trim();
        // email is an email
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (emailRegex.test(email)) {
            setValidEmail(true);
            setEmail(email);
        }
        else {
            setValidEmail(false);
        }
    }

    function validatePasswordAndSet(e) {
        const pwd = e.target.value;
        const pwdRegex = /^.{8,}$/;

        if (pwdRegex.test(pwd)) {
            setValidPassword(true);
            setPassword(pwd);
        }
        else {
            setValidPassword(false);
        }
    }

    function validateConfirmPassword(e){
        const confirmedPwd = e.target.value;
        if(confirmedPwd.match(password)){
            setPasswordMatch(true);
        }
        else{
            setPasswordMatch(false);
        }
    }

    async function handleSubmit(e){
        e.preventDefault();

        reqCancelRef.current?.abort();
        reqCancelRef.current = new AbortController();

        const server_url = process.env.REACT_APP_SERVER_URL || "http://localhost";
        const server_port = process.env.REACT_APP_SERVER_PORT || "8080";
        const signup_endpoint = process.env.REACT_APP_SIGNUP_ENDPOINT || "api/auth/signup";

        if(firstName !== '' && lastName !== '' && email !== '' && password !== '' 
            && validFirstName && validLastName && validEmail && validPassword && passwordMatch){

            const url = `${server_url}:${server_port}/${signup_endpoint}`;
            const data = {
                firstName: firstName, 
                lastName: lastName, 
                email: email, 
                password: password, 
                role: toggleValue
            };

            const response = await axios.post(url, data, {signal: reqCancelRef.current?.signal})
                    .then((response) => response) 
                    .catch((err) => {
                        if(axios.isCancel(err)){
                            return err;
                        }
                        if(axios.isAxiosError(err)){
                            return err.response;
                        }
                        return err;
                    });

            if(axios.isCancel(response)){
                console.log("Sign up request aborted");
                return;
            }

            if(response.status === 201 && response.data?.token && response.data?.data?.user?.role){
                console.log('User created successfully');
                const token =  response.data.token;
                const role = response.data.data.user.role;

                setAuthData(token, role);
                // forcing user to sign in to reinforce login credentials
                navigate('/signin', {replace: true});
            }
            else if(response.status === 401){
                alert("User already exists");
            }
            else{
                alert("Error creating user, please try again later.")
            }
            window.location.reload();
        }
        else{
            alert("Invalid field(s), please enter valid values.");
            window.location.reload();
        }
    }

    function handleToggle(){
        setToggleValue(prevValue => prevValue === 'user' ? 'restaurant owner' : 'user');
    }


    return (
        <div className='signup-page'>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-md-6'>
                        <div className='card signup-card glass'>
                        <div className="tab-content">
                            <h2 style={{color: "#333333"}}>Sign Up</h2>
                            <form>
                                <div className='form-group m-1'>
                                    <label>First Name</label>
                                    <input type='text' ref={firstNameRef} className='form-control' placeholder='Enter first name' onInput={validateFirstNameAndSet}/>
                                    {validFirstName ? null : <small style={{color: 'red'}}>Please enter a valid first name</small>}
                                </div>
                                <div className='form-group m-1'>
                                    <label>Last Name</label>
                                    <input type='text' className='form-control' placeholder='Enter last name' onInput={validateLastNameAndSet}/>
                                    {validLastName ? null : <small style={{color: 'red'}}>Please enter a valid last name</small>}
                                </div>
                                <div className='form-group m-1'>
                                    <label>Email</label>
                                    <input type='text' className='form-control' placeholder='Enter email' onInput={validateEmailAndSet}/>
                                    {validEmail ? null : <small style={{color: 'red'}}>Please enter a valid email</small>}
                                </div>
                                <div className='form-group m-1'>
                                    <label>Password</label>
                                    <input type='password' className='form-control' placeholder='Enter password' onInput={validatePasswordAndSet}/>
                                    {validPassword ? null : <small style={{color: 'red'}}>Passwords must be minimum 8 characters</small>}
                                </div>
                                <div className='form-group m-1'>
                                    <label>Confirm password</label>
                                    <input type='password' className='form-control' placeholder='Confirm password' onInput={validateConfirmPassword}/>
                                    {passwordMatch ? null : <small style={{color: 'red'}}>Passwords do not match</small>}
                                </div>

                                <div className='toggle-container'>
                                    <span className='toggle-value'>User</span>
                                    <label className='switch'>
                                        <input type='checkbox' onChange={handleToggle} />
                                        <span className='slider round' />
                                    </label>
                                    <span className='toggle-value'>Restaurant owner</span>
                                </div>
                                <button type='submit' className='btn btn-primary m-1' onClick={handleSubmit} >Submit</button>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;