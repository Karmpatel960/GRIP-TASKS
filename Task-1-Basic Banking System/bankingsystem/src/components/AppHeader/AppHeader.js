import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import './AppHeader.css';

const AppHeader = () => {
  return (

    <Navbar bg='light' expand='lg' style={{height: '80px'}}>
      <Container>
        <Link to='/' className='navbar-brand' style={{color: '#0d6efd'}}>
          Sparks Bank
        </Link>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <NavLink to='/' className='nav-link' activeStyle>
              Home
            </NavLink>
            <NavLink
              to='/viewcustomer'
              className='nav-link'
              activeStyle
            >
              Customers
            </NavLink>
            <NavLink
              to='/transfer'
              className='nav-link'
              activeStyle
            >
              Money Transfer
            </NavLink>
            <NavLink
              to='/alltransfer'
              className='nav-link'
              activeStyle
            >
              Transactions
            </NavLink>
            <NavLink to='/about' className='nav-link' activeStyle>
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
