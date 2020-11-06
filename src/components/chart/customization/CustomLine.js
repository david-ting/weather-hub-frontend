import React from "react";
import { Line } from "recharts";

const CustomLine = ({ yAxisId, color, dataKey }) => {
  return (
    <Line
      yAxisId={yAxisId}
      dot={{ r: 5, fill: color }}
      activeDot={{ r: 6, fill: color }}
      type="monotone"
      dataKey={dataKey}
      stroke={color}
      strokeWidth="2"
    />
  );
};

export default CustomLine;
