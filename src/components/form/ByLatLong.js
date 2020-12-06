import React, { useState, useEffect, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { SearchContext } from "../../customContext/SearchContextWrapper";
import { lngConvertor } from "../../customFunc/convertor";
import Alert from "../Alert";

let timeout;

function ByLatLong() {
  const [validLat, setValidLat] = useState(true);
  const [validLng, setValidLng] = useState(true);
  const {
    coord,
    setCountry,
    setCity,
    changeByInput,
    setChangeByInput,
    setMatchedCities,
    searchType,
  } = useContext(SearchContext);
  const history = useHistory();
  const pathname = useLocation().pathname;

  // type = "lat" or "lng"
  const coordHandler = (value, type) => {
    if (searchType !== "geo") {
      return;
    }

    let change = {};
    if (isNaN(value)) {
      change[type] = "";
    } else {
      change[type] = value;
    }

    setChangeByInput(true);
    setCountry(["", ""]);
    setCity("");

    const latLng = {
      ...coord,
      ...change,
    };

    history.push(
      `${pathname}?lat=${encodeURIComponent(
        latLng.lat
      )}&lng=${encodeURIComponent(latLng.lng)}`
    );
    setMatchedCities([]);
  };

  useEffect(() => {
    clearTimeout(timeout);
    if (changeByInput) {
      timeout = setTimeout(() => {}, 250);

      let { lat, lng } = coord;
      lat = parseFloat(lat);
      lng = parseFloat(lng);

      if (!isNaN(lat) && Math.abs(lat) > 90) {
        setValidLat(false);
      } else {
        setValidLat(true);
      }

      if (!isNaN(lng) && Math.abs(lng) > 180) {
        setValidLng(false);
      } else {
        setValidLng(true);
      }
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [coord, changeByInput]);

  return (
    <>
      <fieldset>
        <label>
          Latitude
          <input
            name="latitude"
            type="number"
            value={coord.lat}
            onChange={(event) => coordHandler(event.target.value, "lat")}
          ></input>
        </label>
        {!validLat && (
          <Alert content="Please enter a number between -90 and 90" />
        )}
      </fieldset>
      <br></br>
      <fieldset>
        <label>
          Longitual
          <input
            name="longitudal"
            type="number"
            value={changeByInput ? coord.lng : lngConvertor(coord.lng)}
            onChange={(event) => coordHandler(event.target.value, "lng")}
          ></input>
        </label>
        {!validLng && (
          <Alert content="Please enter a number between -180 and 180" />
        )}
        <br></br>
      </fieldset>
    </>
  );
}

export default ByLatLong;
