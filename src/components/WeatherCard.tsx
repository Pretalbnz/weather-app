import React from 'react';
import styled from 'styled-components';
import { WiCloud, WiDaySunny, WiRain, WiSnow, WiFog, WiThunderstorm } from 'react-icons/wi';


const Card = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  padding: 1rem;
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-4px);
  }

  @media (max-width: 480px) {
    width: 90%;
  }
`;


interface Props {
  data: any;
}

const getWeatherIcon = (main: string) => {
  switch (main) {
    case 'Clear':
      return <WiDaySunny size={64} color="#f5b921" />;
    case 'Clouds':
      return <WiCloud size={64} color="#888" />;
    case 'Rain':
      return <WiRain size={64} color="#0077ff" />;
    case 'Snow':
      return <WiSnow size={64} color="#00bfff" />;
    case 'Thunderstorm':
      return <WiThunderstorm size={64} color="#222" />;
    case 'Mist':
    case 'Fog':
      return <WiFog size={64} color="#777" />;
    default:
      return <WiDaySunny size={64} color="#ccc" />;
  }
};


const WeatherCard = ({ data }: Props) => {
  return (
    <Card>
      <h2>{data.name}</h2>
    {getWeatherIcon(data.weather[0].main)}
      <p>{Math.round(data.main.temp)}°C</p>
      <p>{data.weather[0].description}</p>
    </Card>
  );
};

export default WeatherCard;
