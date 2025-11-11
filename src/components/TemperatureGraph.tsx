import React from 'react';
import styled from 'styled-components';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const Container = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  margin-top: 1.5rem;
`;

interface Props {
  forecast: any;
}

const TemperatureGraph = ({ forecast }: Props) => {
  if (!forecast?.list) return null;

  // Extrai temperatura média por dia (dados vêm a cada 3h)
  const dailyData = forecast.list
    .filter((_: any, index: number) => index % 8 === 0)
    .map((entry: any) => ({
      date: new Date(entry.dt * 1000).toLocaleDateString('pt-PT', {
        weekday: 'short',
      }),
      temp: Math.round(entry.main.temp),
    }));

  return (
    <Container>
      <h3>Evolução da temperatura (5 dias)</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={dailyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="temp" stroke="#0077ff" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default TemperatureGraph;
