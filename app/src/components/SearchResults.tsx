import ListGroup from "react-bootstrap/ListGroup";
import './SearchResults.css'
import { LatLngBounds, LatLng } from 'leaflet';


type SearchResultsProps = {
    results: {
        "boundingbox": string[],
        "display_name": string,
    }[] | null;
    onClick: (bbox: LatLngBounds) => void;
}


export default function SearchResults({ results, onClick }: SearchResultsProps) {
    function handleClick(event: React.MouseEvent) {
        const index: number = Number((event.target as HTMLAnchorElement).getAttribute('data-key'));
        let bbox: LatLngBounds = new LatLngBounds(new LatLng(0, 0), new LatLng(0, 0));

        if (results != null && index != null) {
            bbox = new LatLngBounds(new LatLng(Number(results[index]["boundingbox"][0]), Number(results[index]["boundingbox"][2])), new LatLng(Number(results[index]["boundingbox"][1]), Number(results[index]["boundingbox"][3])));
            console.log(bbox);
        }
        onClick(bbox);
        console.log(bbox);
    }

    const searchResults: JSX.Element[] = [];
    if (results != null) {
        results.forEach((result, index) => {
            searchResults.push(
                <ListGroup.Item action key={index} data-key={index} onClick={handleClick}>
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