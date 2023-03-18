import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import data from "../data.json";
import { Country } from "./components/Country";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  const handleFilter = (e) => {
    if (e.target.value.length === 0) {
      setCountries([]);
    }

    setFilter(e.target.value);
  };

  const clearFilter = () => {
    setFilter("");
    setCountries([]);
  };

  function sortCountries(data) {
    let sortedData = data.sort((a, b) => {
      const aName = a.name.common;
      const bName = b.name.common;
      return aName < bName ? -1 : aName > bName ? 1 : 0;
    });

    return sortedData;
  }

  useEffect(() => {
    if (filter) {
      axios.get("https://restcountries.com/v3.1/all").then((response) => {
        const sorted = sortCountries(response.data);
        setCountries(sorted);
      });
    }
  }, [filter]);

  const countriesToDisplay = filter
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
      )
    : countries;

  return (
    <div className="container">
      <h1>Countries of the World</h1>
      <input
        placeholder="Search for a country..."
        onChange={handleFilter}
        type="text"
        value={filter}
      />
      <button onClick={clearFilter}>Clear</button>
      {countriesToDisplay.length > 10 ? (
        <p>Too many results. Please narrow your search</p>
      ) : countriesToDisplay.length === 1 ? (
        <Country country={countriesToDisplay[0]} />
      ) : (
        countriesToDisplay.map((country) => (
          <div key={country.cca3} className="search">
            <p>{country.name.common}</p>{" "}
            <button onClick={() => setCountries([country])}>show</button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
