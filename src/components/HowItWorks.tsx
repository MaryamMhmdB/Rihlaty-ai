import React from 'react';
import { Sliders, Cpu, CalendarCheck, MapPin } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { PalmIcon } from './PalmIcon';

interface HowItWorksProps {
  lang: Language;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ lang }) => {
  const t = translations[lang];

  const steps = [
    {
      step: '01',
      icon: <Sliders className="w-6 h-6 text-[#4F6F52] dark:text-[#D6AD72]" />,
      titleAr: 'حدد تفضيلاتك وااحتياجاتك',
      titleEn: '1. Set Your Preferences',
      descAr: 'اختر الوجهة، الوقت المتاح، واحتياجات الحركة الكرسي المتحرك أو المشي المحدود.',
      descEn: 'Select destination, available time, and mobility constraints.'
    },
    {
      step: '02',
      icon: <Cpu className="w-6 h-6 text-[#C58B5C] dark:text-[#D6AD72]" />,
      titleAr: 'الذكاء الاصطناعي يحلل الظروف',
      titleEn: '2. AI Processes Constraints',
      descAr: 'يقوم المحرك بمزامنة أوقات الصلاة، درجات الحرارة، والازدحام التنبؤي.',
      descEn: 'Algorithms map prayer times, temperature advisories, and crowds.'
    },
    {
      step: '03',
      icon: <CalendarCheck className="w-6 h-6 text-[#4F6F52] dark:text-[#D6AD72]" />,
      titleAr: 'احصل على جدولك الذكي المخصص',
      titleEn: '3. Receive Tailored Schedule',
      descAr: 'جدول زمني محدد بدقة مع توضيح إمكانية الوصول، المسافات، والمصادر.',
      descEn: 'Structured timeline with mobility notes, distances, and sources.'
    },
    {
      step: '04',
      icon: <MapPin className="w-6 h-6 text-[#C58B5C] dark:text-[#D6AD72]" />,
      titleAr: 'انطلق واستمتع بتجربة ميزة',
      titleEn: '4. Explore Effortlessly',
      descAr: 'حمل الخطة كـ PDF، أو افتح الخريطة التفاعلية، وعش أجواء السعودية التراثية.',
      descEn: 'Export PDF, view map routes, and enjoy Saudi heritage with peace of mind.'
    }
  ];

  return (
    <section id="how-it-works" className="py-12 bg-[#FAF8F3] dark:bg-[#171310] relative border-t border-[#F3E6D0] dark:border-[#493A2F] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#241D18] border border-[#F3E6D0] dark:border-[#493A2F] text-[#3B2A22] dark:text-[#FAF8F3] text-xs font-bold shadow-sm">
            <PalmIcon className="w-4 h-4 text-[#C58B5C] dark:text-[#D6AD72]" />
            <span>{lang === 'ar' ? 'آلية العمل' : 'Workflow Engine'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3B2A22] dark:text-[#FAF8F3]">
            {t.navHowItWorks}
          </h2>
          <p className="text-sm sm:text-base text-[#3B2A22]/80 dark:text-[#C8BDB2] max-w-xl mx-auto font-medium">
            {lang === 'ar' 
              ? 'أربع خطوات بسيطة تصنع لك رحلة سياحية متكاملة ومريحة في المملكة العربية السعودية'
              : 'Four effortless steps to craft a seamless Saudi heritage tour'}
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#30251E] border border-[#F3E6D0] dark:border-[#493A2F] rounded-3xl p-6 relative hover:border-[#4F6F52] transition-all shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-2xl bg-[#FAF8F3] dark:bg-[#241D18] border border-[#F3E6D0] dark:border-[#493A2F] flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="text-2xl font-black text-[#C58B5C]/30 dark:text-[#D6AD72]/40">
                  {item.step}
                </span>
              </div>

              <div className="space-y-1.5 pt-1">
                <h3 className="text-base font-bold text-[#3B2A22] dark:text-[#FAF8F3]">
                  {lang === 'ar' ? item.titleAr : item.titleEn}
                </h3>
                <p className="text-xs text-[#3B2A22]/80 dark:text-[#C8BDB2] leading-relaxed font-medium">
                  {lang === 'ar' ? item.descAr : item.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
