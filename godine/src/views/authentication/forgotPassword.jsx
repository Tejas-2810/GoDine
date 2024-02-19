import React, {useState} from 'react'
import logo from '../../images/logo.png'
import {Navbar} from "react-bootstrap"
import './common.css'
import axios from 'axios';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(true);

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

        if(em !== '' && validEmail){
            // hit server api
            // const response = await axios.post('url', {email: em})
            // .then((response) => {console.log(response); return response.data;})
            // .catch(err => {
            //     console.log(err);
            // });
            alert('Password reset link sent to your email!');
        }
    }

    return (
        <div className='forgot-password-page'>
            <Navbar className='navbar' bg="transparent" variant="dark" expand="lg">
                <Navbar.Brand href="/forgot-password">
                    <img className="mx-3" src={logo} alt="Logo" height={50}/>
                GoDine
                </Navbar.Brand>
            </Navbar>

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