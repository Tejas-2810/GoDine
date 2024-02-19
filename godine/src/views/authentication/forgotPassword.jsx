import React, {useState} from 'react'
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
            const url = `http://localhost:8080/api/auth/forgotPassword`;
            const data = {email: em};
            const response = await axios.post(url, data)
                    .then((response) => {return response;})
                    .catch((err) => {return err.response;});
            
            console.log(response);
            if(response.status === 200 || response.data.status === "success"){
                alert('Password reset link sent to your email');
            }
            else if(response.status === 404){
                console.log("user not found");
                alert('User not found');
                window.location.reload();
            } else{
                console.log("internal server error");
                alert('Please try again after sometime');
            }
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