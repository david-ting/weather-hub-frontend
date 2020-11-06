import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";

function ByWeatherLayer({ layer }) {
  const history = useHistory();
  const changeLayer = (e) => {
    history.push(`/map/${e.target.value}`);
  };

  return (
    <Fragment>
      <label className="radioContainer">
        {" "}
        Cloud (%)
        <input
          type="radio"
          name="layer"
          value="clouds_new"
          onChange={changeLayer}
          checked={layer === "clouds_new" ? "checked" : false}
        ></input>
        <div className="newRadio"></div>
      </label>
      <label className="radioContainer">
        {" "}
        Precipitation (mm)
        <input
          type="radio"
          name="layer"
          value="precipitation_new"
          onChange={changeLayer}
          checked={layer === "precipitation_new" ? "checked" : false}
        ></input>
        <div className="newRadio"></div>
      </label>
      <label className="radioContainer">
        {" "}
        Sea level pressure (kPa)
        <input
          type="radio"
          name="layer"
          value="pressure_new"
          onChange={changeLayer}
          checked={layer === "pressure_new" ? "checked" : false}
        ></input>
        <div className="newRadio"></div>
      </label>
      <label className="radioContainer">
        {" "}
        Wind speed (m/s)
        <input
          type="radio"
          name="layer"
          value="wind_new"
          onChange={changeLayer}
          checked={layer === "wind_new" ? "checked" : false}
        ></input>
        <div className="newRadio"></div>
      </label>
      <label className="radioContainer">
        {" "}
        Temperature (°C)
        <input
          type="radio"
          name="layer"
          value="temp_new"
          onChange={changeLayer}
          checked={layer === "temp_new" ? "checked" : false}
        ></input>
        <div className="newRadio"></div>
      </label>
    </Fragment>
  );
}

export default ByWeatherLayer;
