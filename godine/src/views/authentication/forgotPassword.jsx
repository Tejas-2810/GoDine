import React, {useState, useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import './common.css'
import axios from 'axios';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(true);
    const reqCancelRef = useRef(null);

    const navigate = useNavigate();

    function validateEmailAndSet(e){
        const email = e.target.value;
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (emailRegex.test(email)) {
            setValidEmail(true);
            setEmail(email);
        }
        else {
            setValidEmail(false);
        }
    }

    // handle pending request
    async function handleSubmit(e){
        e.preventDefault();

        const em = email;
        const server_url = process.env.SERVER_URL || "http://localhost";
        const server_port = process.env.SERVER_PORT || "8080";

        reqCancelRef.current?.abort();
        reqCancelRef.current = new AbortController();

        if(em !== '' && validEmail){
            const url = `${server_url}:${server_port}/api/auth/forgotPassword`;
            const data = {email: em};
            const response = await axios.post(url, data, {signal: reqCancelRef.current?.signal})
                    .then((response) => response.response)
                    .catch((err) => err.response);

            // in case request is aborted
            if(axios.isCancel(response)){
                console.log('Forgot password aborted');
                return;
            }

            if(response.status === 404 || response.status === 200 || response.data.status === "success"){
                alert('Password reset link may be sent to the email provided');
            }
            else{
                alert('Please try again after sometime');
            }
            navigate('/signin', {replace: true});
        } else{
            alert('Please enter valid email');
            window.location.reload();
        }
    }

    return (
        <div className='forgot-password-page'>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-sm-6'>
                        <div className='card forgot-password-card glass'>
                            <h1 style={{color: "#333333"}}>Forgot Password</h1>
                            <form>
                                <div className='form-group m-1'>
                                    <label>Enter email</label>
                                    <input type='text' className='form-control' onInput={validateEmailAndSet}/>
                                    {validEmail ? null : <small style={{color: 'red'}}>Please enter valid email</small>}
                                </div>
                                <button type='submit' className='btn btn-primary m-1' onClick={handleSubmit} >Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;