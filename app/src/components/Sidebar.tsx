import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import SearchResults from './SearchResults';
import "./Sidebar.css"

type SidebarProps = {
    setBoundingBox: (bbox: [[number, number], [number, number]]) => void;
}

export default function Sidebar({setBoundingBox}: SidebarProps) {
    const [data, setData] = useState([]);
    const [spinner, setSpinner] = useState(false);


    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSpinner(true);
        let query = (event.target as HTMLFormElement).search.value;
        console.log(query);

        fetch("/search?q=" + query)
            .then(res => res.json())
            .then(data => setData(data))
            .then(() => setSpinner(false));
    }

    let results;

    if (spinner) {
        results = <Spinner animation="border" id="spinner"></Spinner>
    }
    else {
        results = <SearchResults results={data} onClick={setBoundingBox}/>
    }

    return (
        <div className="sidebar">
            <form onSubmit={handleSubmit} className="input">
                <Form.Control name="search" placeholder="ex. New York, NY"></Form.Control>
                <Button variant="secondary" type="submit">Search</Button>    
            </form>
            {results}
            <Button variant="primary" className="calculate">Calculate parking area</Button>
        </div>
    );
}

