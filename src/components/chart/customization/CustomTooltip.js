import React from "react";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload) {
    const display = payload.map((p) => {
      let unit;
      switch (p.dataKey) {
        case "minTemp":
        case "maxTemp":
          unit = "℃";
          break;
        case "humidity":
          unit = "%";
          break;
        case "windSpeed":
          unit = "m/s";
          break;
        default:
          break;
      }
      return (
        <div key={p.dataKey} style={{ color: p.color }}>
          {p.dataKey}: {p.payload[p.dataKey]}
          {unit}
        </div>
      );
    });
    return (
      <div
        style={{
          backgroundColor: "white",
          border: "2px solid orange",
          padding: "5px",
          borderRadius: "5px",
        }}
      >
        <div>{label}</div>
        {display}
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
