import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import Logo from '../static/logo.svg';
import Github from '../static/github.svg';
import './Navbar.css';


export default function renderNavbar() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="header">
            <Navbar.Brand href="/" id="brand">
                <img
                    alt=""
                    src={Logo}
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
                    <Nav.Link href="https://github.com/i-am-mai/parking">
                        <Image fluid={true} src={Github}/>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}