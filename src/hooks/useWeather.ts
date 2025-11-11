import { useState } from 'react';
import { getWeather } from '../api/weather';

const useWeather = () => {
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const fetchWeather = async (city: string) => {
    try {
      setError('');
      const data = await getWeather(city, 'metric');
      setWeather(data);
    } catch (err: any) {
      setWeather(null);
      setError('Não foi possível obter os dados meteorológicos.');
    }
  };

  return { weather, error, fetchWeather };
};

export default useWeather;
