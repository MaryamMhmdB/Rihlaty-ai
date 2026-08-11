import React, { useState } from 'react';
import { X, CloudSun, Wind, Droplets, Sun, ExternalLink, Calendar, Clock, Thermometer } from 'lucide-react';
import { SaudiCityData } from '../data/saudiData';

interface WeatherModalProps {
  cityData: SaudiCityData;
  isOpen: boolean;
  onClose: () => void;
  lang: 'ar' | 'en';
}

export const WeatherModal: React.FC<WeatherModalProps> = ({
  cityData,
  isOpen,
  onClose,
  lang,
}) => {
  const [activeTab, setActiveTab] = useState<'hourly' | 'tomorrow' | 'forecast'>('hourly');

  if (!isOpen) return null;

  const isRtl = lang === 'ar';
  const weather = cityData.weather;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in">
      <div
        className="bg-white dark:bg-[#1E1713] text-[#3B2A22] dark:text-[#FAF8F3] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#F3E6D0] dark:border-[#493A2F] relative"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {/* Header with Weather branding */}
        <div className="bg-gradient-to-r from-[#3B2A22] via-[#523B30] to-[#C58B5C] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 rtl:left-auto rtl:right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold text-amber-200 mb-2">
            <CloudSun className="w-4 h-4" />
            <span>{isRtl ? 'حالة الطقس اليوم والتوقعات المباشرة' : 'Live Weather & Forecasts'}</span>
          </div>

          <div className="flex items-baseline justify-between mt-1">
            <div>
              <h3 className="text-2xl font-extrabold">
                {isRtl ? cityData.nameAr : cityData.nameEn}
              </h3>
              <p className="text-xs text-amber-100/90 mt-1">
                {isRtl ? weather.descAr : weather.descEn}
              </p>
            </div>
            <div className="text-right rtl:text-left">
              <span className="text-4xl font-black">{weather.tempC}°C</span>
              <span className="text-2xl ml-1">{weather.icon}</span>
            </div>
          </div>
        </div>

        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-4 gap-2 p-4 bg-[#FAF8F3] dark:bg-[#281F19] border-b border-[#F3E6D0] dark:border-[#3D2E24] text-center text-xs">
          <div className="p-2.5 rounded-xl bg-white dark:bg-[#1E1713] border border-[#F3E6D0] dark:border-[#493A2F]">
            <span className="text-gray-500 dark:text-gray-400 block text-[10px]">{isRtl ? 'الملموسة' : 'Feels Like'}</span>
            <span className="font-bold text-sm text-[#3B2A22] dark:text-[#FAF8F3]">{weather.feelsLikeC}°C</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white dark:bg-[#1E1713] border border-[#F3E6D0] dark:border-[#493A2F]">
            <span className="text-gray-500 dark:text-gray-400 block text-[10px] flex items-center justify-center gap-0.5">
              <Droplets className="w-3 h-3 text-blue-500 inline" /> {isRtl ? 'الرطوبة' : 'Humidity'}
            </span>
            <span className="font-bold text-sm text-[#3B2A22] dark:text-[#FAF8F3]">{weather.humidity}%</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white dark:bg-[#1E1713] border border-[#F3E6D0] dark:border-[#493A2F]">
            <span className="text-gray-500 dark:text-gray-400 block text-[10px] flex items-center justify-center gap-0.5">
              <Wind className="w-3 h-3 text-teal-500 inline" /> {isRtl ? 'الرياح' : 'Wind'}
            </span>
            <span className="font-bold text-sm text-[#3B2A22] dark:text-[#FAF8F3]">{weather.windKmH} {isRtl ? 'كم/س' : 'km/h'}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white dark:bg-[#1E1713] border border-[#F3E6D0] dark:border-[#493A2F]">
            <span className="text-gray-500 dark:text-gray-400 block text-[10px] flex items-center justify-center gap-0.5">
              <Sun className="w-3 h-3 text-amber-500 inline" /> {isRtl ? 'أشعة UV' : 'UV Index'}
            </span>
            <span className="font-bold text-sm text-[#3B2A22] dark:text-[#FAF8F3]">{weather.uvIndex}</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#F3E6D0] dark:border-[#3D2E24] px-4 pt-3 bg-white dark:bg-[#1E1713]">
          <button
            onClick={() => setActiveTab('hourly')}
            className={`flex-1 pb-2.5 text-xs font-bold transition-colors border-b-2 flex items-center justify-center gap-1.5 ${
              activeTab === 'hourly'
                ? 'border-[#C58B5C] text-[#C58B5C] dark:text-[#D6AD72]'
                : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{isRtl ? 'الطقس بالساعات' : 'Hourly Weather'}</span>
          </button>

          <button
            onClick={() => setActiveTab('tomorrow')}
            className={`flex-1 pb-2.5 text-xs font-bold transition-colors border-b-2 flex items-center justify-center gap-1.5 ${
              activeTab === 'tomorrow'
                ? 'border-[#C58B5C] text-[#C58B5C] dark:text-[#D6AD72]'
                : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            <Thermometer className="w-3.5 h-3.5" />
            <span>{isRtl ? 'طقس الغد' : "Tomorrow's Weather"}</span>
          </button>

          <button
            onClick={() => setActiveTab('forecast')}
            className={`flex-1 pb-2.5 text-xs font-bold transition-colors border-b-2 flex items-center justify-center gap-1.5 ${
              activeTab === 'forecast'
                ? 'border-[#C58B5C] text-[#C58B5C] dark:text-[#D6AD72]'
                : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{isRtl ? 'توقعات 5 أيام' : '5-Day Forecast'}</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5 max-h-[320px] overflow-y-auto">
          {/* Hourly Tab */}
          {activeTab === 'hourly' && (
            <div className="space-y-3">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                {isRtl ? 'توزيع درجات الحرارة خلال ساعات اليوم:' : 'Hourly temperature distribution:'}
              </p>

              <div className="grid grid-cols-5 gap-2">
                {weather.hourly.map((h, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center justify-between p-2.5 rounded-2xl bg-[#FAF8F3] dark:bg-[#281F19] border border-[#F3E6D0] dark:border-[#3D2E24] text-center"
                  >
                    <span className="text-[10px] text-gray-500 font-medium">{h.time}</span>
                    <span className="text-xl my-1.5">{h.icon}</span>
                    <span className="text-sm font-extrabold text-[#3B2A22] dark:text-[#FAF8F3]">{h.tempC}°</span>
                    <span className="text-[9px] text-[#C58B5C] dark:text-[#D6AD72] font-semibold truncate w-full mt-1">
                      {isRtl ? h.conditionAr : h.conditionEn}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tomorrow Tab */}
          {activeTab === 'tomorrow' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#C58B5C] block">
                    {isRtl ? 'توقعات طقس الغد المعتمدة' : "Tomorrow's Official Forecast"}
                  </span>
                  <h4 className="text-lg font-extrabold text-[#3B2A22] dark:text-[#FAF8F3] mt-0.5">
                    {isRtl ? weather.tomorrow.descAr : weather.tomorrow.descEn}
                  </h4>
                </div>
                <div className="text-3xl p-2 bg-white dark:bg-[#1E1713] rounded-xl shadow-sm border border-amber-200 dark:border-amber-900/40">
                  {weather.tomorrow.icon}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3.5 rounded-2xl bg-[#FAF8F3] dark:bg-[#281F19] border border-[#F3E6D0] dark:border-[#3D2E24]">
                  <span className="text-xs text-gray-500 block font-medium">{isRtl ? 'العظمى (نهاراً)' : 'Max (Day)'}</span>
                  <span className="text-2xl font-black text-rose-600 dark:text-rose-400 mt-1 block">
                    {weather.tomorrow.maxTemp}°C
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAF8F3] dark:bg-[#281F19] border border-[#F3E6D0] dark:border-[#3D2E24]">
                  <span className="text-xs text-gray-500 block font-medium">{isRtl ? 'الصغرى (ليلاً)' : 'Min (Night)'}</span>
                  <span className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1 block">
                    {weather.tomorrow.minTemp}°C
                  </span>
                </div>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed bg-[#FAF8F3] dark:bg-[#281F19] p-3 rounded-xl border border-[#F3E6D0] dark:border-[#3D2E24]">
                💡 {isRtl ? 'نصيحة للمسافرين: ينصح بالأنشطة الخارجية في الفترات الصباحية والمسائية وتجنب التعرض المباشر للشمس في فترات الظهيرة.' : 'Traveler Advisory: Plan outdoor explorations for morning and evening hours to stay comfortable.'}
              </p>
            </div>
          )}

          {/* 5-Day Forecast Tab */}
          {activeTab === 'forecast' && (
            <div className="space-y-2">
              {weather.forecast.map((f, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF8F3] dark:bg-[#281F19] border border-[#F3E6D0] dark:border-[#3D2E24]"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{f.icon}</span>
                    <div>
                      <span className="text-sm font-extrabold text-[#3B2A22] dark:text-[#FAF8F3] block">
                        {isRtl ? f.dayAr : f.dayEn}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {isRtl ? f.conditionAr : f.conditionEn}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 font-bold text-sm">
                    <span className="text-rose-600 dark:text-rose-400">{f.maxTemp}°</span>
                    <span className="text-gray-400">/</span>
                    <span className="text-blue-600 dark:text-blue-400">{f.minTemp}°</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAF8F3] dark:bg-[#281F19] border-t border-[#F3E6D0] dark:border-[#3D2E24] flex items-center justify-between">
          <span className="text-xs text-[#C58B5C] dark:text-[#D6AD72] font-bold">
            {isRtl ? 'توقعات الطقس المباشرة لجميع مدن المملكة' : 'Live weather forecasts for all Saudi cities'}
          </span>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#3B2A22] dark:bg-[#C58B5C] text-white font-bold text-xs hover:bg-black transition-colors"
          >
            {isRtl ? 'إغلاق' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
