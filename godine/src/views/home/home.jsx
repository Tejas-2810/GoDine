import React from "react";
import './home.css';
import { Button } from 'react-bootstrap';

const Home = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // handle form submission logic here
    };

    const handleLocation = (e) => {
        // handle location change logic here
    };

    return (
        <div className="bg">
            <div className="container cb">

                <div className="  p-5  ">
                    <form className='input-group bar container' onSubmit={handleSubmit}>
                        <input type="text" className='form-control' placeholder="Search Restaurants or Food. . . . ." aria-label="Input group example" aria-describedby="basic-addon1" required />
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
                        <Button type="submit" className='outline ' variant="warning" >Search</Button>
                    </form>
                    <i className="container text-center">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum repudiandae eius rem dolores saepe? Nostrum cumque rerum sed iste, eos ut inventore modi, perferendis at excepturi dolorum sit explicabo iure!</i>
                </div>
            </div>
        </div>
    );
};

export default Home;