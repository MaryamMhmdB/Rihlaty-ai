import React, { useState, useRef } from 'react';
import { MapPin, Navigation, Accessibility, Clock, Sun, Users, Compass, ExternalLink, Info, ChevronRight, ChevronLeft } from 'lucide-react';
import { DESTINATIONS } from '../data/destinations';
import { Language, Destination, ItineraryResult } from '../types';
import { translations } from '../data/translations';
import { PalmIcon } from './PalmIcon';
import { ImageWithFallback } from './ImageWithFallback';
import { getGoogleMapsUrl } from '../utils/mapUtils';

interface InteractiveMapProps {
  lang: Language;
  onSelectDestination: (destName: string) => void;
  selectedDestination?: string;
  itinerary?: ItineraryResult | null;
}

const ROUTE_STOPS_MAP: Record<string, Array<{ nameAr: string; nameEn: string; time: string; coords: string }>> = {
  alula: [
    { nameAr: 'نقطة الانطلاق (الحِجر)', nameEn: 'Starting Hub (Hegra)', time: '09:00 AM', coords: '26.791° N, 37.953° E' },
    { nameAr: 'قصر الفريد الأثري', nameEn: 'Qasr Al-Farid Tomb', time: '09:30 AM', coords: '26.795° N, 37.955° E' },
    { nameAr: 'استراحة صلاة الظهر بمسجد البلدة', nameEn: 'Dhuhr Prayer Pause at Old Town Mosque', time: '12:28 PM', coords: '26.620° N, 37.925° E' },
    { nameAr: 'مطعم سهيل التراثي المكيف', nameEn: 'Suhail Heritage Restaurant', time: '01:15 PM', coords: '26.621° N, 37.926° E' }
  ],
  diriyah: [
    { nameAr: 'نقطة الانطلاق (حي الطريف)', nameEn: 'Starting Hub (At-Turaif)', time: '09:00 AM', coords: '24.733° N, 46.573° E' },
    { nameAr: 'قصر سلوى والتراث الملكي', nameEn: 'Salwa Palace Royal Museum', time: '10:15 AM', coords: '24.734° N, 46.574° E' },
    { nameAr: 'استراحة صلاة الظهر بمسجد البجيري', nameEn: 'Dhuhr Prayer Pause at Bujairi Mosque', time: '12:08 PM', coords: '24.736° N, 46.576° E' },
    { nameAr: 'مطعم ميعس التراثي الفاخر', nameEn: 'Maiz Saudi Fine Dining', time: '01:00 PM', coords: '24.737° N, 46.577° E' }
  ],
  jeddah: [
    { nameAr: 'نقطة الانطلاق (بيت نصيف)', nameEn: 'Starting Hub (Nassif House)', time: '09:00 AM', coords: '21.485° N, 39.187° E' },
    { nameAr: 'سوق العلوي وسوق الندى', nameEn: 'Souk Al-Alawi Spice Walk', time: '10:30 AM', coords: '21.486° N, 39.188° E' },
    { nameAr: 'استراحة الصلاة بمسجد الشافعي', nameEn: 'Prayer Pause at Al-Shafi\'i Mosque', time: '12:30 PM', coords: '21.487° N, 39.189° E' },
    { nameAr: 'مطاعم المأكولات البحرية التراثية', nameEn: 'Al-Balad Heritage Seafood Dining', time: '01:15 PM', coords: '21.488° N, 39.190° E' }
  ],
  riyadh: [
    { nameAr: 'نقطة الانطلاق (قصر المصمك)', nameEn: 'Starting Hub (Al Masmak Fortress)', time: '09:00 AM', coords: '24.631° N, 46.713° E' },
    { nameAr: 'سوق الزل وسوق الديرة', nameEn: 'Souk Al-Zal Antiques & Carpet Souk', time: '10:30 AM', coords: '24.632° N, 46.714° E' },
    { nameAr: 'استراحة صلاة الظهر بالجامع الكبير', nameEn: 'Dhuhr Prayer Pause at Grand Mosque', time: '12:08 PM', coords: '24.633° N, 46.715° E' },
    { nameAr: 'مطعم القرية النجدية التراثي', nameEn: 'Najd Village Heritage Restaurant', time: '01:00 PM', coords: '24.635° N, 46.718° E' }
  ],
  abha: [
    { nameAr: 'نقطة الانطلاق (الجبل الأخضر)', nameEn: 'Starting Hub (Green Mountain)', time: '09:00 AM', coords: '18.216° N, 42.505° E' },
    { nameAr: 'قرية رجال ألمع التراثية', nameEn: 'Rijal Almaa Heritage Village', time: '10:15 AM', coords: '18.218° N, 42.507° E' },
    { nameAr: 'استراحة صلاة الظهر بمسجد السد', nameEn: 'Dhuhr Prayer Pause at Al-Sadd Mosque', time: '12:18 PM', coords: '18.220° N, 42.510° E' },
    { nameAr: 'المطعم العسيري التراثي', nameEn: 'Asiri Cultural Heritage Dining', time: '01:00 PM', coords: '18.222° N, 42.512° E' }
  ],
  taif: [
    { nameAr: 'نقطة الانطلاق (قصر شبرا)', nameEn: 'Starting Hub (Shubra Palace)', time: '09:00 AM', coords: '21.270° N, 40.415° E' },
    { nameAr: 'مزارع ومصانع الورد الطائفي', nameEn: 'Taif Rose Distillery & Gardens', time: '10:30 AM', coords: '21.272° N, 40.417° E' },
    { nameAr: 'استراحة صلاة الظهر بمسجد الهدا', nameEn: 'Dhuhr Prayer Pause at Al-Hada Mosque', time: '12:25 PM', coords: '21.275° N, 40.420° E' },
    { nameAr: 'مطعم جبل الكر التراثي المكيف', nameEn: 'Al-Karr Mountain Heritage Dining', time: '01:00 PM', coords: '21.278° N, 40.423° E' }
  ],
  alahsa: [
    { nameAr: 'نقطة الانطلاق (جبل القارة)', nameEn: 'Starting Hub (Al-Qarah Cave Mountain)', time: '09:00 AM', coords: '25.383° N, 49.583° E' },
    { nameAr: 'قصر إبراهيم وسوق القيصرية', nameEn: 'Ibrahim Palace & Al-Qaysariya Souk', time: '10:30 AM', coords: '25.385° N, 49.585° E' },
    { nameAr: 'استراحة صلاة الظهر بالمسجد التراثي', nameEn: 'Dhuhr Prayer Pause at Heritage Mosque', time: '11:58 AM', coords: '25.387° N, 49.587° E' },
    { nameAr: 'مخبز ومطعم الخبز الحساوي', nameEn: 'Hassawi Heritage Bakery & Dining', time: '01:00 PM', coords: '25.390° N, 49.590° E' }
  ],
  dammam: [
    { nameAr: 'كورنيش الدمام والواجهة البحرية', nameEn: 'Dammam Corniche Waterfront', time: '09:00 AM', coords: '26.434° N, 50.103° E' },
    { nameAr: 'القرية التراثية بالدمام', nameEn: 'Dammam Heritage Village', time: '10:30 AM', coords: '26.435° N, 50.104° E' },
    { nameAr: 'استراحة صلاة الظهر بالجامع الكبير', nameEn: 'Dhuhr Prayer Pause at Grand Mosque', time: '11:47 AM', coords: '26.436° N, 50.105° E' },
    { nameAr: 'مركز الملك عبدالعزيز الثقافي "إثراء"', nameEn: 'Ithra World Culture Center', time: '01:15 PM', coords: '26.336° N, 50.123° E' }
  ],
  khobar: [
    { nameAr: 'كورنيش الخبر وبرج المياه', nameEn: 'Khobar Corniche & Water Tower', time: '09:00 AM', coords: '26.217° N, 50.197° E' },
    { nameAr: 'ممشى أجدان ووك التراثي الحديث', nameEn: 'Ajdan Walk Promenade', time: '10:30 AM', coords: '26.218° N, 50.198° E' },
    { nameAr: 'استراحة صلاة الظهر بمسجد الكورنيش', nameEn: 'Dhuhr Prayer Pause at Corniche Mosque', time: '11:46 AM', coords: '26.219° N, 50.199° E' },
    { nameAr: 'شاطئ نصف القمر والمطاعم البحرية', nameEn: 'Half Moon Bay Seafood Dining', time: '01:15 PM', coords: '26.150° N, 50.050° E' }
  ],
  tabuk: [
    { nameAr: 'قلعة تبوك التاريخية وعين السكر', nameEn: 'Historic Tabuk Castle & Sugar Spring', time: '09:00 AM', coords: '28.383° N, 36.566° E' },
    { nameAr: 'سوق الطواحين التراثي', nameEn: 'Souk Al-Twaheen Heritage Market', time: '10:30 AM', coords: '28.384° N, 36.567° E' },
    { nameAr: 'استراحة صلاة الظهر بمسجد تبوك', nameEn: 'Dhuhr Prayer Pause at Tabuk Mosque', time: '12:35 PM', coords: '28.385° N, 36.568° E' },
    { nameAr: 'جولة وادي الديسة الطبيعي العجيب', nameEn: 'Wadi Al-Disah Natural Wonder Tour', time: '01:15 PM', coords: '27.600° N, 36.450° E' }
  ],
  hail: [
    { nameAr: 'قلعة عيرف وقصر القشلة الأثري', nameEn: 'A\'arif Fort & Qeshla Palace', time: '09:00 AM', coords: '27.521° N, 41.696° E' },
    { nameAr: 'سوق حائل التراثي الشعبي', nameEn: 'Hail Traditional Heritage Souk', time: '10:30 AM', coords: '27.522° N, 41.697° E' },
    { nameAr: 'استراحة صلاة الظهر بمسجد حائل', nameEn: 'Dhuhr Prayer Pause at Hail Mosque', time: '12:12 PM', coords: '27.523° N, 41.698° E' },
    { nameAr: 'نقوش جبة جبل أم سنمان (يونسكو)', nameEn: 'Jubbah UNESCO Rock Art Site', time: '01:15 PM', coords: '28.000° N, 40.900° E' }
  ],
  jazan: [
    { nameAr: 'القرية التراثية الكبرى بجازان', nameEn: 'Jazan Heritage Village', time: '09:00 AM', coords: '16.889° N, 42.551° E' },
    { nameAr: 'الكورنيش الشمالي والشواطئ البحرية', nameEn: 'North Corniche Waterfront', time: '10:30 AM', coords: '16.890° N, 42.552° E' },
    { nameAr: 'استراحة صلاة الظهر بمسجد جازان', nameEn: 'Dhuhr Prayer Pause at Jazan Mosque', time: '12:15 PM', coords: '16.891° N, 42.553° E' },
    { nameAr: 'جبال فيفاء وإطلالة المزارع', nameEn: 'Fayfa Mountains Viewpoint', time: '01:15 PM', coords: '17.250° N, 43.100° E' }
  ],
  najran: [
    { nameAr: 'قصر العان الطيني التاريخي', nameEn: 'Historic Al-Aan Mud Palace', time: '09:00 AM', coords: '17.492° N, 44.127° E' },
    { nameAr: 'قصر الإمارة وسوق نجران التراثي', nameEn: 'Emara Palace & Heritage Market', time: '10:30 AM', coords: '17.493° N, 44.128° E' },
    { nameAr: 'استراحة صلاة الظهر بمسجد نجران', nameEn: 'Dhuhr Prayer Pause at Najran Mosque', time: '12:08 PM', coords: '17.494° N, 44.129° E' },
    { nameAr: 'آبار حمى التراثية العالمية (يونسكو)', nameEn: 'Hima UNESCO Heritage Site', time: '01:15 PM', coords: '17.900° N, 44.500° E' }
  ],
  qassim: [
    { nameAr: 'سوق العقيلات وسوق الحرف الشعبية', nameEn: 'Souk Al-Aqilat & Crafts', time: '09:00 AM', coords: '26.326° N, 43.975° E' },
    { nameAr: 'برج بريدة التراثي وواحة النخيل', nameEn: 'Buraidah Tower & Palm Oasis', time: '10:30 AM', coords: '26.327° N, 43.976° E' },
    { nameAr: 'استراحة صلاة الظهر بمسجد بريدة', nameEn: 'Dhuhr Prayer Pause at Buraidah Mosque', time: '12:06 PM', coords: '26.328° N, 43.977° E' },
    { nameAr: 'سوق التمور والمأكولات القصيمية', nameEn: 'Qassim Date Market & Cuisine', time: '01:15 PM', coords: '26.330° N, 43.980° E' }
  ],
  yanbu: [
    { nameAr: 'منطقة ينبع التاريخية وسوق الليل', nameEn: 'Historic Yanbu & Night Souk', time: '09:00 AM', coords: '24.089° N, 38.063° E' },
    { nameAr: 'واجهة كورنيش ينبع البحر', nameEn: 'Yanbu Sea Corniche Waterfront', time: '10:30 AM', coords: '24.090° N, 38.064° E' },
    { nameAr: 'استراحة صلاة الظهر بمسجد البحر', nameEn: 'Dhuhr Prayer Pause at Seaside Mosque', time: '12:31 PM', coords: '24.091° N, 38.065° E' },
    { nameAr: 'حدائق ينبع الصناعية والمطاعم البحرية', nameEn: 'Yanbu Industrial Gardens & Dining', time: '01:15 PM', coords: '23.980° N, 38.200° E' }
  ]
};

