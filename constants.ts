
import { Language } from './types';

export const COLORS = {
  primary: '#1A365D',
  secondary: '#FF6B35',
  accent: '#2EC4B6',
  danger: '#E71D36',
  success: '#10B981',
  warning: '#F59E0B',
  bg: '#F8F9FA'
};

export const TRANSLATIONS = {
  [Language.EN]: {
    appName: 'GasGuard Nepal',
    dashboard: 'Dashboard',
    monitoring: 'Monitoring',
    compliance: 'Compliance',
    settings: 'Settings',
    safe: 'SAFE',
    warning: 'WARNING',
    danger: 'DANGER',
    currentLevel: 'Current Gas Level',
    emergencyShutoff: 'Emergency Shut-off',
    ventilation: 'Ventilation',
    callHelp: 'Call Help',
    weeklyStats: 'Weekly Gas Statistics',
    activeSensors: 'Active Sensors',
    safetyScore: 'Safety Score',
    aiAssistant: 'Safety Assistant',
    evacuateMsg: 'Evacuate immediately if you smell gas!',
    dontSwitchMsg: 'Do not operate electrical switches.',
    notifiedMsg: 'Emergency services are being notified.',
    nepali: 'नेपाली',
    english: 'English'
  },
  [Language.NP]: {
    appName: 'ग्यासगार्ड नेपाल',
    dashboard: 'ड्यासबोर्ड',
    monitoring: 'अनुगमन',
    compliance: 'अनुपालन',
    settings: 'सेटिङहरू',
    safe: 'सुरक्षित',
    warning: 'चेतावनी',
    danger: 'खतरा',
    currentLevel: 'हालको ग्यास स्तर',
    emergencyShutoff: 'आपतकालीन बन्द',
    ventilation: 'भेन्टिलेसन',
    callHelp: 'सहयोग कल',
    weeklyStats: 'साप्ताहिक ग्यास तथ्याङ्क',
    activeSensors: 'सक्रिय सेन्सरहरू',
    safetyScore: 'सुरक्षा स्कोर',
    aiAssistant: 'सुरक्षा सहायक',
    evacuateMsg: 'यदि ग्यासको गन्ध आउँछ भने तुरुन्तै खाली गर्नुहोस्!',
    dontSwitchMsg: 'विद्युतीय स्विचहरू नचलाउनुहोस्।',
    notifiedMsg: 'आपतकालीन सेवाहरूलाई सूचित गरिँदैछ।',
    nepali: 'नेपाली',
    english: 'English'
  }
};

export const MOCK_SENSORS = [
  { id: '1', name: 'Kitchen Main', location: 'Kathmandu', ppm: 245, battery: 88, status: 'online', lastUpdated: '2 mins ago' },
  { id: '2', name: 'Restaurant Unit A', location: 'Pokhara', ppm: 110, battery: 92, status: 'online', lastUpdated: '5 mins ago' },
  { id: '3', name: 'LPG Storage', location: 'Lalitpur', ppm: 550, battery: 45, status: 'warning', lastUpdated: 'Now' }
];

export const MOCK_CHART_DATA = [
  { time: '00:00', value: 120 },
  { time: '04:00', value: 150 },
  { time: '08:00', value: 310 },
  { time: '12:00', value: 245 },
  { time: '16:00', value: 180 },
  { time: '20:00', value: 210 },
  { time: '23:59', value: 245 }
];
