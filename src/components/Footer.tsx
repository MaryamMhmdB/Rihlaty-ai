import React from 'react';
import { MapPin, Heart, ShieldCheck, Lock } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { PalmIcon } from './PalmIcon';

interface FooterProps {
  lang: Language;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onNavigate }) => {
  const t = translations[lang];

  return (
    <footer className="bg-[#3B2A22] dark:bg-[#241D18] text-[#FAF8F3] pt-12 pb-10 border-t border-[#F3E6D0] dark:border-[#493A2F] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Brand Info Column */}
          <div className="md:col-span-5 space-y-3.5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#4F6F52] text-white flex items-center justify-center border border-white/10">
                <PalmIcon className="w-6 h-6 text-[#C58B5C] dark:text-[#D6AD72]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-[#FAF8F3]">
                  {t.brandName}
                </span>
                <span className="text-[10px] font-bold text-[#C58B5C] dark:text-[#D6AD72] uppercase tracking-widest">
                  {t.brandSub}
                </span>
              </div>
            </div>

            <p className="text-xs text-[#FAF8F3]/80 dark:text-[#C8BDB2] leading-relaxed max-w-sm font-medium">
              {t.footerDesc}
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-[#F3E6D0] dark:text-[#D6AD72]">
                <ShieldCheck className="w-4 h-4 text-[#4F6F52] dark:text-[#D6AD72]" />
                <span>{lang === 'ar' ? 'سياحة برؤية السعودية 2030' : 'Saudi Vision 2030 Tourism'}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-xs font-bold text-emerald-400">
                <Lock className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'اتصال آمن ومشفر HTTPS' : 'Encrypted HTTPS Connection'}</span>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-base font-bold text-[#C58B5C] dark:text-[#D6AD72]">
              {t.quickLinks}
            </h4>
            <ul className="space-y-2 text-sm text-[#FAF8F3]/80 dark:text-[#C8BDB2] font-medium">
              <li>
                <button onClick={() => onNavigate('hero')} className="hover:text-[#C58B5C] dark:hover:text-[#D6AD72] transition-colors">
                  {t.navHome}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('planner')} className="hover:text-[#C58B5C] dark:hover:text-[#D6AD72] transition-colors">
                  {t.navPlan}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('destinations')} className="hover:text-[#C58B5C] dark:hover:text-[#D6AD72] transition-colors">
                  {t.navDestinations}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('map')} className="hover:text-[#C58B5C] dark:hover:text-[#D6AD72] transition-colors">
                  {t.navMap}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('lens')} className="hover:text-[#C58B5C] dark:hover:text-[#D6AD72] transition-colors">
                  {t.navLens}
                </button>
              </li>
            </ul>
          </div>

          {/* Featured Destinations Column */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-base font-bold text-[#C58B5C] dark:text-[#D6AD72]">
              {lang === 'ar' ? 'الوجهات المستهدفة' : 'Featured Locations'}
            </h4>
            <ul className="space-y-2 text-sm text-[#FAF8F3]/80 dark:text-[#C8BDB2] font-medium">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#4F6F52] dark:text-[#D6AD72]" />
                <span>{lang === 'ar' ? 'العلا — موقع الحِجر والبلدة القديمة' : 'AlUla — Hegra & Old Town'}</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#4F6F52] dark:text-[#D6AD72]" />
                <span>{lang === 'ar' ? 'الدرعية — حي الطريف والبجيري' : 'Diriyah — At-Turaif & Bujairi'}</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#4F6F52] dark:text-[#D6AD72]" />
                <span>{lang === 'ar' ? 'جدة التاريخية — البلد القديمة' : 'Historic Jeddah — Al-Balad'}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-[#C58B5C]/20 dark:border-[#493A2F] text-center text-xs text-[#FAF8F3]/60 dark:text-[#C8BDB2]/60 flex flex-col sm:flex-row items-center justify-between gap-4 font-semibold">
          <span>{t.rights}</span>
          <span className="flex items-center gap-1">
            {lang === 'ar' ? (
              <>
                صُنع بـ <Heart className="w-3.5 h-3.5 text-[#C58B5C] dark:text-[#D6AD72] fill-[#C58B5C] dark:fill-[#D6AD72]" /> لتعزيز السياحة السعودية
              </>
            ) : (
              <>
                Made with <Heart className="w-3.5 h-3.5 text-[#C58B5C] dark:text-[#D6AD72] fill-[#C58B5C] dark:fill-[#D6AD72]" /> for Saudi Arabia Tourism
              </>
            )}
          </span>
        </div>

      </div>
    </footer>
  );
};
