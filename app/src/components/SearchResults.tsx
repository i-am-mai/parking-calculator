import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
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
    const handleClick = (
        event: React.MouseEvent<HTMLLIElement, MouseEvent>,
        index: number,
      ) => {
        let bbox: LatLngBounds = new LatLngBounds(new LatLng(0, 0), new LatLng(0, 0));

        if (results != null && index != null) {
            bbox = new LatLngBounds(new LatLng(Number(results[index]["boundingbox"][0]), Number(results[index]["boundingbox"][2])), new LatLng(Number(results[index]["boundingbox"][1]), Number(results[index]["boundingbox"][3])));
        }
        onClick(bbox);
    }

    const searchResults: JSX.Element[] = [];
    if (results != null) {
        results.forEach((result, index) => {
            searchResults.push(
                <ListItem disablePadding divider key={index} data-key={index} onClick={event => handleClick(event, index)}>
                    <ListItemButton>
                        <ListItemText>{result['display_name']}</ListItemText>
                    </ListItemButton>
                </ListItem>
            );
        });
    }

    if (searchResults.length === 0) {
        return null;
    }
    else {
        return (
            <List className="results">
                {searchResults}
            </List>
        );
    }
}