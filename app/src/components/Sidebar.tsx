import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import SearchResults from './SearchResults';
import "./Sidebar.css"

export default function Sidebar() {
    const [data, setData] = useState([]);

    function handleSubmit(event : React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let query = (event.target as HTMLFormElement).search.value;
        console.log(query);

        fetch("/search?q=" + query)
            .then(res => res.json())
            .then(data => setData(data));
    }

    return (
        <div className="sidebar">
            <form onSubmit={handleSubmit} className="input">
                <Form.Control name="search" placeholder="ex. New York, NY"></Form.Control>
                <Button variant="secondary">Search</Button>    
            </form>
            <SearchResults results={data} />
            <Button variant="primary" className="calculate">Calculate parking area</Button>
        </div>
    );
}

