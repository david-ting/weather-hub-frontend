import React from "react";

const CustomAxisTick = ({ x, y, payload, fontSize }) => {
  const [firstString, secondString] = payload.value.split(" ");
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} fill="#666" fontSize={fontSize}>
        <tspan textAnchor="middle" x="0">
          {firstString}
        </tspan>
        <tspan textAnchor="middle" x="0" dy="16">
          {secondString}
        </tspan>
      </text>
    </g>
  );
};

export default CustomAxisTick;
