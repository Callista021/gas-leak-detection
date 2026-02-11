
export enum Language {
  EN = 'en',
  NP = 'np'
}

export interface SensorData {
  id: string;
  name: string;
  location: string;
  ppm: number;
  battery: number;
  status: 'online' | 'offline' | 'warning';
  lastUpdated: string;
}

export interface GasReading {
  timestamp: string;
  value: number;
}

export interface SafetyAlert {
  id: string;
  type: 'info' | 'warning' | 'critical';
  title: string;
  description: string;
  time: string;
  resolved: boolean;
}
