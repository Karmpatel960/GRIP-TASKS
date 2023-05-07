import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import './AppHeader.css';

function AppHeader() {
  return (
    <Navbar className="navbar-custom" expand="md">
      <Navbar.Brand href="/">Spark Bank</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/view-all">View All</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/contact">Contact</Nav.Link>
        </Nav>
        <Nav>
          <Button variant="primary" href="/login">Login</Button>
          <Button variant="outline-primary" href="/register">Register</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default AppHeader;
