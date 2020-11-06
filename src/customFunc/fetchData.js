import { lngConvertor } from "./convertor";
const SERVER_DOMAIN = process.env.REACT_APP_SERVER_DOMAIN;

export async function fetchForecast(coord, duration, updateForecast) {
  let part = ["current", "minutely", "hourly", "daily"];
  part = part.filter((p) => p !== duration).join(", ");

  const { lat, lng } = coord;
  const options = `lat=${lat}&lon=${lngConvertor(lng)}`;
  try {
    const response = await fetch(
      `${SERVER_DOMAIN}/forecasts/${options}/${part}`
    );
    if (response.status === 200) {
      const data = await response.json();
      updateForecast(data);
    } else {
      throw new Error();
    }
  } catch (err) {
    console.log(err);
  }
}

export async function validateCountry(code) {
  if (code === "") return false;
  try {
    const response = await fetch(
      `${SERVER_DOMAIN}/validate_countryCode/${code}`
    );
    if (response.status === 200) {
      const boolean = await response.json();
      return boolean;
    } else {
      throw new Error();
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function validateCity(countryCode, name) {
  if (countryCode === "" || name === "") return false;
  try {
    const response = await fetch(
      `${SERVER_DOMAIN}/validate_city/${countryCode}/${name}`
    );
    if (response.status === 200) {
      const boolean = await response.json();
      return boolean;
    } else {
      throw new Error();
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function getAllCities(countryCode, offset = 0, limit = 100) {
  if (countryCode === "") return [];
  try {
    const response = await fetch(
      `${SERVER_DOMAIN}/get_allCities/${countryCode}?offset=${offset}&limit=${limit}`
    );
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      throw new Error();
    }
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function getCities(
  countryCode,
  cityName,
  offset = 0,
  limit = 100
) {
  if (countryCode === "" || cityName === "") return [];
  try {
    console.log(
      `${SERVER_DOMAIN}/get_cities/${countryCode}/${cityName}?offset=${offset}&limit=${limit}`
    );
    const response = await fetch(
      `${SERVER_DOMAIN}/get_cities/${countryCode}/${cityName}?offset=${offset}&limit=${limit}`
    );
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      throw new Error();
    }
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function getCountries(type, query, exact) {
  if (type === "" || query === "") return [];
  try {
    const response = await fetch(
      `${SERVER_DOMAIN}/get_countries/${type}/${query}?exact=${exact}`
    );
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      throw new Error();
    }
  } catch (err) {
    console.log(err);
    return [];
  }
}
