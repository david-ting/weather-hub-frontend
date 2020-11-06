import React, { useState, useEffect, createContext } from "react";
import ReactDOM from "react-dom";
import { useLocation, useHistory } from "react-router-dom";
import {
  fetchForecast,
  getAllCities,
  getCities,
  validateCountry,
} from "../customFunc/fetchData";
import { coordValidator } from "../customFunc/validator";

export const SearchContext = createContext();

let timeout;

function SearchContextWrapper({ children }) {
  const [searchType, setSearchType] = useState("geo");
  const [coord, setCoord] = useState({ lat: "0", lng: "0" });
  const [country, setCountry] = useState(["", ""]);
  const [city, setCity] = useState("");
  const [validCity, setValidCity] = useState(false);
  const [alertCity, setAlertCity] = useState(false);
  const [matchedCities, setMatchedCities] = useState([]);
  const [changeByInput, setChangeByInput] = useState();
  const validCoord = coordValidator(coord, changeByInput);
  const [forecasts, setForecasts] = useState({ loading: true, data: [] });

  const [layer, setLayer] = useState("temp_new");
  const { pathname, search } = useLocation();
  const history = useHistory();

  useEffect(() => {
    const searchObj = new URLSearchParams(search);
    if (/^\/forecast\/(daily|hourly)\/city$/.test(pathname)) {
      const countryCode = searchObj.get("countryCode") || "";
      const countryName = searchObj.get("countryName") || "";
      const cityName = searchObj.get("cityName") || "";

      if (countryCode !== country[0] || countryName !== country[1])
        setCountry([countryCode, countryName]);
      setCity(cityName);
      setSearchType("city");
    } else if (/^\/forecast\/(daily|hourly)\/geo$/.test(pathname)) {
      setSearchType("geo");
      const latLng = {};
      for (const pair of searchObj.entries()) {
        latLng[pair[0]] = pair[1];
      }
      setCoord(latLng);
    } else if (/^\/map\/[\S]+/.test(pathname)) {
      const mapLayer = pathname.match(/^\/map\/([\S]+)/)[1];
      setLayer(mapLayer);
    }
  }, [pathname, search, country]);

  useEffect(() => {
    const match = pathname.match(/^\/forecast\/(daily|hourly)/);
    let duration = "";
    if (match !== null) {
      duration = match[1];
    }
    const dataFetching = () => {
      setForecasts((forecasts) => ({ ...forecasts, loading: true }));
      const updateForecast = (data) => {
        switch (duration) {
          case "daily":
            setForecasts({ loading: false, data: data.daily });
            break;
          case "hourly":
            setForecasts({ loading: false, data: data.hourly });
            break;
          default:
            break;
        }
      };
      fetchForecast(coord, duration, updateForecast);
    };

    if (validCoord && duration !== "") {
      dataFetching();
    }
  }, [coord, changeByInput, validCoord, pathname]);

  useEffect(() => {
    const geoCalculator = () => {
      ReactDOM.unstable_batchedUpdates(async () => {
        try {
          if (city === "") {
            setAlertCity(false);
            const { results } = await getAllCities(country[0]);
            setMatchedCities(results);
            if (results.length === 0) {
              return;
            }
            setCoord({
              lat: (
                Math.round(parseFloat(results[0].lat) * 1000) / 1000
              ).toString(),
              lng: (
                Math.round(parseFloat(results[0].lon) * 1000) / 1000
              ).toString(),
            });
          } else {
            const { results } = await getCities(country[0], city);
            if (results.length === 0) {
              console.log(results);
              setAlertCity(true);
              setMatchedCities([]);
              return;
            }

            setAlertCity(false);
            // get exact city by ILIKE in backend?
            const exactMatchedCity = results.find(
              (c) => c.name.toUpperCase() === city.toUpperCase()
            );
            if (exactMatchedCity) {
              setCoord({
                lat: (
                  Math.round(parseFloat(exactMatchedCity.lat) * 1000) / 1000
                ).toString(),
                lng: (
                  Math.round(parseFloat(exactMatchedCity.lon) * 1000) / 1000
                ).toString(),
              });
              setValidCity(true);
              history.push(
                `${pathname}?countryCode=${encodeURIComponent(
                  country[0]
                )}&countryName=${encodeURIComponent(
                  country[1]
                )}&cityName=${encodeURIComponent(exactMatchedCity.name)}`
              );
              setMatchedCities([]);
            } else {
              setMatchedCities(results);
            }
          }
        } catch (error) {
          console.log(error);
          setAlertCity(true);
          setMatchedCities([]);
          return;
        }
      });
    };
    clearTimeout(timeout);

    setValidCity(false);

    timeout = setTimeout(
      () =>
        (async () => {
          try {
            const validatedCountry = await validateCountry(country[0]);
            if (validatedCountry) {
              geoCalculator();
            } else {
              setMatchedCities([]);
            }
          } catch (error) {
            console.log(error);
          }
        })(),
      1000
    );
  }, [country, city, setMatchedCities, pathname, history]);

  return (
    <SearchContext.Provider
      value={{
        searchType,
        coord,
        setCoord,
        country,
        setCountry,
        city,
        setCity,
        validCity,
        alertCity,
        matchedCities,
        setMatchedCities,
        changeByInput,
        setChangeByInput,
        validCoord,
        layer,
        forecasts,
        setForecasts,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export default SearchContextWrapper;
