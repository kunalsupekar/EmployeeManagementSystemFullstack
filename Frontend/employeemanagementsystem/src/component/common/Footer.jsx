import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';

const Footer = () => {
  return (
    <Navbar bg="dark" variant="dark" fixed="bottom">
      <Nav className="mx-auto">
        <Nav.Link href="#privacy">Privacy Policy</Nav.Link>
        <Nav.Link href="#terms">Terms of Service</Nav.Link>
        <Nav.Link href="#contact">Contact Us</Nav.Link>
      </Nav>
      <Navbar.Text className="text-light">
        &copy; {new Date().getFullYear()} My App. All rights reserved.
      </Navbar.Text>
    </Navbar>
  );
};

export default Footer;