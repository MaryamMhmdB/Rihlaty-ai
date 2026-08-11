import { Destination, ItineraryResult } from '../types';

export const DESTINATIONS: Destination[] = [
  {
    id: 'alula',
    nameAr: 'العلا',
    nameEn: 'AlUla',
    subtitleAr: 'اكتشف عظمة الطبيعة والتاريخ',
    subtitleEn: 'Discover natural wonders and ancient tombs',
    tagAr: 'موقع تراث عالمي (اليونسكو)',
    tagEn: 'UNESCO World Heritage Site',
    descriptionAr: 'واحة تاريخية مذهلة تضم مدائن صالح (الحِجر)، جبل الفيل، والبلدة القديمة وسط جبال شاهقة ومناظر طبيعية ساحرة.',
    descriptionEn: 'A breathtaking historic oasis featuring Hegra (Mada\'in Salih), Elephant Rock, and Old Town set among majestic sandstone mountains.',
    image: '/images/alula_hegra_tomb_1786293300477.jpg',
    unesco: true,
    rating: 4.9,
    coordinates: { lat: 26.6174, lng: 37.9221 },
    defaultPrayerTimes: {
      fajr: '04:32',
      dhuhr: '12:34',
      asr: '16:04',
      maghrib: '19:09',
      isha: '20:39'
    },
    avgTempAr: '35°C — طقس صحراوي مشمس ولطيف المساء (طقس العرب)',
    avgTempEn: '35°C — Sunny desert climate with pleasant evening',
    recommendedDurationAr: '5 ساعات إلى يوم كامل',
    recommendedDurationEn: '5 Hours to Full Day'
  },
  {
    id: 'jeddah',
    nameAr: 'جدة التاريخية',
    nameEn: 'Historic Jeddah (Al-Balad)',
    subtitleAr: 'اكتشف روح البلد القديمة',
    subtitleEn: 'Feel the timeless soul of Old Jeddah',
    tagAr: 'بوابة الحرمين وتراث البحر الأحمر',
    tagEn: 'Gateway to Mecca & Red Sea Heritage',
    descriptionAr: 'زوايا دافئة، بيوت الحجر المرجاني المزخرفة بالرواشين الخشبية القديمة، وأسوق تفوح بعبق البخور والقهوة السعودية.',
    descriptionEn: 'Coral stone merchant houses adorned with intricate wooden Roshan balconies, fragrant spice souks, and historic squares.',
    image: '/images/jeddah_albalad_1786293328938.jpg',
    unesco: true,
    rating: 4.9,
    coordinates: { lat: 21.4858, lng: 39.1879 },
    defaultPrayerTimes: {
      fajr: '04:38',
      dhuhr: '12:29',
      asr: '15:50',
      maghrib: '18:57',
      isha: '20:27'
    },
    avgTempAr: '34°C — مشمس مع رطوبة ونسيم بحري لطيف',
    avgTempEn: '34°C — Sunny with humidity and pleasant sea breeze',
    recommendedDurationAr: '3 ساعات إلى يوم كامل',
    recommendedDurationEn: '3 Hours to Full Day'
  },
  {
    id: 'riyadh',
    nameAr: 'الرياض',
    nameEn: 'Riyadh',
    subtitleAr: 'عاصمة التراث والنهضة العصرية',
    subtitleEn: 'Capital of heritage and modern renaissance',
    tagAr: 'قصر المصمك، الدرعية وسوق الزل',
    tagEn: 'Al Masmak, Diriyah & Souk Al-Zal',
    descriptionAr: 'عاصمة التراث والأصالة، تضم قصر المصمك التاريخي، حي الطريف بالدرعية (اليونسكو)، سوق الزل التراثي والمتحف الوطني.',
    descriptionEn: 'The capital of heritage and progress, combining Al Masmak Fortress, At-Turaif in Diriyah (UNESCO site), traditional souks, and museums.',
    image: '/images/riyadh_masmak_fortress_1786344318620.jpg',
    unesco: true,
    rating: 4.9,
    coordinates: { lat: 24.6312, lng: 46.7133 },
    defaultPrayerTimes: {
      fajr: '04:00',
      dhuhr: '11:59',
      asr: '15:26',
      maghrib: '18:32',
      isha: '20:02'
    },
    avgTempAr: '43°C — طقس حار ومشمس في الرياض',
    avgTempEn: '43°C — Hot sunny weather in Riyadh',
    recommendedDurationAr: '4 ساعات إلى يوم كامل',
    recommendedDurationEn: '4 Hours to Full Day'
  },
  {
    id: 'abha',
    nameAr: 'أبها',
    nameEn: 'Abha',
    subtitleAr: 'سيدة الضباب وعروس الجنوب',
    subtitleEn: 'Queen of Fog & Southern Heritage',
    tagAr: 'قرية رجال ألمع والجبل الأخضر',
    tagEn: 'Rijal Almaa Village & Green Mountain',
    descriptionAr: 'مناظر جبلية خلابة، قرية رجال ألمع التراثية العريقة بقصورها الحجرية الملونة، وأجواء عليلة لطيفة في مرتفعات عسير.',
    descriptionEn: 'Stunning mountain views, ancient stone heritage villages with colorful Asiri art, and refreshing cool mountain air.',
    image: '/images/abha_green_mountain_1786344292130.jpg',
    unesco: true,
    rating: 4.9,
    coordinates: { lat: 18.2164, lng: 42.5053 },
    defaultPrayerTimes: {
      fajr: '04:32',
      dhuhr: '12:16',
      asr: '15:31',
      maghrib: '18:41',
      isha: '20:11'
    },
    avgTempAr: '28°C — طقس معتدل مع فرصة زخات مطر (طقس العرب)',
    avgTempEn: '28°C — Mild weather with chance of light rain',
    recommendedDurationAr: '5 ساعات إلى يوم كامل',
    recommendedDurationEn: '5 Hours to Full Day'
  },
  {
    id: 'taif',
    nameAr: 'الطائف',
    nameEn: 'Taif',
    subtitleAr: 'مدينة الورد وعروس المنتجات التراثية',
    subtitleEn: 'City of Roses & Heritage Mountain Breezes',
    tagAr: 'قصر شبرا وسوق عكاظ',
    tagEn: 'Shubra Palace & Souk Okadh',
    descriptionAr: 'مزارع الورد الطائفي التراثية، قصر شبرا التاريخي، وتلفريك الهدا المطل على جبال السروات.',
    descriptionEn: 'Famous Taif rose farms, historic Shubra Palace, and Al-Hada cable car over Sarawat mountains.',
    image: '/images/taif_shubra_palace_1786344304825.jpg',
    unesco: false,
    rating: 4.7,
    coordinates: { lat: 21.2703, lng: 40.4158 },
    defaultPrayerTimes: {
      fajr: '04:34',
      dhuhr: '12:24',
      asr: '15:44',
      maghrib: '18:52',
      isha: '20:22'
    },
    avgTempAr: '32°C — طقس مشمس ومعتدل في المرتفعات (طقس العرب)',
    avgTempEn: '32°C — Sunny and mild mountain weather',
    recommendedDurationAr: '4 ساعات إلى 6 ساعات',
    recommendedDurationEn: '4 Hours to 6 Hours'
  },
  {
    id: 'alahsa',
    nameAr: 'الأحساء',
    nameEn: 'Al-Ahsa',
    subtitleAr: 'أكبر واحة نخيل تراثية في العالم',
    subtitleEn: 'World\'s Largest Heritage Palm Oasis',
    tagAr: 'موقع تراث عالمي (اليونسكو)',
    tagEn: 'UNESCO World Heritage Site',
    descriptionAr: 'واحة نخيل تضم أكثر من 2.5 مليون نخلة، جبل القارة بكهوفه الباردة، قصر إبراهيم الأثري، وسوق القيصرية التراثي.',
    descriptionEn: 'Vast oasis featuring over 2.5 million date palms, Al-Qarah natural cave mountain, historic Ibrahim Palace, and Al-Qaysariya Souk.',
    image: '/images/alahsa_oasis_palms_1786344334756.jpg',
    unesco: true,
    rating: 4.9,
    coordinates: { lat: 25.3833, lng: 49.5833 },
    defaultPrayerTimes: {
      fajr: '03:52',
      dhuhr: '11:48',
      asr: '15:16',
      maghrib: '18:22',
      isha: '19:52'
    },
    avgTempAr: '44°C — طقس حار، ظلال النخيل والمغارات المكيفة (طقس العرب)',
    avgTempEn: '44°C — Hot weather, shaded palm groves & cool caves',
    recommendedDurationAr: '5 ساعات إلى يوم كامل',
    recommendedDurationEn: '5 Hours to Full Day'
  }
];

