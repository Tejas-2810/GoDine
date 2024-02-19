import React, {useState, useEffect} from 'react'
import logo from '../../images/logo.png'
import {Navbar} from "react-bootstrap"

function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [validNewPassword, setValidNewPassword] = useState(true);
    const [passwordMatched, setPasswordMatched] = useState(true);

    const [referenceToken, setReferenceToken] = useState('');

    useEffect(() => {
        const urlString = window.location.search;
        const urlParams = new URLSearchParams(urlString);

        const token = urlParams.get('token');;
        setReferenceToken(token);
    })

    function validatePasswordAndSet(e) {
        const pwd = e.target.value;
        const pwdRegex = /^.{8,}$/;

        if (pwdRegex.test(pwd)) {
            setValidNewPassword(true);
            setNewPassword(pwd);
        }
        else {
            setValidNewPassword(false);
        }
    }

    function validateConfirmPassword(e){
        const currPwd = e.target.value;
        const pwd = newPassword;
        if(currPwd.match(pwd)){
            setPasswordMatched(true);
        }
        else{
            setPasswordMatched(false);
        }
    }

    async function handleSubmit(e){
        e.preventDefault();

        const pwd = newPassword;

        if(pwd !== '' && validNewPassword && passwordMatched){
            alert('Password reset successful!');
            console.log(`reference token: ${referenceToken}`);
            // hit server api
            // const response = await fetch('https://express-t4.onrender.com/api/reset-password', {
            //     method: 'POST',
            //     headers: {},
            //     body: JSON.stringify({password: pwd})
            // })
            // .then((response) => {console.log(response); return response.data;})
            // .catch(err => {
            //     console.log(err);
            
        }
        else{
            alert('Please enter valid password');
        }
    }

    return (
        <div className='reset-password-page'>
            <Navbar className='navbar' bg="transparent" variant="dark" expand="lg">
                <Navbar.Brand href="/reset-password">
                    <img className="mx-3" src={logo} alt="Logo" height={50}/>
                GoDine
                </Navbar.Brand>
            </Navbar>

            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-sm-6'>
                        <div className='card reset-password-card glass'>
                            <h1 style={{color: "#333333"}}>Reset Password</h1>
                            <form>
                                <div className='form-group m-1'>
                                    <label>New password</label>
                                    <input type='password' className='form-control' placeholder='Enter password' onInput={validatePasswordAndSet}/>
                                    {validNewPassword? null: <small style={{color: 'red'}}>Password must be at least 8 characters long</small>}
                                </div>
                                <div className='form-group m-1'>
                                    <label>Confirm password</label>
                                    <input type='password' className='form-control' placeholder='Confirm password' onInput={validateConfirmPassword}/>
                                    {passwordMatched? null: <small style={{color: 'red'}}>Passwords do not match</small>}
                                </div>
                                <button type='submit' className='btn btn-primary m-1' onClick={handleSubmit} >Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword;