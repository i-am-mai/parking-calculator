import { MapContainer, TileLayer} from 'react-leaflet'
import "./Map.css"

export default function Map() {
    return (
        <MapContainer center={[20, 0]} zoom={3} scrollWheelZoom={true} className="map">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    );
}