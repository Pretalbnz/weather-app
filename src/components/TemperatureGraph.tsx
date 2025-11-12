import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type Day = { date: string; min: number; max: number };

export default function TemperatureGraph({
  days,
  unitSymbol,
}: {
  days: Day[];
  unitSymbol: "C" | "F";
}) {
  // prepara dados para o gráfico
  const data = (days ?? []).map((d) => ({
    // label curto: qua, 12/11
    label: new Date(d.date).toLocaleDateString("pt-PT", {
      weekday: "short",
      day: "2-digit",
      month: "2-digit",
    }),
    min: d.min,
    max: d.max,
  }));

  const formatY = (v: number) => `${Math.round(v)}°${unitSymbol}`;

  return (
    <div style={{ width: "100%", height: 280 }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 10, right: 20, bottom: 4, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="label" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} tickFormatter={formatY} domain={["dataMin - 2", "dataMax + 2"]} />
          <Tooltip
            formatter={(value: number) => [`${Math.round(value)}°${unitSymbol}`, ""]}
            labelFormatter={(label) => label}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="max"
            name={`Máx (°${unitSymbol})`}
            strokeWidth={3}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="min"
            name={`Mín (°${unitSymbol})`}
            strokeWidth={3}
            dot={{ r: 3 }}
            strokeDasharray="4 4"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
