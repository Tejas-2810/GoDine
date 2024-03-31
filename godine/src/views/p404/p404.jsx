import React from "react";
import './p404.css';
import img from '../../images/404.png';
import { useNavigate } from 'react-router-dom'; 

const P404 = () => {   
    const navigate = useNavigate();

    return (
          <div className='pclass text-center d-flex flex-column align-items-center'>
                        <img className="img404" src={img}alt="404 page" />
                        <button className='btn btn-primary' onClick={() => {navigate("/", {replace: true})}}>
                            Go to home page
                        </button>

          </div>
    );
};
export default P404;