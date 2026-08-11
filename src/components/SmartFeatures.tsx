import React from 'react';
import { Accessibility, Sun, Clock, Users, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { PalmIcon } from './PalmIcon';

interface SmartFeaturesProps {
  lang: Language;
}

export const SmartFeatures: React.FC<SmartFeaturesProps> = ({ lang }) => {
  const t = translations[lang];

  const features = [
    {
      icon: <Accessibility className="w-8 h-8 text-[#4F6F52] dark:text-[#D6AD72]" />,
      title: t.feat1Title,
      desc: t.feat1Desc,
      tag: lang === 'ar' ? 'مسارات مجهزة 100%' : '100% Step-Free',
      color: 'border-[#4F6F52]/30 bg-[#4F6F52]/5'
    },
    {
      icon: <Sun className="w-8 h-8 text-[#C58B5C] dark:text-[#D6AD72]" />,
      title: t.feat2Title,
      desc: t.feat2Desc,
      tag: lang === 'ar' ? 'تخفيض الإجهاد الحراري' : 'Heat Stress Prevention',
      color: 'border-[#C58B5C]/30 bg-[#C58B5C]/5'
    },
    {
      icon: <Clock className="w-8 h-8 text-[#4F6F52] dark:text-[#D6AD72]" />,
      title: t.feat3Title,
      desc: t.feat3Desc,
      tag: lang === 'ar' ? 'ربط المساجد والمصليات' : 'Mosque & Break Pairing',
      color: 'border-[#4F6F52]/30 bg-[#4F6F52]/5'
    },
    {
      icon: <Users className="w-8 h-8 text-[#C58B5C] dark:text-[#D6AD72]" />,
      title: t.feat4Title,
      desc: t.feat4Desc,
      tag: lang === 'ar' ? 'أوقات غير مزدحمة' : 'Non-Peak Hours',
      color: 'border-[#C58B5C]/30 bg-[#C58B5C]/5'
    }
  ];

  return (
    <section id="features" className="py-12 bg-[#FAF8F3] dark:bg-[#171310] relative border-t border-[#F3E6D0] dark:border-[#493A2F] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#241D18] border border-[#F3E6D0] dark:border-[#493A2F] text-[#3B2A22] dark:text-[#FAF8F3] text-xs font-bold shadow-sm">
            <PalmIcon className="w-4 h-4 text-[#C58B5C] dark:text-[#D6AD72]" />
            <span>{lang === 'ar' ? 'محركات الذكاء الاصطناعي' : 'AI Core Engines'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3B2A22] dark:text-[#FAF8F3]">
            {t.featuresTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#3B2A22]/80 dark:text-[#C8BDB2] max-w-2xl mx-auto font-medium">
            {t.featuresSub}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#30251E] rounded-3xl p-6 border border-[#F3E6D0] dark:border-[#493A2F] hover:border-[#4F6F52] transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#FAF8F3] dark:bg-[#241D18] border border-[#F3E6D0] dark:border-[#493A2F] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                  {item.icon}
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-[#3B2A22] dark:text-[#FAF8F3]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#3B2A22]/80 dark:text-[#C8BDB2] leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#F3E6D0] dark:border-[#493A2F] flex items-center justify-between text-xs font-bold text-[#4F6F52] dark:text-[#D6AD72]">
                <span>{item.tag}</span>
                <CheckCircle2 className="w-4 h-4 text-[#4F6F52] dark:text-[#D6AD72]" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
