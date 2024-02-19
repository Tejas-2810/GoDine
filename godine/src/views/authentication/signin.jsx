import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import './common.css'
import axios from 'axios';

function Signin() {
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(true);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(true);

    function validateEmailAndSet(e) {
        const email = e.target.value;
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

    async function handleSubmit(e){
        e.preventDefault();

        const userEmail = email;
        const pwd = password;

        // send the email and password to the server
        if(userEmail !== '' && pwd !== '' && validEmail && validPassword){
            // todo: set url for server
            const url = `http://localhost:8080/api/auth/signin`;            
            const data = {email: userEmail,password: pwd};

            const response = await axios.post(url,data)
            .then((response) => {console.log(response);return response;})
            .catch((err) => {console.log(err); return err.response;});
            
            console.log(response.data);

            // todo: consume the auth token and role
            if(response.status === 200 && response.data.token){
                console.log('Login successful! with 200 ', response.data.token);;
            }
            else if(response.status === 401){
                alert(response.data.message);
            }
            else if(response.status === 500){
                alert('Internal server error!');
                console.log("Response: ",response.data.message);
            }
            else{
                alert('Please again later!');
                console.log("Response: ",response.data.message);
            }
            
        }
        else{
            alert('Invalid email or password');
            window.location.reload();
        }
    }

    return (
        <div className='signin-page'>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-sm-6'>
                        <div className='card signin-card glass'>
                            <h1 style={{color: "#333333"}}>Log In</h1>
                            <form>
                                <div className='form-group m-1'>
                                    <label>Email</label>
                                    <input type='text' className='form-control' placeholder='Enter email' onInput={validateEmailAndSet}/>
                                    {validEmail ? null : <small style={{color: 'red'}}>Please enter a valid email</small>}
                                </div>
                                <div className='form-group m-1'>
                                    <label>Password</label>
                                    <input type='password' className='form-control' placeholder='Enter password' onInput={validatePasswordAndSet}/>
                                    {validPassword ? null : <small style={{color: 'red'}}>Min. 8 characters</small>}
                                </div>

                                <Link to="/forgot-password" style={{display: "block"}} >Forgot Password?</Link>
                                <Link to="/signup" style={{display: "block"}}>Don't have an account? Create one now</Link>

                                <button type='submit' className='btn btn-primary m-1' onClick={handleSubmit} >Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signin;