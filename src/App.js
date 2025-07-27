
import './App.css';
import CurrentWeather from './components/current-weather/current-wether';
import Search from './components/search/search';

function App() {

  const handleSearchChange = (searchData) => {
    console.log("Search Data:", searchData);}
  return (
    <div className="container">
     <Search onSearchChange={handleSearchChange} />
     <CurrentWeather />
    </div>
  );
}

export default App;
