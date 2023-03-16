import ListGroup from "react-bootstrap/ListGroup";
import './SearchResults.css'

type AppProps = {
    results: {
        "boundingbox": string[],
        "display_name": string,
    }[] | null;
}


export default function SearchResults({ results }: AppProps) {
    const searchResults: JSX.Element[] = [];
    if (results != null) {
        results.forEach((result, index) => {
            searchResults.push(
                <ListGroup.Item action key={index}>
                    {result['display_name']}
                </ListGroup.Item>
            );
        });
    }

    if (searchResults.length === 0) {
        return null;
    }
    else {
        return (
            <ListGroup className="results">
                {searchResults}
            </ListGroup>
        );
    }
}