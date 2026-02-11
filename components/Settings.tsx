
import React, { useState } from 'react';
// Fixed: Imported Settings as SettingsIcon from lucide-react to avoid name collision with the component itself
import { Check, ShieldCheck, Zap, Crown, CreditCard, ChevronRight, Sparkles, Settings as SettingsIcon, QrCode, Plus, Camera, X } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface SettingsProps {
  language: Language;
}

const Settings: React.FC<SettingsProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [showScanner, setShowScanner] = useState(false);

  const tiers = [
    {
      id: 'free',
      name: 'Free',
      price: 'रु ०',
      description: 'Essential safety for every home.',
      features: [
        'Real-time Monitoring',
        'Push Notifications',
        '1 Sensor Support',
        'Standard AI Advice',
      ],
      current: true,
      icon: Zap,
      color: 'bg-gray-100',
      textColor: 'text-gray-600',
      buttonStyle: 'bg-gray-200 text-gray-400 cursor-not-allowed border-none',
    },
    {
      id: 'basic',
      name: 'Basic',
      price: 'रु ४९९ / month',
      description: 'Enhanced alerts for small businesses.',
      features: [
        'Everything in Free',
        'SMS Alerts (Nepal-wide)',
        '3 Sensor Support',
        '7-Day History Reports',
        'Email Support',
      ],
      current: false,
      icon: ShieldCheck,
      color: 'bg-blue-50',
      textColor: 'text-blue-600',
      buttonStyle: 'bg-[#1A365D] text-white hover:bg-blue-900 shadow-lg shadow-blue-900/20 active:scale-95 transition-all',
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 'रु ९९९ / month',
      description: 'Maximum protection & compliance.',
      features: [
        'Everything in Basic',
        'Priority Emergency Dispatch',
        'Insurance Coverage Badge',
        'Unlimited Sensors',
        'Advanced AI Analytics',
        'Custom Safety Thresholds',
      ],
      current: false,
      icon: Crown,
      color: 'bg-orange-50',
      textColor: 'text-orange-600',
      highlight: true,
      buttonStyle: 'bg-[#FF6B35] text-white hover:bg-orange-600 shadow-xl shadow-orange-500/30 hover:scale-[1.03] active:scale-95 transition-all',
    },
  ];

  return (
    <div className="p-4 md:p-8 space-y-10 max-w-7xl mx-auto">
      {/* QR Scanner Overlay */}
      {showScanner && (
        <div className="fixed inset-0 z-[150] bg-black/95 flex flex-col items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute top-8 right-8">
            <button 
              onClick={() => setShowScanner(false)} 
              className="p-4 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors backdrop-blur-md"
            >
              <X className="w-8 h-8" />
            </button>
          </div>
          
          <div className="w-full max-w-sm aspect-square border-4 border-[#2EC4B6]/50 rounded-[3rem] relative overflow-hidden flex items-center justify-center">
            {/* Corner Markers */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-8 border-l-8 border-[#2EC4B6] rounded-tl-3xl"></div>
            <div className="absolute top-0 right-0 w-16 h-16 border-t-8 border-r-8 border-[#2EC4B6] rounded-tr-3xl"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-8 border-l-8 border-[#2EC4B6] rounded-bl-3xl"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-8 border-r-8 border-[#2EC4B6] rounded-br-3xl"></div>
            
            {/* Scanner Animation */}
            <div className="absolute inset-0 bg-white/5 animate-pulse"></div>
            <div className="absolute left-0 right-0 h-1 bg-[#2EC4B6] shadow-[0_0_20px_#2EC4B6] animate-scan z-10"></div>
            <Camera className="w-24 h-24 text-white/10" />
          </div>

          <div className="mt-16 text-center text-white space-y-4 max-w-xs">
            <div className="flex justify-center">
              <div className="p-4 bg-[#2EC4B6]/20 rounded-full">
                <QrCode className="w-8 h-8 text-[#2EC4B6]" />
              </div>
            </div>
            <h3 className="text-2xl font-black tracking-tight">Scanner Active</h3>
            <p className="text-white/60 text-sm leading-relaxed">Align the QR code on the back of your GasGuard Hub within the frame for automatic pairing.</p>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <SettingsIcon className="w-8 h-8 text-[#1A365D]" />
            {t.settings}
          </h1>
          <p className="text-gray-500 text-lg">Manage your account, safety thresholds, and plan upgrades</p>
        </div>
      </div>

      {/* Device Management Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-teal-100 rounded-xl">
            <QrCode className="w-6 h-6 text-[#2EC4B6]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Device Management</h2>
        </div>
        <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 hover:shadow-xl transition-all duration-500">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-teal-50 rounded-[2rem] flex items-center justify-center border border-teal-100">
              <QrCode className="w-10 h-10 text-[#2EC4B6]" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-900 tracking-tight">Network Status</h4>
              <p className="text-sm text-gray-400 font-medium mt-1">2/3 Hubs Online • 1 Maintenance Due</p>
            </div>
          </div>
          <button 
            onClick={() => setShowScanner(true)}
            className="w-full md:w-auto px-10 py-5 bg-[#2EC4B6] text-white rounded-3xl font-black text-lg hover:bg-[#27b3a6] shadow-xl shadow-teal-100 flex items-center justify-center gap-3 transition-all hover:scale-[1.03] active:scale-95"
          >
            <Plus className="w-6 h-6 stroke-[3px]" />
            Add New Sensor
          </button>
        </div>
      </section>

      {/* Subscription Tiers Section */}
      <section className="space-y-10">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-orange-100 rounded-xl">
              <CreditCard className="w-6 h-6 text-[#FF6B35]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Subscription Plans</h2>
          </div>
          <p className="text-gray-400 text-sm ml-12">Upgrade for advanced Nepal-specific emergency dispatch and multi-sensor support.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-4">
          {tiers.map((tier) => (
            <div 
              key={tier.id}
              className={`relative flex flex-col p-8 rounded-[2.5rem] border-2 transition-all duration-500 group ${
                tier.highlight 
                  ? 'border-[#FF6B35] bg-white shadow-2xl scale-105 z-10' 
                  : 'border-gray-100 bg-white shadow-sm hover:border-gray-200'
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-[#FF6B35] text-white text-[12px] font-black uppercase tracking-[0.25em] px-8 py-2.5 rounded-full shadow-2xl flex items-center gap-2 whitespace-nowrap border-4 border-white">
                  <Sparkles className="w-4 h-4 fill-white" />
                  Most Recommended
                </div>
              )}

              <div className="flex items-center justify-between mb-8">
                <div className={`p-4 rounded-[1.25rem] ${tier.color} group-hover:scale-110 transition-transform duration-300`}>
                  <tier.icon className={`w-10 h-10 ${tier.textColor}`} />
                </div>
                {tier.current && (
                  <div className="flex items-center gap-2 text-[11px] font-black text-teal-600 bg-teal-50 px-4 py-2 rounded-full uppercase tracking-[0.1em] border border-teal-100 shadow-sm">
                    <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
                    Current Plan
                  </div>
                )}
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-black text-gray-900">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-4xl font-black text-gray-900">{tier.price}</span>
                  {tier.id !== 'free' && <span className="text-sm text-gray-400 font-semibold">/ month</span>}
                </div>
              </div>

              <p className="text-sm text-gray-500 mb-8 font-medium leading-relaxed">{tier.description}</p>

              <div className="flex-grow space-y-5 mb-10">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2">Includes</p>
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-4">
                    <div className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${tier.highlight ? 'bg-orange-100' : 'bg-blue-50'}`}>
                      <Check className={`w-4 h-4 ${tier.textColor} stroke-[4px]`} />
                    </div>
                    <span className="text-[15px] text-gray-700 font-semibold leading-tight">{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                disabled={tier.current}
                className={`w-full py-5 rounded-3xl font-black text-base transition-all duration-300 flex items-center justify-center gap-3 ${tier.buttonStyle}`}
              >
                {tier.current ? (
                  <>Current Plan</>
                ) : (
                  <>
                    Upgrade to {tier.name}
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Security & Preferences Quick Access */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
        <div className="p-10 bg-[#1A365D] rounded-[3rem] text-white flex items-center justify-between group cursor-pointer overflow-hidden relative shadow-2xl">
          <div className="absolute -top-6 -right-6 p-4 opacity-10 transform rotate-12 group-hover:scale-110 transition-transform duration-500">
            <ShieldCheck className="w-48 h-48" />
          </div>
          <div className="relative z-10 flex items-center gap-6">
            <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-white/10">
              <ShieldCheck className="w-8 h-8 text-[#2EC4B6]" />
            </div>
            <div>
              <h4 className="text-xl font-bold tracking-tight">Security & Privacy</h4>
              <p className="text-sm text-white/60 font-medium mt-1">Configure 2FA and encryption settings</p>
            </div>
          </div>
          <ChevronRight className="relative z-10 text-white/40 group-hover:text-white group-hover:translate-x-2 transition-all duration-300" />
        </div>

        <div className="p-10 bg-white rounded-[3rem] border border-gray-100 shadow-xl flex items-center justify-between group cursor-pointer hover:border-[#2EC4B6] transition-all duration-300">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-teal-50 rounded-3xl flex items-center justify-center border border-teal-100">
              <Zap className="w-8 h-8 text-[#2EC4B6]" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-800 tracking-tight">Alert Preferences</h4>
              <p className="text-sm text-gray-400 font-medium mt-1">Manage thresholds and SMS notifications</p>
            </div>
          </div>
          <ChevronRight className="text-gray-300 group-hover:text-[#2EC4B6] group-hover:translate-x-2 transition-all duration-300" />
        </div>
      </div>
    </div>
  );
};

export default Settings;
