import React from "react";
import styled from "styled-components";

const Drag = styled.input`
  -webkit-appearance: none; /* Override default CSS styles */
  appearance: none;
  border-radius: 5px;
  width: ${(props) => props.barWidth}; /* Full-width */
  height: 20px; /* Specified height */
  background: #d3d3d3; /* Grey background */
  outline: none; /* Remove outline */
  opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
  -webkit-transition: 0.2s; /* 0.2 seconds transition on hover */
  transition: opacity 0.2s;

  &:hover {
    opacity: 1; /* Fully shown on mouse-over */
  }

  &&::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: ${(props) => props.thumbWidth}; /* dynamic width */
    height: 25px; /* Slider handle height */
    background: #1d9fd7; /* Green background */
    cursor: pointer; /* Cursor on hover */
  }

  ::-moz-range-thumb {
    width: ${(props) => props.thumbWidth}; /* dynamic width */
    height: 25px; /* Slider handle height */
    background: #1d9fd7; /* Green background */
    cursor: pointer; /* Cursor on hover */
  }
`;

const SizeInput = styled.input`
  border-radius: 5px;
  border: 2px solid #b2afaf;
  padding: 5px 10px;
  font-size: 1rem;
  outline: none;
  width: 100px;
  box-sizing: border-box;
  display: block;
  margin-bottom: 10px;
`;

function DragBar({ size, setSize, value, setValue }) {
  const dragHandler = (e) => {
    setValue(parseInt(e.target.value));
  };

  const sizeHandler = (e) => {
    const inputSize = e.target.value;
    if (inputSize >= 1 && inputSize <= 48) {
      setSize(parseInt(inputSize));
      setValue(parseInt(inputSize));
    } else {
      setSize("");
      setValue("");
    }
  };
  return (
    <div className="slidecontainer">
      <label>
        Interval (hrs) <i>max: 48</i>
        <SizeInput
          name="interval"
          type="number"
          value={size}
          onChange={sizeHandler}
        ></SizeInput>
      </label>
      <Drag
        type="range"
        min={size}
        max="48"
        className="slider"
        id="myRange"
        barWidth="100%"
        thumbWidth={`${(100 * size) / 48}%`}
        value={value}
        onChange={dragHandler}
      ></Drag>
    </div>
  );
}

export default DragBar;
