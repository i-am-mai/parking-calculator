import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import SearchResults from './SearchResults';
import "./Sidebar.css"

function handleSubmit(event : React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
}

export default function Sidebar() {
    const [input, setInput] = useState('');

    return (
        <div className="sidebar">
            <Form>
                <Form.Group onSubmit={handleSubmit}>
                    <Form.Label>Enter a location:</Form.Label>
                    <div className="input">
                        <Form.Control type="search" placeholder="ex. New York, NY"></Form.Control>
                        <Button variant="secondary">Search</Button>
                    </div>  
                </Form.Group>
                <SearchResults results={data} />
            </Form>
            <Button variant="primary" className="calculate">Calculate parking area</Button>
        </div>
    );
}

const data = [{"place_id":297985968,"licence":"Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright","osm_type":"relation","osm_id":119016,"boundingbox":["30.3955428","30.5104858","-87.2588885","-87.1497213"],"lat":"30.421309","lon":"-87.2169149","display_name":"Pensacola, Escambia County, Florida, United States","place_rank":16,"category":"boundary","type":"administrative","importance":0.6520252296498928,"icon":"https://nominatim.openstreetmap.org/ui/mapicons/poi_boundary_administrative.p.20.png"},{"place_id":298052344,"licence":"Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright","osm_type":"relation","osm_id":184944,"boundingbox":["36.45232","36.459547","-95.133969","-95.126455"],"lat":"36.455841","lon":"-95.1290314384069","display_name":"Pensacola, Mayes County, Oklahoma, United States","place_rank":16,"category":"boundary","type":"administrative","importance":0.4651260992910078,"icon":"https://nominatim.openstreetmap.org/ui/mapicons/poi_boundary_administrative.p.20.png"},{"place_id":351299,"licence":"Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright","osm_type":"node","osm_id":151697501,"boundingbox":["36.435087","36.475087","-95.1505207","-95.1105207"],"lat":"36.455087","lon":"-95.1305207","display_name":"Pensacola, Mayes County, Oklahoma, 74367, United States","place_rank":20,"category":"place","type":"hamlet","importance":0.35,"icon":"https://nominatim.openstreetmap.org/ui/mapicons/poi_place_village.p.20.png"},{"place_id":422205,"licence":"Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright","osm_type":"node","osm_id":154401812,"boundingbox":["35.8278923","35.8678923","-82.3281814","-82.2881814"],"lat":"35.8478923","lon":"-82.3081814","display_name":"Pensacola, Yancey County, North Carolina, United States","place_rank":20,"category":"place","type":"hamlet","importance":0.35,"icon":"https://nominatim.openstreetmap.org/ui/mapicons/poi_place_village.p.20.png"},{"place_id":76254346,"licence":"Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright","osm_type":"node","osm_id":7180238735,"boundingbox":["30.4147011","30.4247011","-87.2023566","-87.1923566"],"lat":"30.4197011","lon":"-87.1973566","display_name":"Pensacola, 980, East Heinberg Street, Pensacola, Escambia County, Florida, 32502, United States","place_rank":30,"category":"railway","type":"station","importance":0.10010000000000001,"icon":"https://nominatim.openstreetmap.org/ui/mapicons/transport_train_station2.p.20.png"},{"place_id":79510553,"licence":"Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright","osm_type":"node","osm_id":7695925667,"boundingbox":["30.4207242","30.4208242","-87.2218484","-87.2217484"],"lat":"30.4207742","lon":"-87.2217984","display_name":"Gulf Coast Real Estate Management, 316 W Cervantes St suite a-2, Pensacola, FL 32501, West Cervantes Street, North Hill, Pensacola, Escambia County, Florida, 32501, United States","place_rank":30,"category":"office","type":"estate_agent","importance":0.10010000000000001},{"place_id":288347702,"licence":"Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright","osm_type":"way","osm_id":1001137101,"boundingbox":["30.4626842","30.4641949","-87.3397379","-87.3376603"],"lat":"30.463441600000003","lon":"-87.33869902339768","display_name":"Federal Prison Camp, Pensacola, 110, Raby Avenue, Pensacola, Escambia County, Florida, 32509, United States","place_rank":30,"category":"amenity","type":"prison","importance":0.10010000000000001,"icon":"https://nominatim.openstreetmap.org/ui/mapicons/amenity_prison.p.20.png"},{"place_id":43103721,"licence":"Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright","osm_type":"node","osm_id":3527087483,"boundingbox":["59.8754117","59.8755117","30.3114602","30.3115602"],"lat":"59.8754617","lon":"30.3115102","display_name":"Pensacola, 33, Благодатная улица, округ Новоизмайловское, Санкт-Петербург, Северо-Западный федеральный округ, 196128, Россия","place_rank":30,"category":"amenity","type":"fast_food","importance":0.10010000000000001,"icon":"https://nominatim.openstreetmap.org/ui/mapicons/food_fastfood.p.20.png"}];
const empty_data = null;