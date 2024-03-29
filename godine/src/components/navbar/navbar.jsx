import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../images/logo.png';
import './navbar.css';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const Navb = () => {
    const navigate = useNavigate();
    const redirect = (pid) => {
       switch (pid) {
           case '1':
               navigate('/profile');
               break;
           case '2':
               navigate('/wishlist');
               break;
            case '3':
                navigate('/reserve');
                break;    
            case '4':
                navigate('/contact');
                break;    
            case '5':
                navigate('/faq');
                break;
            case '6':
                navigate('/history');
                break;
            case '7':
                navigate('/dashboard');
                break;
           default:
               navigate('/');
               break;
       }
    }
    return (
        <Navbar className='navbar' bg="transparent" variant="dark" expand="lg">
            <Navbar.Brand href="/">
                <img className="mx-3" src={logo} alt="Logo" height={50}/>
               GoDine
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className='justify-content-end' id="basic-navbar-nav ">
                <Nav className="m-4 h6 text-center ">
                    <Nav.Link onClick={() => redirect()} className="tw">Home</Nav.Link>
                    <Nav.Link onClick={() => redirect('3')} className="tw">Reserve</Nav.Link>
                    <Nav.Link onClick={() => redirect('1')} className="tw">Profile</Nav.Link>
                    <Nav.Link onClick={() => redirect('4')} className="tw" >Contact</Nav.Link>
                    <Nav.Link onClick={() => redirect('2')} className="tw">WishList</Nav.Link>
                    <Nav.Link onClick={() => redirect('7')} className="tw">Dashboard</Nav.Link>
                    <Nav.Link onClick={() => redirect('6')} className="tw">My Bookings</Nav.Link>
                    <Nav.Link onClick={() => redirect('5')} className="tw">FAQ</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Navb;
