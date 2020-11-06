import React from "react";
import styled from "styled-components";
import { layerColors } from "../defaultWeatherColor/defaultLegend.js";

const GradientContainer = styled.div`
  width: 100%;
  height: 40px;
`;

const GradientBar = styled.div`
  background-image: linear-gradient(to right, ${(props) => props.gradientStr});
  height: 20px;
  border-radius: 5px;
`;

const GradientLabelContainer = styled.div`
  height: 16px;
  position: relative;
`;

const GradientLabel = styled.div`
  position: absolute;
  left: ${(props) => props.left}%;
  transform: translate(-50%);
  font-size: 16px;
  line-height: 16px;
`;

function Gradient({ layer }) {
  const layerColor = layerColors[layer];
  const total = layerColor[layerColor.length - 1].value - layerColor[0].value;
  const min = layerColor[0].value;

  const gradient = layerColor.map((c) => {
    const interval = ((c.value - min) / total) * 100;
    return `${c.color} ${interval}%`;
  });

  const gradientStr = gradient.join(", ");

  const labels = [];

  for (let i = 0; i < 5; i++) {
    const share = i / 4;
    const value = share * total + min;
    labels.push(
      <GradientLabel key={value} left={share * 100}>
        {value}
      </GradientLabel>
    );
  }

  return (
    <GradientContainer>
      <GradientBar gradientStr={gradientStr}></GradientBar>
      <GradientLabelContainer>{labels}</GradientLabelContainer>
    </GradientContainer>
  );
}

export default Gradient;
