import React, { useMemo, useState } from "react";
import styled from "styled-components";
import GraphMapCarousel from "./GraphMapCarousel";

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: .75rem;
  margin-bottom: 8px;
`;

const Title = styled.h3`
  margin: 0;
  color: var(--muted, #94a3b8);
  font-weight: 600;
`;

const Controls = styled.div`
  display: inline-flex;
  gap: 8px;
`;
const Btn = styled.button`
  border: 1px solid #2b3445;
  background: #111827;
  color: #cbd5e1;
  border-radius: 10px;
  padding: 6px 10px;
  cursor: pointer;
  &:disabled { opacity: .4; cursor: default; }
`;

type Day = { date: string; min: number; max: number };

export default function GraphMapPanel({
  days,
  unitSymbol,
  lat,
  lon,
  city,
  owmKey,
}: {
  days: Day[];
  unitSymbol: "C" | "F";
  lat?: number;
  lon?: number;
  city?: string;
  owmKey?: string;
}) {
  const hasMap = Boolean(lat && lon && owmKey);
  const [index, setIndex] = useState(0);
  const maxIndex = hasMap ? 1 : 0;

  return (
    <>
      <HeaderRow>
        <Title>Temperatura (gráfico / mapa)</Title>
        {hasMap && (
          <Controls>
            <Btn onClick={() => setIndex((i) => Math.max(0, i - 1))} disabled={index === 0}>
              ◀
            </Btn>
            <Btn onClick={() => setIndex((i) => Math.min(maxIndex, i + 1))} disabled={index === maxIndex}>
              ▶
            </Btn>
          </Controls>
        )}
      </HeaderRow>

      <GraphMapCarousel
        days={days}
        unitSymbol={unitSymbol}
        lat={lat}
        lon={lon}
        city={city}
        owmKey={owmKey}
        index={index}
        onIndexChange={setIndex}
      />
    </>
  );
}
