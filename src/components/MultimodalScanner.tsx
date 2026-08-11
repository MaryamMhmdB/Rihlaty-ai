import React, { useState } from 'react';
import { Camera, Upload, Sparkles, MapPin, BookOpen, Landmark, ExternalLink, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { ImageAnalysisResult, Language } from '../types';
import { translations } from '../data/translations';
import { PalmIcon } from './PalmIcon';
import { ImageWithFallback } from './ImageWithFallback';
import { getGoogleMapsUrl } from '../utils/mapUtils';

interface MultimodalScannerProps {
  lang: Language;
}

export const MultimodalScanner: React.FC<MultimodalScannerProps> = ({ lang }) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';

  const [selectedImage, setSelectedImage] = useState<string | null>('/images/alula_hegra_tomb_1786293300477.jpg');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<ImageAnalysisResult | null>({
    titleAr: "مقبرة قصر الفريد — الحِجر (العلا)",
    titleEn: "Qasr al-Farid Tomb — Hegra (AlUla)",
    locationAr: "العلا، المملكة العربية السعودية",
    locationEn: "AlUla, Kingdom of Saudi Arabia",
    historicalInfoAr: "من أشهر المقابر النبطية المنحوتة في الصخر العريق، ويعود تاريخها إلى القرن الأول الميلادي. وتنفرد بوجود صخرة مستقلة منحوتة بواجهة واحدة ملكية شُيدت للحيان بن كوزا.",
    historicalInfoEn: "A magnificent 1st-century AD Nabataean tomb carved directly into a single massive sandstone outcrop.",
    culturalImportanceAr: "تعد أول موقع سعودي يتم تسجيله ضمن التراث العالمي لليونسكو (2008)، وتجسد عبقرية النحت النبطي واندماج التأثيرات المعمارية الإغريقية والشرقية.",
    culturalImportanceEn: "First UNESCO World Heritage site in Saudi Arabia (2008), exemplifying Nabataean artistic mastery.",
    nearbyPlacesAr: ["جبل إثلب وممر الديوان", "جبل الفيل", "البلدة القديمة بالعلا", "متحف الفن المعاصر في الواحة"],
    nearbyPlacesEn: ["Jabal Ithlib & Diwan", "Elephant Rock", "AlUla Old Town", "Oasis Art Gallery"],
    sourceAr: "المصدر: الهيئة الملكية لمحافظة العلا & اليونسكو",
    sourceEn: "Source: Royal Commission for AlUla & UNESCO"
  });

  const samples = [
    {
      titleAr: t.sampleAlula,
      titleEn: 'AlUla Hegra',
      image: '/images/alula_hegra_tomb_1786293300477.jpg',
      preset: {
        titleAr: "مقبرة قصر الفريد — الحِجر (العلا)",
        titleEn: "Qasr al-Farid Tomb — Hegra (AlUla)",
        locationAr: "محافظة العلا، المملكة العربية السعودية",
        locationEn: "AlUla Governorate, Saudi Arabia",
        historicalInfoAr: "مقبرة نبطية منحوتة في كتلة صخرية فردية يعود تاريخها إلى القرن الأول الميلادي.",
        historicalInfoEn: "Iconic 1st Century AD Nabataean tomb carved in a single sandstone rock.",
        culturalImportanceAr: "موقع تراث عالمي معتمد من اليونسكو يمثل ذروة الفن والعمق التاريخي.",
        culturalImportanceEn: "UNESCO World Heritage landmark reflecting ancient Arabian craftsmanship.",
        nearbyPlacesAr: ["جبل الفيل", "البلدة القديمة", "واحة العلا التاريخية"],
        nearbyPlacesEn: ["Elephant Rock", "Old Town", "AlUla Oasis"],
        sourceAr: "المصدر: الهيئة الملكية لمحافظة العلا",
        sourceEn: "Source: Royal Commission for AlUla"
      }
    },
    {
      titleAr: t.sampleDiriyah,
      titleEn: 'Diriyah At-Turaif',
      image: '/images/diriyah_atturaif_1786293313850.jpg',
      preset: {
        titleAr: "حي الطريف التاريخي — الدرعية",
        titleEn: "At-Turaif District — Diriyah",
        locationAr: "الدرعية، منطقة الرياض، السعودية",
        locationEn: "Diriyah, Riyadh Region, Saudi Arabia",
        historicalInfoAr: "العاصمة الأولى للدولة السعودية وتتميز بقصورها المبنية من الطين اللبن على الطراز النجدي الأصيل.",
        historicalInfoEn: "First capital of the Saudi State built with mud-brick Najdi architectural heritage.",
        culturalImportanceAr: "رمز العز والتاريخ السعودي ومسجلة في قائمة التراث العالمي لليونسكو.",
        culturalImportanceEn: "Symbol of Saudi founding heritage and UNESCO World Heritage Site.",
        nearbyPlacesAr: ["البجيري هانout", "متحف التأسيس", "قصر سلوى التاريخي"],
        nearbyPlacesEn: ["Bujairi Terrace", "Founding Museum", "Salwa Palace"],
        sourceAr: "المصدر: هيئة تطوير بوابة الدرعية",
        sourceEn: "Source: Diriyah Gate Development Authority"
      }
    },
    {
      titleAr: t.sampleJeddah,
      titleEn: 'Historic Jeddah',
      image: '/images/jeddah_albalad_1786293328938.jpg',
      preset: {
        titleAr: "بيوت البلد والرواشين الخشبية — جدة التاريخية",
        titleEn: "Al-Balad & Wooden Roshan — Historic Jeddah",
        locationAr: "منطقة البلد، جدة، السعودية",
        locationEn: "Al-Balad District, Jeddah, Saudi Arabia",
        historicalInfoAr: "بيوت مبنية من الحجر المرجاني تعود لمئات السنين وتتميز بالرواشين الخشبية المزخرفة يدوياً.",
        historicalInfoEn: "Historic coral-stone merchant houses with handcrafted wooden Roshan window balconies.",
        culturalImportanceAr: "بوابة البحر الأحمر التاريخية والتراث العمراني الفريد المسجل باليونسكو.",
        culturalImportanceEn: "Historic Red Sea trade gateway and UNESCO World Heritage Site.",
        nearbyPlacesAr: ["بيت نصيف", "سوق العلوي", "مقهى ومتحف البلد"],
        nearbyPlacesEn: ["Nassif House", "Al-Alawi Souk", "Al-Balad Cafe"],
        sourceAr: "المصدر: وزارة الثقافة — برنامج جدة التاريخية",
        sourceEn: "Source: Ministry of Culture — Historic Jeddah"
      }
    }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setSelectedImage(base64);
        analyzeImageServer(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectSample = (sample: typeof samples[0]) => {
    setSelectedImage(sample.image);
    setAnalysisResult(sample.preset);
  };

  const analyzeImageServer = async (base64Data: string) => {
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/analyze-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: base64Data, lang })
      });
      const json = await res.json();
      if (json.success && json.data) {
        setAnalysisResult(json.data);
      }
    } catch (err) {
      console.error("Analysis error:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <section id="lens" className="py-12 bg-[#FAF8F3] dark:bg-[#171310] relative border-t border-[#F3E6D0] dark:border-[#493A2F] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#241D18] border border-[#F3E6D0] dark:border-[#493A2F] text-[#4F6F52] dark:text-[#D6AD72] text-xs font-bold shadow-sm">
            <PalmIcon className="w-4 h-4 text-[#C58B5C] dark:text-[#D6AD72]" />
            <span>{lang === 'ar' ? 'محرك الرؤية البصرية البصرية' : 'AI Multimodal Vision Engine'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3B2A22] dark:text-[#FAF8F3]">
            {t.lensTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#3B2A22]/80 dark:text-[#C8BDB2] max-w-2xl mx-auto font-medium">
            {t.lensSub}
          </p>
        </div>

        {/* Preset Sample Selector Buttons */}
        <div className="space-y-2 mb-8 text-center">
          <span className="text-xs font-bold text-[#3B2A22]/70 dark:text-[#C8BDB2] block">
            {t.useSample}
          </span>
          <div className="flex flex-wrap justify-center gap-2.5">
            {samples.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectSample(sample)}
                className="px-4 py-2 rounded-full bg-white dark:bg-[#241D18] hover:bg-[#F3E6D0] dark:hover:bg-[#493A2F] text-[#3B2A22] dark:text-[#FAF8F3] border border-[#F3E6D0] dark:border-[#493A2F] text-xs font-bold transition-all shadow-sm flex items-center gap-2"
              >
                <ImageIcon className="w-3.5 h-3.5 text-[#C58B5C] dark:text-[#D6AD72]" />
                <span>{isRtl ? sample.titleAr : sample.titleEn}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Analyzer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Image Upload & Preview Box */}
          <div className="lg:col-span-5 space-y-3">
            <div className="relative rounded-3xl overflow-hidden border border-[#F3E6D0] dark:border-[#493A2F] bg-[#3B2A22] dark:bg-[#241D18] shadow-sm min-h-[300px] flex items-center justify-center">
              {selectedImage ? (
                <ImageWithFallback
                  src={selectedImage}
                  fallbackSrc="https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?auto=format&fit=crop&w=1200&q=80"
                  alt="Saudi Heritage Landmark Analysis"
                  className="w-full h-80 object-cover"
                />
              ) : (
                <div className="text-center p-8 text-[#FAF8F3] space-y-3">
                  <Camera className="w-12 h-12 text-[#C58B5C] dark:text-[#D6AD72] mx-auto" />
                  <p className="text-sm font-bold">{t.uploadPrompt}</p>
                </div>
              )}

              {isAnalyzing && (
                <div className="absolute inset-0 bg-[#171310]/80 backdrop-blur-sm flex flex-col items-center justify-center text-white space-y-3">
                  <div className="w-7 h-7 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs font-bold text-[#F3E6D0]">{t.analyzing}</span>
                </div>
              )}
            </div>

            {/* File Upload Trigger Button */}
            <label className="w-full py-3.5 px-6 rounded-full bg-[#4F6F52] hover:bg-[#3B2A22] dark:hover:bg-[#C58B5C] text-white font-bold text-xs sm:text-sm shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-2">
              <Upload className="w-4 h-4 text-[#C58B5C] dark:text-[#D6AD72]" />
              <span>{lang === 'ar' ? 'رفع صورة من جهازك / الكاميرا' : 'Upload or Capture Image'}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Right Column: AI Analysis Output Results */}
          <div className="lg:col-span-7 bg-white dark:bg-[#241D18] border border-[#F3E6D0] dark:border-[#493A2F] rounded-3xl p-6 sm:p-8 shadow-sm space-y-5 transition-colors">
            
            {analysisResult ? (
              <div className="space-y-5 animate-fadeIn">
                
                {/* Result Title */}
                <div className="pb-3.5 border-b border-[#F3E6D0] dark:border-[#493A2F] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#4F6F52] dark:text-[#D6AD72] uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#C58B5C] dark:text-[#D6AD72]" />
                      {t.analyzedTitle}
                    </span>
                    <span className="text-xs font-bold text-[#C58B5C] dark:text-[#D6AD72] bg-[#FAF8F3] dark:bg-[#30251E] px-2.5 py-0.5 rounded-full border border-[#F3E6D0] dark:border-[#493A2F]">
                      Gemini Multimodal
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#3B2A22] dark:text-[#FAF8F3]">
                    {isRtl ? analysisResult.titleAr : analysisResult.titleEn}
                  </h3>
                  <div className="text-xs font-semibold text-[#3B2A22]/70 dark:text-[#C8BDB2] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#4F6F52] dark:text-[#D6AD72]" />
                    <span>{isRtl ? analysisResult.locationAr : analysisResult.locationEn}</span>
                  </div>
                </div>

                {/* Historical Background */}
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold text-[#3B2A22] dark:text-[#FAF8F3] flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#C58B5C] dark:text-[#D6AD72]" />
                    <span>{t.historicalBackground}</span>
                  </h4>
                  <p className="text-xs text-[#3B2A22]/80 dark:text-[#C8BDB2] leading-relaxed font-medium bg-[#FAF8F3] dark:bg-[#30251E] p-3 rounded-2xl border border-[#F3E6D0] dark:border-[#493A2F]">
                    {isRtl ? analysisResult.historicalInfoAr : analysisResult.historicalInfoEn}
                  </p>
                </div>

                {/* Cultural Importance */}
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold text-[#3B2A22] dark:text-[#FAF8F3] flex items-center gap-1.5">
                    <Landmark className="w-3.5 h-3.5 text-[#4F6F52] dark:text-[#D6AD72]" />
                    <span>{t.culturalImportance}</span>
                  </h4>
                  <p className="text-xs text-[#3B2A22]/80 dark:text-[#C8BDB2] leading-relaxed font-medium bg-[#FAF8F3] dark:bg-[#30251E] p-3 rounded-2xl border border-[#F3E6D0] dark:border-[#493A2F]">
                    {isRtl ? analysisResult.culturalImportanceAr : analysisResult.culturalImportanceEn}
                  </p>
                </div>

                {/* Nearby Recommendations */}
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold text-[#3B2A22] dark:text-[#FAF8F3] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C58B5C] dark:text-[#D6AD72]" />
                    <span>{t.nearbyRecommendations}</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {(isRtl ? analysisResult.nearbyPlacesAr : analysisResult.nearbyPlacesEn).map((place, idx) => (
                      <a
                        key={idx}
                        href={getGoogleMapsUrl(place, undefined, isRtl ? analysisResult.locationAr : analysisResult.locationEn)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-full bg-[#4F6F52]/5 dark:bg-[#4F6F52]/20 border border-[#4F6F52]/20 dark:border-[#4F6F52]/40 text-[#4F6F52] dark:text-[#D6AD72] hover:bg-[#4F6F52] hover:text-white dark:hover:bg-[#D6AD72] dark:hover:text-[#3B2A22] transition-colors font-bold text-xs inline-flex items-center gap-1"
                      >
                        📍 {place}
                        <ExternalLink className="w-3 h-3 opacity-75" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Source Footnote */}
                <div className="pt-3 border-t border-[#F3E6D0] dark:border-[#493A2F] text-[11px] font-bold text-[#C58B5C] dark:text-[#D6AD72] flex items-center gap-1">
                  <span>{t.source}:</span>
                  <span>{isRtl ? analysisResult.sourceAr : analysisResult.sourceEn}</span>
                </div>

              </div>
            ) : (
              <div className="text-center py-12 text-[#3B2A22]/70 dark:text-[#C8BDB2] space-y-2">
                <AlertCircle className="w-8 h-8 text-[#C58B5C] dark:text-[#D6AD72] mx-auto" />
                <p className="text-xs font-bold">
                  {lang === 'ar' ? 'اختر أو ارفع صورة لعرض التحليل التاريخي' : 'Select or upload a photo to view analysis'}
                </p>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
