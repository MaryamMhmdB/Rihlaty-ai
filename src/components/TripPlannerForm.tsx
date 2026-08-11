import React, { useState } from 'react';
import { Calendar, Clock, Accessibility, MapPin, Compass, Heart, CheckCircle2, Sliders, AlertCircle, ShieldCheck } from 'lucide-react';
import { Language, MobilityOption, TripPlannerInput } from '../types';
import { translations } from '../data/translations';
import { PalmIcon } from './PalmIcon';

interface TripPlannerFormProps {
  lang: Language;
  onGenerate: (input: TripPlannerInput) => void;
  isLoading: boolean;
  selectedDestinationFromCard?: string;
}

export const TripPlannerForm: React.FC<TripPlannerFormProps> = ({
  lang,
  onGenerate,
  isLoading,
  selectedDestinationFromCard
}) => {
  const t = translations[lang];

  const getInitialStartTime = () => {
    const now = new Date();
    now.setHours(now.getHours() + 1);
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // State
  const [destination, setDestination] = useState<string>(selectedDestinationFromCard || 'الرياض');
  const [customDestination, setCustomDestination] = useState<string>('');
  const [duration, setDuration] = useState<string>('5 ساعات');
  const [mobility, setMobility] = useState<MobilityOption>('none');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['التاريخ والتراث', 'الطعام']);
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>(['تجنب الزحام', 'أماكن مكيفة']);
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState<string>(getInitialStartTime());

  // React to prop change if user clicked a destination card
  React.useEffect(() => {
    if (selectedDestinationFromCard) {
      setDestination(selectedDestinationFromCard);
    }
  }, [selectedDestinationFromCard]);

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const togglePreference = (pref: string) => {
    if (selectedPreferences.includes(pref)) {
      setSelectedPreferences(selectedPreferences.filter(p => p !== pref));
    } else {
      setSelectedPreferences([...selectedPreferences, pref]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalDest = destination === 'وجهة أخرى' || destination === 'Other Destination' 
      ? (customDestination || (lang === 'ar' ? 'الرياض' : 'Riyadh')) 
      : destination;

    onGenerate({
      destination: finalDest,
      duration,
      mobility,
      interests: selectedInterests,
      preferences: selectedPreferences,
      date,
      time,
    });
  };

  const destinationsList = [
    { label: lang === 'ar' ? 'الرياض' : 'Riyadh', val: 'الرياض', subtitle: lang === 'ar' ? 'المصمك، الدرعية وسوق الزل' : 'Al Masmak, Diriyah & Souk Al-Zal' },
    { label: t.destAlula, val: 'العلا', subtitle: lang === 'ar' ? 'الحِجر، البلدة القديمة' : 'Hegra, Old Town' },
    { label: t.destJeddah, val: 'جدة التاريخية', subtitle: lang === 'ar' ? 'منطقة البلد والعمران المرجاني' : 'Al-Balad Heritage' },
    { label: lang === 'ar' ? 'أبها' : 'Abha', val: 'أبها', subtitle: lang === 'ar' ? 'رجال ألمع، الجبل الأخضر' : 'Rijal Almaa, Green Mtn' },
    { label: lang === 'ar' ? 'الطائف' : 'Taif', val: 'الطائف', subtitle: lang === 'ar' ? 'قصر شبرا، مزارع الورد' : 'Shubra Palace, Rose Gardens' },
    { label: lang === 'ar' ? 'الأحساء' : 'Al-Ahsa', val: 'الأحساء', subtitle: lang === 'ar' ? 'واحة النخيل، جبل القارة' : 'Palm Oasis, Al-Qarah Cave' },
    { label: t.destOther, val: 'وجهة أخرى', subtitle: lang === 'ar' ? 'مدن ومناطق إضافية' : 'Custom Saudi location' },
  ];

  const durationsList = [
    { label: t.time3h, val: '3 ساعات' },
    { label: t.time5h, val: '5 ساعات' },
    { label: t.timeFullDay, val: 'يوم كامل' },
    { label: t.timeMultiDay, val: 'أكثر من يوم' },
  ];

  const mobilityList: { key: MobilityOption; label: string; desc: string; icon: string }[] = [
    { key: 'none', label: t.mobNone, desc: lang === 'ar' ? 'لا توجد قيود على المشي أو الصعود' : 'Standard walking paths', icon: '🏃' },
    { key: 'limited', label: t.mobLimited, desc: lang === 'ar' ? 'مسافات قصيرة وفترات جلوس متكررة' : 'Short walking distances with seating', icon: '🚶' },
    { key: 'wheelchair', label: t.mobWheelchair, desc: lang === 'ar' ? 'منحدرات ومسارات مسطحة 100% ♿' : 'Ramped & flat 100% accessible', icon: '♿' },
    { key: 'easy_access', label: t.mobEasyAccess, desc: lang === 'ar' ? 'بدون درجات أو مصاعد واسعة' : 'Step-free with spacious elevators', icon: '🚪' },
  ];

  const interestsList = [
    { key: 'التاريخ والتراث', label: t.intHistory, icon: '🏛️' },
    { key: 'متاحف ومعارض', label: t.intMuseums, icon: '🖼️' },
    { key: 'ملاهي', label: t.intAmusement, icon: '🎡' },
    { key: 'الطبيعة', label: t.intNature, icon: '🌵' },
    { key: 'الطعام', label: t.intFood, icon: '🍽️' },
    { key: 'التصوير', label: t.intPhoto, icon: '📸' },
    { key: 'التسوق', label: t.intShop, icon: '🛍️' },
  ];

  const preferencesList = [
    { key: 'أماكن هادئة', label: t.prefQuiet, icon: '🌿' },
    { key: 'تجنب الزحام', label: t.prefAvoidCrowds, icon: '👥' },
    { key: 'أماكن مكيفة', label: t.prefAC, icon: '❄️' },
    { key: 'أقل قدر من المشي', label: t.prefMinWalk, icon: '🛑' },
  ];

  return (
    <section id="planner" className="py-16 bg-[#FAF8F3] dark:bg-[#171310] relative transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#4F6F52]/10 dark:bg-[#4F6F52]/20 border border-[#4F6F52]/30 dark:border-[#4F6F52]/40 text-[#4F6F52] dark:text-[#D6AD72] text-xs font-bold">
            <PalmIcon className="w-4 h-4 text-[#C58B5C] dark:text-[#D6AD72]" />
            <span>{t.brandSub} Interactive Planner</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3B2A22] dark:text-[#FAF8F3]">
            {t.plannerTitle}
          </h2>
          <p className="text-base sm:text-lg text-[#3B2A22]/80 dark:text-[#C8BDB2] max-w-2xl mx-auto">
            {t.plannerSub}
          </p>
        </div>

        {/* Card Form */}
        <div className="bg-white dark:bg-[#241D18] border border-[#F3E6D0] dark:border-[#493A2F] rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden transition-colors">
          
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Step 1: Destination */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-base sm:text-lg font-bold text-[#3B2A22] dark:text-[#FAF8F3]">
                <MapPin className="w-5 h-5 text-[#4F6F52]" />
                <span>{t.destinationLabel}</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {destinationsList.map((item) => {
                  const selected = destination === item.val;
                  return (
                    <button
                      type="button"
                      key={item.val}
                      onClick={() => setDestination(item.val)}
                      className={`p-3.5 rounded-2xl border text-start transition-all duration-200 flex flex-col justify-between ${
                        selected
                          ? 'border-[#4F6F52] bg-[#4F6F52] text-white shadow-sm'
                          : 'border-[#F3E6D0] dark:border-[#493A2F] bg-[#FAF8F3] dark:bg-[#30251E] text-[#3B2A22] dark:text-[#FAF8F3] hover:bg-[#F3E6D0] dark:hover:bg-[#493A2F]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm">{item.label}</span>
                        {selected && <CheckCircle2 className="w-4 h-4 text-white" />}
                      </div>
                      <span className={`text-[11px] mt-1.5 font-medium ${selected ? 'text-white/90' : 'text-[#3B2A22]/70 dark:text-[#C8BDB2]'}`}>
                        {item.subtitle}
                      </span>
                    </button>
                  );
                })}
              </div>

              {(destination === 'وجهة أخرى' || destination === 'Other Destination') && (
                <div className="pt-2 animate-fadeIn">
                  <input
                    type="text"
                    value={customDestination}
                    onChange={(e) => setCustomDestination(e.target.value)}
                    placeholder={lang === 'ar' ? 'أدخل اسم الوجهة (مثل: الرياض، أبها، الطائف...)' : 'Enter city name (e.g. Riyadh, Abha, Taif...)'}
                    className="w-full p-3.5 rounded-xl border border-[#F3E6D0] dark:border-[#493A2F] bg-[#FAF8F3] dark:bg-[#30251E] text-[#3B2A22] dark:text-[#FAF8F3] font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#4F6F52]"
                  />
                </div>
              )}
            </div>

            {/* Step 2: Available Time */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-base sm:text-lg font-bold text-[#3B2A22] dark:text-[#FAF8F3]">
                <Clock className="w-5 h-5 text-[#C58B5C] dark:text-[#D6AD72]" />
                <span>{t.timeLabel}</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {durationsList.map((item) => {
                  const selected = duration === item.val;
                  return (
                    <button
                      type="button"
                      key={item.val}
                      onClick={() => setDuration(item.val)}
                      className={`py-3 px-4 rounded-xl border text-center font-bold text-xs sm:text-sm transition-all duration-200 ${
                        selected
                          ? 'border-[#4F6F52] bg-[#4F6F52] text-white shadow-sm'
                          : 'border-[#F3E6D0] dark:border-[#493A2F] bg-[#FAF8F3] dark:bg-[#30251E] text-[#3B2A22] dark:text-[#FAF8F3] hover:bg-[#F3E6D0] dark:hover:bg-[#493A2F]'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Mobility Needs */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-base sm:text-lg font-bold text-[#3B2A22] dark:text-[#FAF8F3]">
                <Accessibility className="w-5 h-5 text-[#4F6F52]" />
                <span>{t.mobilityLabel}</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {mobilityList.map((item) => {
                  const selected = mobility === item.key;
                  return (
                    <button
                      type="button"
                      key={item.key}
                      onClick={() => setMobility(item.key)}
                      className={`p-3.5 rounded-2xl border text-start transition-all duration-200 flex items-start gap-3 ${
                        selected
                          ? 'border-[#4F6F52] bg-[#4F6F52]/10 dark:bg-[#4F6F52]/20 ring-2 ring-[#4F6F52] text-[#3B2A22] dark:text-[#FAF8F3]'
                          : 'border-[#F3E6D0] dark:border-[#493A2F] bg-[#FAF8F3] dark:bg-[#30251E] text-[#3B2A22] dark:text-[#FAF8F3] hover:bg-[#F3E6D0] dark:hover:bg-[#493A2F]'
                      }`}
                    >
                      <span className="text-xl shrink-0 p-0.5">{item.icon}</span>
                      <div className="flex-1">
                        <div className="font-bold text-xs sm:text-sm text-[#3B2A22] dark:text-[#FAF8F3]">{item.label}</div>
                        <div className="text-[11px] text-[#3B2A22]/70 dark:text-[#C8BDB2] mt-0.5 font-medium">{item.desc}</div>
                      </div>
                      {selected && <CheckCircle2 className="w-4 h-4 text-[#4F6F52] dark:text-[#4F6F52] shrink-0 mt-0.5" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Interests */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-base sm:text-lg font-bold text-[#3B2A22] dark:text-[#FAF8F3]">
                <Heart className="w-5 h-5 text-[#C58B5C] dark:text-[#D6AD72]" />
                <span>{t.interestsLabel}</span>
              </label>

              <div className="flex flex-wrap gap-2">
                {interestsList.map((item) => {
                  const selected = selectedInterests.includes(item.key);
                  return (
                    <button
                      type="button"
                      key={item.key}
                      onClick={() => toggleInterest(item.key)}
                      className={`px-3.5 py-2 rounded-full border text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                        selected
                          ? 'border-[#4F6F52] bg-[#4F6F52] text-white shadow-sm'
                          : 'border-[#F3E6D0] dark:border-[#493A2F] bg-[#FAF8F3] dark:bg-[#30251E] text-[#3B2A22] dark:text-[#FAF8F3] hover:bg-[#F3E6D0] dark:hover:bg-[#493A2F]'
                      }`}
                    >
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 5: Preferences */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-base sm:text-lg font-bold text-[#3B2A22] dark:text-[#FAF8F3]">
                <Sliders className="w-5 h-5 text-[#4F6F52]" />
                <span>{t.preferencesLabel}</span>
              </label>

              <div className="flex flex-wrap gap-2">
                {preferencesList.map((item) => {
                  const selected = selectedPreferences.includes(item.key);
                  return (
                    <button
                      type="button"
                      key={item.key}
                      onClick={() => togglePreference(item.key)}
                      className={`px-3.5 py-2 rounded-full border text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                        selected
                          ? 'border-[#C58B5C] bg-[#C58B5C] text-white shadow-sm'
                          : 'border-[#F3E6D0] dark:border-[#493A2F] bg-[#FAF8F3] dark:bg-[#30251E] text-[#3B2A22] dark:text-[#FAF8F3] hover:bg-[#F3E6D0] dark:hover:bg-[#493A2F]'
                      }`}
                    >
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 6: Date & Time */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-base sm:text-lg font-bold text-[#3B2A22] dark:text-[#FAF8F3]">
                <Calendar className="w-5 h-5 text-[#C58B5C] dark:text-[#D6AD72]" />
                <span>{t.datetimeLabel}</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-[11px] font-bold text-[#C58B5C] dark:text-[#D6AD72] block mb-1">
                    {lang === 'ar' ? 'تاريخ الزيارة' : 'Date of visit'}
                  </span>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#F3E6D0] dark:border-[#493A2F] bg-[#FAF8F3] dark:bg-[#30251E] text-[#3B2A22] dark:text-[#FAF8F3] font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-[#4F6F52]"
                  />
                </div>

                <div>
                  <span className="text-[11px] font-bold text-[#C58B5C] dark:text-[#D6AD72] block mb-1">
                    {lang === 'ar' ? 'وقت البدء المفصل (تلقائياً بعد ساعة)' : 'Start time (Default: +1 hr)'}
                  </span>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#F3E6D0] dark:border-[#493A2F] bg-[#FAF8F3] dark:bg-[#30251E] text-[#3B2A22] dark:text-[#FAF8F3] font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-[#4F6F52]"
                  />
                </div>
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-4 border-t border-[#F3E6D0] dark:border-[#493A2F] text-center">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 px-6 rounded-full bg-[#4F6F52] hover:bg-[#3B2A22] dark:hover:bg-[#C58B5C] text-white font-bold text-base shadow-sm transition-all duration-200 active:scale-98 disabled:opacity-75 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{t.generatingText}</span>
                  </>
                ) : (
                  <>
                    <PalmIcon className="w-5 h-5 text-[#C58B5C] dark:text-[#D6AD72]" />
                    <span>{t.generateBtn}</span>
                  </>
                )}
              </button>
              
              <div className="flex items-center justify-center gap-1.5 text-xs text-[#3B2A22]/70 dark:text-[#C8BDB2] font-semibold mt-2.5">
                <AlertCircle className="w-3.5 h-3.5 text-[#4F6F52] dark:text-[#4F6F52]" />
                <span>
                  {lang === 'ar' 
                    ? 'يتم التحقق التلقائي من المواعيد، الصلاة، إمكانية الوصول، وحرارة الشموس'
                    : 'Auto-checks opening hours, prayer times, mobility ramps & weather comfort'}
                </span>
              </div>
            </div>

          </form>

        </div>
      </div>
    </section>
  );
};
