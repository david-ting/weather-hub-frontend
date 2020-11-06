import React, { useContext, useEffect } from "react";
import { SearchContext } from "../../customContext/SearchContextWrapper";
import ByWeatherLayer from "../form/ByWeatherLayer";
import Gradient from "../Gradient";
import LeafletMap from "../LeafletMap";
import NavTabs from "../NavTabs";

function MapPage() {
  const { coord, changeByInput, layer } = useContext(SearchContext);

  useEffect(() => {
    document.title = `weather map | weather hub`;
  }, []);

  return (
    <>
      <div className="main-container">
        <NavTabs />
        <div id="search-container">
          {
            <div id="search-weather-map-container">
              <h3>Current Weather Map</h3>
              <form>
                <ByWeatherLayer layer={layer} />
              </form>
            </div>
          }

          <LeafletMap
            {...{
              coord,
              changeByInput,
              layer,
            }}
          >
            <Gradient layer={layer} />
          </LeafletMap>
        </div>
      </div>
    </>
  );
}

export default MapPage;
