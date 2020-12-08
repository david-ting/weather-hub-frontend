import React, { useContext, useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useLocation, useHistory } from "react-router-dom";
import { getCountries } from "../../customFunc/fetchData";
import Alert from "../Alert";
import AutoComplete from "../AutoComplete";
import { SearchContext } from "../../customContext/SearchContextWrapper";

function ByCountryCity() {
  const {
    country,
    city,
    alertCity,
    setAlertCity,
    matchedCities,
    searchType,
    cityLoading,
    setCityLoading,
  } = useContext(SearchContext);

  const matched_cities_name =
    matchedCities.length > 0 ? matchedCities.map((c) => c.name) : [];

  const [alertCountry, setAlertCountry] = useState(false);
  const [countryList, setCountryList] = useState([[], []]);
  const [countryLoading, setCountryLoading] = useState([false, false]);
  const timeout = useRef(null);

  const pathname = useLocation().pathname;
  const history = useHistory();

  const changeCountry = (value, type) => {
    if (searchType !== "city") {
      clearTimeout(timeout.current);
      return;
    }

    setAlertCity(false);
    setCityLoading(false);

    if (type === "id") {
      history.push(
        `${pathname}?countryCode=${encodeURIComponent(
          value
        )}&countryName=${""}&cityName=${""}`
      );
      setCountryLoading([true, false]);
    } else if (type === "name") {
      history.push(
        `${pathname}?countryCode=${""}&countryName=${encodeURIComponent(
          value
        )}&cityName=${""}`
      );
      setCountryLoading([false, true]);
    }
    setCountryList([[], []]);
    clearTimeout(timeout.current);
    if (value === "") {
      setAlertCountry(false);
      setCountryLoading([false, false]);
      return;
    }
    timeout.current = setTimeout(() => {
      ReactDOM.unstable_batchedUpdates(async () => {
        if (searchType !== "city") {
          return;
        }
        try {
          const result = await getCountries(type, value, true);
          if (result.length === 1) {
            setCountryList([[], []]);
            setAlertCountry(false);
            history.push(
              `${pathname}?countryCode=${encodeURIComponent(
                result[0].id
              )}&countryName=${encodeURIComponent(
                result[0].name
              )}&cityName=${""}`
            );
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
          setCountryLoading([false, false]);
        } catch (error) {
          setCountryLoading([false, false]);
          console.log(error);
        }
      });
    }, 1000);
  };

  const changeCity = (value) => {
    if (searchType !== "city") {
      return;
    }
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
      <div className="gray-text flex-text">
        <div>Please fill in the country</div>
        <div>&nbsp;and then the city</div>
      </div>
      <AutoComplete
        setOptions={setCountryList}
        options={countryList[0]}
        item={country[0]}
        setItem={(value) => changeCountry(value, "id")}
        label="Country Code"
        loading={countryLoading[0]}
      >
        {
          <Alert
            content="Country Code Not Found"
            show={alertCountry && country[0] !== ""}
            setShow={setAlertCountry}
          ></Alert>
        }
      </AutoComplete>

      <br></br>
      <AutoComplete
        setOptions={setCountryList}
        options={countryList[1]}
        item={country[1]}
        setItem={(value) => changeCountry(value, "name")}
        label="Country"
        loading={countryLoading[1]}
      >
        {
          <Alert
            content="Country Name Not Found"
            show={alertCountry && country[1] !== ""}
            setShow={setAlertCountry}
          ></Alert>
        }
      </AutoComplete>
      <br></br>
      <AutoComplete
        options={matched_cities_name}
        item={city}
        setItem={changeCity}
        label="City"
        loading={cityLoading && city !== ""}
        disabled={country[0] === "" || country[1] === "" ? true : false}
      >
        {
          <Alert
            content="City Not Found"
            show={alertCity}
            setShow={setAlertCity}
          ></Alert>
        }
      </AutoComplete>
    </>
  );
}

export default ByCountryCity;
