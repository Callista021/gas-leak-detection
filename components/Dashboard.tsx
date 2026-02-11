
import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Wind, 
  PhoneCall, 
  Power, 
  TrendingUp, 
  Activity, 
  Battery, 
  MapPin,
  Bell,
  Sparkles,
  Zap,
  CloudRain
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Language } from '../types';
import { TRANSLATIONS, COLORS, MOCK_CHART_DATA, MOCK_SENSORS } from '../constants';
import Gauge from './Gauge';
import { getSafetyAdvice } from '../services/geminiService';

interface DashboardProps {
  language: Language;
  ppm: number;
  onPpmChange: (val: number) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ language, ppm, onPpmChange }) => {
  const t = TRANSLATIONS[language];
  const [advice, setAdvice] = useState<string>('Loading safety recommendations...');
  const [loadingAdvice, setLoadingAdvice] = useState(false);
  const [isMainsPower, setIsMainsPower] = useState(true);

  useEffect(() => {
    const fetchAdvice = async () => {
      setLoadingAdvice(true);
      const res = await getSafetyAdvice(ppm, language);
      setAdvice(res);
      setLoadingAdvice(false);
    };
    fetchAdvice();
  }, [ppm, language]);

  const getStatusLabel = () => {
    if (ppm > 500) return t.danger;
    if (ppm > 200) return t.warning;
    return t.safe;
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Enhanced Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
           <div className="w-16 h-16 bg-white rounded-3xl shadow-sm border border-gray-100 flex items-center justify-center overflow-hidden">
             <img src="https://flagcdn.com/w80/np.png" alt="Nepal" className="w-10 h-auto opacity-80" />
           </div>
           <div>
            <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2">
              Namaste, Kathmandu <MapPin className="text-[#2EC4B6] w-5 h-5" />
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <span className="flex items-center gap-1.5 text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-lg">
                <CloudRain className="w-3.5 h-3.5" /> 22°C • Rain
              </span>
              <span className="flex items-center gap-1.5 text-xs font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded-lg">
                AQI: 42 (Good)
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Load Shedding Aware Status */}
          <div 
            onClick={() => setIsMainsPower(!isMainsPower)}
            className={`cursor-pointer flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all duration-300 ${
              isMainsPower ? 'bg-green-50 border-green-100 text-green-700' : 'bg-orange-50 border-orange-100 text-orange-700'
            }`}
          >
            <Zap className={`w-5 h-5 ${!isMainsPower && 'animate-pulse'}`} />
            <div className="text-left">
              <p className="text-[10px] font-black uppercase opacity-60 leading-none">Power Source</p>
              <p className="text-sm font-bold">{isMainsPower ? 'Mains Power' : 'Battery Mode'}</p>
            </div>
          </div>
          
          <button className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100 relative group">
            <Bell className="w-6 h-6 text-gray-400 group-hover:text-[#1A365D] transition-colors" />
            <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-[#FF6B35] rounded-full border-2 border-white"></span>
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Central Gauge Card */}
        <div className="lg:col-span-1 bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
            <Shield className="w-48 h-48" />
          </div>
          <h3 className="text-gray-400 font-bold mb-8 uppercase tracking-[0.2em] text-[10px]">{t.currentLevel}</h3>
          <Gauge value={ppm} label={getStatusLabel()} />
          
          <div className="mt-10 w-full space-y-4">
             <div className="flex items-center justify-between">
                <label className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Calibration: Perfect</label>
                <span className="text-[10px] text-teal-500 font-black uppercase">Auto-Testing</span>
             </div>
             <input 
               type="range" 
               min="0" 
               max="1000" 
               value={ppm} 
               onChange={(e) => onPpmChange(parseInt(e.target.value))}
               className="w-full h-3 bg-gray-100 rounded-full appearance-none cursor-pointer accent-[#FF6B35] border-4 border-white shadow-inner"
             />
             <p className="text-[10px] text-gray-300 text-center italic">Simulation Mode: Slide to test emergency protocols</p>
          </div>
        </div>

        {/* AI Assistant Card */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-black text-gray-900">
                {t.aiAssistant}
              </h3>
            </div>
            <div className="flex items-center gap-2 bg-purple-100/50 px-3 py-1.5 rounded-full">
               <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse"></div>
               <span className="text-[10px] font-black text-purple-700 uppercase tracking-wider">Gemini 3.0 Live</span>
            </div>
          </div>
          
          <div className="flex-grow bg-[#FDFCFE] rounded-[2rem] p-6 border border-purple-100/50 relative">
            <div className="absolute bottom-4 right-4 text-[10px] font-bold text-purple-300 uppercase tracking-widest">Safety Context: Nepal</div>
            {loadingAdvice ? (
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <div className="relative">
                  <div className="w-12 h-12 border-4 border-purple-200 rounded-full"></div>
                  <div className="absolute inset-0 w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="text-purple-600 text-sm font-bold animate-pulse">Consulting local safety protocols...</p>
              </div>
            ) : (
              <div className="text-[15px] text-purple-900 leading-relaxed font-medium">
                {advice.split('\n').map((line, i) => (
                  <div key={i} className="flex gap-3 mb-3">
                    <span className="text-purple-300 mt-1">•</span>
                    <span>{line.replace(/^[•*-]\s*/, '')}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">
             <button className="group flex flex-col items-center gap-2 p-4 bg-red-50 hover:bg-red-500 rounded-[1.5rem] transition-all duration-300 border border-red-100 hover:border-red-400">
                <Power className="w-6 h-6 text-[#E71D36] group-hover:text-white transition-colors" />
                <span className="text-[10px] font-black text-[#E71D36] group-hover:text-white uppercase tracking-tighter">{t.emergencyShutoff}</span>
             </button>
             <button className="group flex flex-col items-center gap-2 p-4 bg-teal-50 hover:bg-teal-500 rounded-[1.5rem] transition-all duration-300 border border-teal-100 hover:border-teal-400">
                <Wind className="w-6 h-6 text-[#2EC4B6] group-hover:text-white transition-colors" />
                <span className="text-[10px] font-black text-[#2EC4B6] group-hover:text-white uppercase tracking-tighter">{t.ventilation}</span>
             </button>
             <button className="group flex flex-col items-center gap-2 p-4 bg-blue-50 hover:bg-blue-900 rounded-[1.5rem] transition-all duration-300 border border-blue-100 hover:border-blue-800">
                <PhoneCall className="w-6 h-6 text-[#1A365D] group-hover:text-white transition-colors" />
                <span className="text-[10px] font-black text-[#1A365D] group-hover:text-white uppercase tracking-tighter">{t.callHelp}</span>
             </button>
          </div>
        </div>

        {/* Chart Section */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-gray-900 flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-[#2EC4B6]" />
              {t.weeklyStats}
            </h3>
            <div className="flex gap-2">
              {['24H', '7D', '1M'].map(period => (
                <button key={period} className={`px-4 py-1.5 rounded-xl text-[10px] font-black transition-all ${period === '24H' ? 'bg-[#1A365D] text-white shadow-lg' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}>
                  {period}
                </button>
              ))}
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_CHART_DATA}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={ppm > 200 ? '#FF6B35' : '#1A365D'} stopOpacity={0.1}/>
                    <stop offset="95%" stopColor={ppm > 200 ? '#FF6B35' : '#1A365D'} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#94a3b8', fontWeight: 600}} dy={10} />
                <YAxis hide domain={[0, 1000]} />
                <Tooltip 
                  cursor={{ stroke: '#f1f5f9', strokeWidth: 2 }}
                  contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px 16px'}}
                  itemStyle={{fontWeight: 'bold', color: '#1A365D'}}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke={ppm > 200 ? '#FF6B35' : '#1A365D'} 
                  strokeWidth={4} 
                  dot={false}
                  activeDot={{ r: 8, fill: '#FF6B35', strokeWidth: 4, stroke: '#fff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="lg:col-span-1 grid grid-cols-1 gap-4">
           <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 flex items-center justify-between group overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-5 transform group-hover:scale-110 transition-transform">
                <Activity className="w-24 h-24" />
              </div>
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-teal-50 rounded-3xl flex items-center justify-center border border-teal-100">
                  <Activity className="w-8 h-8 text-[#2EC4B6]" />
                </div>
                <div>
                  <span className="text-3xl font-black text-gray-900">98</span>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">{t.safetyScore}</p>
                </div>
              </div>
           </div>

           <div className="bg-[#1A365D] p-8 rounded-[2.5rem] shadow-xl flex items-center justify-between text-white group overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10 transform group-hover:rotate-12 transition-transform">
                <Shield className="w-24 h-24" />
              </div>
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                  <Shield className="w-8 h-8 text-[#2EC4B6]" />
                </div>
                <div>
                  <span className="text-3xl font-black">02</span>
                  <p className="text-[10px] opacity-60 font-black uppercase tracking-[0.2em]">Connected Units</p>
                </div>
              </div>
           </div>

           <div className="bg-[#FF6B35] p-8 rounded-[2.5rem] shadow-xl flex flex-col justify-between text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-20">
                <Battery className={`w-20 h-20 ${!isMainsPower && 'animate-pulse'}`} />
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <Battery className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] opacity-80 font-black uppercase tracking-wider">Hub Battery</p>
                  <p className="text-xl font-black">84% Capacity</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-auto">
                 <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">
                   {isMainsPower ? 'Power: AC Mains' : 'Power: DC Backup'}
                 </span>
                 <div className="flex gap-1">
                   <div className="w-1.5 h-3 bg-white/40 rounded-full"></div>
                   <div className="w-1.5 h-3 bg-white/40 rounded-full"></div>
                   <div className="w-1.5 h-3 bg-white rounded-full"></div>
                 </div>
              </div>
           </div>
        </div>

      </div>

      {/* Sensor List Section */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-black text-gray-900 flex items-center gap-3">
            <Activity className="w-6 h-6 text-[#FF6B35]" />
            {t.activeSensors}
          </h3>
          <button className="text-[10px] font-black text-[#1A365D] uppercase tracking-[0.2em] hover:underline">Manage All Devices</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_SENSORS.map(sensor => (
            <div key={sensor.id} className="p-6 rounded-[2rem] border border-gray-100 bg-gray-50/50 flex flex-col gap-5 hover:bg-white hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm ${sensor.status === 'warning' ? 'bg-[#E71D36] animate-pulse' : 'bg-[#10B981]'}`}></div>
                  <div>
                    <h4 className="font-black text-gray-900">{sensor.name}</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{sensor.location}</p>
                  </div>
                </div>
                <div className="p-2 bg-white rounded-xl shadow-sm border border-gray-50 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Activity className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              
              <div className="flex items-end justify-between">
                <div className="space-y-1">
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-none">Reading</p>
                  <p className="text-2xl font-black text-gray-900">{sensor.ppm} <span className="text-xs text-gray-300">PPM</span></p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-1">
                    <Battery className={`w-3.5 h-3.5 ${sensor.battery < 20 ? 'text-[#E71D36]' : 'text-gray-300'}`} />
                    <span className="text-xs font-black text-gray-500">{sensor.battery}%</span>
                  </div>
                  <span className="text-[9px] text-gray-300 font-bold uppercase">Signal: Good</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
