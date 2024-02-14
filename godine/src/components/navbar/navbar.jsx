import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../images/logo.png';
import './navbar.css';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const Navb = () => {
    const navigate = useNavigate();
    const redirect = () => {
        navigate('/profile');
    }
    const moves = () => {
        navigate('/wishlist');
    }
    return (
        <Navbar bg="transparent" variant="dark" expand="lg">
            <Navbar.Brand href="/">
                <img className="mx-3" src={logo} alt="Logo" height={50}/>
               GoDine
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className='justify-content-end' id="basic-navbar-nav ">
                <Nav className="m-4 h6 text-center ">
                    <Nav.Link href="/" className="text-dark tw">Home</Nav.Link>
                    <Nav.Link className="text-dark tw">About</Nav.Link>
                    <Nav.Link onClick={redirect} className="text-dark tw">Profile</Nav.Link>
                    <Nav.Link className="text-dark tw" >Contact</Nav.Link>
                    <Nav.Link onClick={moves} className="text-dark tw">WishList</Nav.Link>
                </Nav>



            </Navbar.Collapse>
        </Navbar>
        
    );
}

export default Navb;
