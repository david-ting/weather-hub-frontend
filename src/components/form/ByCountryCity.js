import React, { useContext, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useLocation, useHistory } from "react-router-dom";
import { getCountries } from "../../customFunc/fetchData";
import Alert from "../Alert";
import AutoComplete from "../AutoComplete";
import { SearchContext } from "../../customContext/SearchContextWrapper";

let timeout;

function ByCountryCity() {
  const { country, city, alertCity, matchedCities } = useContext(SearchContext);

  const matched_cities_name =
    matchedCities.length > 0 ? matchedCities.map((c) => c.name) : [];

  const [alertCountry, setAlertCountry] = useState(false);
  const [countryList, setCountryList] = useState([[], []]);

  const pathname = useLocation().pathname;
  const history = useHistory();

  const changeCountry = (value, type) => {
    if (type === "id") {
      history.push(
        `${pathname}?countryCode=${encodeURIComponent(
          value
        )}&countryName=${""}&cityName=${""}`
      );
    } else if (type === "name") {
      history.push(
        `${pathname}?countryCode=${""}&countryName=${encodeURIComponent(
          value
        )}&cityName=${""}`
      );
    }
    setCountryList([[], []]);
    clearTimeout(timeout);
    if (value === "") {
      setAlertCountry(false);
      return;
    }
    timeout = setTimeout(() => {
      ReactDOM.unstable_batchedUpdates(async () => {
        try {
          const result = await getCountries(type, value, true);
          if (result.length === 1) {
            setCountryList([[], []]);
            history.push(
              `${pathname}?countryCode=${encodeURIComponent(
                result[0].id
              )}&countryName=${encodeURIComponent(
                result[0].name
              )}&cityName=${""}`
            );
            setAlertCountry(false);
          } else {
            const generalResult = await getCountries(type, value, false);
            if (generalResult.length > 0) {
              setAlertCountry(false);
              if (type === "id")
                setCountryList([generalResult.map((r) => r.id), []]);
              else setCountryList([[], generalResult.map((r) => r.name)]);
            } else {
              setAlertCountry(true);
              setCountryList([[], []]);
            }
          }
        } catch (error) {
          console.log(error);
        }
      });
    }, 1000);
  };

  const changeCity = (value) => {
    history.push(
      `${pathname}?countryCode=${encodeURIComponent(
        country[0]
      )}&countryName=${encodeURIComponent(
        country[1]
      )}&cityName=${encodeURIComponent(value)}`
    );
  };

  useEffect(() => {
    const checkAlert = (type, value) => {
      getCountries(type, value, false)
        .then((result) => {
          if (result.length === 0) {
            setAlertCountry(true);
          }
        })
        .catch((err) => {
          console.log(err);
          setAlertCountry(true);
        });
    };
    if (country[0] !== "") {
      checkAlert("id", country[0]);
    } else if (country[1] !== "") {
      checkAlert("name", country[1]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AutoComplete
        setOptions={setCountryList}
        options={countryList[0]}
        item={country[0]}
        setItem={(value) => changeCountry(value, "id")}
        label="Country Code"
      >
        {alertCountry && country[0] !== "" && (
          <Alert content="Country Code Not Found"></Alert>
        )}
      </AutoComplete>

      <br></br>
      <AutoComplete
        setOptions={setCountryList}
        options={countryList[1]}
        item={country[1]}
        setItem={(value) => changeCountry(value, "name")}
        label="Country"
      >
        {alertCountry && country[1] !== "" && (
          <Alert content="Country Name Not Found"></Alert>
        )}
      </AutoComplete>
      <br></br>
      <AutoComplete
        options={matched_cities_name}
        item={city}
        setItem={changeCity}
        label="City"
      >
        {alertCity && <Alert content="City Not Found"></Alert>}
      </AutoComplete>
    </>
  );
}

export default ByCountryCity;
