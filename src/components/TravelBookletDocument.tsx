import React from 'react';
import { ItineraryResult, Language, ItineraryItem } from '../types';
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
    prayer: { ar: 'توقف صلاة', en: 'Prayer Pause' },
    experience: { ar: 'تجربة سياحية', en: 'Tourism Activity' },
    shopping: { ar: 'سوق وحرف يدوية', en: 'Heritage Souk' },
    nature: { ar: 'طبيعة وتضاريس', en: 'Nature & Landscape' },
  };

  // Group items by day Number
  const itemsByDay: Record<number, ItineraryItem[]> = {};
  itinerary.items.forEach((item) => {
    const day = item.dayNumber || 1;
    if (!itemsByDay[day]) itemsByDay[day] = [];
    itemsByDay[day].push(item);
  });

  const daysList = Object.keys(itemsByDay).map(Number).sort((a, b) => a - b);

  // Filter food/dining items for dedicated meal recommendation section
  const foodItems = itinerary.items.filter(item => item.category === 'dining' || item.category === 'cafe');

  const fontFamily = "'Tajawal', 'Cairo', 'Arial', sans-serif";

  return (
    <div
      id="rihlaty-pdf-booklet"
      dir={isRtl ? 'rtl' : 'ltr'}
      style={{
        fontFamily: fontFamily,
        letterSpacing: 'normal',
        wordSpacing: 'normal',
        color: '#2B231D',
        backgroundColor: '#FFFFFF',
        width: '790px',
        padding: '36px',
        margin: '0 auto',
        boxSizing: 'border-box'
      }}
    >
      {/* HEADER SECTION */}
      <div
        style={{
          borderBottom: '3px solid #4F6F52',
          paddingBottom: '20px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              backgroundColor: '#4F6F52',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              flexShrink: 0
            }}
          >
            <PalmIcon className="w-8 h-8 text-[#D6AD72]" />
          </div>
          <div>
            <h1
              style={{
                fontFamily: fontFamily,
                fontSize: '22px',
                fontWeight: 900,
                color: '#3B2A22',
                margin: 0,
                padding: 0,
                lineHeight: 1.2
              }}
            >
              {isRtl ? 'منصة رحلتي | جدول الرحلة السياحية' : 'Rihlaty AI | Travel Itinerary'}
            </h1>
            <p
              style={{
                fontFamily: fontFamily,
                fontSize: '13px',
                fontWeight: 700,
                color: '#C58B5C',
                margin: '4px 0 0 0'
              }}
            >
              {isRtl ? `وثيقة جدول زيارة: ${cityName}` : `Visit Itinerary Document: ${cityName}`}
            </p>
          </div>
        </div>

        <div style={{ textAlign: isRtl ? 'left' : 'right', fontSize: '12px', color: '#4B5563' }}>
          <p style={{ margin: 0, fontWeight: 700, color: '#3B2A22' }}>
            {isRtl ? 'تاريخ الإصدار:' : 'Issued Date:'} {itinerary.date || new Date().toISOString().split('T')[0]}
          </p>
          <p style={{ margin: '4px 0 0 0', color: '#4F6F52', fontWeight: 800 }}>
            {isRtl ? `المدة الكلية: ${itinerary.durationAr || 'يوم واحد'}` : `Duration: ${itinerary.durationEn || '1 Day'}`}
          </p>
        </div>
      </div>

      {/* SUMMARY / OVERVIEW TABLE */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '15px', fontWeight: 800, color: '#3B2A22', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>📌 {isRtl ? 'ملخص وبيانات الرحلة الأساسية' : 'Trip Overview & Key Information'}</span>
        </h2>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '12px',
            backgroundColor: '#FAF8F3',
            border: '1px solid #E8D9C5',
            borderRadius: '12px',
            overflow: 'hidden'
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#4F6F52', color: '#FFFFFF', textAlign: isRtl ? 'right' : 'left' }}>
              <th style={{ padding: '10px 14px', border: '1px solid #3B543D' }}>{isRtl ? 'اليوم والتاريخ' : 'Day & Date'}</th>
              <th style={{ padding: '10px 14px', border: '1px solid #3B543D' }}>{isRtl ? 'الوجهة والمنطقة' : 'Destination'}</th>
              <th style={{ padding: '10px 14px', border: '1px solid #3B543D' }}>{isRtl ? 'نسبة ملاءمة الحركة' : 'Mobility Score'}</th>
              <th style={{ padding: '10px 14px', border: '1px solid #3B543D' }}>{isRtl ? 'الطقس وأوقات الصلاة' : 'Weather & Prayer'}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 14px', border: '1px solid #E8D9C5', fontWeight: 700, color: '#3B2A22' }}>
                {itinerary.date || new Date().toISOString().split('T')[0]} ({itinerary.durationAr || 'يوم واحد'})
              </td>
              <td style={{ padding: '10px 14px', border: '1px solid #E8D9C5', fontWeight: 800, color: '#3B2A22' }}>
                {isRtl ? (itinerary.destinationNameAr || cityData.nameAr) : (itinerary.destinationNameEn || cityData.nameEn)}
              </td>
              <td style={{ padding: '10px 14px', border: '1px solid #E8D9C5', fontWeight: 700, color: '#4F6F52' }}>
                ♿ {itinerary.accessibilityScore}% ({isRtl ? 'ميسّر لكبار السن' : 'Elderly Friendly'})
              </td>
              <td style={{ padding: '10px 14px', border: '1px solid #E8D9C5', color: '#374151' }}>
                ☀️ {cityData.weather.tempC}°C | 🕌 {isRtl ? 'الظهر:' : 'Dhuhr:'} {cityData.prayerTimes.dhuhr}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* SUMMARY OVERVIEW TEXT */}
      {itinerary.summaryAr && (
        <div style={{ marginBottom: '24px', padding: '12px 16px', backgroundColor: '#FAF8F3', borderLeft: isRtl ? 'none' : '4px solid #4F6F52', borderRight: isRtl ? '4px solid #4F6F52' : 'none', borderTop: '1px solid #E8D9C5', borderBottom: '1px solid #E8D9C5', borderRadius: '8px', fontSize: '12px', color: '#3B2A22', lineHeight: '1.6' }}>
          <strong>💡 {isRtl ? 'إرشاد الخطة والتنقّل:' : 'Plan Overview:'} </strong>
          {isRtl ? itinerary.summaryAr : itinerary.summaryEn}
        </div>
      )}

      {/* DETAILED ITINERARY TABLES BY DAY */}
      {daysList.map((dayNum) => {
        const dayItems = itemsByDay[dayNum];
        return (
          <div key={dayNum} style={{ marginBottom: '28px' }}>
            <div
              style={{
                backgroundColor: '#3B2A22',
                color: '#FFFFFF',
                padding: '8px 16px',
                borderRadius: '8px 8px 0 0',
                fontSize: '14px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <span>📅 {isRtl ? `اليوم ${dayNum}: جدول المحطات والتنقل في ${cityName}` : `Day ${dayNum}: Itinerary & Stops in ${cityName}`}</span>
              <span style={{ fontSize: '11px', color: '#D6AD72', fontWeight: 700 }}>
                {dayItems.length} {isRtl ? 'محطات متتابعة' : 'Stops'}
              </span>
            </div>

            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '12px',
                border: '1px solid #E8D9C5',
                boxSizing: 'border-box'
              }}
            >
              <thead>
                <tr style={{ backgroundColor: '#FAF8F3', color: '#3B2A22', fontWeight: 800, textAlign: isRtl ? 'right' : 'left' }}>
                  <th style={{ padding: '10px', border: '1px solid #E8D9C5', width: '85px' }}>{isRtl ? 'الوقت' : 'Time'}</th>
                  <th style={{ padding: '10px', border: '1px solid #E8D9C5', width: '180px' }}>{isRtl ? 'الوجهة / المعلم' : 'Destination / Activity'}</th>
                  <th style={{ padding: '10px', border: '1px solid #E8D9C5' }}>{isRtl ? 'الأنشطة الموصى بها والتفاصيل' : 'Recommended Activities & Rationale'}</th>
                  <th style={{ padding: '10px', border: '1px solid #E8D9C5', width: '170px' }}>{isRtl ? 'التنقل والموقع' : 'Transportation & Location'}</th>
                </tr>
              </thead>
              <tbody>
                {dayItems.map((item, idx) => {
                  const isPrayer = item.isPrayerTime;
                  const catObj = categoryLabels[item.category] || { ar: 'محطة سياحية', en: 'Stop' };
                  const mapUrl = getGoogleMapsUrl(
                    isRtl ? item.locationAr : item.locationEn,
                    isRtl ? item.titleAr : item.titleEn,
                    isRtl ? itinerary.destinationNameAr : itinerary.destinationNameEn,
                    item.coordinates,
                    item.googleMapsUrl
                  );

                  return (
                    <tr
                      key={item.id || idx}
                      style={{
                        backgroundColor: isPrayer ? '#FEF3C7' : (idx % 2 === 0 ? '#FFFFFF' : '#FAF8F3')
                      }}
                    >
                      {/* Time */}
                      <td style={{ padding: '10px', border: '1px solid #E8D9C5', verticalAlign: 'top', fontWeight: 800, color: '#3B2A22', textAlign: 'center' }}>
                        <div style={{ backgroundColor: '#FAF8F3', border: '1px solid #E8D9C5', padding: '4px 6px', borderRadius: '6px', fontSize: '11px' }}>
                          ⏱️ {item.time}
                        </div>
                      </td>

                      {/* Destination Name & Category */}
                      <td style={{ padding: '10px', border: '1px solid #E8D9C5', verticalAlign: 'top' }}>
                        <div style={{ fontWeight: 800, color: '#3B2A22', fontSize: '13px', marginBottom: '4px' }}>
                          {isRtl ? item.titleAr : item.titleEn}
                        </div>
                        <span
                          style={{
                            display: 'inline-block',
                            fontSize: '10px',
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: '12px',
                            backgroundColor: '#E8D9C5',
                            color: '#3B2A22'
                          }}
                        >
                          {isRtl ? catObj.ar : catObj.en}
                        </span>
                      </td>

                      {/* Recommended Activities & Details */}
                      <td style={{ padding: '10px', border: '1px solid #E8D9C5', verticalAlign: 'top', color: '#374151', lineHeight: '1.5' }}>
                        <p style={{ margin: '0 0 6px 0', fontWeight: 600 }}>
                          💡 {isRtl ? item.aiRationaleAr : item.aiRationaleEn}
                        </p>
                        {item.distanceAr && (
                          <div style={{ fontSize: '11px', color: '#6B7280' }}>
                            🚗 {isRtl ? `المسافة المقدرة: ${item.distanceAr}` : `Distance: ${item.distanceEn}`}
                          </div>
                        )}
                      </td>

                      {/* Transportation & Location */}
                      <td style={{ padding: '10px', border: '1px solid #E8D9C5', verticalAlign: 'top', fontSize: '11px' }}>
                        <div style={{ fontWeight: 700, color: '#4F6F52', marginBottom: '4px' }}>
                          📍 {isRtl ? item.locationAr : item.locationEn}
                        </div>
                        <div style={{ color: '#4B5563', marginBottom: '6px' }}>
                          ♿ {item.isWheelchairAccessible ? (isRtl ? 'ميسّر لكبار السن والكراسي' : 'Accessible') : (isRtl ? 'تيسير متوسط' : 'Moderate Access')}
                        </div>
                        {item.mobilityNoteAr && (
                          <div style={{ color: '#7C2D12', fontSize: '10px', marginBottom: '6px', backgroundColor: '#FFEDD5', padding: '3px 6px', borderRadius: '4px' }}>
                            ℹ️ {isRtl ? item.mobilityNoteAr : item.mobilityNoteEn}
                          </div>
                        )}
                        <a
                          href={mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-block',
                            color: '#1E3A8A',
                            backgroundColor: '#E0F2FE',
                            border: '1px solid #7DD3FC',
                            borderRadius: '6px',
                            padding: '4px 10px',
                            fontWeight: 800,
                            textDecoration: 'none',
                            fontSize: '11px',
                            lineHeight: '1.4'
                          }}
                        >
                          🗺️ {isRtl ? 'افتح الموقع على الخريطة' : 'Open Google Maps Link'}
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}

      {/* MEAL & FOOD RECOMMENDATIONS TABLE */}
      {foodItems.length > 0 && (
        <div style={{ marginBottom: '28px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#3B2A22', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>☕🍽️ {isRtl ? 'توصيات الوجبات والتجارب والمقاهي' : 'Meal & Dining Recommendations'}</span>
          </h3>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '12px',
              border: '1px solid #E8D9C5'
            }}
          >
            <thead>
              <tr style={{ backgroundColor: '#C58B5C', color: '#FFFFFF', textAlign: isRtl ? 'right' : 'left' }}>
                <th style={{ padding: '8px 12px', border: '1px solid #A87146', width: '90px' }}>{isRtl ? 'الوقت' : 'Time'}</th>
                <th style={{ padding: '8px 12px', border: '1px solid #A87146', width: '180px' }}>{isRtl ? 'اسم المطعم / المقهى' : 'Place Name'}</th>
                <th style={{ padding: '8px 12px', border: '1px solid #A87146' }}>{isRtl ? 'نوع الوجبة والتوصية' : 'Recommendation Details'}</th>
                <th style={{ padding: '8px 12px', border: '1px solid #A87146', width: '150px' }}>{isRtl ? 'الموقع والخريطة' : 'Location & Map'}</th>
              </tr>
            </thead>
            <tbody>
              {foodItems.map((item, idx) => {
                const mapUrl = getGoogleMapsUrl(
                  isRtl ? item.locationAr : item.locationEn,
                  isRtl ? item.titleAr : item.titleEn,
                  isRtl ? itinerary.destinationNameAr : itinerary.destinationNameEn,
                  item.coordinates,
                  item.googleMapsUrl
                );

                return (
                  <tr key={item.id || idx} style={{ backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#FAF8F3' }}>
                    <td style={{ padding: '8px 12px', border: '1px solid #E8D9C5', fontWeight: 800, textAlign: 'center' }}>
                      {item.time}
                    </td>
                    <td style={{ padding: '8px 12px', border: '1px solid #E8D9C5', fontWeight: 800, color: '#3B2A22' }}>
                      {isRtl ? item.titleAr : item.titleEn}
                    </td>
                    <td style={{ padding: '8px 12px', border: '1px solid #E8D9C5', color: '#374151' }}>
                      {isRtl ? item.aiRationaleAr : item.aiRationaleEn}
                    </td>
                    <td style={{ padding: '8px 12px', border: '1px solid #E8D9C5', color: '#4F6F52', fontWeight: 700 }}>
                      <div style={{ marginBottom: '4px' }}>📍 {isRtl ? item.locationAr : item.locationEn}</div>
                      <a 
                        href={mapUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        style={{ 
                          display: 'inline-block',
                          color: '#1E3A8A', 
                          backgroundColor: '#E0F2FE',
                          border: '1px solid #7DD3FC',
                          borderRadius: '6px',
                          padding: '4px 8px',
                          fontWeight: 800,
                          textDecoration: 'none',
                          fontSize: '11px',
                          lineHeight: '1.4'
                        }}
                      >
                        🗺️ {isRtl ? 'افتح الخريطة' : 'Open Map'}
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ADDITIONAL IMPORTANT ITINERARY INFORMATION */}
      <div
        style={{
          backgroundColor: '#FAF8F3',
          border: '1px solid #E8D9C5',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '24px',
          fontSize: '12px'
        }}
      >
        <h4 style={{ margin: '0 0 8px 0', fontSize: '13px', fontWeight: 800, color: '#3B2A22' }}>
          ℹ️ {isRtl ? 'إرشادات هامة ومعلومات إضافية للرحلة:' : 'Important Itinerary Notes:'}
        </h4>
        <ul style={{ margin: 0, paddingRight: isRtl ? '20px' : '0', paddingLeft: isRtl ? '0' : '20px', color: '#4B5563', lineHeight: '1.7' }}>
          <li>
            <strong>{isRtl ? 'أوقات الصلاة:' : 'Prayer Times:'}</strong> {isRtl ? `تمت مراعاة توقيت أذان الظهر (${cityData.prayerTimes.dhuhr}) والعصر (${cityData.prayerTimes.asr}) بالقرب من المساجد التاريخية والجوامع الرئيسية.` : `Dhuhr (${cityData.prayerTimes.dhuhr}) and Asr (${cityData.prayerTimes.asr}) prayers are scheduled near historic mosques.`}
          </li>
          <li>
            <strong>{isRtl ? 'التنقل والراحة:' : 'Transportation:'}</strong> {isRtl ? 'يُنصح باستخدام سيارات الأجرة الذكية أو التنقل المباشر وتجنب التعرض للشمس المباشرة في أوقات الظهيرة.' : 'Use rideshare apps and avoid direct noon heat during walking tours.'}
          </li>
          <li>
            <strong>{isRtl ? 'كبار السن ومستخدمي الكراسي:' : 'Mobility:'}</strong> {isRtl ? 'المحطات المحددة بعلامة ♿ مجهزة بممرات مستوية ومصاعد تيسر حركة كبار السن وعربات الأطفال.' : 'Stops with ♿ indicator provide step-free access and ramps for elderly visitors.'}
          </li>
        </ul>
      </div>

      {/* FOOTER */}
      <div
        style={{
          borderTop: '2px solid #E8D9C5',
          paddingTop: '16px',
          textAlign: 'center',
          fontSize: '11px',
          color: '#6B7280',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <p style={{ margin: 0 }}>
          {isRtl ? 'تم إنشاؤه عبر منصة رحلتي AI - المملكة العربية السعودية' : 'Generated via Rihlaty AI Platform - Kingdom of Saudi Arabia'}
        </p>
        <p style={{ margin: 0, color: '#4F6F52', fontWeight: 700 }}>rihlaty.sa</p>
      </div>
    </div>
  );
};
