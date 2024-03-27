import Navb from './nav';
import React from 'react';
import { Button } from 'react-bootstrap';


import './header.css';

const Header = () => {
    
    const redirect = () => {
        window.location.href = "/search";
    }
    const [location, setLocation] = React.useState("0");
    const handleLocation = (e) => {
        setLocation(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 

        if (location === "0") {
            alert("Please select a valid location");
        }else{
            redirect();
        } 
    };

    return (
        <div className='b1' >
            <Navb />
            <div className='container'>
                <div className=" m-5 p-5  ">
                    <form className='input-group bar container' onSubmit={handleSubmit}>
                        <Button type="submit" className='outline ' variant="warning" >Search</Button>
                        <input type="text" className='form-control form-controlh' placeholder="Search Restaurants or Food. . . . ." aria-label="Input group example" aria-describedby="basic-addon1" required />
                        <select className='form-select' aria-label="Select Cuisine" style={{ backgroundColor: 'rgba(0, 0, 0, 0.336)', backdropFilter: 'blur(20px)', color: 'white', borderRadius: '1rem' }} >
                            <option value="1">Any Cuisine</option>
                            <option value="2">Italian</option>
                            <option value="3">Mexican</option>
                            <option value="4">Chinese</option>
                            <option value="5">Indian</option>
                        </select>
                        <select className='form-select' aria-label="Select Location" style={{ backgroundColor: 'rgba(0, 0, 0, 0.336)', backdropFilter: 'blur(20px)', color: 'white', borderRadius: '1rem' }} required onChange={handleLocation}>
                            <option value="0">Select Location</option>
                            <option value="1">New York</option>
                            <option value="2">Los Angeles</option>
                            <option value="3">Chicago</option>
                            <option value="4">San Francisco</option>
                        </select>
                    </form>
                    <p className="h1 text-white text-center " style={{ fontSize: '3vw' }}>“One cannot think well, love well, sleep well, if one has not dined well.” </p>
                </div>
            </div>
        </div>
    );
}

export default Header;