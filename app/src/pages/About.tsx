import Box from "@mui/material/Box/Box";
import './About.css';

export default function About() {
    // janky indentation so tabs are not added
    let code: string = 
`[out:json][timeout:25];
(
    way["amenity"="parking"]({{bbox}});
    relation["amenity"="parking"]({{bbox}});
    way["highway"]["parking:lane:both"]["parking:lane:both"!~"no"]({{bbox}});
    way["highway"]["parking:lane:right"]["parking:lane:right"!~"no"]({{bbox}});
    way["highway"]["parking:lane:left"]["parking:lane:left"!~"no"]({{bbox}});
);
out body;
>;
out skel qt;`;

    return (
        <>
            <Box className="box">
                <h1>About this website</h1>
                <p>
                    This website was inspired by photos like this of some U.S. city centers: 
                </p>

                <img src="./img/houston.webp" alt="Houston city center" />
                <p style={{margin: "0px", color:"#555566"}}>
                    <small>Downtown Houston, with parking lots outlined in red.</small>
                </p>

                <p>
                    It uses <a href="https://www.openstreetmap.org/">OpenStreetMap</a> and the 
                    <a href="https://overpass-turbo.eu/"> Overpass API</a> for the parking map data. Since
                    OpenStreetMap is community driven, there may be some discrepancies in the data (i.e. parking
                    lots not marked). If you see any, feel free to <a href="https://www.openstreetmap.org">contribute </a>
                    and add to OSM! 
                </p>
                <p>
                    The query that is used for each call to the Overpass API is the following:
                </p>
                <pre>
                {code}
                </pre>
                <p>
                    You can try it out at <a href="https://overpass-turbo.eu/">Overpass Turbo</a> to see how it works &mdash; it 
                    should output all areas with the "amenity=parking" tag as well as streets with parking lanes, but feel free 
                    to submit an <a href="https://github.com/i-am-mai/parking-calculator/issues">issue</a> if there's anything wrong.
                </p>
                <p>
                    Note: For street parking, since each street is represented as a line, I estimated the width to be 2.7 meters and calculated
                    the area from there.
                </p>
            </Box>
        </>
    );
}