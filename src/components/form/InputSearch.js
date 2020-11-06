import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { SearchContext } from "../../customContext/SearchContextWrapper";
import ByCountryCity from "./ByCountryCity";
import ByLatLong from "./ByLatLong";

function InputSearch({ duration }) {
  const { city, country, coord, searchType } = useContext(SearchContext);

  return (
    <div id="search-forecast-container">
      <h3>Search by</h3>
      <Link
        className={`btn ${searchType === "city" ? "activeBtn" : ""}`}
        to={`/forecast/${duration}/city?countryCode=${country[0]}&countryName=${country[1]}&cityName=${city}`}
      >
        City
      </Link>
      <Link
        className={`btn ${searchType === "geo" ? "activeBtn" : ""}`}
        to={`/forecast/${duration}/geo?lat=${coord.lat}&lng=${coord.lng}`}
      >
        Geolocation
      </Link>
      {searchType === "geo" && (
        <form>
          <ByLatLong />
        </form>
      )}
      {searchType === "city" && (
        <form>
          <ByCountryCity />
        </form>
      )}
    </div>
  );
}

export default InputSearch;
