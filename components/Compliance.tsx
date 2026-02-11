
import React from 'react';
import { 
  ClipboardCheck, 
  FileText, 
  AlertTriangle, 
  Calendar, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  BookOpen,
  Info,
  CalendarDays,
  Flame,
  Clock,
  // Fix: Added ChevronRight to the import list to resolve undefined component errors
  ChevronRight
} from 'lucide-react';

const Compliance: React.FC = () => {
  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <ClipboardCheck className="w-6 h-6 text-[#FF6B35]" />
            Safety & Compliance
          </h1>
          <p className="text-gray-500">Regulatory standards and proactive safety management for Nepal</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#1A365D] text-white rounded-xl text-sm font-bold hover:bg-blue-900 shadow-lg shadow-blue-100 transition-all">
            <FileText className="w-4 h-4" /> Generate Safety PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Compliance Progress & Checklist */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
              <div className="relative w-32 h-32 mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="64" cy="64" r="58" stroke="#f1f5f9" strokeWidth="12" fill="none" />
                  <circle cx="64" cy="64" r="58" stroke="#10B981" strokeWidth="12" fill="none" strokeDasharray="364.4" strokeDashoffset="54.6" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black text-gray-800">85%</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Score</span>
                </div>
              </div>
              <h3 className="font-bold text-gray-800">Safety Readiness</h3>
              <p className="text-xs text-gray-400 mt-1">Excellent readiness level. 2 items pending for perfect compliance.</p>
            </div>

            <div className="bg-[#FF6B35] p-8 rounded-[2rem] text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-20">
                 <Flame className="w-24 h-24" />
               </div>
               <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                 <CalendarDays className="w-5 h-5" />
                 Upcoming Audits
               </h3>
               <div className="space-y-4 relative z-10">
                 <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold">Calibration Hub Kathmandu</p>
                      <p className="text-[10px] opacity-70">Nov 15, 2024</p>
                    </div>
                    <span className="text-[10px] font-black bg-white text-[#FF6B35] px-2 py-1 rounded">DUE SOON</span>
                 </div>
                 <div className="bg-white/10 p-3 rounded-2xl flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold">Annual Safety Drill</p>
                      <p className="text-[10px] opacity-70">Dec 01, 2024</p>
                    </div>
                    <span className="text-[10px] font-black bg-white/20 px-2 py-1 rounded text-white">PLANNED</span>
                 </div>
               </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-[#2EC4B6]" />
              Mandatory Safety Checklist
            </h3>
            <div className="space-y-4">
              {[
                { title: 'Monthly Sensor Calibration', desc: 'Ensure sensors are detecting within error margins.', done: true },
                { title: 'Emergency Contact Verification', desc: 'Confirm all 5 emergency numbers are reachable.', done: true },
                { title: 'Ventilation System Check', desc: 'Test automated exhaust fans and window vents.', done: false },
                { title: 'LPG Regulator Inspection', desc: 'Check for physical wear or leakage on regulators.', done: true },
                { title: 'Staff/Family Training', desc: 'Ensure everyone knows how to use the "Emergency Mode".', done: false }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors group cursor-pointer">
                  <div className={`mt-1 w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${item.done ? 'bg-teal-100 text-teal-600' : 'bg-gray-100 text-gray-300 group-hover:bg-teal-50 group-hover:text-teal-400'}`}>
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h4 className={`text-sm font-bold ${item.done ? 'text-gray-800' : 'text-gray-500'}`}>{item.title}</h4>
                    <p className="text-xs text-gray-400">{item.desc}</p>
                  </div>
                  {!item.done && (
                    <button className="text-[10px] font-black text-[#FF6B35] uppercase tracking-wider hover:underline">Complete Now</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cylinder Management & Guides */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Flame className="w-5 h-5 text-[#FF6B35]" />
              Cylinder Management
            </h4>
            <div className="space-y-4">
               <div className="p-4 rounded-2xl bg-orange-50 border border-orange-100">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-orange-900">Unit 01: KTM Main</span>
                    <span className="text-[8px] bg-orange-200 text-orange-700 px-2 py-1 rounded-full font-black">EXPIRING</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-4 h-4 text-orange-600" />
                    <span className="text-xs font-bold text-orange-800">Exp: Dec 2024</span>
                  </div>
                  <div className="w-full h-1.5 bg-orange-200 rounded-full overflow-hidden">
                    <div className="w-[90%] h-full bg-orange-600"></div>
                  </div>
               </div>
               
               <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-gray-700">Unit 02: Backup Storage</span>
                    <span className="text-[8px] bg-green-100 text-green-700 px-2 py-1 rounded-full font-black">HEALTHY</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-xs font-bold text-gray-600">Exp: Oct 2026</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="w-[15%] h-full bg-green-500"></div>
                  </div>
               </div>
            </div>
            <button className="w-full mt-6 py-3 border-2 border-dashed border-gray-200 text-gray-400 rounded-2xl text-xs font-bold hover:border-[#FF6B35] hover:text-[#FF6B35] transition-all">
              + Add New Cylinder
            </button>
          </div>

          <div className="bg-[#1A365D] p-8 rounded-[2rem] text-white space-y-6">
            <h4 className="font-bold text-lg flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#2EC4B6]" />
              Regulatory Guides
            </h4>
            <div className="space-y-4">
              <a href="#" className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <Info className="w-4 h-4 text-[#2EC4B6]" />
                  <span className="text-sm opacity-80 group-hover:opacity-100 transition-opacity">Nepal Fire Safety Act 2075</span>
                </div>
                {/* Fixed: ChevronRight icon usage fixed by adding to imports */}
                <ChevronRight className="w-4 h-4 opacity-40 group-hover:translate-x-1 transition-all" />
              </a>
              <a href="#" className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <Info className="w-4 h-4 text-[#2EC4B6]" />
                  <span className="text-sm opacity-80 group-hover:opacity-100 transition-opacity">LPG Handling Best Practices</span>
                </div>
                {/* Fixed: ChevronRight icon usage fixed by adding to imports */}
                <ChevronRight className="w-4 h-4 opacity-40 group-hover:translate-x-1 transition-all" />
              </a>
              <a href="#" className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <Info className="w-4 h-4 text-[#2EC4B6]" />
                  <span className="text-sm opacity-80 group-hover:opacity-100 transition-opacity">Insurance Compliance Checklist</span>
                </div>
                {/* Fixed: ChevronRight icon usage fixed by adding to imports */}
                <ChevronRight className="w-4 h-4 opacity-40 group-hover:translate-x-1 transition-all" />
              </a>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl">
               <p className="text-[10px] font-bold text-[#2EC4B6] uppercase mb-2">Did You Know?</p>
               <p className="text-xs opacity-70 leading-relaxed italic">"Regular calibration can reduce gas waste by up to 12% in commercial kitchens." - Dept. of Quality Control, Nepal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compliance;
