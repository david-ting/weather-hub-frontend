import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Label,
  Legend,
} from "recharts";
import CustomAxisTick from "./customization/CustomAxisTick";
import CustomLine from "./customization/CustomLine";
import CustomTooltip from "./customization/CustomTooltip";
import LineChoices from "./LineChoices";

const Chart = ({ data, duration, tickInterval }) => {
  const [fontSize, setFontSize] = useState(16);
  const [checkList, setCheckList] = useState({
    temperature: true,
    humidity: true,
    windSpeed: false,
  });

  const tickSpacing = tickInterval || 0;

  const legendFormatter = (value) => {
    return <span style={{ fontSize: fontSize + "px" }}>{value}</span>;
  };

  const changeCheckList = (item) => {
    const change = {};
    change[item] = !checkList[item];

    // max checked items = 2 so that the chart can plotted
    const itemsChecked = Object.values({ ...checkList, ...change }).filter(
      (i) => i
    ).length;
    if (itemsChecked <= 2) {
      setCheckList({
        ...checkList,
        ...change,
      });
    } else {
      const chosen = Object.entries(checkList).filter((entry) => {
        return entry[1];
      });

      const chosenStr = chosen.map((entry) => entry[0]).join(" or ");

      toast.info(
        `🦄 Maximum no. of choices is 2. Please de-select ${chosenStr}`,
        {
          position: "top-left",
          autoClose: 8000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };

  const humidityPara = {
    domain: [0, 100],
    yAxisPos: checkList.temperature ? "right" : "left",
    labelPos: checkList.temperature ? "insideRight" : "insideLeft",
    labelRot: checkList.temperature ? 90 : -90,
  };

  const windSpeedPara = {
    domain: [0, "auto"],
    yAxisPos: checkList.temperature || checkList.humidity ? "right" : "left",
    labelPos:
      checkList.temperature || checkList.humidity
        ? "insideRight"
        : "insideLeft",
    labelRot: checkList.temperature || checkList.humidity ? 90 : -90,
  };

  const windSpeedYAxisId =
    checkList.temperature || checkList.humidity ? "right" : "left";

  useEffect(() => {
    let timer;

    const handler = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (window.outerWidth < 450) {
          setFontSize(12);
        } else {
          setFontSize(16);
        }
      }, 250);
    };

    handler();
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);

  return (
    <Fragment>
      <LineChoices checkList={checkList} changeCheckList={changeCheckList} />
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 15, left: 10 }}>
          <CartesianGrid stroke="#ccc" strokeDasharray="10 10" />
          <Legend
            verticalAlign="bottom"
            height={50}
            formatter={legendFormatter}
          />
          <Tooltip content={<CustomTooltip />} />
          <XAxis
            dataKey="time"
            height={45}
            tick={<CustomAxisTick fontSize={fontSize} />}
            interval={tickSpacing}
          ></XAxis>

          {/* temperature */}
          {checkList.temperature && (
            <YAxis
              domain={[0, "auto"]}
              yAxisId="left"
              width={fontSize === 16 ? 45 : 35}
              fontSize={fontSize}
            >
              <Label
                value={"temperature (℃)"}
                position="insideLeft"
                angle={-90}
                style={{ textAnchor: "middle" }}
                fontSize={fontSize}
              />
            </YAxis>
          )}
          {/* rechart cannot wrap line, workaround: call the function instead of component */}
          {/* for daily chart */}
          {duration === "daily" &&
            checkList.temperature &&
            CustomLine({
              yAxisId: "left",
              color: "blue",
              dataKey: "minTemp",
            })}
          {duration === "daily" &&
            checkList.temperature &&
            CustomLine({ yAxisId: "left", color: "red", dataKey: "maxTemp" })}
          {/* for hourly chart */}
          {duration === "hourly" &&
            checkList.temperature &&
            CustomLine({ yAxisId: "left", color: "red", dataKey: "temp" })}

          {/* humidity */}
          {checkList.humidity && (
            <YAxis
              domain={[0, 100]}
              yAxisId={humidityPara.yAxisPos}
              orientation={humidityPara.yAxisPos}
              width={fontSize === 16 ? 45 : 35}
              fontSize={fontSize}
            >
              <Label
                value={"humidity (%)"}
                position={humidityPara.labelPos}
                angle={humidityPara.labelRot}
                style={{ textAnchor: "middle" }}
                fontSize={fontSize}
              />
            </YAxis>
          )}
          {checkList.humidity &&
            CustomLine({
              yAxisId: humidityPara.yAxisPos,
              color: "green",
              dataKey: "humidity",
            })}

          {/* wind */}
          {checkList.windSpeed && (
            <YAxis
              domain={[0, "auto"]}
              yAxisId={windSpeedPara.yAxisPos}
              orientation={windSpeedPara.yAxisPos}
              width={fontSize === 16 ? 45 : 35}
              fontSize={fontSize}
            >
              <Label
                value={"wind (m/s)"}
                position={windSpeedPara.labelPos}
                angle={windSpeedPara.labelRot}
                style={{ textAnchor: "middle" }}
                fontSize={fontSize}
              />
            </YAxis>
          )}
          {checkList.windSpeed &&
            CustomLine({
              yAxisId: windSpeedYAxisId,
              color: "purple",
              dataKey: "windSpeed",
            })}
        </LineChart>
      </ResponsiveContainer>
    </Fragment>
  );
};

const remain = (prevProps, nextProps) => {
  if (prevProps.duration !== nextProps.duration) {
    return false;
  }
  if (JSON.stringify(prevProps.data) !== JSON.stringify(nextProps.data)) {
    return false;
  }
  return true;
};

export default React.memo(Chart, remain);
