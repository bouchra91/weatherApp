
import './App.css';
import CurrentWeather from './components/current-weather/current-wether';
import Search from './components/search/search';
import React, { useState } from "react";
function App() {
  const [searchDataI, setSearchDataI] = useState(null);

  const handleSearchChange = (searchData) => {
    console.log("Search Data:", searchData.label.slice(0, -4));
    setSearchDataI(searchData.label.slice(0, -4)); // Extrait le nom de la ville
  };
  return (
    <div className="container">
      <Search onSearchChange={handleSearchChange} />
      <CurrentWeather city={searchDataI || "Paris"} />
    </div>
  );
}

export default App;
