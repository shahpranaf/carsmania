import React from 'react'
import { Nav, Navbar, NavDropdown, Image } from 'react-bootstrap'
import logo from '../static/logo.png'

function Header() {
    return (
        <Navbar>
            <Navbar.Brand  className="col-4 col-lg-2" href="#home"><Image className="logo" src={logo} /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <Nav.Link href="#">Purchase</Nav.Link>
                    <Nav.Link href="#">My Orders</Nav.Link>                    
                    <Nav.Link href="#">Sell</Nav.Link>                    
                </Nav>               
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header