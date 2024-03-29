import React, {useState, useRef} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'

function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [validNewPassword, setValidNewPassword] = useState(true);
    const [passwordMatched, setPasswordMatched] = useState(true);

    const reqCancelRef = useRef(null);
    const navigate = useNavigate();

    const {token} = useParams();

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
        console.log(`token: ${token}`);

        reqCancelRef.current?.abort();
        reqCancelRef.current = new AbortController();

        if(pwd !== '' && validNewPassword && passwordMatched){
            console.log(`reference token: ${token}`);
            
            // todo: update url
            const url = `http://localhost:8080/api/auth/resetPassword/${token}`;
            const data = {password: pwd};
            const response = await axios.patch(url, data, {signal: reqCancelRef.current?.signal})
                    .then((response) => response.response)
                    .catch((err) => {
                        if(axios.isCancel(err)){
                            return err;
                        }
                        if(axios.isAxiosError(err)){
                            return err.response;
                        }
                        return err;
                    });
            
            console.log(response);
            if(axios.isCancel(reqCancelRef)){
                console.log('Reset password request aborted');
                return;
            }

            if(response.status === 200){
                alert('Password reset successful');
                navigate('/signin', {replace: true});
                return;
            } else if(response.status === 400){
                alert('Invalid token or expired token, please try again!');
                navigate('/forgot-password');
            } else{
                alert('Please try again after sometime');
            }
        }
        else{
            alert('Please enter valid password');
            window.location.reload();
        }
    }

    return (
        <div className='reset-password-page'>
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