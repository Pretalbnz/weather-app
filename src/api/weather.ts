import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const getWeather = async (city: string, units: 'metric' | 'imperial') => {
  const response = await axios.get(BASE_URL, {
    params: { q: city, units, appid: API_KEY, lang: 'en' },
  });
  return response.data;
};
