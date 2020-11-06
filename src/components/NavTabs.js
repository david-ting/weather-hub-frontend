import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { SearchContext } from "../customContext/SearchContextWrapper";

function NavTabs() {
  const {
    country,
    city,
    coord,
    setCoord,
    validCoord,
    searchType,
    layer,
  } = useContext(SearchContext);
  const pathname = useLocation().pathname;

  const clickHandler = () => {
    if (!validCoord) {
      setCoord({ lat: 0, lng: 0 });
    }
  };

  return (
    <ul id="navTabs">
      <li
        className={`tab ${
          /^\/forecast\/daily/.test(pathname) ? "activeTab" : ""
        }`}
      >
        <Link
          to={
            searchType === "city"
              ? `/forecast/daily/city?countryCode=${country[0]}&countryName=${country[1]}&cityName=${city}`
              : `/forecast/daily/geo?lat=${coord.lat}&lng=${coord.lng}`
          }
        >
          Daily
        </Link>
      </li>
      <li
        className={`tab ${
          /^\/forecast\/hourly/.test(pathname) ? "activeTab" : ""
        }`}
      >
        <Link
          to={
            searchType === "city"
              ? `/forecast/hourly/city?countryCode=${country[0]}&countryName=${country[1]}&cityName=${city}`
              : `/forecast/hourly/geo?lat=${coord.lat}&lng=${coord.lng}`
          }
        >
          Hourly
        </Link>
      </li>
      <li
        className={`tab ${/^\/map\/[\S]+$/.test(pathname) ? "activeTab" : ""}`}
        onClick={clickHandler}
      >
        <Link to={`/map/${layer}`}>Weather Map</Link>
      </li>
    </ul>
  );
}

export default NavTabs;
