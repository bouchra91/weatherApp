import { AsyncPaginate } from "react-select-async-paginate";
import React, { useState } from "react";
import { goaApiOptions, GEO_API_URL } from "../../api.js";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);
  const cache = {}; // Cache en mémoire

  const handleOnChange = (newValue) => {
    setSearch(newValue);
    onSearchChange(newValue);
  };

  const loadOptions = async (inputValue) => {
    // Retourne les résultats depuis le cache s’ils existent déjà
    if (cache[inputValue]) {
      return cache[inputValue];
    }

    try {
      const response = await fetch(
        `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
        goaApiOptions
      );

      // Gestion du quota dépassé (code HTTP 429)
      if (response.status === 429) {
        console.warn("Trop de requêtes envoyées. Essaie d'attendre un peu.");
        return { options: [] };
      }

      const data = await response.json();
      console.log(data);
      // Protection contre undefined
      const cities = Array.isArray(data?.data) ? data.data : [];

      const result = {
        options: cities.map((city) => ({
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        })),
      };

      cache[inputValue] = result; // Met en cache le résultat
      return result;
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
      return { options: [] };
    }
  };

  return (
    <div className="search">
      <AsyncPaginate
        placeholder="Search for a city..."
        debounceTimeout={1000} // Réduit la fréquence des requêtes API
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
        className="search-input"
      />
    </div>
  );
};

export default Search;
