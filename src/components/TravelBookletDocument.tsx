import React from 'react';
import { ItineraryResult, Language } from '../types';
import { PalmIcon } from './PalmIcon';
import { getSaudiCityData } from '../data/saudiData';
import { getGoogleMapsUrl } from '../utils/mapUtils';

interface TravelBookletDocumentProps {
  itinerary: ItineraryResult;
  lang: Language;
}

export const TravelBookletDocument: React.FC<TravelBookletDocumentProps> = ({ itinerary, lang }) => {
  const isRtl = lang === 'ar';
  const cityName = itinerary.destinationNameAr || itinerary.destinationNameEn || 'الرياض';
  const cityData = getSaudiCityData(cityName);

  const categoryLabels: Record<string, { ar: string; en: string }> = {
    heritage: { ar: 'معلم تراثي وثقافي', en: 'Heritage Site' },
    cafe: { ar: 'مقهى وضيافة', en: 'Café & Hospitality' },
    dining: { ar: 'وجبة تراثية', en: 'Traditional Dining' },
    prayer: { ar: 'توقف صلاة 🕌', en: 'Prayer Pause 🕌' },
    experience: { ar: 'تجربة سياحية', en: 'Tourism Activity' },
    shopping: { ar: 'سوق وحرف يدوية', en: 'Heritage Souk' },
    nature: { ar: 'طبيعة وتضاريس', en: 'Nature & Landscape' },
  };

  return (
    <div
      id="rihlaty-pdf-booklet"
      dir={isRtl ? 'rtl' : 'ltr'}
      className="w-full bg-white text-[#2B231D] p-6 font-sans border-0 shadow-none"
      style={{
        fontFamily: isRtl ? "'Cairo', 'Tajawal', 'IBM Plex Sans Arabic', system-ui, sans-serif" : "'Plus Jakarta Sans', system-ui, sans-serif",
        color: '#2B231D',
        backgroundColor: '#FFFFFF',
        width: '800px',
        margin: '0 auto',
        boxSizing: 'border-box'
      }}
    >
      {/* HEADER BAR */}
      <div className="border-b-2 border-[#4F6F52] pb-4 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#4F6F52] flex items-center justify-center text-white shrink-0">
            <PalmIcon className="w-6 h-6 text-[#D6AD72]" />
          </div>
          <div>
            <h1 className="text-xl font-black text-[#3B2A22]">
              {isRtl ? 'منصة رحلتي | جدول الرحلة المجهز' : 'Rihlaty AI | Travel Schedule'}
            </h1>
            <p className="text-xs font-bold text-[#C58B5C]">
              {isRtl ? `جدول زيارة: ${cityName}` : `Visit Schedule: ${cityName}`}
            </p>
          </div>
        </div>

        <div className="text-end text-xs font-semibold text-gray-600">
          <p>{isRtl ? 'تاريخ الإصدار:' : 'Issued:'} {itinerary.date || new Date().toISOString().split('T')[0]}</p>
          <p className="text-[#4F6F52] font-bold">{isRtl ? `المدة: ${itinerary.durationAr || 'يوم واحد'}` : `Duration: ${itinerary.durationEn || '1 Day'}`}</p>
        </div>
      </div>

      {/* SUMMARY INFO STRIP */}
      <div className="bg-[#FAF8F3] border border-[#E8D9C5] rounded-xl p-3 mb-5 grid grid-cols-4 gap-2 text-center text-xs">
        <div>
          <span className="text-gray-500 font-bold block">{isRtl ? 'الوجهة' : 'Destination'}</span>
          <span className="font-extrabold text-[#3B2A22]">{isRtl ? (itinerary.destinationNameAr || cityData.nameAr) : (itinerary.destinationNameEn || cityData.nameEn)}</span>
        </div>
        <div>
          <span className="text-gray-500 font-bold block">{isRtl ? 'نسبة ملاءمة الحركة' : 'Mobility Score'}</span>
          <span className="font-extrabold text-[#4F6F52]">♿ {itinerary.accessibilityScore}%</span>
        </div>
        <div>
          <span className="text-gray-500 font-bold block">{isRtl ? 'درجة الحرارة' : 'Temperature'}</span>
          <span className="font-extrabold text-[#C58B5C]">{cityData.weather.tempC}°C ☀️</span>
        </div>
        <div>
          <span className="text-gray-500 font-bold block">{isRtl ? 'توقيت أذان الظهر' : 'Dhuhr Prayer'}</span>
          <span className="font-extrabold text-[#3B2A22]">🕌 {cityData.prayerTimes.dhuhr}</span>
        </div>
      </div>

      {/* ITINERARY SIMPLE TABLE */}
      <div className="mb-6">
        <h2 className="text-sm font-extrabold text-[#3B2A22] mb-2 border-b border-[#E8D9C5] pb-1">
          📋 {isRtl ? 'جدول المحطات والتوجيهات (مخطط جدول مبسط)' : 'Simplified Travel Itinerary Table'}
        </h2>

        <table className="w-full text-xs text-start border-collapse border border-[#E8D9C5]">
          <thead>
            <tr className="bg-[#3B2A22] text-white font-bold">
              <th className="p-2.5 border border-[#3B2A22] text-center w-20">{isRtl ? 'الوقت' : 'Time'}</th>
              <th className="p-2.5 border border-[#3B2A22] text-start">{isRtl ? 'المحطة / الوجهة' : 'Stop / Destination'}</th>
              <th className="p-2.5 border border-[#3B2A22] text-start">{isRtl ? 'الموقع' : 'Location'}</th>
              <th className="p-2.5 border border-[#3B2A22] text-center w-28">{isRtl ? 'التصنيف' : 'Category'}</th>
              <th className="p-2.5 border border-[#3B2A22] text-center w-28">{isRtl ? 'التيسير' : 'Accessibility'}</th>
              <th className="p-2.5 border border-[#3B2A22] text-center w-36">{isRtl ? 'موقع قوقل ماب' : 'Google Maps'}</th>
            </tr>
          </thead>
          <tbody>
            {itinerary.items.map((item, idx) => {
              const isPrayer = item.isPrayerTime;
              const catObj = categoryLabels[item.category] || { ar: 'محطة رحلة', en: 'Stop' };
              const mapUrl = getGoogleMapsUrl(isRtl ? item.locationAr : item.locationEn, isRtl ? item.titleAr : item.titleEn, isRtl ? itinerary.destinationNameAr : itinerary.destinationNameEn, item.coordinates, item.googleMapsUrl);

              return (
                <tr
                  key={item.id || idx}
                  className={isPrayer ? 'bg-amber-50/80 font-semibold' : (idx % 2 === 0 ? 'bg-white' : 'bg-[#FAF8F3]')}
                >
                  <td className="p-2.5 border border-[#E8D9C5] text-center font-bold text-[#3B2A22] whitespace-nowrap">
                    ⏱️ {item.time}
                  </td>
                  <td className="p-2.5 border border-[#E8D9C5]">
                    <div className="font-bold text-[#3B2A22]">
                      {isRtl ? item.titleAr : item.titleEn}
                    </div>
                    <div className="text-[10px] text-gray-600 mt-0.5">
                      {isRtl ? item.aiRationaleAr : item.aiRationaleEn}
                    </div>
                  </td>
                  <td className="p-2.5 border border-[#E8D9C5] text-[#4F6F52] font-semibold whitespace-nowrap">
                    📍 {isRtl ? item.locationAr : item.locationEn}
                  </td>
                  <td className="p-2.5 border border-[#E8D9C5] text-center whitespace-nowrap font-medium">
                    {isRtl ? catObj.ar : catObj.en}
                  </td>
                  <td className="p-2.5 border border-[#E8D9C5] text-center whitespace-nowrap font-bold text-[#4F6F52]">
                    {item.isWheelchairAccessible ? '♿ متاح بدون درجات' : 'ميسر'}
                  </td>
                  <td className="p-2.5 border border-[#E8D9C5] text-center whitespace-nowrap">
                    <a
                      href={mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#4F6F52] underline font-bold text-[10px]"
                    >
                      🗺️ {isRtl ? 'رابط الخريطة' : 'Map Link'}
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div className="border-t border-[#E8D9C5] pt-3 text-center text-[10px] text-gray-500 font-semibold">
        <p>{isRtl ? 'تم الإنشاء بواسطة منصة رحلتي AI | جميع المحطات مجهزة ومزامنة مع أوقات الصلاة والطقس المحلي.' : 'Generated by Rihlaty AI | All stops synced with prayer times & local weather.'}</p>
      </div>
    </div>
  );
};
