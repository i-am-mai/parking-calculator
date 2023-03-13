import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../logo.svg'
import './Navbar.css'


export default function renderNavbar() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="header">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        alt=""
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    Parking Calculator
                </Navbar.Brand>
                <Nav>
                    <Nav.Link href="/about" className="justify-content-end">About</Nav.Link>
                    <Nav.Link href="https://github.com/i-am-mai/parking">Contribute</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}