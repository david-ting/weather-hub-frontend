import React, { useRef, useEffect, useState, Fragment } from "react";
import { HiMenu } from "react-icons/hi";
import { IconContext } from "react-icons";
import { extractDailyForecasts } from "../customFunc/extractForecasts";

function Table(props) {
  const { forecasts } = props;
  const table = useRef();
  const [display, setDisplay] = useState("hori");

  useEffect(() => {
    // to show the columns of the horiWeather that are fully within the view
    if (display === "vert") return;
    let idt;
    function hTableResize() {
      if (idt) clearTimeout(idt);
      idt = setTimeout(check, 500);

      function check() {
        // clear the width(inline-style) of the table so that the width return to be 'auto'
        if (!table.current) return;
        table.current.style.removeProperty("width");

        let widthAdded = 0;

        const tableDimension = {
          height: table.current.offsetHeight,
          width: table.current.offsetWidth,
        };
        const columns = document.querySelectorAll(".main-column");
        columns.forEach(() => {
          // each width of the main-column is harded-coded with 125
          if (widthAdded + 125 <= tableDimension.width) {
            widthAdded += 125;
          }
        });
        table.current.style.width = widthAdded + "px";
      }
    }
    hTableResize();
    window.addEventListener("resize", hTableResize);

    return () => {
      clearTimeout(idt);
      window.removeEventListener("resize", hTableResize);
    };
  });

  useEffect(() => {
    if (window.outerWidth <= 1000) {
      setDisplay("vert");
    }
  }, []);

  return (
    <>
      <div id="tableHead">
        Display Direction:
        <span
          style={{ transform: "rotate(90deg)", cursor: "pointer" }}
          onClick={() => {
            setDisplay("hori");
          }}
        >
          <IconContext.Provider
            value={{
              size: "2.5rem",
              color: `${display === "hori" ? "#ff9d00" : "rgb(178, 175, 175)"}`,
            }}
          >
            <HiMenu />
          </IconContext.Provider>
        </span>
        <span
          style={{ cursor: "pointer", transform: "translate(0, 1.5px)" }}
          onClick={() => {
            setDisplay("vert");
          }}
        >
          <IconContext.Provider
            value={{
              size: "2.5rem",
              color: `${display === "vert" ? "#ff9d00" : "rgb(178, 175, 175)"}`,
            }}
          >
            <HiMenu />
          </IconContext.Provider>
        </span>
      </div>
      {display === "hori" && (
        <div id="horiWeather" className={forecasts.loading ? "loading" : ""}>
          <div id="labels" className="main-column">
            <div className="item">
              <div></div>
            </div>
            <div className="item highlight">
              <div>Date</div>
            </div>
            <div className="item highlight">
              <div>Weather</div>
            </div>
            <div className="item highlight">
              <div>temperature</div>
            </div>
            <div className="item highlight">
              <div>humidity</div>
            </div>
            <div className="item highlight">
              <div>wind</div>
            </div>
          </div>
          <div id="forecasts" ref={table}>
            {forecasts.data.map((day) => {
              const {
                dow,
                date,
                maxTemp,
                minTemp,
                humidity,
                weather,
                weatherIcon,
                wind,
              } = extractDailyForecasts(day);
              return (
                <div className="main-column" key={date}>
                  <div className="item highlight">
                    <div>{dow}</div>
                  </div>
                  <div className="item">
                    <div>{date}</div>
                  </div>
                  <div className="item">
                    <div>
                      <div>{weather}</div>
                      <img src={weatherIcon} alt="weatherIcon"></img>
                    </div>
                  </div>
                  <div className="item">
                    <div>
                      {minTemp} | {maxTemp}℃
                    </div>
                  </div>
                  <div className="item">
                    <div>{humidity}%</div>
                  </div>
                  <div className="item">
                    <div>
                      {wind.speed}m/s | {wind.degree}°
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {display === "vert" && (
        <div id="vertWeather" className={forecasts.loading ? "loading" : ""}>
          {forecasts.data.map((day) => {
            const {
              dow,
              date,
              maxTemp,
              minTemp,
              humidity,
              weather,
              weatherIcon,
            } = extractDailyForecasts(day);
            return (
              <Fragment key={date}>
                <div className="left-col highlight">
                  <div>
                    {date} <br></br> ({dow})
                  </div>
                </div>
                <div className="right-col">
                  <div className="weather">
                    <div>{weather}</div>
                    <img src={weatherIcon} alt="weatherIcon"></img>
                  </div>

                  <div className="weatherData">
                    <div>
                      <span>Temp: </span>
                      <span>&nbsp; {minTemp}</span>
                      <span>| {maxTemp}℃</span>
                    </div>
                    <div>
                      <span>Humidity: </span>
                      <span>&nbsp; {humidity}%</span>
                    </div>
                  </div>
                </div>
              </Fragment>
            );
          })}
        </div>
      )}
    </>
  );
}

function remain(prevProps, nextProps) {
  console.log(prevProps.forecasts);
  console.log(nextProps.forecasts);

  if (
    JSON.stringify(prevProps.forecasts.data) !==
      JSON.stringify(nextProps.forecasts.data) ||
    prevProps.forecasts.loading !== nextProps.forecasts.loading
  ) {
    return false;
  }

  return true;
}

export default React.memo(Table, remain);