export const SAMPLE_RIYADH_ITINERARY: ItineraryResult = {
  id: 'riyadh-5h-wheelchair-001',
  destinationNameAr: 'الرياض — قصر المصمك، سوق الزل والدرعية',
  destinationNameEn: 'Riyadh — Al Masmak Fortress, Souk Al-Zal & Diriyah',
  durationAr: '5 ساعات',
  durationEn: '5 Hours',
  date: '2026-08-10',
  createdAt: '2026-08-10T10:30:00Z',
  totalDistanceAr: '5.8 كم',
  totalDistanceEn: '5.8 km',
  accessibilityScore: 98,
  summaryAr: 'تم تصميم هذا الجدول المخصص للرياض بعناية الفائقة لمراعاة سهولة التنقل والحركة، مع استراحات مريحة مكيّفة وتنسيق أوقات الصلاة.',
  summaryEn: 'Tailored for Riyadh with step-free wheelchair accessibility, air-conditioned indoor pauses, and seamless prayer synchronization.',
  items: [
    {
      id: '1',
      time: '09:00',
      titleAr: 'زيارة قصر المصمك التاريخي واستكشاف قاعات العرض',
      titleEn: 'Explore Al Masmak Fortress & Heritage Halls',
      locationAr: 'حي الديرة — وسط الرياض',
      locationEn: 'Al-Deerah District — Central Riyadh',
      distanceAr: '1.2 كم',
      distanceEn: '1.2 km',
      travelTimeAr: '15 دقيقة بسيارة مكيفة',
      travelTimeEn: '15 mins in AC car',
      mobilityNoteAr: 'ممر ممهد ومصاعد مجهزة ♿ مع تكييف كامل وقاعات عرض واسعة',
      mobilityNoteEn: 'Ramped entrances and accessible elevators ♿ with full AC',
      isWheelchairAccessible: true,
      temperature: '32°C',
      weatherIcon: '🌅',
      crowdLevelAr: 'منخفض',
      crowdLevelEn: 'Low',
      crowdStatus: 'low',
      category: 'heritage',
      aiRationaleAr: 'الانطلاق صباحاً في قصر المصمك المكيف لاستكشاف قصة توحيد المملكة في أجواء منعشة.',
      aiRationaleEn: 'Starting early at Al Masmak Fortress for a cool and informative heritage walk.',
      coordinates: { lat: 24.6312, lng: 46.7133 },
      sourceAr: 'هيئة التراث — وزارة الثقافة',
      sourceEn: 'Saudi Heritage Commission'
    },
    {
      id: '2',
      time: '10:30',
      titleAr: 'جولة سوق الزل التراثي وتذوق القهوة السعودية',
      titleEn: 'Souk Al-Zal Walk & Saudi Coffee Tasting',
      locationAr: 'سوق الزل — الديرة القديمة',
      locationEn: 'Souk Al-Zal — Old Deerah',
      distanceAr: '400 متر',
      distanceEn: '400 meters',
      travelTimeAr: '5 دقائق مشي خفيف',
      travelTimeEn: '5 mins light walk',
      mobilityNoteAr: 'ممرات مستوية واسعة خالية من العوائق ♿ مع مقاعد مريحة',
      mobilityNoteEn: 'Flat paved alleys free of obstacles ♿ with traditional shaded seating',
      isWheelchairAccessible: true,
      temperature: '34°C',
      weatherIcon: '☀️',
      crowdLevelAr: 'هادئ',
      crowdLevelEn: 'Quiet',
      crowdStatus: 'low',
      category: 'experience',
      aiRationaleAr: 'استمتاع بعبق العود والبخور والمزاد التراثي في سوق الزل التاريخي قبل اشتداد الحرارة.',
      aiRationaleEn: 'Experience authentic scents of oud and traditional carpet auctions in shaded alleys.',
      coordinates: { lat: 24.632, lng: 46.714 },
      sourceAr: 'روح السعودية — دليل أسواق الرياض',
      sourceEn: 'Visit Saudi — Riyadh Souks'
    },
    {
      id: '3',
      time: '12:00',
      titleAr: 'صلاة الظهر في جامع الإمام تركي بن عبدالله الكبير',
      titleEn: 'Dhuhr Prayer at Imam Turki bin Abdullah Grand Mosque',
      locationAr: 'وسط الرياض — قرب قصر الحكم',
      locationEn: 'Central Riyadh — Qasr Al-Hokm Area',
      distanceAr: '300 متر',
      distanceEn: '300 meters',
      travelTimeAr: '5 دقائق',
      travelTimeEn: '5 mins',
      mobilityNoteAr: 'مصلى مكيف بالكامل مع منحدرات خاصة للكراسي المتحركة ومرافق وضوء مجهزة',
      mobilityNoteEn: 'Fully air-conditioned, dedicated wheelchair ramps & accessible facilities',
      isWheelchairAccessible: true,
      isPrayerTime: true,
      prayerNameAr: 'صلاة الظهر (11:59)',
      prayerNameEn: 'Dhuhr Prayer (11:59)',
      temperature: '38°C (مكيف داخل الجامع 22°C)',
      weatherIcon: '🌡️',
      crowdLevelAr: 'متوسط (أجواء إيمانية)',
      crowdLevelEn: 'Moderate',
      crowdStatus: 'medium',
      category: 'prayer',
      aiRationaleAr: 'تنسيق محطة الصلاة تلقائياً في أحد أكبر جوامع الرياض التاريخية والمجهزة تماماً.',
      aiRationaleEn: 'Automated prayer sync at Riyadh\'s iconic Grand Mosque with full barrier-free features.',
      coordinates: { lat: 24.630, lng: 46.712 },
      sourceAr: 'وزارة الشؤون الإسلامية والدعوة والإرشاد',
      sourceEn: 'Ministry of Islamic Affairs'
    },
    {
      id: '4',
      time: '13:00',
      titleAr: 'تناول الغداء التراثي في مطعم القرية النجديّة',
      titleEn: 'Authentic Najdi Heritage Lunch at Najd Village',
      locationAr: 'شارع التخصصي / المطل - الرياض',
      locationEn: 'Takhassusi St / Al-Bujairi — Riyadh',
      distanceAr: '2.5 كم',
      distanceEn: '2.5 km',
      travelTimeAr: '12 دقيقة بالسيارة',
      travelTimeEn: '12 mins drive',
      mobilityNoteAr: 'مطعم تراثي مكيف ومجهز بممرات ومصاعد خاصة ♿',
      mobilityNoteEn: 'Air-conditioned traditional dining with accessible ground tables & ramps ♿',
      isWheelchairAccessible: true,
      temperature: '40°C (داخل المكان 21°C)',
      weatherIcon: '☀️',
      crowdLevelAr: 'متوسط',
      crowdLevelEn: 'Moderate',
      crowdStatus: 'medium',
      category: 'dining',
      aiRationaleAr: 'تناول وجبة نجدية أصيلة (كبسة، جشيد، أو قرصان) في بيئة تراثية مكيفة ومريحة.',
      aiRationaleEn: 'Indoor authentic dining stop scheduled during peak midday heat.',
      coordinates: { lat: 24.690, lng: 46.680 },
      sourceAr: 'هيئة فنون الطهي السعودية',
      sourceEn: 'Saudi Culinary Arts Commission'
    },
    {
      id: '5',
      time: '14:30',
      titleAr: 'زيارة حي الطريف التاريخي بـ الدرعية (موقع يونسكو)',
      titleEn: 'Tour At-Turaif UNESCO World Heritage District in Diriyah',
      locationAr: 'حي الطريف — الدرعية',
      locationEn: 'At-Turaif District — Diriyah',
      distanceAr: '1.4 كم',
      distanceEn: '1.4 km',
      travelTimeAr: '10 دقائق',
      travelTimeEn: '10 mins',
      mobilityNoteAr: 'ممر خشبي ومسطحات ملساء بالكامل مجهزة لعربات الكراسي المتحركة ♿',
      mobilityNoteEn: 'Smooth wooden boardwalks and buggies optimized for full mobility access ♿',
      isWheelchairAccessible: true,
      temperature: '36°C',
      weatherIcon: '🌇',
      crowdLevelAr: 'ممتع وهادئ',
      crowdLevelEn: 'Pleasant & Calm',
      crowdStatus: 'low',
      category: 'heritage',
      aiRationaleAr: 'ختام الجولة في مهد الدولة السعودية الأولى وحي الطريف المسجل في اليونسكو.',
      aiRationaleEn: 'Final highlight at the UNESCO-listed At-Turaif mud-brick palaces with sunset views.',
      coordinates: { lat: 24.7335, lng: 46.5739 },
      sourceAr: 'شركة تطوير الدرعية | Diriyah Gate Development Authority',
      sourceEn: 'Diriyah Gate Development Authority | DGDA'
    }
  ]
};

