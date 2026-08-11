import React from 'react';
import { Compass, ShieldCheck, Sun, Clock, Users, Accessibility } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { PalmIcon } from './PalmIcon';
import { ImageWithFallback } from './ImageWithFallback';

interface HeroProps {
  lang: Language;
  onStartPlanning: () => void;
  onExploreDestinations: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onStartPlanning, onExploreDestinations }) => {
  const t = translations[lang];

  return (
    <section id="hero" className="relative overflow-hidden pt-6 pb-12 lg:pt-10 lg:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Bento Grid Header Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          
          {/* Main Hero Bento Card (Col 8) */}
          <div className="lg:col-span-8 bg-white dark:bg-[#241D18] rounded-3xl border border-[#F3E6D0] dark:border-[#493A2F] p-6 sm:p-10 shadow-sm flex flex-col justify-between space-y-6 transition-colors">
            
            <div className="space-y-4">
              {/* Top Tag Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F3] dark:bg-[#30251E] border border-[#F3E6D0] dark:border-[#493A2F] text-xs font-bold text-[#4F6F52] dark:text-[#D6AD72]">
                <PalmIcon className="w-4 h-4 text-[#C58B5C] dark:text-[#D6AD72]" />
                <span>{t.brandSub} — {lang === 'ar' ? 'خطط رحلتك الذكية' : 'Smart Travel Planner'}</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#3B2A22] dark:text-[#FAF8F3] leading-tight">
                {t.tagline}
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-[#3B2A22]/80 dark:text-[#C8BDB2] leading-relaxed font-medium max-w-2xl">
                {t.subTagline}
              </p>
            </div>

            {/* CTA Buttons Row */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={onStartPlanning}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#4F6F52] hover:bg-[#3B2A22] dark:hover:bg-[#C58B5C] text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <PalmIcon className="w-4 h-4 text-[#C58B5C] dark:text-[#D6AD72]" />
                <span>{t.heroPrimaryCta}</span>
              </button>

              <button
                onClick={onExploreDestinations}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#FAF8F3] dark:bg-[#30251E] hover:bg-[#F3E6D0] dark:hover:bg-[#493A2F] text-[#3B2A22] dark:text-[#FAF8F3] font-bold text-sm border border-[#F3E6D0] dark:border-[#493A2F] transition-all flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4 text-[#C58B5C] dark:text-[#D6AD72]" />
                <span>{t.heroSecondaryCta}</span>
              </button>
            </div>

            {/* Quick Metrics Bar in Bento Style */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-[#F3E6D0] dark:border-[#493A2F]">
              <div className="bg-[#FAF8F3] dark:bg-[#30251E] p-3 rounded-2xl border border-[#F3E6D0] dark:border-[#493A2F] text-center space-y-0.5">
                <span className="text-[11px] font-bold text-[#C58B5C] dark:text-[#D6AD72] block">{lang === 'ar' ? 'ملاءمة الكراسي' : 'Accessibility'}</span>
                <span className="text-xs font-bold text-[#3B2A22] dark:text-[#FAF8F3]">100% {lang === 'ar' ? 'متاح' : 'Step-Free'}</span>
              </div>
              <div className="bg-[#FAF8F3] dark:bg-[#30251E] p-3 rounded-2xl border border-[#F3E6D0] dark:border-[#493A2F] text-center space-y-0.5">
                <span className="text-[11px] font-bold text-[#C58B5C] dark:text-[#D6AD72] block">{lang === 'ar' ? 'تنسيق الصلاة' : 'Prayer Sync'}</span>
                <span className="text-xs font-bold text-[#3B2A22] dark:text-[#FAF8F3]">{lang === 'ar' ? 'تلقائي' : 'Synced'}</span>
              </div>
              <div className="bg-[#FAF8F3] dark:bg-[#30251E] p-3 rounded-2xl border border-[#F3E6D0] dark:border-[#493A2F] text-center space-y-0.5">
                <span className="text-[11px] font-bold text-[#C58B5C] dark:text-[#D6AD72] block">{lang === 'ar' ? 'طقس اليوم' : "Today's Weather"}</span>
                <span className="text-xs font-bold text-[#3B2A22] dark:text-[#FAF8F3]">43°C {lang === 'ar' ? 'مشمس' : 'Sunny'}</span>
              </div>
              <div className="bg-[#FAF8F3] dark:bg-[#30251E] p-3 rounded-2xl border border-[#F3E6D0] dark:border-[#493A2F] text-center space-y-0.5">
                <span className="text-[11px] font-bold text-[#C58B5C] dark:text-[#D6AD72] block">{lang === 'ar' ? 'توقع الازدحام' : 'Crowds'}</span>
                <span className="text-xs font-bold text-[#4F6F52] dark:text-[#4F6F52]">{lang === 'ar' ? 'منخفض' : 'Low'}</span>
              </div>
            </div>

          </div>

          {/* Right Visual Image Bento Card (Col 4) */}
          <div className="lg:col-span-4 bg-[#3B2A22] dark:bg-[#30251E] text-white rounded-3xl p-5 border border-[#F3E6D0] dark:border-[#493A2F] flex flex-col justify-between relative overflow-hidden shadow-sm min-h-[360px] transition-colors">
            {/* Background Image with Overlay */}
            <ImageWithFallback
              src="/images/alula_hegra_tomb_1786293300477.jpg"
              fallbackSrc="/images/alula_hero_1786210418895.jpg"
              alt="AlUla Heritage"
              className="absolute inset-0 w-full h-full object-cover opacity-60 hover:scale-105 transition-transform duration-700 pointer-events-none"
            />
            
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-[10px] font-bold text-[#C58B5C] uppercase tracking-wider bg-[#3B2A22]/80 px-2.5 py-1 rounded-full border border-[#C58B5C]/30 backdrop-blur-sm">
                {lang === 'ar' ? 'مستشار الذكاء الاصطناعي' : 'AI Tour Advisor'}
              </span>
              <span className="text-xs font-bold text-white bg-[#4F6F52] px-2.5 py-0.5 rounded-full">
                ★ 4.9
              </span>
            </div>

            <div className="relative z-10 space-y-2 bg-[#3B2A22]/85 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
              <h3 className="text-lg font-bold text-white">
                {lang === 'ar' ? 'العلا والدرعية وجدة التاريخية' : 'AlUla, Diriyah & Historic Jeddah'}
              </h3>
              <p className="text-xs text-[#FAF8F3]/80 leading-relaxed font-medium">
                {lang === 'ar' 
                  ? 'جداول سفر مخصصة تجمع بين التراث، سهولة الحركة، وأوقات الراحة' 
                  : 'Tailored travel plans blending heritage, step-free access, and relaxation breaks.'}
              </p>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-[#C58B5C] font-bold">
                <span>⏱️ {lang === 'ar' ? 'إعداد فوري' : 'Instant Setup'}</span>
                <span>♿ {lang === 'ar' ? 'مجهز 100%' : '100% Accessible'}</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
