import React from 'react';
import { TciScores } from '../types';

interface RadarChartProps {
  scores: TciScores;
  size?: number;
}

export const RadarChart: React.FC<RadarChartProps> = ({ scores, size = 360 }) => {
  const dimensions = [
    { key: 'NS', label: 'Busca de Novidade', full: 'Busca de Novidade (NS)' },
    { key: 'HA', label: 'Evitação de Danos', full: 'Evitação de Danos (HA)' },
    { key: 'RD', label: 'Dep. de Recompensa', full: 'Dependência de Recompensa (RD)' },
    { key: 'P', label: 'Persistência', full: 'Persistência (P)' },
    { key: 'SD', label: 'Autodireção', full: 'Autodireção (SD)' },
    { key: 'C', label: 'Cooperatividade', full: 'Cooperatividade (C)' },
    { key: 'ST', label: 'Autotranscendência', full: 'Autotranscendência (ST)' },
  ];

  const total = dimensions.length;
  const center = size / 2;
  const radius = size * 0.35;

  // Calculate polygon points for scores (0-100)
  const getCoordinates = (value: number, index: number) => {
    const angle = (Math.PI * 2 / total) * index - Math.PI / 2;
    const r = (value / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const points = dimensions.map((dim, i) => {
    const val = scores[dim.key as keyof TciScores] || 0;
    const { x, y } = getCoordinates(val, i);
    return `${x},${y}`;
  }).join(' ');

  // Levels for background polygons (25, 50, 75, 100)
  const levels = [25, 50, 75, 100];

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="overflow-visible">
          {/* Background grid levels */}
          {levels.map((lvl) => {
            const lvlPoints = dimensions.map((_, i) => {
              const { x, y } = getCoordinates(lvl, i);
              return `${x},${y}`;
            }).join(' ');

            return (
              <polygon
                key={lvl}
                points={lvlPoints}
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="1"
                strokeDasharray={lvl < 100 ? '4 4' : undefined}
              />
            );
          })}

          {/* Axis lines */}
          {dimensions.map((_, i) => {
            const { x, y } = getCoordinates(100, i);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="#E2E8F0"
                strokeWidth="1"
              />
            );
          })}

          {/* User score polygon */}
          <polygon
            points={points}
            fill="rgba(16, 185, 129, 0.2)"
            stroke="#059669"
            strokeWidth="2.5"
          />

          {/* Vertex dots & labels */}
          {dimensions.map((dim, i) => {
            const val = scores[dim.key as keyof TciScores] || 0;
            const { x, y } = getCoordinates(val, i);
            
            // Label position slightly offset outward
            const labelAngle = (Math.PI * 2 / total) * i - Math.PI / 2;
            const labelR = radius + 36;
            const lx = center + labelR * Math.cos(labelAngle);
            const ly = center + labelR * Math.sin(labelAngle);

            // Alignment adjustment based on position
            let textAnchor: 'start' | 'middle' | 'end' = 'middle';
            if (Math.abs(Math.cos(labelAngle)) > 0.3) {
              textAnchor = Math.cos(labelAngle) > 0 ? 'start' : 'end';
            }

            return (
              <g key={dim.key}>
                <circle cx={x} cy={y} r="4.5" fill="#059669" stroke="#FFFFFF" strokeWidth="1.5" />
                <text
                  x={lx}
                  y={ly}
                  textAnchor={textAnchor}
                  className="text-[11px] font-semibold fill-slate-700"
                  dominantBaseline="central"
                >
                  {dim.label} ({val})
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full text-xs text-slate-600 border-t border-slate-100 pt-4">
        {dimensions.map((dim) => (
          <div key={dim.key} className="flex flex-col bg-slate-50 p-2 rounded-lg border border-slate-100">
            <span className="font-mono text-[10px] text-slate-400 font-bold">{dim.key}</span>
            <span className="font-bold text-slate-900 font-mono tabular-nums text-sm">{scores[dim.key as keyof TciScores]} / 100</span>
            <span className="truncate text-[11px] text-slate-500">{dim.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
