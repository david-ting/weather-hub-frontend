export function extractDailyForecasts(f) {
  const [dow, ...rest] = new Date(f.dt * 1000).toDateString().split(" ");
  const date = rest.join(" ");
  const maxTemp = Math.round(f.temp.max * 10) / 10;
  const minTemp = Math.round(f.temp.min * 10) / 10;
  const humidity = f.humidity;
  const weather = f.weather[0].description;
  const weatherIcon = `http://openweathermap.org/img/wn/${f.weather[0].icon}@2x.png`;
  const wind = { speed: f.wind_speed, degree: f.wind_deg };

  return {
    dow: dow,
    date: date,
    maxTemp: maxTemp,
    minTemp: minTemp,
    humidity: humidity,
    weather: weather,
    weatherIcon: weatherIcon,
    wind: wind,
  };
}

export function extractHourlyForecasts(f) {
  const months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dateObj = new Date(f.dt * 1000);
  const hour = dateObj.getHours();
  const shortDate = `${months[dateObj.getMonth()]}-${dateObj.getDate()}`;
  const temp = Math.round(f.temp * 10) / 10;
  const humidity = f.humidity;
  const weather = f.weather[0].description;
  const weatherIcon = `http://openweathermap.org/img/wn/${f.weather[0].icon}@2x.png`;
  const wind = { speed: f.wind_speed, degree: f.wind_deg };

  return {
    hour: hour,
    shortDate: shortDate,
    temp: temp,
    humidity: humidity,
    weather: weather,
    weatherIcon: weatherIcon,
    wind: wind,
  };
}
