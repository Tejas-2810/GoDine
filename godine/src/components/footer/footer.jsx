import React from 'react';
import { Container, Row, Nav, Navbar } from 'react-bootstrap';
import logo from '../../images/logo.png';
import './footer.css';

const Footer = () =>{
    return (
      <footer className="bg-dark text-white">
      <Container className='mt-2 p-4'>
          <Row>
          <div class="py-5 d-md-flex justify-content-around">
  <img className="logo" src={logo} alt="logo"/ >
  <ul class="ul">
    <p>Features</p>
    <li class="li">Our Features</li>
    <li class="li">Pricing</li>
    <li class="li">Affiliate Program</li>
    <li class="li">Press Kit</li>
  </ul>
  <ul class="ul">
    <p>Support</p>
    <li class="li">Account</li>
    <li class="li">Help</li>
    <li class="li">Contact us</li>
  </ul>
  <ul class="ul">
    <p>Legal</p>
    <li class="li">Privacy Policy</li>
    <li class="li">Terms of Use</li>
  </ul>
  <ul class="ul">
    <p>Social Media</p>
    <li class="li">Twitter</li>
    <li class="li">Product Hunt</li>
    <li class="li">Instagram</li>
    <li class="li">Github</li>
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
