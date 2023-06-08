import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AppHeader.css';

const AppHeader = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container className="navbar-container">
        <Link to="/" className="navbar-brand">
          Spark Fund
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link" activeClassName="active">
              Home
            </NavLink>
          </Nav>
          <Nav>
            <NavDropdown title="More" id="basic-nav-dropdown">
              <NavDropdown.Item href="/donate">Donate</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/about">
                About Us
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppHeader;



