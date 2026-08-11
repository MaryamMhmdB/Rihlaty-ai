import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
// @ts-ignore
import html2pdf from 'html2pdf.js';
import { 
  Clock, MapPin, Accessibility, Sun, Users, Sparkles, Download, Loader2,
  RefreshCw, CheckCircle2, Filter, ExternalLink, ShieldAlert, Heart, ShieldCheck, CloudSun, Calendar
} from 'lucide-react';
import { ItineraryResult, Language, ItineraryItem } from '../types';
import { translations } from '../data/translations';
import { PalmIcon } from './PalmIcon';
import { TravelBookletDocument } from './TravelBookletDocument';
import { getSaudiCityData } from '../data/saudiData';
import { getItineraryItemImage, getDestinationFallbackImage } from '../utils/imageHelper';
import { getGoogleMapsUrl } from '../utils/mapUtils';
import { WeatherModal } from './WeatherModal';
import { ImageWithFallback } from './ImageWithFallback';

interface ItineraryViewProps {
  itinerary: ItineraryResult;
  lang: Language;
  onReplan: () => void;
}

export const ItineraryView: React.FC<ItineraryViewProps> = ({ itinerary, lang, onReplan }) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const cityData = getSaudiCityData(itinerary.destinationNameAr || itinerary.destinationNameEn);

  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [selectedDayFilter, setSelectedDayFilter] = useState<number | 'all'>('all');
  const [isExporting, setIsExporting] = useState(false);
  const [isWeatherModalOpen, setIsWeatherModalOpen] = useState(false);

  // Extract unique day numbers across items
  const uniqueDays: number[] = Array.from(
    new Set<number>(
      itinerary.items.map(item => {
        if (item.dayNumber) return Number(item.dayNumber);
        const match = item.time && item.time.match(/اليوم\s*(\d+)/);
        return match ? parseInt(match[1], 10) : 1;
      })
    )
  ).sort((a: number, b: number) => a - b);

  const hasMultipleDays = uniqueDays.length > 1;

  const filterItems = itinerary.items.filter(item => {
    const itemDay = item.dayNumber || (item.time && item.time.match(/اليوم\s*(\d+)/)?.[1] ? parseInt(item.time.match(/اليوم\s*(\d+)/)![1], 10) : 1);
    
    if (selectedDayFilter !== 'all' && itemDay !== selectedDayFilter) {
      return false;
    }

    if (activeCategoryFilter === 'accessible') return item.isWheelchairAccessible;
    if (activeCategoryFilter === 'prayer') return item.isPrayerTime;
    if (activeCategoryFilter === 'dining') return item.category === 'dining' || item.category === 'cafe';
    return true;
  });

  const cleanSource = (rawSource?: string) => {
    if (!rawSource) return '';
    return rawSource
      .replace(/^المصدر\s*:\s*/i, '')
      .replace(/^Source\s*:\s*/i, '')
      .trim();
  };

  const handleExportPdf = async () => {
    if (isExporting) return;
    setIsExporting(true);

    const bookletContainer = document.getElementById('rihlaty-pdf-booklet-container');

    try {
      if (!bookletContainer) {
        throw new Error('Booklet container not found');
      }

      // Display offscreen so dimensions can be rendered without appearing on screen
      bookletContainer.style.display = 'block';
      bookletContainer.style.position = 'absolute';
      bookletContainer.style.left = '-9999px';
      bookletContainer.style.top = '0px';
      bookletContainer.style.width = '800px';

      const exportTarget = (bookletContainer.firstElementChild as HTMLElement) || bookletContainer;

      // Brief pause for DOM rendering
      await new Promise((resolve) => setTimeout(resolve, 150));

      const sanitizedName = (itinerary.destinationNameEn || itinerary.destinationNameAr || 'Saudi_Heritage')
        .replace(/[^a-zA-Z0-9]/g, '_')
        .replace(/_+/g, '_');

      const fileName = `Rihlaty_${sanitizedName}_Itinerary.pdf`;

      // Render offscreen container to canvas safely without oklch parsing issues
      const canvas = await html2canvas(exportTarget, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 800,
        onclone: (clonedDoc) => {
          try {
            // Remove/replace any oklch color functions in style sheets that trigger html2canvas CSS parser errors
            const styles = Array.from(clonedDoc.querySelectorAll('style'));
            styles.forEach((style) => {
              if (style.textContent && style.textContent.includes('oklch')) {
                style.textContent = style.textContent.replace(/oklch\([^)]+\)/g, '#666666');
              }
            });

            // Ensure cloned booklet container uses clean inline colors
            const booklet = clonedDoc.getElementById('rihlaty-pdf-booklet') || clonedDoc.getElementById('rihlaty-pdf-booklet-container');
            if (booklet) {
              const allEls = Array.from(booklet.querySelectorAll('*'));
              allEls.forEach((node) => {
                if (node instanceof HTMLElement) {
                  if (node.style.color && node.style.color.includes('oklch')) {
                    node.style.color = '#2B231D';
                  }
                  if (node.style.backgroundColor && node.style.backgroundColor.includes('oklch')) {
                    node.style.backgroundColor = '#FFFFFF';
                  }
                  if (node.style.borderColor && node.style.borderColor.includes('oklch')) {
                    node.style.borderColor = '#E8D9C5';
                  }
                }
              });
            }
          } catch {
            // Ignore cloning sanitization errors
          }
        }
      });

      // Construct high quality PDF document
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const ratio = pdfWidth / imgWidth;
      const calculatedImgHeight = imgHeight * ratio;

      let heightLeft = calculatedImgHeight;
      let position = 0;

      pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, calculatedImgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - calculatedImgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, calculatedImgHeight);
        heightLeft -= pdfHeight;
      }

      // Add clickable hyperlink annotations for all <a> elements (e.g. Google Maps links)
      try {
        const targetRect = exportTarget.getBoundingClientRect();
        const pxToPtRatio = pdfWidth / (exportTarget.offsetWidth || 790);
        const totalPages = Math.max(1, Math.ceil(calculatedImgHeight / pdfHeight));
        const linkEls = Array.from(exportTarget.querySelectorAll<HTMLAnchorElement>('a[href]'));

        linkEls.forEach((linkEl) => {
          const href = linkEl.getAttribute('href') || linkEl.href;
          if (!href || href === '#' || href.startsWith('javascript:')) return;

          const rect = linkEl.getBoundingClientRect();
          const relLeft = rect.left - targetRect.left;
          const relTop = rect.top - targetRect.top;

          const pdfX = relLeft * pxToPtRatio;
          const pdfYInFullDoc = relTop * pxToPtRatio;
          const pdfW = rect.width * pxToPtRatio;
          const pdfH = rect.height * pxToPtRatio;

          const pageIndex = Math.floor(pdfYInFullDoc / pdfHeight);
          const pdfYOnPage = pdfYInFullDoc - (pageIndex * pdfHeight);

          if (pageIndex >= 0 && pageIndex < totalPages && pdfW > 0 && pdfH > 0) {
            pdf.setPage(pageIndex + 1);
            pdf.link(pdfX, pdfYOnPage, pdfW, pdfH, { url: href });
          }
        });
      } catch (linkErr) {
        console.warn('Could not attach PDF link annotations:', linkErr);
      }

      // Download PDF file directly
      pdf.save(fileName);
    } catch (err) {
      console.error('PDF export error:', err);
      // Secondary fallback
      try {
        let h2pFunc: any = null;
        if (typeof (window as any).html2pdf === 'function') h2pFunc = (window as any).html2pdf;
        else if (typeof html2pdf === 'function') h2pFunc = html2pdf;
        else if (html2pdf && typeof (html2pdf as any).default === 'function') h2pFunc = (html2pdf as any).default;

        if (typeof h2pFunc === 'function') {
          const exportTarget = (bookletContainer?.firstElementChild as HTMLElement) || bookletContainer;
          await h2pFunc().from(exportTarget).save();
        } else {
          window.print();
        }
      } catch {
        window.print();
      }
    } finally {
      if (bookletContainer) {
        bookletContainer.style.display = 'none';
      }
      setIsExporting(false);
    }
  };

  return (
    <section id="itinerary-results" className="py-12 bg-[#FAF8F3] dark:bg-[#171310] relative animate-fadeIn transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Printable Header - Visible ONLY when exporting to PDF / printing */}
        <div className="hidden print:block mb-8 text-center border-b border-gray-300 pb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <PalmIcon className="w-8 h-8 text-[#C58B5C]" />
            <h1 className="text-3xl font-black text-[#3B2A22]">
              {lang === 'ar' ? 'رحلتي | Rihlaty' : 'Rihlaty | رحلتي'}
            </h1>
          </div>
          <p className="text-sm font-bold text-[#4F6F52]">
            {lang === 'ar' ? 'جدول الرحلة السياحية المخصص والمهيأ بالذكاء الاصطناعي' : 'Personalized AI Heritage Travel Itinerary'}
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-gray-500 mt-2">
            <span>📍 {isRtl ? itinerary.destinationNameAr : itinerary.destinationNameEn}</span>
            <span>⏱️ {isRtl ? itinerary.durationAr : itinerary.durationEn}</span>
            <span>📅 {new Date().toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US')}</span>
          </div>
        </div>

        {/* Result Header Card */}
        <div className="bg-white dark:bg-[#241D18] border border-[#F3E6D0] dark:border-[#493A2F] rounded-3xl p-6 sm:p-8 shadow-sm mb-8 relative overflow-hidden transition-colors printable-card">
          
          {/* Top Banner Tag */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#F3E6D0] dark:border-[#493A2F] print:hidden">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4F6F52] animate-ping" />
              <span className="px-3 py-1 rounded-full bg-[#4F6F52]/10 dark:bg-[#4F6F52]/20 text-[#4F6F52] dark:text-[#D6AD72] font-bold text-xs flex items-center gap-1.5">
                <PalmIcon className="w-3.5 h-3.5 text-[#C58B5C] dark:text-[#D6AD72]" />
                <span>{lang === 'ar' ? 'تم توليد الرحلة بنجاح عبر الذكاء الاصطناعي' : 'AI Itinerary Generated Successfully'}</span>
              </span>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 print:hidden">
              <button
                onClick={handleExportPdf}
                disabled={isExporting}
                title={lang === 'ar' ? 'تحميل كملف PDF' : 'Download PDF file'}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#FAF8F3] dark:bg-[#30251E] hover:bg-[#F3E6D0] dark:hover:bg-[#493A2F] text-[#3B2A22] dark:text-[#FAF8F3] text-xs font-bold border border-[#F3E6D0] dark:border-[#493A2F] transition-colors cursor-pointer disabled:opacity-60 shadow-xs"
              >
                {isExporting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 text-[#C58B5C] animate-spin" />
                    <span>{lang === 'ar' ? 'جاري التحميل...' : 'Downloading...'}</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5 text-[#C58B5C] dark:text-[#D6AD72]" />
                    <span>{lang === 'ar' ? 'تحميل PDF' : 'Download PDF'}</span>
                  </>
                )}
              </button>

              <button
                onClick={onReplan}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#4F6F52] text-white hover:bg-[#3B2A22] dark:hover:bg-[#C58B5C] text-xs font-bold transition-colors cursor-pointer print:hidden"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{t.replan}</span>
              </button>
            </div>
          </div>

          {/* Main Title Block */}
          <div className="pt-5 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#3B2A22] dark:text-[#FAF8F3]">
                {isRtl ? `رحلتك في ${itinerary.destinationNameAr}` : `Your Trip to ${itinerary.destinationNameEn}`}
              </h2>
              <span className="text-sm font-bold text-[#C58B5C] dark:text-[#D6AD72] bg-[#FAF8F3] dark:bg-[#30251E] px-3.5 py-1 rounded-full border border-[#F3E6D0] dark:border-[#493A2F] self-start sm:self-auto">
                ⏱️ {isRtl ? itinerary.durationAr : itinerary.durationEn}
              </span>
            </div>

            <p className="text-sm text-[#3B2A22]/80 dark:text-[#C8BDB2] leading-relaxed font-medium">
              {isRtl ? itinerary.summaryAr : itinerary.summaryEn}
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
              <div className="p-3 rounded-2xl bg-[#FAF8F3] dark:bg-[#30251E] border border-[#F3E6D0] dark:border-[#493A2F] text-center">
                <span className="text-[11px] text-[#C58B5C] dark:text-[#D6AD72] block font-bold">{t.distance}</span>
                <span className="text-sm font-bold text-[#3B2A22] dark:text-[#FAF8F3]">{isRtl ? itinerary.totalDistanceAr : itinerary.totalDistanceEn}</span>
              </div>

              <div className="p-3 rounded-2xl bg-[#4F6F52]/5 dark:bg-[#4F6F52]/20 border border-[#4F6F52]/20 dark:border-[#4F6F52]/40 text-center">
                <span className="text-[11px] text-[#4F6F52] dark:text-[#D6AD72] block font-bold">{t.accessibilityScore}</span>
                <span className="text-sm font-bold text-[#4F6F52] dark:text-[#FAF8F3]">{itinerary.accessibilityScore}%</span>
              </div>

              <button
                onClick={() => setIsWeatherModalOpen(true)}
                className="p-3 rounded-2xl bg-[#FAF8F3] dark:bg-[#30251E] border border-[#F3E6D0] dark:border-[#493A2F] text-center hover:border-[#C58B5C] transition-all cursor-pointer group"
                title={lang === 'ar' ? 'عرض تفاصيل الطقس المباشر وطقس الغد' : 'View live weather & tomorrow forecast'}
              >
                <span className="text-[11px] text-[#C58B5C] dark:text-[#D6AD72] block font-bold group-hover:underline">
                  {lang === 'ar' ? 'طقس اليوم' : "Today's Weather"}
                </span>
                <span className="text-sm font-bold text-[#3B2A22] dark:text-[#FAF8F3]">
                  {cityData.weather.tempC}°C {cityData.weather.icon}
                </span>
                <span className="text-[9px] text-amber-700 dark:text-amber-300 font-semibold block mt-0.5">
                  {lang === 'ar' ? 'اضغط للتفاصيل' : 'Click for details'}
                </span>
              </button>

              <div className="p-3 rounded-2xl bg-[#FAF8F3] dark:bg-[#30251E] border border-[#F3E6D0] dark:border-[#493A2F] text-center">
                <span className="text-[11px] text-[#C58B5C] dark:text-[#D6AD72] block font-bold">{lang === 'ar' ? 'تنسيق الصلاة' : 'Prayer Sync'}</span>
                <span className="text-sm font-bold text-[#3B2A22] dark:text-[#FAF8F3]">{lang === 'ar' ? 'مفعّل 🕌' : 'Synced 🕌'}</span>
              </div>
            </div>

            {/* Weather Hourly & Tomorrow Feature Card */}
            <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-[#2A211B] dark:to-[#35271F] border border-amber-200/80 dark:border-amber-900/40">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-[#3B2A22] text-amber-300">
                    <CloudSun className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-[#3B2A22] dark:text-[#FAF8F3]">
                        {isRtl ? 'حالة الطقس اليوم والأنشطة' : "Today's Live Weather"}
                      </span>
                      <span className="text-[10px] font-bold bg-[#C58B5C] text-white px-2 py-0.5 rounded-full">
                        {cityData.weather.tempC}°C
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      {isRtl ? cityData.weather.descAr : cityData.weather.descEn}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsWeatherModalOpen(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#3B2A22] dark:bg-[#C58B5C] text-white font-bold text-xs hover:bg-[#523B30] transition-colors flex items-center justify-center gap-1.5 self-start sm:self-auto shadow-sm"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{isRtl ? 'الطقس بالساعات وطقس الغد' : 'Hourly & Tomorrow Weather'}</span>
                </button>
              </div>

              {/* Hourly Quick Strip */}
              <div className="grid grid-cols-5 gap-1.5 pt-2 border-t border-amber-200/60 dark:border-amber-900/30 text-center">
                {cityData.weather.hourly.map((h, i) => (
                  <div key={i} className="bg-white/80 dark:bg-[#1E1713]/80 p-2 rounded-xl border border-amber-200/40 dark:border-amber-900/20">
                    <span className="text-[10px] font-semibold text-gray-500 block">{h.time}</span>
                    <span className="text-base my-0.5 block">{h.icon}</span>
                    <span className="text-xs font-extrabold text-[#3B2A22] dark:text-[#FAF8F3]">{h.tempC}°C</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Filter Bar & Day Tabs */}
        <div className="space-y-3 mb-6 print:hidden">
          {/* Multi-day Filter Row */}
          {hasMultipleDays && (
            <div className="p-3 rounded-2xl bg-[#C58B5C]/10 dark:bg-[#C58B5C]/20 border border-[#C58B5C]/30 flex items-center gap-2 overflow-x-auto scrollbar-none">
              <span className="text-xs font-extrabold text-[#3B2A22] dark:text-[#FAF8F3] shrink-0 flex items-center gap-1.5 px-1">
                <Calendar className="w-4 h-4 text-[#C58B5C] dark:text-[#D6AD72]" />
                <span>{isRtl ? 'الأيام:' : 'Days:'}</span>
              </span>
              <button
                onClick={() => setSelectedDayFilter('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                  selectedDayFilter === 'all'
                    ? 'bg-[#C58B5C] text-white shadow-sm scale-105'
                    : 'bg-white dark:bg-[#241D18] border border-[#F3E6D0] dark:border-[#493A2F] text-[#3B2A22] dark:text-[#FAF8F3] hover:bg-[#F3E6D0] dark:hover:bg-[#493A2F]'
                }`}
              >
                {isRtl ? 'جميع الأيام' : 'All Days'}
              </button>
              {uniqueDays.map(dayNum => (
                <button
                  key={dayNum}
                  onClick={() => setSelectedDayFilter(dayNum)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                    selectedDayFilter === dayNum
                      ? 'bg-[#C58B5C] text-white shadow-sm scale-105'
                      : 'bg-white dark:bg-[#241D18] border border-[#F3E6D0] dark:border-[#493A2F] text-[#3B2A22] dark:text-[#FAF8F3] hover:bg-[#F3E6D0] dark:hover:bg-[#493A2F]'
                  }`}
                >
                  📅 {isRtl ? (dayNum === 2 ? 'اليوم الثاني' : dayNum === 1 ? 'اليوم الأول' : `اليوم ${dayNum}`) : `Day ${dayNum}`}
                </button>
              ))}
            </div>
          )}

          {/* Category Filter Row */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-xs font-bold text-[#3B2A22] dark:text-[#FAF8F3]">
              <Filter className="w-4 h-4 text-[#C58B5C] dark:text-[#D6AD72]" />
              <span>{lang === 'ar' ? 'تصفية المحطات:' : 'Filter Stops:'}</span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setActiveCategoryFilter('all')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
                  activeCategoryFilter === 'all'
                    ? 'bg-[#3B2A22] dark:bg-[#C58B5C] text-white'
                    : 'bg-white dark:bg-[#241D18] border border-[#F3E6D0] dark:border-[#493A2F] text-[#3B2A22] dark:text-[#FAF8F3] hover:bg-[#F3E6D0] dark:hover:bg-[#493A2F]'
                }`}
              >
                {lang === 'ar' ? 'جميع المحطات' : 'All Stops'} ({itinerary.items.length})
              </button>

              <button
                onClick={() => setActiveCategoryFilter('accessible')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
                  activeCategoryFilter === 'accessible'
                    ? 'bg-[#4F6F52] text-white'
                    : 'bg-white dark:bg-[#241D18] border border-[#F3E6D0] dark:border-[#493A2F] text-[#3B2A22] dark:text-[#FAF8F3] hover:bg-[#F3E6D0] dark:hover:bg-[#493A2F]'
                }`}
              >
                ♿ {t.wheelchairFriendly}
              </button>

              <button
                onClick={() => setActiveCategoryFilter('prayer')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
                  activeCategoryFilter === 'prayer'
                    ? 'bg-[#C58B5C] text-white'
                    : 'bg-white dark:bg-[#241D18] border border-[#F3E6D0] dark:border-[#493A2F] text-[#3B2A22] dark:text-[#FAF8F3] hover:bg-[#F3E6D0] dark:hover:bg-[#493A2F]'
                }`}
              >
                🕌 {lang === 'ar' ? 'استراحات الصلاة' : 'Prayer Stops'}
              </button>

              <button
                onClick={() => setActiveCategoryFilter('dining')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
                  activeCategoryFilter === 'dining'
                    ? 'bg-[#3B2A22] dark:bg-[#C58B5C] text-white'
                    : 'bg-white dark:bg-[#241D18] border border-[#F3E6D0] dark:border-[#493A2F] text-[#3B2A22] dark:text-[#FAF8F3] hover:bg-[#F3E6D0] dark:hover:bg-[#493A2F]'
                }`}
              >
                🍽️ {lang === 'ar' ? 'المطاعم والمقاهي' : 'Dining & Cafes'}
              </button>
            </div>
          </div>
        </div>

        {/* Timeline Items Stack */}
        <div className="relative space-y-4">
          
          {filterItems.map((item, idx) => {
            const isPrayer = item.isPrayerTime;
            const itemImg = getItineraryItemImage(item, itinerary.destinationNameAr || itinerary.destinationNameEn);
            const currentItemDay = item.dayNumber || (item.time && item.time.match(/اليوم\s*(\d+)/)?.[1] ? parseInt(item.time.match(/اليوم\s*(\d+)/)![1], 10) : 1);
            const prevItemDay = idx > 0 ? (filterItems[idx - 1].dayNumber || (filterItems[idx - 1].time && filterItems[idx - 1].time.match(/اليوم\s*(\d+)/)?.[1] ? parseInt(filterItems[idx - 1].time.match(/اليوم\s*(\d+)/)![1], 10) : 1)) : null;
            const showDayHeader = hasMultipleDays && (idx === 0 || currentItemDay !== prevItemDay);
            
            return (
              <React.Fragment key={item.id || idx}>
                {showDayHeader && (
                  <div className="pt-4 pb-1">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#3B2A22] dark:bg-[#C58B5C] text-white font-extrabold text-sm shadow-sm">
                      <Calendar className="w-4 h-4 text-[#D6AD72]" />
                      <span>
                        {isRtl ? `📅 برنامج اليوم ${currentItemDay}` : `📅 Day ${currentItemDay} Program`}
                      </span>
                    </div>
                  </div>
                )}

                <div
                  className={`relative rounded-3xl p-5 border transition-all duration-200 shadow-sm hover:shadow-md printable-card ${
                    isPrayer
                      ? 'border-[#C58B5C] dark:border-[#D6AD72] bg-[#FAF8F3] dark:bg-[#241D18]'
                      : 'border-[#F3E6D0] dark:border-[#493A2F] bg-white dark:bg-[#30251E] hover:border-[#4F6F52]'
                  }`}
                >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-5">
                  
                  {/* Item Image Thumbnail */}
                  <div className="w-full md:w-48 lg:w-56 h-40 shrink-0 rounded-2xl overflow-hidden border border-[#F3E6D0] dark:border-[#493A2F] relative bg-gray-100 dark:bg-[#241D18]">
                    <ImageWithFallback 
                      src={itemImg} 
                      fallbackSrc={getDestinationFallbackImage(itinerary.destinationNameAr || itinerary.destinationNameEn, item.category)}
                      alt={isRtl ? item.titleAr : item.titleEn} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-2.5 right-2.5 rtl:right-auto rtl:left-2.5 px-2.5 py-1 rounded-full bg-[#3B2A22]/85 text-white text-[11px] font-bold backdrop-blur-xs flex items-center gap-1">
                      <span>⏱️ {item.time}</span>
                    </div>
                  </div>

                  {/* Details Column */}
                  <div className="space-y-2.5 flex-1">
                    
                    {/* Time & Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-0.5 rounded-full bg-[#3B2A22] dark:bg-[#241D18] text-white font-bold text-xs border border-transparent dark:border-[#493A2F]">
                        {item.time}
                      </span>

                      {item.isWheelchairAccessible && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#4F6F52]/10 dark:bg-[#4F6F52]/20 text-[#4F6F52] dark:text-[#D6AD72] text-xs font-bold flex items-center gap-1">
                          ♿ {isRtl ? item.mobilityNoteAr : item.mobilityNoteEn}
                        </span>
                      )}

                      {isPrayer && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#C58B5C] text-white text-xs font-bold flex items-center gap-1">
                          🕌 {isRtl ? item.prayerNameAr : item.prayerNameEn}
                        </span>
                      )}

                      <span className="px-2.5 py-0.5 rounded-full bg-[#FAF8F3] dark:bg-[#241D18] border border-[#F3E6D0] dark:border-[#493A2F] text-[#3B2A22] dark:text-[#FAF8F3] text-xs font-semibold flex items-center gap-1">
                        👥 {isRtl ? item.crowdLevelAr : item.crowdLevelEn}
                      </span>

                      <span className="px-2.5 py-0.5 rounded-full bg-[#FAF8F3] dark:bg-[#241D18] border border-[#F3E6D0] dark:border-[#493A2F] text-[#3B2A22] dark:text-[#FAF8F3] text-xs font-semibold flex items-center gap-1">
                        {item.weatherIcon} {item.temperature}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-[#3B2A22] dark:text-[#FAF8F3]">
                      {isRtl ? item.titleAr : item.titleEn}
                    </h3>

                    {/* Location & Distance */}
                    <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-[#3B2A22]/80 dark:text-[#C8BDB2]">
                      <span className="flex items-center gap-1 text-[#4F6F52] dark:text-[#D6AD72]">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        {isRtl ? item.locationAr : item.locationEn}
                      </span>

                      <span className="flex items-center gap-1">
                        📍 {lang === 'ar' ? `المسافة: ${item.distanceAr}` : `Dist: ${item.distanceEn}`}
                      </span>

                      <span className="flex items-center gap-1 text-[#C58B5C] dark:text-[#D6AD72]">
                        ⏱️ {t.travelBetween}: {isRtl ? item.travelTimeAr : item.travelTimeEn}
                      </span>

                      <a
                        href={getGoogleMapsUrl(isRtl ? item.locationAr : item.locationEn, isRtl ? item.titleAr : item.titleEn, isRtl ? itinerary.destinationNameAr : itinerary.destinationNameEn, item.coordinates, item.googleMapsUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#4F6F52] hover:bg-[#3B2A22] text-white font-bold text-xs transition-colors shadow-xs"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{isRtl ? 'موقع قوقل ماب' : 'Google Maps Location'}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    {/* AI Explanation / Rationale */}
                    <div className="p-3 rounded-2xl bg-[#FAF8F3] dark:bg-[#241D18] border border-[#F3E6D0] dark:border-[#493A2F] text-xs text-[#3B2A22] dark:text-[#FAF8F3] font-medium leading-relaxed">
                      <div className="flex items-center gap-1 font-bold text-[#4F6F52] dark:text-[#D6AD72] mb-0.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#C58B5C] dark:text-[#D6AD72]" />
                        <span>{t.whySelected}</span>
                      </div>
                      <p>{isRtl ? item.aiRationaleAr : item.aiRationaleEn}</p>
                    </div>

                    {/* Source Footnote */}
                    {(item.sourceAr || item.sourceEn) && (
                      <div className="text-[11px] font-semibold text-[#C58B5C] dark:text-[#D6AD72] pt-0.5 flex items-center gap-1">
                        <span>{t.source}:</span>
                        <span>{cleanSource(isRtl ? item.sourceAr : item.sourceEn)}</span>
                      </div>
                    )}

                  </div>

                </div>
              </div>
            </React.Fragment>
          );
        })}

        </div>

      </div>

      {/* Weather Modal powered by ArabiaWeather */}
      <WeatherModal
        cityData={cityData}
        isOpen={isWeatherModalOpen}
        onClose={() => setIsWeatherModalOpen(false)}
        lang={lang}
      />

      {/* Offscreen Travel Booklet container for PDF generator */}
      <div 
        id="rihlaty-pdf-booklet-container" 
        style={{ 
          position: 'absolute', 
          left: '-9999px', 
          top: '0', 
          width: '800px', 
          backgroundColor: '#ffffff',
          display: 'none' 
        }}
      >
        <TravelBookletDocument itinerary={itinerary} lang={lang} />
      </div>
    </section>
  );
};
