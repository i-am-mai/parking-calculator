import './App.css';
import Map from './components/Map'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="main">
      <Navbar/>
      <div className="content">
        <Sidebar/>
        <Map/>
      </div>
    </div>
  );
}

export default App;
