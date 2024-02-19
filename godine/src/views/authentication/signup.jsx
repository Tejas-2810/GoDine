import React, {useState} from 'react'
import './common.css'
import axios from 'axios';

function Signup() {
    const [firstName, setFirstName] = useState('');
    const [validFirstName, setValidFirstName] = useState(true);

    const [lastName, setLastName] = useState('');
    const [validLastName, setValidLastName] = useState(true);

    // check if user name is already present
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(true);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(true);
    const [passwordMatch, setPasswordMatch] = useState(true);

    const [toggleValue, setToggleValue] = useState('user');

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

        if(firstName !== '' && lastName !== '' && email !== '' && password !== '' 
            && validFirstName && validLastName && validEmail && validPassword && passwordMatch){
            // todo: add it in env
            const url = `http://localhost:8080/api/auth/signup`;
            const data = {firstName: firstName, lastName: lastName, email: email, password: password, role: toggleValue};

            const response = await axios.post(url, data)
                    .then((response) => {console.log(response); return response;}) 
                    .catch((err) => {console.log(err); return err.response;});
            
            // ! remove this
            console.log(response);

            if(response.status === 201){
                console.log('User created successfully');
                alert('User created successfully');
            }
            else if(response.status === 401){
                console.log("User already exists");
                alert(response.data.message);
            }
            else{
                console.log('Error creating user');
                alert("Error creating user, please try again later.")
            }
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
                                    <input type='text' className='form-control' placeholder='Enter first name' onInput={validateFirstNameAndSet}/>
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

                                {/* //todo: toggle button to add role, user or manager */}
                                <div className='toggle-container'>
                                    <label className='switch'>
                                        <input type='checkbox' onChange={handleToggle} />
                                        <span className='slider round' />
                                    </label>
                                    <span className='toggle-value'>{toggleValue}</span>
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