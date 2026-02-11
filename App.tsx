
import React, { useState, useEffect } from 'react';
import { Language } from './types';
import { TRANSLATIONS, COLORS } from './constants';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import Monitoring from './components/Monitoring';
import Compliance from './components/Compliance';
import EmergencyOverlay from './components/EmergencyOverlay';
import Onboarding from './components/Onboarding';
import { 
  LayoutDashboard, 
  Settings as SettingsIcon, 
  Map as MapIcon, 
  ClipboardCheck, 
  LogOut,
  Languages,
  Menu,
  X,
  PhoneCall,
  User,
  // Added Shield to fix "Cannot find name 'Shield'" error
  Shield
} from 'lucide-react';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>(Language.EN);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [ppm, setPpm] = useState(245);
  const [isEmergencyDismissed, setIsEmergencyDismissed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Check for first-time user
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('gasguard_onboarded');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('gasguard_onboarded', 'true');
    setShowOnboarding(false);
  };

  const t = TRANSLATIONS[language];

  // Auto-activate emergency if PPM > 500
  useEffect(() => {
    if (ppm > 500) {
      setIsEmergencyDismissed(false);
    }
  }, [ppm]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === Language.EN ? Language.NP : Language.EN);
  };

  const navItems = [
    { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard },
    { id: 'monitoring', label: t.monitoring, icon: MapIcon },
    { id: 'compliance', label: t.compliance, icon: ClipboardCheck },
    { id: 'settings', label: t.settings, icon: SettingsIcon },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard language={language} ppm={ppm} onPpmChange={setPpm} />;
      case 'monitoring':
        return <Monitoring />;
      case 'compliance':
        return <Compliance />;
      case 'settings':
        return <Settings language={language} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <ClipboardCheck className="w-12 h-12" />
            </div>
            <h2 className="text-xl font-bold text-gray-600">Module Under Maintenance</h2>
            <p className="max-w-xs text-center">We're updating the {activeTab} section for better safety insights in Nepal.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col md:flex-row">
      {showOnboarding && <Onboarding language={language} onComplete={handleOnboardingComplete} />}

      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-80 bg-[#1A365D] text-white flex-col p-8 sticky top-0 h-screen overflow-hidden">
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
           <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-[#2EC4B6] rounded-full blur-[100px]"></div>
           <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-[#FF6B35] rounded-full blur-[100px]"></div>
        </div>

        <div className="flex items-center gap-4 mb-16 relative z-10">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-2xl rotate-3">
            <Shield className="text-[#1A365D] w-7 h-7" />
          </div>
          <div>
            <span className={`text-2xl font-black tracking-tighter ${language === Language.NP ? 'nepali' : ''}`}>
              {t.appName}
            </span>
            <p className="text-[10px] font-bold text-[#2EC4B6] uppercase tracking-[0.2em] leading-none mt-1">Nepal Safety Hub</p>
          </div>
        </div>

        <nav className="flex-1 space-y-3 relative z-10">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-[1.25rem] transition-all duration-300 ${
                activeTab === item.id 
                  ? 'bg-white text-[#1A365D] shadow-2xl translate-x-2' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-[#FF6B35]' : ''}`} />
              <span className={`font-black tracking-tight ${language === Language.NP ? 'nepali' : ''}`}>{item.label}</span>
              {activeTab === item.id && <div className="ml-auto w-1.5 h-1.5 bg-[#FF6B35] rounded-full"></div>}
            </button>
          ))}
        </nav>

        <div className="mt-auto space-y-6 relative z-10">
          <div className="p-5 bg-white/5 rounded-[1.5rem] border border-white/10">
             <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 bg-[#2EC4B6] rounded-xl flex items-center justify-center">
                 <User className="w-5 h-5 text-white" />
               </div>
               <div>
                 <p className="text-xs font-bold text-white leading-none">Aashish K.</p>
                 <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest">Premium User</p>
               </div>
             </div>
             <button 
              onClick={toggleLanguage}
              className="w-full flex items-center justify-between px-4 py-3 bg-white/5 rounded-xl text-xs font-bold text-white hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Languages className="w-4 h-4 text-[#2EC4B6]" />
                <span>{language === Language.EN ? 'नेपाली' : 'English'}</span>
              </div>
              <span className="opacity-40">{language === Language.EN ? 'NP' : 'EN'}</span>
            </button>
          </div>
          
          <button className="w-full flex items-center gap-4 px-5 py-2 text-red-400/60 hover:text-red-400 transition-colors text-xs font-black uppercase tracking-widest">
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <div className="md:hidden bg-[#1A365D] text-white p-5 flex items-center justify-between sticky top-0 z-50 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
            <Shield className="text-[#1A365D] w-6 h-6" />
          </div>
          <span className={`text-xl font-black tracking-tighter ${language === Language.NP ? 'nepali' : ''}`}>{t.appName}</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 bg-white/10 rounded-xl">
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-[#1A365D] z-40 p-10 flex flex-col pt-24 md:hidden">
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5 overflow-hidden">
            <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-[#2EC4B6] rounded-full blur-[100px]"></div>
          </div>
          <nav className="space-y-6 relative z-10">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-5 px-8 py-5 rounded-[2rem] text-xl font-black ${
                  activeTab === item.id ? 'bg-white text-[#1A365D] shadow-2xl scale-105' : 'text-gray-400'
                }`}
              >
                <item.icon className={`w-7 h-7 ${activeTab === item.id ? 'text-[#FF6B35]' : ''}`} />
                <span className="tracking-tight">{item.label}</span>
              </button>
            ))}
          </nav>
          <div className="mt-auto space-y-6 relative z-10">
            <button onClick={toggleLanguage} className="w-full p-6 bg-white/10 rounded-[2rem] text-white font-black text-lg flex items-center justify-between border border-white/10">
              <div className="flex items-center gap-4">
                <Languages className="w-6 h-6 text-[#2EC4B6]" /> 
                {language === Language.EN ? 'नेपाली' : 'English'}
              </div>
              <span className="text-xs opacity-40 uppercase">{language === Language.EN ? 'NP' : 'EN'}</span>
            </button>
            <button className="w-full py-4 text-red-400 font-black uppercase tracking-[0.2em] text-sm">Logout</button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {renderContent()}
      </main>

      {/* Emergency Mode Overlay */}
      {ppm > 500 && !isEmergencyDismissed && (
        <EmergencyOverlay 
          language={language} 
          onDismiss={() => setIsEmergencyDismissed(true)} 
        />
      )}

      {/* Persistent Call to Action (Floating Action for Mobile) */}
      <div className="fixed bottom-8 right-8 md:hidden z-30">
         <button className="w-18 h-18 bg-[#E71D36] rounded-[2rem] shadow-[0_20px_50px_rgba(231,29,54,0.4)] flex items-center justify-center animate-pulse-red text-white">
            <PhoneCall className="w-8 h-8" />
         </button>
      </div>
    </div>
  );
};

export default App;
