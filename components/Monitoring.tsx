
import React, { useState, useMemo } from 'react';
import { 
  Map as MapIcon, 
  Activity, 
  Wifi, 
  Battery, 
  ChevronRight, 
  Search, 
  Filter,
  History,
  AlertCircle,
  CheckCircle2,
  Clock,
  X,
  Check
} from 'lucide-react';
import { MOCK_SENSORS } from '../constants';

type SensorStatus = 'online' | 'offline' | 'warning' | 'all';

const Monitoring: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<SensorStatus>('all');
  const [lowBatteryOnly, setLowBatteryOnly] = useState(false);
  const [timeFilter, setTimeFilter] = useState<'all' | 'recent' | 'today'>('all');

  const filteredSensors = useMemo(() => {
    return MOCK_SENSORS.filter(sensor => {
      const matchesSearch = sensor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           sensor.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || sensor.status === statusFilter;
      const matchesBattery = !lowBatteryOnly || sensor.battery < 30; // Using 30% as threshold for demo
      
      // Mock time filtering logic
      let matchesTime = true;
      if (timeFilter === 'recent') {
        matchesTime = sensor.lastUpdated === 'Now' || sensor.lastUpdated.includes('2 mins');
      }

      return matchesSearch && matchesStatus && matchesBattery && matchesTime;
    });
  }, [searchQuery, statusFilter, lowBatteryOnly, timeFilter]);

  const activeFilterCount = (statusFilter !== 'all' ? 1 : 0) + (lowBatteryOnly ? 1 : 0) + (timeFilter !== 'all' ? 1 : 0);

  const clearFilters = () => {
    setStatusFilter('all');
    setLowBatteryOnly(false);
    setTimeFilter('all');
  };

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <MapIcon className="w-6 h-6 text-[#2EC4B6]" />
            Real-time Monitoring
          </h1>
          <p className="text-gray-500">Live spatial view and health status of all connected devices</p>
        </div>
        <div className="flex gap-2 relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search sensors..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2EC4B6]/20 transition-all w-full md:w-64"
            />
          </div>
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`p-2 rounded-xl transition-all relative flex items-center gap-2 border ${
              activeFilterCount > 0 
                ? 'bg-[#1A365D] text-white border-[#1A365D]' 
                : 'bg-white border-gray-100 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Filter className="w-5 h-5" />
            {activeFilterCount > 0 && (
              <span className="bg-[#FF6B35] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center absolute -top-1 -right-1">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Filter Dropdown */}
          {isFilterOpen && (
            <div className="absolute right-0 top-12 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 p-6 animate-in fade-in zoom-in duration-200">
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-bold text-gray-800">Filter Options</h4>
                <button onClick={() => setIsFilterOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Status Filter */}
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-3">Status</label>
                  <div className="flex flex-wrap gap-2">
                    {(['all', 'online', 'warning', 'offline'] as const).map(s => (
                      <button
                        key={s}
                        onClick={() => setStatusFilter(s)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          statusFilter === s 
                            ? 'bg-[#2EC4B6] text-white shadow-md' 
                            : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                        }`}
                      >
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Battery Toggle */}
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-bold text-gray-700">Low Battery Only</label>
                    <p className="text-[10px] text-gray-400">Sensors below 30%</p>
                  </div>
                  <button 
                    onClick={() => setLowBatteryOnly(!lowBatteryOnly)}
                    className={`w-10 h-6 rounded-full transition-colors relative ${lowBatteryOnly ? 'bg-[#FF6B35]' : 'bg-gray-200'}`}
                  >
                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${lowBatteryOnly ? 'translate-x-4' : ''}`}></div>
                  </button>
                </div>

                {/* Recent Activity */}
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-3">Last Updated</label>
                  <select 
                    value={timeFilter}
                    onChange={(e) => setTimeFilter(e.target.value as any)}
                    className="w-full bg-gray-50 border-none rounded-xl px-3 py-2 text-sm font-semibold text-gray-700 focus:ring-2 focus:ring-[#2EC4B6]/20"
                  >
                    <option value="all">Any time</option>
                    <option value="recent">Last 5 minutes</option>
                    <option value="today">Today</option>
                  </select>
                </div>

                <div className="pt-4 border-t border-gray-50 flex gap-3">
                  <button 
                    onClick={clearFilters}
                    className="flex-1 py-2 text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    Reset All
                  </button>
                  <button 
                    onClick={() => setIsFilterOpen(false)}
                    className="flex-1 py-2 bg-[#1A365D] text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-900/10"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Map View Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="relative aspect-video bg-blue-50 rounded-[2rem] border-4 border-white shadow-xl overflow-hidden group">
            {/* Mock Map Background */}
            <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/85.3240,27.7172,12,0/800x600?access_token=mock')] bg-cover opacity-40"></div>
            
            {/* Map Interaction Layer */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Kathmandu Center Marker */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#1A365D] text-white text-[10px] font-bold px-2 py-1 rounded-full whitespace-nowrap shadow-lg">
                  KTM Main Hub
                </div>
                <div className="w-12 h-12 bg-[#1A365D]/20 rounded-full animate-ping"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-[#1A365D] border-4 border-white rounded-full shadow-lg"></div>
              </div>
            </div>

            {/* Float Menu */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-white/50 flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs font-bold text-gray-700">Online: 12</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-bold text-gray-700">Alerts: 1</span>
                </div>
              </div>
              <button className="bg-[#1A365D] text-white p-3 rounded-2xl shadow-xl hover:scale-110 transition-transform">
                <MapIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Detailed Sensor Grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
               <h3 className="font-bold text-gray-800">Sensors ({filteredSensors.length})</h3>
               {activeFilterCount > 0 && (
                 <button onClick={clearFilters} className="text-[10px] font-black text-[#FF6B35] uppercase tracking-widest hover:underline">Clear all filters</button>
               )}
            </div>
            {filteredSensors.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl border border-dashed border-gray-200 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-gray-200" />
                </div>
                <h4 className="font-bold text-gray-800">No sensors match your filters</h4>
                <p className="text-sm text-gray-400 mt-1 max-w-xs">Try adjusting your search or filters to see more devices.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredSensors.map(sensor => (
                  <div key={sensor.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:border-[#2EC4B6]/30 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-2xl ${sensor.status === 'warning' ? 'bg-red-50 text-red-500' : 'bg-teal-50 text-teal-500'}`}>
                          <Activity className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800">{sensor.name}</h4>
                          <p className="text-xs text-gray-400">{sensor.location}</p>
                        </div>
                      </div>
                      <div className={`text-[10px] font-black px-2 py-1 rounded uppercase tracking-wider ${sensor.status === 'warning' ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-green-100 text-green-600'}`}>
                        {sensor.status}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 py-4 border-y border-gray-50 my-4">
                      <div className="text-center">
                        <p className="text-[10px] font-bold text-gray-400 uppercase">Level</p>
                        <p className="text-sm font-black text-gray-800">{sensor.ppm} <span className="text-[8px]">ppm</span></p>
                      </div>
                      <div className="text-center border-x border-gray-50">
                        <p className="text-[10px] font-bold text-gray-400 uppercase">Signal</p>
                        <div className="flex items-center justify-center gap-1">
                          <Wifi className="w-3 h-3 text-[#2EC4B6]" />
                          <p className="text-sm font-black text-gray-800">92%</p>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] font-bold text-gray-400 uppercase">Power</p>
                        <div className="flex items-center justify-center gap-1">
                          <Battery className={`w-3 h-3 ${sensor.battery < 30 ? 'text-red-500' : 'text-gray-400'}`} />
                          <p className="text-sm font-black text-gray-800">{sensor.battery}%</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                       <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1">
                         <Clock className="w-3 h-3" /> Updated {sensor.lastUpdated}
                       </span>
                       <button className="flex items-center justify-center gap-2 py-2 text-xs font-bold text-[#1A365D] hover:bg-gray-50 rounded-xl transition-colors">
                        Diagnostics <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Timeline & Notifications Panel */}
        <div className="space-y-6">
          <div className="bg-[#1A365D] text-white p-8 rounded-[2rem] shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <History className="w-32 h-32" />
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#2EC4B6]" />
                Incident Timeline
              </h3>
              
              <div className="space-y-8 relative before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
                <div className="relative pl-10">
                  <div className="absolute left-0 top-1 w-5 h-5 bg-red-500 border-4 border-[#1A365D] rounded-full shadow-lg animate-pulse"></div>
                  <p className="text-xs font-bold text-red-400">09:42 AM Today</p>
                  <h4 className="font-bold text-sm">Critical Alert Triggered</h4>
                  <p className="text-xs text-white/60 leading-relaxed mt-1">LPG Storage recorded 550ppm. Automated SMS sent to 3 contacts.</p>
                </div>

                <div className="relative pl-10">
                  <div className="absolute left-0 top-1 w-5 h-5 bg-[#2EC4B6] border-4 border-[#1A365D] rounded-full shadow-lg"></div>
                  <p className="text-xs font-bold text-[#2EC4B6]">Yesterday 04:15 PM</p>
                  <h4 className="font-bold text-sm">Sensor Calibration Successful</h4>
                  <p className="text-xs text-white/60 leading-relaxed mt-1">Kitchen Main was recalibrated. Deviation within ±2% limits.</p>
                </div>

                <div className="relative pl-10">
                  <div className="absolute left-0 top-1 w-5 h-5 bg-blue-400 border-4 border-[#1A365D] rounded-full shadow-lg"></div>
                  <p className="text-xs font-bold text-blue-300">Oct 24, 11:30 AM</p>
                  <h4 className="font-bold text-sm">New Device Registered</h4>
                  <p className="text-xs text-white/60 leading-relaxed mt-1">"Restaurant Unit A" added to Pokhara branch dashboard.</p>
                </div>
              </div>

              <button className="w-full mt-10 py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-sm font-bold transition-all">
                Download Full Log
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              System Status
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">GSM Gateway</span>
                <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded">CONNECTED</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Database Sync</span>
                <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded">SYNCHRONIZED</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">API Latency</span>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">124ms</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monitoring;
