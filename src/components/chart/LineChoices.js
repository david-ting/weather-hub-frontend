import React from "react";

function LineChoices({ checkList, changeCheckList }) {
  return (
    <form id="lineChoices">
      Plot: &nbsp;
      <label className="checkBoxContainer">
        <span className="checkLabel">temperature</span>
        <input
          type="checkbox"
          checked={checkList.temperature}
          onChange={() => changeCheckList("temperature")}
        ></input>
        <div className="newCheckBox"></div>
      </label>
      <label className="checkBoxContainer">
        <span className="checkLabel">humidity</span>
        <input
          type="checkbox"
          checked={checkList.humidity}
          onChange={() => changeCheckList("humidity")}
        ></input>
        <div className="newCheckBox"></div>
      </label>
      <label className="checkBoxContainer">
        <span className="checkLabel">wind speed</span>
        <input
          type="checkbox"
          checked={checkList.windSpeed}
          onChange={() => changeCheckList("windSpeed")}
        ></input>
        <div className="newCheckBox"></div>
      </label>
    </form>
  );
}

export default LineChoices;
