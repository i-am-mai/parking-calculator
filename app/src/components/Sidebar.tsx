import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./Sidebar.css"

export default function Sidebar() {
    return (
        <Form className="sidebar">
            <Form.Group>
                <Form.Label>Enter a location:</Form.Label>
                <div className="input">
                    <Form.Control type="search" placeholder="ex. New York, NY"></Form.Control>
                    <Button variant="primary" type="submit">Search</Button>
                </div>  
            </Form.Group>
        </Form>
    );
}