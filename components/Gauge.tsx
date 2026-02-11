
import React from 'react';

interface GaugeProps {
  value: number;
  label: string;
}

const Gauge: React.FC<GaugeProps> = ({ value, label }) => {
  const normalizedValue = Math.min(Math.max(value, 0), 1000);
  const percentage = (normalizedValue / 1000) * 100;
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  let color = '#10B981'; // Green
  if (value > 200) color = '#F59E0B'; // Yellow
  if (value > 500) color = '#E71D36'; // Red

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg className="w-48 h-48 transform -rotate-90">
        <circle
          cx="96"
          cy="96"
          r={radius}
          stroke="#e2e8f0"
          strokeWidth="12"
          fill="transparent"
        />
        <circle
          cx="96"
          cy="96"
          r={radius}
          stroke={color}
          strokeWidth="12"
          fill="transparent"
          strokeDasharray={circumference}
          style={{
            strokeDashoffset,
            transition: 'stroke-dashoffset 0.5s ease-in-out, stroke 0.5s ease'
          }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center transform rotate-0">
        <span className="text-3xl font-bold" style={{ color }}>{value}</span>
        <span className="text-xs text-gray-500 font-medium tracking-wider uppercase">PPM</span>
      </div>
      <div className={`mt-4 px-4 py-1 rounded-full text-white font-bold text-sm ${value > 500 ? 'bg-red-600 animate-pulse' : 'bg-gray-800'}`}>
        {label}
      </div>
    </div>
  );
};

export default Gauge;
