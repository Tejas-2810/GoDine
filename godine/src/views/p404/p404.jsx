import React from "react";
import './p404.css';
import img from '../../images/404.png';

const p404 = () => {    
    return (
        <div className="text-center pclass">
            <img className="img404" src={img}alt="fsfasd" />
            <h1 className="">Page Not Found !</h1>
        </div>
    );
};

export default p404;