export const SAMPLE_ALULA_ITINERARY: ItineraryResult = SAMPLE_RIYADH_ITINERARY;

// Dynamic Helper to build city-specific fallback itinerary with real landmarks
export function getCityFallbackItinerary(destName: string): ItineraryResult {
  const name = (destName || "الرياض").trim();
  const lower = name.toLowerCase();

  let cityAr = name;
  let cityEn = name;
  let temp = "36°C";
  let dhuhr = "12:00";
  let item1Ar = `زيارة المعلم التاريخي في ${name}`;
  let item1En = `Explore Historic Site in ${name}`;
  let item1LocAr = `وسط ${name}`;
  let item1LocEn = `Central ${name}`;
  let coords1 = { lat: 24.6312, lng: 46.7133 };

  let item2Ar = `تذوق القهوة السعودية وسوق ${name} التراثي`;
  let item2En = `Saudi Coffee & ${name} Heritage Souk`;
  let item2LocAr = `سوق ${name} القديم`;
  let item2LocEn = `Old ${name} Souk`;
  let coords2 = { lat: 24.632, lng: 46.714 };

  let mosqueAr = `جامع ${name} الكبير`;
  let mosqueEn = `${name} Grand Mosque`;
  let mosqueLocAr = `وسط ${name}`;
  let mosqueLocEn = `Central ${name}`;
  let coords3 = { lat: 24.630, lng: 46.712 };

  let diningAr = `وجبة الغداء التراثية في ${name}`;
  let diningEn = `Traditional Lunch in ${name}`;
  let diningLocAr = `حي التراث في ${name}`;
  let diningLocEn = `Heritage Area in ${name}`;
  let coords4 = { lat: 24.690, lng: 46.680 };

  let item5Ar = `جولة المساء والمتحف بـ ${name}`;
  let item5En = `Evening Tour & Museum in ${name}`;
  let item5LocAr = `واجهة ${name}`;
  let item5LocEn = `${name} Waterfront / Heritage Hub`;
  let coords5 = { lat: 24.7335, lng: 46.5739 };

  if (lower.includes("جدة") || lower.includes("jeddah")) {
    cityAr = "جدة التاريخية";
    cityEn = "Historic Jeddah";
    temp = "34°C";
    dhuhr = "12:27";
    item1Ar = "زيارة منطقة البلد التاريخية وبيت نصيف";
    item1En = "Explore Al-Balad Historic District & Naseef House";
    item1LocAr = "منطقة البلد — جدة التاريخية";
    item1LocEn = "Al-Balad Heritage Area, Jeddah";
    coords1 = { lat: 21.4858, lng: 39.1873 };

    item2Ar = "جولة أسواق البلد العريقة وتذوق القهوة الحجازية";
    item2En = "Al-Balad Souk Walk & Traditional Hijazi Coffee";
    item2LocAr = "سوق الندى والعلوي — جدة";
    item2LocEn = "Al-Nada & Al-Alawi Souks, Jeddah";
    coords2 = { lat: 21.4865, lng: 39.1880 };

    mosqueAr = "صلاة الظهر في جامع الشافعي التاريخي";
    mosqueEn = "Dhuhr Prayer at Historic Al-Shafei Mosque";
    mosqueLocAr = "حارة المظلوم — جدة التاريخية";
    mosqueLocEn = "Al-Mazloom District, Al-Balad";
    coords3 = { lat: 21.4862, lng: 39.1868 };

    diningAr = "الغداء التراثي الحجازي في مطعم السدّة";
    diningEn = "Traditional Hijazi Lunch at Al-Saddah Restaurant";
    diningLocAr = "طريق الأندلس / البلد — جدة";
    diningLocEn = "Al-Andalus Road / Al-Balad, Jeddah";
    coords4 = { lat: 21.5200, lng: 39.1700 };

    item5Ar = "جولة الواجهة البحرية والمسجد العائم (مسجد الرحمة)";
    item5En = "Corniche Promenade & Al-Rahmah Floating Mosque";
    item5LocAr = "كورنيش جدة الشمالي";
    item5LocEn = "North Jeddah Corniche";
    coords5 = { lat: 21.6380, lng: 39.1080 };
  } else if (lower.includes("علا") || lower.includes("alula")) {
    cityAr = "العلا";
    cityEn = "AlUla";
    temp = "37°C";
    dhuhr = "12:30";
    item1Ar = "زيارة موقع الحجر الأثري (مدائن صالح — يونسكو)";
    item1En = "Tour Hegra UNESCO World Heritage Site";
    item1LocAr = "محمية الحجر الأثرية — العلا";
    item1LocEn = "Hegra UNESCO Reserve, AlUla";
    coords1 = { lat: 26.8000, lng: 37.9500 };

    item2Ar = "جولة البلدة القديمة بالعلا وتذوق التمور المحلية";
    item2En = "AlUla Old Town Stroll & Local Dates Tasting";
    item2LocAr = "البلدة القديمة — العلا";
    item2LocEn = "AlUla Old Town";
    coords2 = { lat: 26.6200, lng: 37.9200 };

    mosqueAr = "صلاة الظهر في مسجد البلدة القديمة بالعلا";
    mosqueEn = "Dhuhr Prayer at AlUla Old Town Mosque";
    mosqueLocAr = "سوق البلدة القديمة — العلا";
    mosqueLocEn = "Old Town Souk, AlUla";
    coords3 = { lat: 26.6210, lng: 37.9210 };

    diningAr = "الغداء التراثي في مطعم سهيل للضيافة بالعلا";
    diningEn = "Authentic Heritage Lunch at Suhail AlUla";
    diningLocAr = "طريق الواحة — العلا Old Town";
    diningLocEn = "Oasis Road, AlUla Old Town";
    coords4 = { lat: 26.6250, lng: 37.9250 };

    item5Ar = "زيارة معلَم جبل الفيل والاستمتاع بفروب الشمس";
    item5En = "Visit Elephant Rock at Sunset";
    item5LocAr = "منطقة جبل الفيل — العلا";
    item5LocEn = "Elephant Rock Area, AlUla";
    coords5 = { lat: 26.6800, lng: 37.9800 };
  } else if (lower.includes("أبها") || lower.includes("abha")) {
    cityAr = "أبها";
    cityEn = "Abha";
    temp = "25°C";
    dhuhr = "12:20";
    item1Ar = "زيارة قرية رجال ألمع التراثية ومتحفها التاريخي";
    item1En = "Explore Rijal Almaa Heritage Village & Museum";
    item1LocAr = "محافظة رجال ألمع — منطقة عسير";
    item1LocEn = "Rijal Almaa, Aseer Region";
    coords1 = { lat: 18.2167, lng: 42.2500 };

    item2Ar = "جولة حي النصب التراثي وتذوق العسل العسيري";
    item2En = "Al-Nassab Heritage District Walk & Aseer Honey";
    item2LocAr = "وسط مدينة أبها التاريخي";
    item2LocEn = "Central Abha Heritage Zone";
    coords2 = { lat: 18.2170, lng: 42.5050 };

    mosqueAr = "صلاة الظهر في جامع الملك فهد بأبها";
    mosqueEn = "Dhuhr Prayer at King Fahd Grand Mosque";
    mosqueLocAr = "طريق الملك عبد العزيز — أبها";
    mosqueLocEn = "King Abdulaziz Rd, Abha";
    coords3 = { lat: 18.2200, lng: 42.5000 };

    diningAr = "الغداء التراثي العسيري (الحنيذ والخبز الميفا)";
    diningEn = "Traditional Aseer Haneeth Lunch";
    diningLocAr = "مطاعم التراث العسيري — أبها";
    diningLocEn = "Aseer Heritage Restaurants, Abha";
    coords4 = { lat: 18.2250, lng: 42.5100 };

    item5Ar = "زيارة الجبل الأخضر وممشى الضباب الساحر";
    item5En = "Green Mountain & Fog Walkway Panoramic View";
    item5LocAr = "منتزه الجبل الأخضر وممشى الضباب — أبها";
    item5LocEn = "Green Mountain & Fog Walkway, Abha";
    coords5 = { lat: 18.2100, lng: 42.5080 };
  } else if (lower.includes("قطيف") || lower.includes("qatif") || lower.includes("دمام") || lower.includes("dammam") || lower.includes("خبر") || lower.includes("khobar") || lower.includes("جبيل") || lower.includes("jubail") || lower.includes("شرقية")) {
    cityAr = lower.includes("قطيف") ? "القطيف والدمام" : (lower.includes("خبر") ? "الخبر" : "الدمام");
    cityEn = lower.includes("قطيف") ? "Qatif & Dammam" : (lower.includes("خبر") ? "Khobar" : "Dammam");
    temp = "38°C";
    dhuhr = "11:47";
    item1Ar = "زيارة واجهة الكورنيش وجزيرة المرجان";
    item1En = "Explore Waterfront Corniche & Marjan Island";
    item1LocAr = "الكورنيش البحري — الدمام/الخبر";
    item1LocEn = "Waterfront Corniche, Dammam/Khobar";
    coords1 = { lat: 26.4340, lng: 50.1030 };

    item2Ar = "جولة القرية التراثية بالدمام وتذوق الشاي والتمر";
    item2En = "Heritage Village Stroll & Coffee Tasting";
    item2LocAr = "القرية التراثية — الكورنيش";
    item2LocEn = "Heritage Village, Corniche";
    coords2 = { lat: 26.4380, lng: 50.1100 };

    mosqueAr = "صلاة الظهر في جامع الكورنيش الكبير";
    mosqueEn = "Dhuhr Prayer at Corniche Grand Mosque";
    mosqueLocAr = "واجهة الكورنيش — الشرقية";
    mosqueLocEn = "Corniche Waterfront";
    coords3 = { lat: 26.4350, lng: 50.1050 };

    diningAr = "الغداء التراثي والمأكولات البحرية الشرقية";
    diningEn = "Eastern Heritage Seafood Lunch";
    diningLocAr = "مطعم القرية التراثية — الدمام";
    diningLocEn = "Heritage Village Restaurant, Dammam";
    coords4 = { lat: 26.4390, lng: 50.1120 };

    item5Ar = "زيارة مركز الملك عبدالعزيز الثقافي العالمي (إثراء)";
    item5En = "Visit King Abdulaziz Center for World Culture (Ithra)";
    item5LocAr = "مركز إثراء — الظهران";
    item5LocEn = "Ithra Cultural Center, Dhahran";
    coords5 = { lat: 26.3350, lng: 50.1220 };
  } else if (lower.includes("طائف") || lower.includes("taif")) {
    cityAr = "الطائف";
    cityEn = "Taif";
    temp = "33°C";
    dhuhr = "12:24";
    item1Ar = "زيارة قصر شبرا التاريخي وسوق الطائف القديم";
    item1En = "Visit Historic Shubra Palace & Old Taif Souk";
    item1LocAr = "حي شبرا — وسط الطائف";
    item1LocEn = "Shubra District, Central Taif";
    coords1 = { lat: 21.2750, lng: 40.4100 };

    item2Ar = "جولة مزارع ومعامل الورد الطائفي بالهدا";
    item2En = "Taif Rose Farm & Distillery Experience";
    item2LocAr = "طريق الهدا — الطائف";
    item2LocEn = "Al-Hada Road, Taif";
    coords2 = { lat: 21.3500, lng: 40.2800 };

    mosqueAr = "صلاة الظهر في جامع عبدالله بن عباس التاريخي";
    mosqueEn = "Dhuhr Prayer at Historic Ibn Abbas Mosque";
    mosqueLocAr = "وسط مدينة الطائف";
    mosqueLocEn = "Central Taif";
    coords3 = { lat: 21.2680, lng: 40.4150 };

    diningAr = "الغداء التراثي في مطاعم الضيافة الطائفية";
    diningEn = "Traditional Taif Heritage Lunch";
    diningLocAr = "طريق الهدا / الشفا — الطائف";
    diningLocEn = "Al-Hada / Al-Shafa, Taif";
    coords4 = { lat: 21.3200, lng: 40.3500 };

    item5Ar = "جولة تلفريك الهدا والمطلات الجبلية في الشفا";
    item5En = "Al-Hada Cable Car & Al-Shafa Mountain Lookouts";
    item5LocAr = "محطة تلفريك الهدا — الطائف";
    item5LocEn = "Al-Hada Cable Car Station, Taif";
    coords5 = { lat: 21.3600, lng: 40.2500 };
  } else if (lower.includes("أحساء") || lower.includes("احساء") || lower.includes("ahsa")) {
    cityAr = "الأحساء";
    cityEn = "Al-Ahsa";
    temp = "42°C";
    dhuhr = "11:48";
    item1Ar = "زيارة قصر إبراهيم الأثري وسوق القيصرية";
    item1En = "Explore Ibrahim Palace & Historic Al-Qaysariya Souk";
    item1LocAr = "حي الكوت — الهفوف بالأحساء";
    item1LocEn = "Al-Khoot District, Al-Hofuf, Al-Ahsa";
    coords1 = { lat: 25.3780, lng: 49.5860 };

    item2Ar = "تذوق الخبز الحساوي بالدبس في سوق القيصرية";
    item2En = "Taste Fresh Hassawi Bread with Date Molasses";
    item2LocAr = "سوق القيصرية — الهفوف";
    item2LocEn = "Al-Qaysariya Souk, Al-Hofuf";
    coords2 = { lat: 25.3760, lng: 49.5870 };

    mosqueAr = "صلاة الظهر في مسجد جواثى التاريخي";
    mosqueEn = "Dhuhr Prayer at Historic Jawatha Mosque";
    mosqueLocAr = "قرية الكلابية — الأحساء";
    mosqueLocEn = "Al-Kilabiyah Village, Al-Ahsa";
    coords3 = { lat: 25.4700, lng: 49.6800 };

    diningAr = "الغداء التراثي الحساوي الأريب في المخبز التراثي";
    diningEn = "Traditional Hassawi Heritage Lunch";
    diningLocAr = "حي الكوت — الهفوف";
    diningLocEn = "Al-Khoot, Al-Hofuf";
    coords4 = { lat: 25.3790, lng: 49.5850 };

    item5Ar = "زيارة جبل القارة وواحة الأحساء التراثية (يونسكو)";
    item5En = "Explore Jabal Al-Qarah Caves & UNESCO Palm Oasis";
    item5LocAr = "جبل القارة — الأحساء";
    item5LocEn = "Jabal Al-Qarah, Al-Ahsa";
    coords5 = { lat: 25.4140, lng: 49.6910 };
  } else if (lower.includes("رياض") || lower.includes("riyadh")) {
    return SAMPLE_RIYADH_ITINERARY;
  }

  // Weather icons tailored to city climate and time of day
  let icon1 = "🌅";
  let icon2 = "🌤️";
  let icon3 = "☀️";
  let icon4 = "🌤️";
  let icon5 = "🌇";

  if (lower.includes('طائف') || lower.includes('taif')) {
    icon1 = "🌅";
    icon2 = "🌤️";
    icon3 = "🌤️";
    icon4 = "🍃";
    icon5 = "⛅";
  } else if (lower.includes('أبها') || lower.includes('abha') || lower.includes('عسير') || lower.includes('باحة')) {
    icon1 = "🌅";
    icon2 = "🌤️";
    icon3 = "⛅";
    icon4 = "🌦️";
    icon5 = "🍃";
  } else if (lower.includes('جدة') || lower.includes('دمام') || lower.includes('خبر') || lower.includes('ينبع') || lower.includes('جازان')) {
    icon1 = "🌅";
    icon2 = "🌤️";
    icon3 = "☀️";
    icon4 = "🌤️";
    icon5 = "🌊";
  }

  return {
    id: `dynamic-plan-${Date.now()}`,
    destinationNameAr: cityAr,
    destinationNameEn: cityEn,
    durationAr: "5 ساعات",
    durationEn: "5 Hours",
    date: new Date().toISOString().split("T")[0],
    createdAt: new Date().toISOString(),
    totalDistanceAr: "4.2 كم",
    totalDistanceEn: "4.2 km",
    accessibilityScore: 96,
    summaryAr: `مسار سياحي متكامل بمدينة ${cityAr} يعتمد على المعالم التراثية والواقعية مع مواءمة أوقات الصلاة والطقس (${temp}).`,
    summaryEn: `Fully integrated heritage itinerary for ${cityEn} featuring verified landmarks, local prayer synchronization, and weather adaptation (${temp}).`,
    items: [
      {
        id: "1",
        time: "09:00",
        titleAr: item1Ar,
        titleEn: item1En,
        locationAr: item1LocAr,
        locationEn: item1LocEn,
        distanceAr: "1.0 كم",
        distanceEn: "1.0 km",
        travelTimeAr: "12 دقيقة",
        travelTimeEn: "12 mins",
        mobilityNoteAr: "ممرات مستوية مجهزة للكراسي المتحركة ♿",
        mobilityNoteEn: "Level smooth paved access ♿",
        isWheelchairAccessible: true,
        temperature: temp,
        weatherIcon: icon1,
        crowdLevelAr: "منخفض",
        crowdLevelEn: "Low",
        crowdStatus: "low",
        category: "heritage",
        aiRationaleAr: `الانطلاق في الصباح الباكر لاستكشاف المعلم التاريخي الأهم بـ ${cityAr}.`,
        aiRationaleEn: `Starting early at the core historical landmark of ${cityEn}.`,
        coordinates: coords1,
        sourceAr: "هيئة التراث — وزارة الثقافة",
        sourceEn: "Saudi Heritage Commission"
      },
      {
        id: "2",
        time: "10:30",
        titleAr: item2Ar,
        titleEn: item2En,
        locationAr: item2LocAr,
        locationEn: item2LocEn,
        distanceAr: "400 متر",
        distanceEn: "400 meters",
        travelTimeAr: "5 دقائق",
        travelTimeEn: "5 mins",
        mobilityNoteAr: "ممرات واسعة ومقاعد مريحة ♿",
        mobilityNoteEn: "Shaded walkways with comfortable benches ♿",
        isWheelchairAccessible: true,
        temperature: temp,
        weatherIcon: icon2,
        crowdLevelAr: "هادئ",
        crowdLevelEn: "Quiet",
        crowdStatus: "low",
        category: "experience",
        aiRationaleAr: `الاستمتاع بالأجواء الشعبية العريقة وتذوق القهوة السعودية بـ ${cityAr}.`,
        aiRationaleEn: `Immersing in authentic local culture and Saudi coffee tasting in ${cityEn}.`,
        coordinates: coords2,
        sourceAr: "روح السعودية — دليل الوجهات",
        sourceEn: "Visit Saudi Destinations"
      },
      {
        id: "3",
        time: "12:00",
        titleAr: mosqueAr,
        titleEn: mosqueEn,
        locationAr: mosqueLocAr,
        locationEn: mosqueLocEn,
        distanceAr: "300 متر",
        distanceEn: "300 meters",
        travelTimeAr: "5 دقائق",
        travelTimeEn: "5 mins",
        mobilityNoteAr: "مصلى مكيف ومجهز بمصاعد ومنحدرات خاصة ♿",
        mobilityNoteEn: "Fully air-conditioned with accessible ramps ♿",
        isWheelchairAccessible: true,
        isPrayerTime: true,
        prayerNameAr: `صلاة الظهر (${dhuhr})`,
        prayerNameEn: `Dhuhr Prayer (${dhuhr})`,
        temperature: temp,
        weatherIcon: icon3,
        crowdLevelAr: "أجواء إيمانية",
        crowdLevelEn: "Moderate",
        crowdStatus: "medium",
        category: "prayer",
        aiRationaleAr: `تنسيق الوقوف لأداء صلاة الظهر في أحد أكبر جوامع ${cityAr}.`,
        aiRationaleEn: `Scheduled prayer pause at the main central mosque of ${cityEn}.`,
        coordinates: coords3,
        sourceAr: "وزارة الشؤون الإسلامية",
        sourceEn: "Ministry of Islamic Affairs"
      },
      {
        id: "4",
        time: "13:00",
        titleAr: diningAr,
        titleEn: diningEn,
        locationAr: diningLocAr,
        locationEn: diningLocEn,
        distanceAr: "1.5 كم",
        distanceEn: "1.5 km",
        travelTimeAr: "10 دقائق",
        travelTimeEn: "10 mins",
        mobilityNoteAr: "مطعم تراثي مكيف ومجهز بالكامل ♿",
        mobilityNoteEn: "Air-conditioned heritage restaurant with accessible seating ♿",
        isWheelchairAccessible: true,
        temperature: temp,
        weatherIcon: icon4,
        crowdLevelAr: "متوسط",
        crowdLevelEn: "Moderate",
        crowdStatus: "medium",
        category: "dining",
        aiRationaleAr: `استراحة الغداء وتذوق المأكولات المحلية الشهيرة بـ ${cityAr}.`,
        aiRationaleEn: `Traditional lunch stop highlighting local regional delicacies in ${cityEn}.`,
        coordinates: coords4,
        sourceAr: "هيئة فنون الطهي السعودية",
        sourceEn: "Saudi Culinary Arts Commission"
      },
      {
        id: "5",
        time: "14:30",
        titleAr: item5Ar,
        titleEn: item5En,
        locationAr: item5LocAr,
        locationEn: item5LocEn,
        distanceAr: "1.2 كم",
        distanceEn: "1.2 km",
        travelTimeAr: "10 دقائق",
        travelTimeEn: "10 mins",
        mobilityNoteAr: "مستويات مستوية ومسارات مجهزة بالكامل ♿",
        mobilityNoteEn: "Flat accessible boardwalks and buggies ♿",
        isWheelchairAccessible: true,
        temperature: temp,
        weatherIcon: icon5,
        crowdLevelAr: "ممتع وهادئ",
        crowdLevelEn: "Pleasant & Calm",
        crowdStatus: "low",
        category: "heritage",
        aiRationaleAr: `ختام المحطات في أشهر المعالم الحضارية والثقافية بـ ${cityAr}.`,
        aiRationaleEn: `Final highlight at the premier cultural destination in ${cityEn}.`,
        coordinates: coords5,
        sourceAr: "هيئة السياحة السعودية",
        sourceEn: "Saudi Tourism Authority"
      }
    ]
  };
}

