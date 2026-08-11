import { Language } from '../types';

export const translations = {
  ar: {
    brandName: 'رحلتي',
    brandSub: 'Rihlaty',
    tagline: 'خطط رحلتك بذكاء. عِش التجربة.',
    subTagline: 'مخططك السياحي الذكي الذي يصمم يومك في السعودية بناءً على وقتك، احتياجاتك، الطقس، الزحام، وأوقات الصلاة.',
    heroPrimaryCta: 'خطط رحلتي',
    heroSecondaryCta: 'استكشف الوجهات',
    
    // Nav
    navHome: 'الرئيسية',
    navPlan: 'خطط رحلتي',
    navDestinations: 'الوجهات',
    navMap: 'خريطة الوجهات',
    navLens: 'صوّر المكان',
    navHowItWorks: 'كيف يعمل؟',
    navAbout: 'عن رحلتي',
    startPlanningBtn: 'ابدأ التخطيط',
    themeLight: 'نهار',
    themeDark: 'ليل',
    
    // AI Planner Section
    plannerTitle: 'خلّ الذكاء الاصطناعي يخطط لك',
    plannerSub: 'أدخل تفضيلاتك وسيتولى محرك "رحلتي" صياغة جدول متكامل ومراعي لجميع التفاصيل',
    destinationLabel: '1. الوجهة',
    timeLabel: '2. الوقت المتاح',
    mobilityLabel: '3. احتياجات الحركة وإمكانية الوصول',
    interestsLabel: '4. اهتماماتك الرئيسية',
    budgetLabel: '5. الميزانية المتوقعة',
    preferencesLabel: '6. تفضيلاتك والتجربة',
    datetimeLabel: '7. تاريخ ووقت الرحلة',
    generateBtn: '✨ أنشئ رحلتي',
    generatingText: 'جاري صياغة رحلتك ومراعاة أوقات الصلاة والطقس والميزانية بالذكاء الاصطناعي...',
    
    // Budget Options
    budgetEco: 'اقتصادي',
    budgetEcoDesc: 'مطاعم شعبية وتراثية، أنشطة مجانية ومنخفضة التكلفة',
    budgetMedium: 'متوسط',
    budgetMediumDesc: 'توازن بين الأنشطة والجولات والمطاعم الموصى بها',
    budgetLuxury: 'فاخر',
    budgetLuxuryDesc: 'مطاعم عالمية وراقية، تجارب حصرية وخاصة',
    
    // Destinations
    destAlula: 'العلا',
    destDiriyah: 'الدرعية',
    destJeddah: 'جدة التاريخية',
    destOther: 'وجهة أخرى',
    
    // Mobility Options
    mobNone: 'لا توجد احتياجات خاصة',
    mobLimited: 'مشي محدود (مسافات قصيرة)',
    mobWheelchair: 'كرسي متحرك (مسارات مجهزة ♿)',
    mobEasyAccess: 'أحتاج أماكن سهلة الوصول (بدون درجات)',
    
    // Time Options
    time3h: '3 ساعات',
    time5h: '5 ساعات',
    timeFullDay: 'يوم كامل',
    timeMultiDay: 'أكثر من يوم',
    selectDaysCount: 'كم عدد الأيام؟',
    daysLabel: 'أيام',
    dayTwo: 'يومان',
    
    // Interests
    intHistory: 'التاريخ والتراث',
    intMuseums: 'متاحف ومعارض',
    intAmusement: 'ملاهي',
    intNature: 'الطبيعة',
    intFood: 'الطعام والتجارب',
    intPhoto: 'التصوير',
    intShop: 'التسوق',
    
    // Preferences
    prefQuiet: 'أماكن هادئة',
    prefAvoidCrowds: 'تجنب الزحام',
    prefAC: 'أماكن مكيفة',
    prefMinWalk: 'أقل قدر من المشي',
    
    // Itinerary View
    itineraryHeader: 'جدول رحلتك المخصص',
    hours: 'ساعات',
    distance: 'المسافة الإجمالية',
    accessibilityScore: 'سهولة التنقل والحركة',
    prayerSync: 'مستكشف الصلاة والطقس مفعّل',
    wheelchairFriendly: 'مناسب للكراسي المتحركة',
    source: 'المصدر',
    whySelected: 'لماذا اخترنا هذا المكان؟',
    travelBetween: 'وقت التنقل المتوقع',
    exportPdf: 'تحميل PDF',
    shareTrip: 'مشاركة الرحلة',
    replan: 'تعديل الخطة',
    
    // Smart Features
    featuresTitle: 'ذكاء يفهم رحلتك',
    featuresSub: 'أنظمة خوارزمية صُممت خصيصاً لتوفير أقصى درجات الراحة والمرونة أثناء زيارتك',
    feat1Title: '♿ إمكانية الوصول',
    feat1Desc: 'خطط تناسب احتياجات الحركة ومجهزة للكراسي المتحركة والمسارات السهلة.',
    feat2Title: '🌡️ الطقس والتكييف',
    feat2Desc: 'اختر الوقت والمكان المناسبين حسب درجات الحرارة والأماكن المغلقة المكيفة.',
    feat3Title: '🕌 أوقات الصلاة',
    feat3Desc: 'يقوم النظام بجدولة الاستراحات وأماكن الصلاة بالقرب من وجهاتك تلقائياً.',
    feat4Title: '👥 إدارة الازدحام',
    feat4Desc: 'تحليلات ذكية تنصحك بأفضل الأوقات ذات الكثافة المنخفضة لتجربة هادئة.',
    
    // Multimodal
    lensTitle: 'صوّر المكان، ونحن نعرّفك عليه',
    lensSub: 'التقط صورة أو ارفع صورة لأي معلم أو قطعة تراثية في السعودية، وسيقوم الذكاء الاصطناعي بتحليلها فوراً',
    uploadPrompt: 'اسحب وافلت الصورة هنا، أو انقر للاختيار',
    useSample: 'أو جرب واحدة من الصور المتاحة:',
    analyzing: 'جاري تحليل الصورة والتحقق من المراجع التراثية...',
    sampleAlula: 'العلا — مقبرة قصر الفريد',
    sampleDiriyah: 'الدرعية — حي الطريف',
    sampleJeddah: 'جدة — بيوت البلد الرواشين',
    analyzedTitle: 'نتائج تحليل المعلم',
    historicalBackground: 'نبذة تاريخية',
    culturalImportance: 'الأهمية الثقافية والتراثية',
    nearbyRecommendations: 'أماكن قريبة ينصح بزيارتها',
    
    // Map
    mapTitle: 'خريطة الوجهات والتنقل',
    mapSub: 'عرض تفاعلي للمسار، المسافات، ونقاط الاهتمام المتاحة',
    
    // Destinations Cards Section
    destSectionTitle: 'استكشف الوجهات السعودية العريقة',
    destSectionSub: 'وجهات تاريخية عالمية مهيأة لاستقبالك بأحدث الإمكانيات الذكية',
    exploreBtn: 'استكشف واصنع خطتك',
    
    // Footer
    footerDesc: 'رحلتي — المنصة الذكية الرائدة لتخطيط السياحة التراثية في المملكة العربية السعودية.',
    quickLinks: 'روابط سريعة',
    contacts: 'تواصل ومعلومات',
    rights: 'جميع الحقوق محفوظة © 2026 رحلتي | Rihlaty'
  },
  en: {
    brandName: 'Rihlaty',
    brandSub: 'رحلتي',
    tagline: 'Plan Smart. Experience Saudi Arabia.',
    subTagline: 'Your AI tourism guide crafting personalized itineraries considering time, mobility, weather, crowd levels, and prayer schedules.',
    heroPrimaryCta: 'Plan My Trip',
    heroSecondaryCta: 'Explore Destinations',
    
    // Nav
    navHome: 'Home',
    navPlan: 'Plan Trip',
    navDestinations: 'Destinations',
    navMap: 'Interactive Map',
    navLens: 'AI Vision Lens',
    navHowItWorks: 'How It Works',
    navAbout: 'About',
    startPlanningBtn: 'Start Planning',
    themeLight: 'Light',
    themeDark: 'Dark',
    
    // AI Planner Section
    plannerTitle: 'Let AI Plan Your Journey',
    plannerSub: 'Enter your preferences and constraints, and Rihlaty will craft an optimal daily schedule',
    destinationLabel: '1. Destination',
    timeLabel: '2. Available Time',
    mobilityLabel: '3. Mobility & Accessibility Needs',
    interestsLabel: '4. Main Interests',
    budgetLabel: '5. Expected Budget',
    preferencesLabel: '6. Preferences & Comfort',
    datetimeLabel: '7. Date & Start Time',
    generateBtn: '✨ Generate Itinerary',
    generatingText: 'AI is analyzing prayer times, temperature, budget level, and accessibility...',
    
    // Budget Options
    budgetEco: 'Economy',
    budgetEcoDesc: 'Local & heritage dining, free & budget-friendly spots',
    budgetMedium: 'Moderate',
    budgetMediumDesc: 'Balanced tours, top local experiences & dining',
    budgetLuxury: 'Luxury',
    budgetLuxuryDesc: 'Fine dining, upscale venues & exclusive experiences',
    
    // Destinations
    destAlula: 'AlUla',
    destDiriyah: 'Diriyah',
    destJeddah: 'Historic Jeddah',
    destOther: 'Other Destination',
    
    // Mobility Options
    mobNone: 'No special requirements',
    mobLimited: 'Limited walking (Short distances)',
    mobWheelchair: 'Wheelchair user (Accessible pathways ♿)',
    mobEasyAccess: 'Easy step-free access needed',
    
    // Time Options
    time3h: '3 Hours',
    time5h: '5 Hours',
    timeFullDay: 'Full Day',
    timeMultiDay: 'Multiple Days',
    selectDaysCount: 'How many days?',
    daysLabel: 'Days',
    dayTwo: '2 Days',
    
    // Interests
    intHistory: 'History & Heritage',
    intMuseums: 'Museums & Exhibitions',
    intAmusement: 'Amusement & Theme Parks',
    intNature: 'Nature & Landscapes',
    intFood: 'Food & Dining',
    intPhoto: 'Photography',
    intShop: 'Shopping',
    
    // Preferences
    prefQuiet: 'Quiet spots',
    prefAvoidCrowds: 'Avoid crowds',
    prefAC: 'Air-conditioned spaces',
    prefMinWalk: 'Minimal walking',
    
    // Itinerary View
    itineraryHeader: 'Your Personalized Itinerary',
    hours: 'Hours',
    distance: 'Total Distance',
    accessibilityScore: 'Mobility Index',
    prayerSync: 'Prayer & Weather Sync Active',
    wheelchairFriendly: 'Wheelchair Accessible',
    source: 'Source',
    whySelected: 'Why this spot?',
    travelBetween: 'Est. travel time',
    exportPdf: 'Download PDF',
    shareTrip: 'Share Itinerary',
    replan: 'Edit Plan',
    
    // Smart Features
    featuresTitle: 'AI Intelligence That Understands You',
    featuresSub: 'Algorithms tailored to deliver utmost comfort and effortless travel in Saudi Arabia',
    feat1Title: '♿ Mobility & Accessibility',
    feat1Desc: 'Schedules built around your walking limits and step-free requirements.',
    feat2Title: '🌡️ Weather & Comfort',
    feat2Desc: 'Optimizes indoor vs outdoor stops based on hourly temperature forecasts.',
    feat3Title: '🕌 Prayer Schedule Integration',
    feat3Desc: 'Automatically pairs breaks with nearby quiet mosques and prayer facilities.',
    feat4Title: '👥 Smart Crowd Avoidance',
    feat4Desc: 'Predictive analytics suggest non-peak hours for peaceful exploration.',
    
    // Multimodal
    lensTitle: 'Snap a Photo, Discover the History',
    lensSub: 'Upload or capture any Saudi heritage site or artifact, and AI will identify and explain it instantly',
    uploadPrompt: 'Drag and drop image here, or click to browse',
    useSample: 'Or pick one of these famous Saudi landmarks:',
    analyzing: 'AI is analyzing heritage features and verifying historical archives...',
    sampleAlula: 'AlUla — Qasr al-Farid Tomb',
    sampleDiriyah: 'Diriyah — At-Turaif District',
    sampleJeddah: 'Jeddah — Al-Balad Wooden Roshan',
    analyzedTitle: 'Landmark Analysis Results',
    historicalBackground: 'Historical Context',
    culturalImportance: 'Cultural & Heritage Significance',
    nearbyRecommendations: 'Recommended Nearby Places',
    
    // Map
    mapTitle: 'Interactive Route Map',
    mapSub: 'Visual map view of routes, travel times, and accessibility markers',
    
    // Destinations Cards Section
    destSectionTitle: 'Explore Iconic Saudi Destinations',
    destSectionSub: 'World-renowned heritage sites ready to welcome you with smart AI support',
    exploreBtn: 'Explore & Plan',
    
    // Footer
    footerDesc: 'Rihlaty — The premier smart AI platform for Saudi heritage tourism planning.',
    quickLinks: 'Quick Links',
    contacts: 'Contact & Info',
    rights: 'All Rights Reserved © 2026 Rihlaty | رحلتي'
  }
};
