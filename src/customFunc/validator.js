import { lngConvertor } from "./convertor";

export const coordValidator = (coord, changeByInput) => {
  let { lat, lng } = coord;
  lng = changeByInput ? lng : lngConvertor(lng);

  let valid = true;

  if (Math.abs(lat) > 90 || lat === "") {
    valid = false;
  }

  if (Math.abs(lng) > 180 || lng === "") {
    valid = false;
  }
  return valid;
};
