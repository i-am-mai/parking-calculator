import Map from '../components/Map';
import Sidebar from '../components/Sidebar';
import './Home.css';

export default function Home() {
    return (
        <div className="content">
            <Sidebar/>
            <Map/>
        </div>
    );
}