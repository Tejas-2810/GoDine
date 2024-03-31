import React from 'react'
import {useNavigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './common.css'
import img from '../../images/unauthorized.png'
export default function Unauthorized() {
    const navigate = useNavigate();

    return (
          <div className='pclass text-center d-flex flex-column align-items-center'>
                        <img className="img404" src={img}alt="unauthorized" />
                        <p className='h2'>Unauthorized Access!</p>
                        <button className='btn btn-primary' onClick={() => {navigate("/", {replace: true})}}>
                            Go to home page
                        </button>

          </div>
    );
};