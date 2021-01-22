import React, { createRef, useState, useEffect, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import activeMarkerURL from "../images/activeMarker.png";
import inactiveMarkerURL from "../images/inactiveMarker.png";
import { lngConvertor } from "../customFunc/convertor";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { SearchContext } from "../customContext/SearchContextWrapper";

function LeafletMap({ coord, layer, children }) {
  const {
    city,
    setCity,
    validCity,
    country,
    setCountry,
    setChangeByInput,
    matchedCities,
    setMatchedCities,
    searchType,
  } = useContext(SearchContext);
  const history = useHistory();
  const pathname = useLocation().pathname;

  const [mapZoom, setMapZoom] = useState(3);

  let position = [parseFloat(coord.lat), parseFloat(coord.lng)];

  const moveMarker = (latLng) => {
    if (searchType === "geo") {
      setChangeByInput(false);
      setCountry(["", ""]);
      setCity("");
      setMatchedCities([]);
      history.push(
        `${pathname}?lat=${encodeURIComponent(
          latLng.lat
        )}&lng=${encodeURIComponent(latLng.lng)}`
      );
    }
  };

  const refmarker = createRef();
  const refmap = createRef();

  const cityIconSize = Math.max(20, 2 * mapZoom);
  const activeMarker = new L.Icon({
    iconUrl: activeMarkerURL,
    iconSize: [cityIconSize, cityIconSize],
  });
  const inactiveMarker = new L.Icon({
    iconUrl: inactiveMarkerURL,
    iconSize: [cityIconSize, cityIconSize],
  });

  const rippleIconSize = Math.max(100);
  const rippleIcon = new L.divIcon({
    className: "my-div-icon",
    iconSize: [rippleIconSize, rippleIconSize],
    html: `<div class="ripple-container">
    <span style="--i: 1;"></span>
    <span style="--i: 2;"></span>
    <span style="--i: 3;"></span>
  </div>`,
  });

  let cityMarkers;
  if (searchType === "city") {
    // matchedCities are only up to 100, so it won't cause freezing
    cityMarkers = matchedCities.map((c) => {
      const cityCoord = [c.lat, c.lon];
      const active = c.name === city ? true : false;
      return (
        <Marker
          key={c.name}
          position={cityCoord}
          icon={active ? activeMarker : inactiveMarker}
          onClick={() => {
            if (searchType === "city") {
              history.push(
                `${pathname}?countryCode=${encodeURIComponent(
                  country[0]
                )}&countryName=${encodeURIComponent(
                  country[1]
                )}&cityName=${encodeURIComponent(c.name)}`
              );
            }
          }}
          onMouseOver={(e) => {
            e.target._icon.setAttribute("src", activeMarkerURL);
            e.target.openPopup();
          }}
          onMouseOut={(e) => {
            e.target._icon.setAttribute("src", inactiveMarkerURL);
            e.target.closePopup();
          }}
        >
          <Popup>
            <div className="pop-up">
              {c.name}
              <br></br>
              lat: {Math.round(parseFloat(c.lat) * 1000) / 1000}, lng:
              {Math.round(parseFloat(c.lon) * 1000) / 1000}
            </div>
          </Popup>
        </Marker>
      );
    });
  }

  const updateZoom = () => {
    const map = refmap.current;
    const zoomLevel = map.leafletElement.getZoom();
    setMapZoom(zoomLevel);
  };

  const updatePosition = () => {
    const marker = refmarker.current;
    if (marker != null) {
      const latLng = {
        lat: (
          Math.round(marker.leafletElement.getLatLng().lat * 1000) / 1000
        ).toString(),
        lng: (
          Math.round(marker.leafletElement.getLatLng().lng * 1000) / 1000
        ).toString(),
      };
      moveMarker(latLng);
    }
  };

  const weatherLayer = (
    <TileLayer
      attribution="open weather"
      url={`https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=0ee34e19aa6e11fc599ac90d4dc49a61`}
    />
  );

  useEffect(() => {
    if (refmarker.current) {
      refmarker.current.leafletElement.openPopup();
    }
  });
  return (
    <div id="map-container">
      <Map
        center={position}
        zoom={mapZoom}
        id="map"
        ref={refmap}
        onZoom={updateZoom}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        {layer && weatherLayer}
        {!layer && (
          <>
            <Marker
              position={position}
              draggable={searchType === "geo" ? true : false}
              onDragend={searchType === "geo" ? updatePosition : () => {}}
              ref={refmarker}
            >
              <Popup>
                <div className="pop-up">
                  {country[0] !== "" && country[1] !== "" && (
                    <>
                      <img
                        src={`https://www.countryflags.io/${country[0]}/flat/64.png`}
                      ></img>
                      <br></br>
                      {validCity && <>{city}, </>} {country[1]}
                      <br></br>
                    </>
                  )}
                  {`lat: ${coord.lat},`} {`lng: ${lngConvertor(coord.lng)}`}
                </div>
              </Popup>
            </Marker>

            {searchType === "city" ? cityMarkers : null}
            {(searchType === "city") & (matchedCities.length !== 0) && (
              <Marker position={position} icon={rippleIcon}></Marker>
            )}
          </>
        )}
      </Map>
      {children}
    </div>
  );
}

// re-render only when valid lat and lng
function remain(_prevProps, nextProps) {
  let { lat, lng } = nextProps.coord;
  const changeByInput = nextProps.changeByInput;

  lng = changeByInput ? lng : lngConvertor(lng);

  if (lat === "" || lng === "" || Math.abs(lat) > 90 || Math.abs(lng) > 180) {
    return true;
  }

  return false;
}

export default React.memo(LeafletMap, remain);
