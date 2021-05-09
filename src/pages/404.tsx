import React from 'react'
import { Col, Container, Nav, Row } from 'react-bootstrap'
import logo from '../static/logo.png'

const NotFound = () => {

    return (
        <Row className="justify-content-md-center not-found-container">
            <img className="not-found-img" src={logo} alt="not found" />
            <h1>404 - Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <p>You can always go back to <Nav.Link href="/" className="d-inline p-0 m-0">homepage</Nav.Link>.</p>
        </Row>
            
    )
}

export default NotFound;