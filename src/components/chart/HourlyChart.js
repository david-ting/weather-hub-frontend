import React, { useState } from "react";
import DragBar from "../DragBar";
import Chart from "./Chart";
import { extractHourlyForecasts } from "../../customFunc/extractForecasts";

function HourlyChart({ forecasts }) {
  const [size, setSize] = useState(24);
  const [value, setValue] = useState(24);

  const data = [];
  const start = value - size + 1;
  const end = value + 1;

  forecasts.data.slice(start, end).forEach((f) => {
    let { hour, shortDate, temp, humidity, wind } = extractHourlyForecasts(f);
    let clock;
    if (hour === 0) {
      clock = "12am";
    } else if (hour > 0 && hour < 12) {
      clock = `${hour}am`;
    } else if (hour === 12) {
      clock = "12pm";
    } else if (hour > 12 && hour < 24) {
      clock = `${hour - 12}pm`;
    }

    if (clock.length.length === 3) clock = " " + clock;

    if (shortDate.length === 4) shortDate = shortDate + " ";
    else if (shortDate.length === 3) shortDate = " " + shortDate + " ";

    data.push({
      time: `${shortDate} ${clock} `,
      temp: temp,
      humidity: humidity,
      windSpeed: wind.speed,
    });
  });

  return (
    <>
      <div id="hourly-chart-top">
        <h3 style={{ textAlign: "center" }}>
          {value === "" || data.length === 0 || size === ""
            ? " "
            : ` ${data[0].time} to ${
                data[data.length - 1].time
              } (${size} hrs forecasts)`}
        </h3>

        <DragBar
          size={size}
          setSize={setSize}
          value={value}
          setValue={setValue}
        />
      </div>
      <Chart
        data={data}
        duration="hourly"
        tickInterval={size > 7 ? Math.ceil(size / 7) - 1 : 0}
      />
    </>
  );
}

export default HourlyChart;
