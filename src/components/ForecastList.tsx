import React from "react";
import styled from "styled-components";

const Grid = styled.div`
  display: grid; gap: 1rem;
  grid-template-columns: repeat(5, minmax(120px, 1fr));
  @media (max-width: 900px){ grid-template-columns: repeat(3, 1fr); }
  @media (max-width: 600px){ grid-template-columns: repeat(2, 1fr); }
`;

const Card = styled.div`
  background: #1f2633; color: #e2e8f0; border-radius: 16px; padding: 1rem; text-align: center;
`;

export default function ForecastList({
  days,
  unitSymbol,
}: {
  days: { date: string; min: number; max: number; icon?: string; desc?: string }[];
  unitSymbol: "C" | "F";
}) {
  return (
    <Grid>
      {days.map((d) => (
        <Card key={d.date}>
          <div style={{opacity:.8, marginBottom:8}}>
            {new Date(d.date).toLocaleDateString("pt-PT", { weekday: "short", day: "2-digit", month: "short" })}
          </div>
          {d.icon && (
            <img
              src={`https://openweathermap.org/img/wn/${d.icon}@2x.png`}
              alt={d.desc || "weather"}
              width={64}
              height={64}
              style={{ display: "block", margin: "0 auto" }}
            />
          )}
          <div style={{fontWeight:600}}>{d.max}°{unitSymbol}</div>
          <div style={{opacity:.7, fontSize:14}}>{d.min}°{unitSymbol}</div>
        </Card>
      ))}
    </Grid>
  );
}
