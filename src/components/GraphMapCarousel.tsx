import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import TemperatureGraph from "./TemperatureGraph";
import TemperatureMap from "./TemperatureMap";

type Day = { date: string; min: number; max: number };

type CarouselProps = {
  days: Day[];
  unitSymbol: "C" | "F";
  lat?: number;
  lon?: number;
  city?: string;
  owmKey?: string;

  index: number;                          // controlado de fora
  onIndexChange: (i: number) => void;     // controlado de fora
};

const Wrap = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 16px;
`;

const Track = styled.div<{ index: number }>`
  display: flex;
  width: 100%;
  transform: translateX(${({ index }) => `-${index * 100}%`});
  transition: transform 360ms ease;
`;

const Slide = styled.div`
  min-width: 100%;
  padding: 8px 0;
`;

const Dots = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 8px;
`;
const Dot = styled.button<{ active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 999px;
  border: 0;
  background: ${({ active }) => (active ? "#60a5fa" : "#334155")};
`;

export default function GraphMapCarousel({
  days,
  unitSymbol,
  lat,
  lon,
  city,
  owmKey,
  index,
  onIndexChange,
}: CarouselProps) {
  const slides = useMemo<( "graph" | "map" )[]>(
    () => (lat && lon && owmKey ? ["graph", "map"] : ["graph"]),
    [lat, lon, owmKey]
  );

  // clamp externo
  useEffect(() => {
    if (index > slides.length - 1) onIndexChange(slides.length - 1);
  }, [slides.length, index, onIndexChange]);

  // swipe
  const startX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current == null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) > 40) {
      const next = Math.max(0, Math.min(index + (dx < 0 ? 1 : -1), slides.length - 1));
      onIndexChange(next);
    }
    startX.current = null;
  };

  return (
    <>
      <Wrap onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <Track index={index}>
          {/* Slide 0: Gráfico */}
          <Slide>
            <TemperatureGraph days={days} unitSymbol={unitSymbol} />
          </Slide>

          {/* Slide 1: Mapa (se existir) */}
          {slides.includes("map") && lat && lon && owmKey && (
            <Slide>
              <TemperatureMap
                lat={lat}
                lon={lon}
                city={city}
                unitSymbol={unitSymbol}
                owmKey={owmKey}
                /** interação desligada para o swipe funcionar */
                interactive={false}
              />
            </Slide>
          )}
        </Track>
      </Wrap>

      {slides.length > 1 && (
        <Dots>
          {slides.map((_, i) => (
            <Dot key={i} active={i === index} onClick={() => onIndexChange(i)} />
          ))}
        </Dots>
      )}
    </>
  );
}
