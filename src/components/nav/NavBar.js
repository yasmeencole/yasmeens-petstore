import React from "react"
import "./NavBar.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'


export const NavBar = (props) => {
    return (
    <Navbar variant="dark" className="darkNavBar">
        <Navbar.Brand href="/">The Petstore</Navbar.Brand>
            <Nav className="mr-auto" >
                <Nav.Link className="nav__links" href="/animals">Animals</Nav.Link>
                <Nav.Link className="nav__links" href="/soldAnimals">Sold Animals</Nav.Link>
                <Nav.Link className="nav__links" href="/animalTable">Animal Table</Nav.Link>
            </Nav>
    </Navbar>
    )
}