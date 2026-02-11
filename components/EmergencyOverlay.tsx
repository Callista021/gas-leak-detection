
import React from 'react';
import { TriangleAlert, Phone, MapPin, X, FlameKindling, ZapOff, Users } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface EmergencyOverlayProps {
  language: Language;
  onDismiss: () => void;
}

const EmergencyOverlay: React.FC<EmergencyOverlayProps> = ({ language, onDismiss }) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="fixed inset-0 z-[100] bg-[#E71D36] flex flex-col text-white overflow-hidden p-6">
      <div className="absolute top-6 right-6">
        <button 
          onClick={onDismiss}
          className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-lg mx-auto space-y-8">
        <div className="relative">
          <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-20 scale-150"></div>
          <div className="relative w-24 h-24 bg-white rounded-full flex items-center justify-center">
            <TriangleAlert className="w-12 h-12 text-[#E71D36] animate-bounce" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">{t.danger}!</h1>
          <p className="text-xl font-bold opacity-90">{t.evacuateMsg}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 w-full">
           <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl flex items-center gap-4 border border-white/20 text-left">
              <ZapOff className="w-8 h-8 flex-shrink-0" />
              <div>
                <p className="font-bold text-lg">Step 1</p>
                <p className="text-sm opacity-80">{t.dontSwitchMsg}</p>
              </div>
           </div>
           <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl flex items-center gap-4 border border-white/20 text-left">
              <Users className="w-8 h-8 flex-shrink-0" />
              <div>
                <p className="font-bold text-lg">Step 2</p>
                <p className="text-sm opacity-80">{t.notifiedMsg}</p>
              </div>
           </div>
           <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl flex items-center gap-4 border border-white/20 text-left">
              <MapPin className="w-8 h-8 flex-shrink-0" />
              <div>
                <p className="font-bold text-lg">Your Location</p>
                <p className="text-sm opacity-80">Kathmandu Metropolitan, Ward 32</p>
              </div>
           </div>
        </div>

        <div className="w-full space-y-4">
          <p className="text-xs uppercase font-bold tracking-[0.2em] opacity-60">Call Emergency Services (Nepal)</p>
          <div className="grid grid-cols-3 gap-3">
             <a href="tel:101" className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl text-[#E71D36] font-bold">
               <FlameKindling className="w-6 h-6" />
               <span>101</span>
             </a>
             <a href="tel:100" className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl text-[#E71D36] font-bold">
               <Phone className="w-6 h-6" />
               <span>100</span>
             </a>
             <a href="tel:102" className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl text-[#E71D36] font-bold">
               <Users className="w-6 h-6" />
               <span>102</span>
             </a>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center opacity-50 text-[10px] font-bold uppercase tracking-widest pb-4">
        Stay safe • Do not re-enter building until cleared by professionals
      </div>
    </div>
  );
};

export default EmergencyOverlay;
