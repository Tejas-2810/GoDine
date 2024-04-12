import React from 'react';
import { Container, Row, Nav, Navbar } from 'react-bootstrap';
import logo from '../../images/logo.png';
import './footer.css';

const Footer = () =>{
    return (
      <footer className="bg-dark text-white">
      <Container className='mt-2 p-4'>
          <Row>
          <div className="py-5 d-md-flex justify-content-around">
  <img className="logo" src={logo} alt="logo"/ >
  <ul className="ul">
    <p>Features</p>
    <li className="li">Our Features</li>
    <li className="li">Pricing</li>
    <li className="li">Affiliate Program</li>
    <li className="li">Press Kit</li>
  </ul>
  <ul className="ul">
    <p>Support</p>
    <li className="li">Account</li>
    <li className="li">Help</li>
    <li className="li">Contact us</li>
  </ul>
  <ul className="ul">
    <p>Legal</p>
    <li className="li">Privacy Policy</li>
    <li className="li">Terms of Use</li>
  </ul>
  <ul className="ul">
    <p>Social Media</p>
    <li className="li">Twitter</li>
    <li className="li">Product Hunt</li>
    <li className="li">Instagram</li>
    <li className="li">Github</li>
  </ul>
</div>
          </Row>
          <hr />

          <p className="text-center">© {new Date().getFullYear()} Restaurant Reservation. All rights reserved.</p>
      </Container>
  </footer>
    );
}

export default Footer;
