import React from "react";
import Chart from "./Chart";
import { extractDailyForecasts } from "../../customFunc/extractForecasts";

function DailyChart({ forecasts }) {
  const data = [];
  forecasts.data.forEach((f) => {
    const { date, humidity, minTemp, maxTemp, wind } = extractDailyForecasts(f);

    data.push({
      time: date.split(" ").slice(0, 2).join(" "),
      humidity: humidity,
      minTemp: minTemp,
      maxTemp: maxTemp,
      windSpeed: wind.speed,
    });
  });

  return <Chart data={data} duration="daily" loading={forecasts.loading} />;
}

export default DailyChart;
