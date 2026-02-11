
import React, { useState } from 'react';
import { Shield, Info, Activity, Bell, ChevronRight, X, Check } from 'lucide-react';
import { Language } from '../types';

interface OnboardingProps {
  onComplete: () => void;
  language: Language;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete, language }) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: language === 'en' ? 'Welcome to GasGuard' : 'ग्यासगार्डमा स्वागत छ',
      description: language === 'en' 
        ? 'Your professional partner for LPG safety in Nepal. Let’s get your home secured.' 
        : 'नेपालमा LPG सुरक्षाको लागि तपाईंको व्यावसायिक साझेदार। आउनुहोस् तपाईंको घर सुरक्षित गरौं।',
      icon: <Shield className="w-16 h-16 text-[#2EC4B6]" />,
      color: 'bg-teal-50'
    },
    {
      title: language === 'en' ? 'Understanding PPM' : 'PPM बुझ्नुहोस्',
      description: language === 'en'
        ? '0-200: Safe. 200-500: Warning (Open Windows). 500+: Danger (Evacuate).'
        : '०-२००: सुरक्षित। २००-५००: चेतावनी (झ्याल खोल्नुहोस्)। ५००+: खतरा (बाहिर निस्कनुहोस्)।',
      icon: <Activity className="w-16 h-16 text-[#FF6B35]" />,
      color: 'bg-orange-50'
    },
    {
      title: language === 'en' ? 'Real-time Alerts' : 'रियल-टाइम अलर्टहरू',
      description: language === 'en'
        ? 'Get instant SMS and Push notifications even during load shedding thanks to our GSM backup.'
        : 'हाम्रो GSM ब्याकअपको कारण लोडसेडिङको समयमा पनि तुरुन्तै SMS र पुश सूचनाहरू प्राप्त गर्नुहोस्।',
      icon: <Bell className="w-16 h-16 text-[#1A365D]" />,
      color: 'bg-blue-50'
    }
  ];

  return (
    <div className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center p-6 md:p-12">
      <div className="max-w-md w-full space-y-12 text-center">
        <div className={`w-32 h-32 mx-auto rounded-[2.5rem] flex items-center justify-center ${steps[step].color} transition-colors duration-500`}>
          {steps[step].icon}
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">{steps[step].title}</h2>
          <p className="text-gray-500 text-lg leading-relaxed">{steps[step].description}</p>
        </div>

        <div className="flex justify-center gap-2">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={`h-2 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-[#1A365D]' : 'w-2 bg-gray-200'}`}
            />
          ))}
        </div>

        <div className="pt-8">
          <button 
            onClick={() => step < steps.length - 1 ? setStep(step + 1) : onComplete()}
            className="w-full py-5 bg-[#1A365D] text-white rounded-3xl font-black text-lg shadow-2xl shadow-blue-900/20 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all"
          >
            {step === steps.length - 1 ? (language === 'en' ? 'Get Started' : 'सुरु गरौं') : (language === 'en' ? 'Next' : 'अर्को')}
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
