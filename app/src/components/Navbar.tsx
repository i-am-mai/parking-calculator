import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../logo.svg'
import './Navbar.css'


export default function renderNavbar() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="header">
            <Navbar.Brand href="/" id="brand">
                <img
                    alt=""
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
                Parking Calculator
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                <Nav>
                    <Nav.Link href="/about">About</Nav.Link>
                    <Nav.Link href="https://github.com/i-am-mai/parking">Contribute</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}