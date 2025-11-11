import React from "react";
import styled from "styled-components";
import { Units } from "../hooks/useWeather";

const Wrap = styled.div`
  display: inline-flex; gap: .5rem; background: #1f2633; padding: .25rem;
  border-radius: 999px;
`;
const Btn = styled.button<{ active: boolean }>`
  border: none; padding: .4rem .7rem; border-radius: 999px; cursor: pointer;
  background: ${({active}) => active ? "#0b84ff" : "transparent"};
  color: ${({active}) => active ? "#fff" : "#cbd5e1"};
`;

export default function UnitToggle({
  units,
  onChange,
}: { units: Units; onChange: (u: Units) => void }) {
  return (
    <Wrap>
      <Btn active={units === "metric"} onClick={() => onChange("metric")}>°C</Btn>
      <Btn active={units === "imperial"} onClick={() => onChange("imperial")}>°F</Btn>
    </Wrap>
  );
}
