import React from "react";
import styled from "styled-components";

type Day = {
  date: string;           // "2025-06-11"
  min: number;
  max: number;
  icon?: string;          // "10d"
  desc?: string;          // "light rain"
};

export default function ForecastList({
  days,
  unitSymbol,
}: {
  days: Day[];
  unitSymbol: "C" | "F";
}) {
  if (!days?.length) return null;

  return (
    <Wrap>
      <ul>
        {days.slice(0, 5).map((d) => (
          <Row key={d.date}>
            <CellLeft>
              <strong>{weekday(d.date)}</strong>
            </CellLeft>

            <CellMiddle>
              {d.icon && (
                <img
                  src={`https://openweathermap.org/img/wn/${d.icon}.png`}
                  alt={d.desc || "weather"}
                  width={28}
                  height={28}
                />
              )}
              <span className="cond">{capitalize(d.desc || "")}</span>
            </CellMiddle>

            <CellRight>
              <span className="max">{d.max}°{unitSymbol}</span>
              <span className="sep"> / </span>
              <span className="min">{d.min}°{unitSymbol}</span>
            </CellRight>
          </Row>
        ))}
      </ul>
    </Wrap>
  );
}

/* ---------- styles ---------- */

const Wrap = styled.div`
  ul { list-style: none; margin: 0; padding: 0; }
`;

const Row = styled.li`
  display: grid;
  grid-template-columns: 90px 1fr auto;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0.5rem;
  border-radius: 12px;

  &:not(:last-child) {
    border-bottom: 1px solid #2b3445;
  }

  @media (max-width: 480px) {
    grid-template-columns: 80px 1fr;
    grid-auto-rows: auto;
    row-gap: .35rem;

    ${'' /* min/max passa para a linha de baixo no mobile */}
    & > div:last-child {
      grid-column: 1 / -1;
      justify-self: start;
    }
  }
`;

const CellLeft = styled.div`
  color: #c8d0e0;
`;

const CellMiddle = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  .cond { color: #e5e7eb; }
`;

const CellRight = styled.div`
  font-weight: 600;
  .max { color: #e5e7eb; }
  .min { color: #94a3b8; }
  .sep { color: #607089; }
`;

/* ---------- utils ---------- */
function weekday(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("pt-PT", { weekday: "short" });
}
function capitalize(s: string) {
  return s ? s[0].toUpperCase() + s.slice(1) : s;
}
