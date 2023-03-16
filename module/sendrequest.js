import axios from 'axios';

export const getWeather = ({ lat, lon, appid }) => axios.get(`https://api.openweathermap.org/data/2.5/onecall?exclude=minutely,hourly,alerts&lang=zh_cn&units=metric&lat=${lat}&lon=${lon}&appid=${appid}`);
