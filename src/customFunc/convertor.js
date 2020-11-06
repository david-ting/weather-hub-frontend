export const lngConvertor = (value) => {
  if (value === "") return "";
  value = parseFloat(value);
  let times, operator;

  if (value < -180) {
    operator = "add";
  } else if (value > 180) {
    operator = "minus";
  }

  if (operator) {
    times = Math.floor(Math.abs(value) / 360);
    if (operator === "add") {
      value = value + 360 * times;
    } else if (operator === "minus") {
      value = value - 360 * times;
    }
  }

  if (value < -180) {
    value += 360;
  } else if (value > 180) {
    value -= 360;
  }

  return Math.round(value * 1000000) / 1000000;
};
