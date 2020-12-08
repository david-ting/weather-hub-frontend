import React, { useState, useEffect, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { SearchContext } from "../../customContext/SearchContextWrapper";
import { lngConvertor } from "../../customFunc/convertor";
import Alert from "../Alert";

function ByLatLong() {
  const [latAlert, setLatAlert] = useState(false);
  const [lngAlert, setLngAlert] = useState(false);
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
    if (changeByInput) {
      let { lat, lng } = coord;

      if (lat === "") {
        setLatAlert(false);
      } else {
        lat = parseFloat(lat);
        if (isNaN(lat)) {
          setLatAlert(true);
        } else if (!isNaN(lat) && Math.abs(lat) > 90) {
          setLatAlert(true);
        } else {
          setLatAlert(false);
        }
      }

      if (lng === "") {
        setLngAlert(false);
      } else {
        lng = parseFloat(lng);
        if (isNaN(lng)) {
          setLngAlert(true);
        } else if (!isNaN(lng) && Math.abs(lng) > 180) {
          setLngAlert(true);
        } else {
          setLngAlert(false);
        }
      }
    }
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
        {
          <Alert
            content="Please enter a number between -90 and 90"
            show={latAlert}
            setShow={setLatAlert}
          />
        }
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
        {
          <Alert
            content="Please enter a number between -180 and 180"
            show={lngAlert}
            setShow={setLngAlert}
          />
        }
        <br></br>
      </fieldset>
    </>
  );
}

export default ByLatLong;
