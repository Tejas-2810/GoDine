import React, {useState, useRef} from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';
import './common.css'
import axios from 'axios';

function Signin() {
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(true);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(true);
    const requestCancelRef = useRef(null);

    const { setAuthData } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

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
        const from = location.state;

        const server_url = process.env.SERVER_URL || "http://localhost";
        const server_port = process.env.SERVER_PORT || "8080";

        requestCancelRef.current?.abort();
        requestCancelRef.current = new AbortController();

        // send the email and password to the server
        if(userEmail !== '' && pwd !== '' && validEmail && validPassword){
            const url = `${server_url}:${server_port}/api/auth/signin`;
            const data = {email: userEmail, password: pwd};

            const response = await axios.post(url,data, {signal: requestCancelRef.current?.signal})
            .then((response) => response)
            .catch((err) => err);

            // when request is aborted
            if(axios.isCancel(response)){
                console.log("Signin Request Aborted");
                return;
            }

            if(response.status === 200 && response.data?.token && response.data?.role){
                const token = response.data.token;
                // todo: check the updated response
                const responseExpiryTime = response.data.JWTExpiryMin;
                // default expiry of 20 mins in milliseconds
                const defaultExpiryTime = 20*60*1000;
                const expiryTime = responseExpiryTime ? responseExpiryTime: defaultExpiryTime;
                const role = response.data.role;

                setAuthData(token, expiryTime, role);

                // navigate to respective webpages as per role
                if(role === 'user'){
                    navigate(from?.pathname ? from.pathname: '/', {replace: true});
                }
                else if(role === 'restaurant owner'){
                    // todo: redirect to restaurant owner dashboard
                    navigate('/', {replace: true});
                }
                else{
                    navigate('/', {replace: true});
                }

                return;
            }
            if(response.status === 401){
                alert(response.data.message);
            }
            if(response.status === 500){
                alert('Internal server error!');
            }
            else{
                alert('Please again later after sometime!');
            }
        }
        else{
            alert('Invalid email or password');
        }
    }

    return (
        <div className='signin-page'>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-sm-6'>
                        <div className='card signin-card glass'>
                            <h1 style={{color: "#333333"}}>Sign In</h1>
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