// Helper function to dynamically resolve any city for the Interactive Map
function resolveMapDestination(selectedName?: string): { dest: Destination; stops: Array<{ nameAr: string; nameEn: string; time: string; coords: string }> } {
  if (!selectedName || !selectedName.trim()) {
    const defaultDest = DESTINATIONS[0];
    return { dest: defaultDest, stops: ROUTE_STOPS_MAP[defaultDest.id] || ROUTE_STOPS_MAP.alula };
  }

  const raw = selectedName.trim();
  const lower = raw.toLowerCase();

  // Check preset DESTINATIONS first
  const matched = DESTINATIONS.find(d =>
    d.nameAr.includes(raw) ||
    d.nameEn.toLowerCase().includes(lower) ||
    raw.includes(d.nameAr)
  );
  if (matched) {
    return { dest: matched, stops: ROUTE_STOPS_MAP[matched.id] || ROUTE_STOPS_MAP.alula };
  }

  // Check specific city database matches
  if (lower.includes('دمام') || lower.includes('dammam')) {
    const dest: Destination = {
      id: 'dammam',
      nameAr: 'الدمام',
      nameEn: 'Dammam',
      subtitleAr: 'عاصمة المنطقة الشرقية والواجهة البحرية',
      subtitleEn: 'Eastern Province capital & vibrant waterfront',
      tagAr: 'كورنيش الدمام والقرية التراثية',
      tagEn: 'Dammam Corniche & Heritage Village',
      descriptionAr: 'مدينة ساحلية حيوية تتميز بكورنيشها الممتد، القرية التراثية، جزيرة المرجان، والقرب من مركز إثراء العالمي.',
      descriptionEn: 'Vibrant coastal city featuring a vast corniche, heritage village, Marjan Island, and proximity to Ithra Center.',
      image: '/images/dammam_corniche_1786347100000.jpg',
      unesco: false,
      rating: 4.8,
      coordinates: { lat: 26.4344, lng: 50.1033 },
      defaultPrayerTimes: { fajr: '03:52', dhuhr: '11:47', asr: '15:15', maghrib: '18:21', isha: '19:51' },
      avgTempAr: '39°C — طقس ساحلي دافئ مع نسيم البحر الشرقي',
      avgTempEn: '39°C — Coastal warm weather with eastern sea breeze',
      recommendedDurationAr: '4 ساعات إلى يوم كامل',
      recommendedDurationEn: '4 Hours to Full Day'
    };
    return { dest, stops: ROUTE_STOPS_MAP.dammam };
  }

  if (lower.includes('خبر') || lower.includes('khobar')) {
    const dest: Destination = {
      id: 'khobar',
      nameAr: 'الخبر',
      nameEn: 'Khobar',
      subtitleAr: 'عروس الخليج والواجهة البحرية الحديثة',
      subtitleEn: 'Pearl of the Gulf & modern waterfront',
      tagAr: 'برج المياه وأجدان ووك',
      tagEn: 'Water Tower & Ajdan Walk',
      descriptionAr: 'واجهة ساحلية راقية تضم برج المياه المعماري، ممشى أجدان ووك، وشاطئ نصف القمر ساحر المناظر.',
      descriptionEn: 'Upscale coastal destination with iconic Water Tower, Ajdan Walk promenade, and Half Moon Bay beaches.',
      image: '/images/khobar_corniche_1786347100000.jpg',
      unesco: false,
      rating: 4.8,
      coordinates: { lat: 26.2172, lng: 50.1971 },
      defaultPrayerTimes: { fajr: '03:51', dhuhr: '11:46', asr: '15:14', maghrib: '18:20', isha: '19:50' },
      avgTempAr: '38°C — نسيم بحري عليل على كورنيش الخبر',
      avgTempEn: '38°C — Pleasant sea breeze along Khobar Corniche',
      recommendedDurationAr: '4 ساعات إلى يوم كامل',
      recommendedDurationEn: '4 Hours to Full Day'
    };
    return { dest, stops: ROUTE_STOPS_MAP.khobar };
  }

  if (lower.includes('تبوك') || lower.includes('tabuk')) {
    const dest: Destination = {
      id: 'tabuk',
      nameAr: 'تبوك',
      nameEn: 'Tabuk',
      subtitleAr: 'بوابة الشمال وعروس التاريخ',
      subtitleEn: 'Northern gateway & historic wonder',
      tagAr: 'قلعة تبوك ووادي الديسة',
      tagEn: 'Tabuk Castle & Wadi Al-Disah',
      descriptionAr: 'بوابة الشمال الزاخرة بالقلعة التاريخية، عين السكر، وأعجوبة الطبيعة في وادي الديسة بسلاسل جباله الوردية.',
      descriptionEn: 'Northern historic hub boasting ancient castles, Sugar Spring, and the breathtaking canyon of Wadi Al-Disah.',
      image: '/images/tabuk_castle_1786347100000.jpg',
      unesco: false,
      rating: 4.9,
      coordinates: { lat: 28.3835, lng: 36.5662 },
      defaultPrayerTimes: { fajr: '04:35', dhuhr: '12:35', asr: '16:05', maghrib: '19:10', isha: '20:40' },
      avgTempAr: '33°C — طقس شمالي جاف ومعتدل الأجواء',
      avgTempEn: '33°C — Dry northern climate with pleasant breeze',
      recommendedDurationAr: '5 ساعات إلى يوم كامل',
      recommendedDurationEn: '5 Hours to Full Day'
    };
    return { dest, stops: ROUTE_STOPS_MAP.tabuk };
  }

  if (lower.includes('حائل') || lower.includes('حايل') || lower.includes('hail')) {
    const dest: Destination = {
      id: 'hail',
      nameAr: 'حائل',
      nameEn: 'Hail',
      subtitleAr: 'عاصمة الكرم والآثار العالمية',
      subtitleEn: 'Capital of hospitality & UNESCO rock art',
      tagAr: 'قلعة عيرف ونقوش جبة التاريخية',
      tagEn: 'A\'arif Fort & Jubbah Rock Art',
      descriptionAr: 'مدينة حائل التاريخية القابعة بين جبال أجا وسلمى، وتضم قلعة عيرف الشامخة ونقوش جبة المدرجة في قائمة اليونسكو.',
      descriptionEn: 'Historic city set between Aja & Salma mountains, famous for A\'arif Fort and UNESCO World Heritage rock art in Jubbah.',
      image: '/images/hail_aarif_fort_1786347100000.jpg',
      unesco: true,
      rating: 4.9,
      coordinates: { lat: 27.5219, lng: 41.6961 },
      defaultPrayerTimes: { fajr: '04:12', dhuhr: '12:12', asr: '15:42', maghrib: '18:48', isha: '20:18' },
      avgTempAr: '35°C — أجواء جبلية صحراوية لطيفة',
      avgTempEn: '35°C — Pleasant mountain desert climate',
      recommendedDurationAr: '4 ساعات إلى يوم كامل',
      recommendedDurationEn: '4 Hours to Full Day'
    };
    return { dest, stops: ROUTE_STOPS_MAP.hail };
  }

  if (lower.includes('جازان') || lower.includes('جيزان') || lower.includes('jazan') || lower.includes('jizan')) {
    const dest: Destination = {
      id: 'jazan',
      nameAr: 'جازان',
      nameEn: 'Jazan',
      subtitleAr: 'لؤلؤة الجنوب ورئة البحر الأحمر',
      subtitleEn: 'Southern gem & Red Sea coast',
      tagAr: 'القرية التراثية وجبال فيفاء',
      tagEn: 'Jazan Heritage Village & Fayfa',
      descriptionAr: 'مدينة ساحلية تجمع بين القرية التراثية، الكورنيش الشمالي، ومدرجات جبال فيفاء الخضراء الساحرة.',
      descriptionEn: 'Coastal southern hub featuring a grand heritage village, lively corniche, and lush Fayfa mountain terraces.',
      image: '/images/jazan_heritage_1786347100000.jpg',
      unesco: false,
      rating: 4.8,
      coordinates: { lat: 16.8894, lng: 42.5511 },
      defaultPrayerTimes: { fajr: '04:30', dhuhr: '12:15', asr: '15:32', maghrib: '18:38', isha: '20:08' },
      avgTempAr: '37°C — طقس استوائي ساحلي دافئ',
      avgTempEn: '37°C — Warm tropical coastal vibe',
      recommendedDurationAr: '4 ساعات إلى يوم كامل',
      recommendedDurationEn: '4 Hours to Full Day'
    };
    return { dest, stops: ROUTE_STOPS_MAP.jazan };
  }

  if (lower.includes('نجران') || lower.includes('najran')) {
    const dest: Destination = {
      id: 'najran',
      nameAr: 'نجران',
      nameEn: 'Najran',
      subtitleAr: 'مملكة الأخدود والقصور الطينية',
      subtitleEn: 'Realm of Al-Okhdood & mud palaces',
      tagAr: 'قصر العان وآبار حمى (يونسكو)',
      tagEn: 'Al-Aan Palace & Hima UNESCO Site',
      descriptionAr: 'مدينة التاريخ الطيني العريق القابعة بين مزارع النخيل، وتضم قصر العان التاريخي، آبار حمى، وموقع الأخدود.',
      descriptionEn: 'Ancient heritage city surrounded by palm groves, mud palaces, UNESCO site Hima, and Al-Okhdood historic ruins.',
      image: '/images/najran_aan_palace_1786347100000.jpg',
      unesco: true,
      rating: 4.9,
      coordinates: { lat: 17.4924, lng: 44.1277 },
      defaultPrayerTimes: { fajr: '04:25', dhuhr: '12:08', asr: '15:26', maghrib: '18:30', isha: '20:00' },
      avgTempAr: '36°C — طقس صحراوي معتدل بين النخيل',
      avgTempEn: '36°C — Moderate desert climate among palms',
      recommendedDurationAr: '4 ساعات إلى يوم كامل',
      recommendedDurationEn: '4 Hours to Full Day'
    };
    return { dest, stops: ROUTE_STOPS_MAP.najran };
  }

  // DYNAMIC FALLBACK FOR ANY OTHER UNLISTED CITY/TOWN TYPED BY USER
  const formattedEn = raw.charAt(0).toUpperCase() + raw.slice(1);
  const dynamicDest: Destination = {
    id: `custom-${lower.replace(/[^a-z0-9]/g, '-')}`,
    nameAr: raw,
    nameEn: formattedEn,
    subtitleAr: `مدينة وحضارة ${raw} الزاخرة بالمعالم`,
    subtitleEn: `Explore the unique culture & sites of ${formattedEn}`,
    tagAr: 'معالم ومسارات مجهزة',
    tagEn: 'Accessible Heritage Routes',
    descriptionAr: `مسار جولات استكشافية مخصص لموقع ${raw} يدمج التراث والثقافة ومراعاة التيسير والراحة.`,
    descriptionEn: `Custom travel plan for ${formattedEn} combining heritage, accessible routes, and prayer synchronization.`,
    image: '/images/alula_hegra_tomb_1786293300477.jpg',
    unesco: false,
    rating: 4.8,
    coordinates: { lat: 24.5000, lng: 44.5000 },
    defaultPrayerTimes: { fajr: '04:15', dhuhr: '12:10', asr: '15:35', maghrib: '18:40', isha: '20:10' },
    avgTempAr: `36°C — طقس مشمس ومناسب للزيارة في ${raw}`,
    avgTempEn: `36°C — Sunny pleasant weather in ${formattedEn}`,
    recommendedDurationAr: '4 ساعات إلى يوم كامل',
    recommendedDurationEn: '4 Hours to Full Day'
  };

  const dynamicStops = [
    { nameAr: `نقطة الانطلاق الرئيسية (${raw})`, nameEn: `Main Starting Hub (${formattedEn})`, time: '09:00 AM', coords: '24.500° N, 44.500° E' },
    { nameAr: `المنطقة التراثية والشعبية (${raw})`, nameEn: `Heritage District (${formattedEn})`, time: '10:30 AM', coords: '24.505° N, 44.505° E' },
    { nameAr: `استراحة صلاة الظهر بمسجد ${raw}`, nameEn: `Dhuhr Prayer Pause at ${formattedEn} Mosque`, time: '12:10 PM', coords: '24.510° N, 44.510° E' },
    { nameAr: `مطعم الضيافة والتسوق المحلي (${raw})`, nameEn: `Local Hospitality & Souk (${formattedEn})`, time: '01:15 PM', coords: '24.515° N, 44.515° E' }
  ];

  return { dest: dynamicDest, stops: dynamicStops };
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ lang, onSelectDestination, selectedDestination, itinerary }) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';

  const [activeDest, setActiveDest] = useState<Destination>(DESTINATIONS[0]);
  const [currentRouteStops, setCurrentRouteStops] = useState(ROUTE_STOPS_MAP[DESTINATIONS[0].id]);

  // Sync activeDest automatically whenever selectedDestination or generated itinerary changes
  React.useEffect(() => {
    if (itinerary && itinerary.items && itinerary.items.length > 0) {
      const destName = itinerary.destinationNameAr || itinerary.destinationNameEn || selectedDestination;
      if (destName) {
        const resolved = resolveMapDestination(destName);
        setActiveDest(resolved.dest);
        const itineraryStops = itinerary.items.map(item => ({
          nameAr: item.titleAr,
          nameEn: item.titleEn,
          time: item.time,
          coords: `${resolved.dest.coordinates.lat}° N, ${resolved.dest.coordinates.lng}° E`
        }));
        setCurrentRouteStops(itineraryStops);
        return;
      }
    }

    if (selectedDestination) {
      const resolved = resolveMapDestination(selectedDestination);
      setActiveDest(resolved.dest);
      setCurrentRouteStops(resolved.stops);
    }
  }, [selectedDestination, itinerary]);

  const routeStops = currentRouteStops || ROUTE_STOPS_MAP[activeDest.id] || ROUTE_STOPS_MAP.alula;
  const stopsScrollRef = useRef<HTMLDivElement>(null);

  const handleScrollStops = (direction: 'left' | 'right') => {
    if (stopsScrollRef.current) {
      const amount = direction === 'left' ? -260 : 260;
      stopsScrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <section id="map" className="py-12 bg-[#FAF8F3] dark:bg-[#171310] relative border-t border-[#F3E6D0] dark:border-[#493A2F] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#241D18] border border-[#F3E6D0] dark:border-[#493A2F] text-[#4F6F52] dark:text-[#D6AD72] text-xs font-bold shadow-sm">
            <PalmIcon className="w-4 h-4 text-[#C58B5C] dark:text-[#D6AD72]" />
            <span>{lang === 'ar' ? 'خريطة تفاعلية ومخطط مسار' : 'Interactive Map & Route Planner'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3B2A22] dark:text-[#FAF8F3]">
            {t.mapTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#3B2A22]/80 dark:text-[#C8BDB2] max-w-2xl mx-auto font-medium">
            {t.mapSub}
          </p>
        </div>

        {/* Destination Switcher Tabs */}
        <div className="flex justify-center gap-2.5 mb-8 flex-wrap">
          {DESTINATIONS.map((dest) => {
            const isSelected = activeDest.id === dest.id;
            return (
              <button
                key={dest.id}
                onClick={() => {
                  setActiveDest(dest);
                }}
                className={`px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#4F6F52] text-white shadow-sm'
                    : 'bg-white dark:bg-[#241D18] border border-[#F3E6D0] dark:border-[#493A2F] text-[#3B2A22] dark:text-[#FAF8F3] hover:bg-[#F3E6D0] dark:hover:bg-[#493A2F]'
                }`}
              >
                <MapPin className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[#C58B5C] dark:text-[#D6AD72]'}`} />
                <span>{isRtl ? dest.nameAr : dest.nameEn}</span>
              </button>
            );
          })}
        </div>

        {/* Main Map Container Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Interactive SVG Route Map Canvas */}
          <div className="lg:col-span-8 bg-[#3B2A22] dark:bg-[#241D18] rounded-3xl p-6 text-[#FAF8F3] relative overflow-hidden shadow-sm border border-[#F3E6D0] dark:border-[#493A2F] min-h-[400px] flex flex-col justify-between transition-colors">
            
            {/* Top Map Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 z-10 relative bg-[#3B2A22]/90 dark:bg-[#171310]/90 p-3.5 rounded-2xl border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4F6F52] animate-ping" />
                <span className="text-xs sm:text-sm font-bold text-[#FAF8F3]">
                  📍 {isRtl ? activeDest.nameAr : activeDest.nameEn} — {isRtl ? 'خريطة المسارات المجهزة' : 'Accessible Route Map'}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs font-semibold text-[#FAF8F3]/90">
                <span className="flex items-center gap-1">🌡️ {isRtl ? activeDest.avgTempAr : activeDest.avgTempEn}</span>
                <span className="flex items-center gap-1 text-[#4F6F52] font-bold">♿ {lang === 'ar' ? '100% خالية من الدرجات' : '100% Step-Free'}</span>
              </div>
            </div>

            {/* Scrollable Route Graphics Timeline with Left/Right Arrows */}
            <div className="relative my-4 py-2 z-10 group/timeline">
              
              {/* Left Scroll Arrow */}
              <button
                type="button"
                onClick={() => handleScrollStops('left')}
                className="absolute left-1 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-[#171310]/90 hover:bg-[#4F6F52] text-white border border-white/20 backdrop-blur-md flex items-center justify-center shadow-lg transition-all cursor-pointer hover:scale-110 active:scale-95"
                title={isRtl ? "تصفح المحطات لليسار" : "Scroll stops left"}
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-6 h-6 text-[#FAF8F3]" />
              </button>

              {/* Right Scroll Arrow */}
              <button
                type="button"
                onClick={() => handleScrollStops('right')}
                className="absolute right-1 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-[#171310]/90 hover:bg-[#4F6F52] text-white border border-white/20 backdrop-blur-md flex items-center justify-center shadow-lg transition-all cursor-pointer hover:scale-110 active:scale-95"
                title={isRtl ? "تصفح المحطات لليمين" : "Scroll stops right"}
                aria-label="Scroll right"
              >
                <ChevronRight className="w-6 h-6 text-[#FAF8F3]" />
              </button>

              {/* Scrollable Container */}
              <div 
                ref={stopsScrollRef}
                className="overflow-x-auto scrollbar-none flex items-center gap-4 sm:gap-6 py-4 px-12 scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {routeStops.map((stop, i) => (
                  <div 
                    key={i} 
                    className="min-w-[170px] sm:min-w-[200px] shrink-0 flex flex-col items-center text-center space-y-2 group cursor-pointer bg-white/5 dark:bg-white/5 hover:bg-white/10 p-3.5 rounded-2xl border border-white/10 hover:border-[#D6AD72] transition-all"
                  >
                    {/* Pin Circle */}
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF8F3] dark:bg-[#30251E] text-[#3B2A22] dark:text-[#FAF8F3] flex items-center justify-center font-bold text-sm shadow-sm border border-[#C58B5C] dark:border-[#D6AD72] group-hover:scale-105 group-hover:bg-[#4F6F52] group-hover:text-white transition-all">
                      {i + 1 < 10 ? `0${i + 1}` : i + 1}
                    </div>

                    {/* Stop Name */}
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-white block line-clamp-2 min-h-[32px] flex items-center justify-center">
                        {isRtl ? stop.nameAr : stop.nameEn}
                      </span>
                      <span className="text-[11px] font-medium text-[#D6AD72] block">
                        ⏱️ {stop.time}
                      </span>
                    </div>

                    {/* Accessible Tag & Google Maps Link */}
                    <div className="flex flex-col items-center gap-1.5 w-full pt-1">
                      <span className="text-[10px] font-bold bg-[#4F6F52] text-white px-2.5 py-0.5 rounded-full">
                        ♿ {lang === 'ar' ? 'متاح للكراسي' : 'Accessible'}
                      </span>
                      <a
                        href={getGoogleMapsUrl(isRtl ? stop.nameAr : stop.nameEn, undefined, isRtl ? activeDest.nameAr : activeDest.nameEn, stop.coordinates)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-bold bg-[#C58B5C] hover:bg-[#FAF8F3] hover:text-[#3B2A22] text-white px-2.5 py-1 rounded-full flex items-center justify-center gap-1 transition-colors w-full shadow-2xs"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MapPin className="w-3 h-3" />
                        <span>{isRtl ? 'موقع قوقل ماب' : 'Google Maps'}</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Bottom Controls Bar */}
            <div className="z-10 relative flex flex-wrap items-center justify-between gap-3 bg-[#3B2A22]/90 dark:bg-[#171310]/90 p-3.5 rounded-2xl border border-white/10 text-xs text-[#FAF8F3]/80">
              <div className="flex items-center gap-3">
                <span>📍 {lang === 'ar' ? 'الإحداثيات' : 'Coords'}: {activeDest.coordinates.lat}, {activeDest.coordinates.lng}</span>
                <span>🕌 {lang === 'ar' ? 'استراحة الصلاة: مدمجة' : 'Prayer Pause: Integrated'}</span>
              </div>

              <button
                onClick={() => onSelectDestination(activeDest.nameAr)}
                className="px-4 py-2 rounded-full bg-[#4F6F52] hover:bg-[#C58B5C] text-white font-bold transition-colors flex items-center gap-1.5"
              >
                <span>{lang === 'ar' ? 'خطط رحلتك في هذا المسار' : 'Plan This Route'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Background Map Overlay Grid Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C58B5C_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          </div>

          {/* Right Column Details Card */}
          <div className="lg:col-span-4 bg-white dark:bg-[#241D18] border border-[#F3E6D0] dark:border-[#493A2F] rounded-3xl p-5 shadow-sm space-y-5 transition-colors">
            
            {/* Image Preview */}
            <div className="rounded-2xl overflow-hidden h-44 border border-[#F3E6D0] dark:border-[#493A2F] relative">
              <ImageWithFallback
                src={activeDest.image}
                fallbackSrc="/images/alula_hero_1786210418895.jpg"
                alt={activeDest.nameAr}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2.5 right-2.5 left-2.5 p-2.5 rounded-xl bg-[#171310]/85 backdrop-blur-sm text-white text-xs font-bold flex items-center justify-between border border-white/10">
                <span>{isRtl ? activeDest.nameAr : activeDest.nameEn}</span>
                <span className="text-[#D6AD72]">★ {activeDest.rating}</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-[#4F6F52] dark:text-[#D6AD72] uppercase tracking-wider block">
                {isRtl ? activeDest.tagAr : activeDest.tagEn}
              </span>
              <p className="text-xs text-[#3B2A22]/80 dark:text-[#C8BDB2] leading-relaxed font-medium">
                {isRtl ? activeDest.descriptionAr : activeDest.descriptionEn}
              </p>
            </div>

            {/* Today's Prayer Schedule Snippet */}
            <div className="p-3.5 rounded-2xl bg-[#FAF8F3] dark:bg-[#30251E] border border-[#F3E6D0] dark:border-[#493A2F] space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#3B2A22] dark:text-[#FAF8F3]">
                <span className="flex items-center gap-1 text-[#4F6F52] dark:text-[#D6AD72]">
                  🕌 {lang === 'ar' ? 'جدول أوقات الصلاة المزامَن' : 'Synchronized Prayer Schedule'}
                </span>
                <span>{isRtl ? activeDest.nameAr : activeDest.nameEn}</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
                <div className="bg-white dark:bg-[#241D18] p-1.5 rounded-xl border border-[#F3E6D0] dark:border-[#493A2F]">
                  <span className="block text-[10px] text-[#3B2A22]/70 dark:text-[#C8BDB2] font-semibold">{lang === 'ar' ? 'الظهر' : 'Dhuhr'}</span>
                  <span className="font-bold text-[#3B2A22] dark:text-[#FAF8F3]">{activeDest.defaultPrayerTimes.dhuhr}</span>
                </div>
                <div className="bg-white dark:bg-[#241D18] p-1.5 rounded-xl border border-[#F3E6D0] dark:border-[#493A2F]">
                  <span className="block text-[10px] text-[#3B2A22]/70 dark:text-[#C8BDB2] font-semibold">{lang === 'ar' ? 'العصر' : 'Asr'}</span>
                  <span className="font-bold text-[#3B2A22] dark:text-[#FAF8F3]">{activeDest.defaultPrayerTimes.asr}</span>
                </div>
                <div className="bg-white dark:bg-[#241D18] p-1.5 rounded-xl border border-[#F3E6D0] dark:border-[#493A2F]">
                  <span className="block text-[10px] text-[#3B2A22]/70 dark:text-[#C8BDB2] font-semibold">{lang === 'ar' ? 'المغرب' : 'Maghrib'}</span>
                  <span className="font-bold text-[#3B2A22] dark:text-[#FAF8F3]">{activeDest.defaultPrayerTimes.maghrib}</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => onSelectDestination(activeDest.nameAr)}
              className="w-full py-3 px-4 rounded-full bg-[#4F6F52] hover:bg-[#3B2A22] dark:hover:bg-[#C58B5C] text-white font-bold text-xs sm:text-sm shadow-sm transition-colors text-center"
            >
              {lang === 'ar' ? `اختر ${activeDest.nameAr} وابدأ التخطيط` : `Plan Trip to ${activeDest.nameEn}`}
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};
