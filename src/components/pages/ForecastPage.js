import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import InputSearch from "../form/InputSearch";
import LeafletMap from "../LeafletMap";
import NavTabs from "../NavTabs";
import Table from "../Table";
import { SearchContext } from "../../customContext/SearchContextWrapper";
import DailyChart from "../chart/DailyChart";
import HourlyChart from "../chart/HourlyChart";

function ForecastPage() {
  const { forecasts, coord } = useContext(SearchContext);

  const { duration } = useParams();

  useEffect(() => {
    document.title = `${duration} forecast | weather hub`;
  }, [duration]);

  return (
    <div className="main-container">
      <NavTabs />
      <div id="search-container">
        {
          <InputSearch
            {...{
              duration,
            }}
          />
        }

        <LeafletMap
          {...{
            coord,
          }}
        />
      </div>
      {duration === "daily" && forecasts.data.length === 8 && (
        <Table forecasts={forecasts} />
      )}
      {duration === "daily" && <DailyChart forecasts={forecasts} />}
      {duration === "hourly" && <HourlyChart forecasts={forecasts} />}
    </div>
  );
}

export default ForecastPage;
