import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import './AppHeader.css';

const AppHeader = () => {
  return (
    <Navbar bg='light' expand='lg'>
      <Container className='navbar-container'>
        <Link to='/' className='navbar-brand' >
          Sparks Bank
        </Link>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <NavLink to='/' className='nav-link' activeClassName='active'>
              Home
            </NavLink>
            <NavLink
              to='/viewcustomer'
              className='nav-link'
              activeClassName='active'
            >
              Customers
            </NavLink>
            <NavLink
              to='/transfer'
              className='nav-link'
              activeClassName='active'
            >
              Money Transfer
            </NavLink>
            <NavLink
              to='/alltransfer'
              className='nav-link'
              activeClassName='active'
            >
              Transactions
            </NavLink>
            <NavLink to='/about' className='nav-link' activeClassName='active'>
              About
            </NavLink>
          </Nav>
          <Nav>
            <NavDropdown title='More' id='basic-nav-dropdown'>
              <NavDropdown.Item href='#action/3.1'>Customers</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='#action/3.2'>
                Money Transfer
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppHeader;

