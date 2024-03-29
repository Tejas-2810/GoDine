import React from 'react'
import {useNavigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './common.css'

export default function Unauthorized() {
    const navigate = useNavigate();

    return (
        <div className='unauthorized-page'>
            <div className='container'>
                <div className='row justifiy-content-center'>
                    <div className='col-md-6'>
                        <h1>Unauthorized access!!</h1>
                        <button onClick={() => {navigate("/", {replace: true})}}>
                            Go to home page
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};