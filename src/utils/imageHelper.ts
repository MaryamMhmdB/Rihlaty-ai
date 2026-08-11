export const DESTINATION_IMAGES: Record<string, string> = {
  alula: '/images/alula_hegra_tomb_1786293300477.jpg',
  diriyah: '/images/diriyah_atturaif_1786293313850.jpg',
  jeddah: '/images/jeddah_albalad_1786293328938.jpg',
  riyadh: '/images/riyadh_masmak_fortress_1786344318620.jpg',
  abha: '/images/abha_green_mountain_1786344292130.jpg',
  taif: '/images/taif_heritage_mountains_1786344305214.jpg',
  alahsa: '/images/alahsa_oasis_palms_1786344334756.jpg',
  dammam: '/images/ithra_center_dammam_1786367340612.jpg',
  khobar: '/images/ithra_center_dammam_1786367340612.jpg',
  qatif: '/images/ithra_center_dammam_1786367340612.jpg',
  makkah: '/images/jeddah_albalad_1786293328938.jpg',
  madinah: '/images/alula_hegra_tomb_1786293300477.jpg',
  jazan: '/images/saudi_traditional_dining_1786347105130.jpg',
  najran: '/images/saudi_artisan_souk_1786347116457.jpg',
  hail: '/images/riyadh_masmak_fortress_1786344318620.jpg',
  tabuk: '/images/alula_hegra_tomb_1786293300477.jpg'
};

// Specific attraction-level real photos mapping
export const ATTRACTION_IMAGES: Array<{ keywords: string[]; src: string }> = [
  { keywords: ['مصمك', 'masmak'], src: '/images/riyadh_masmak_fortress_1786344318620.jpg' },
  { keywords: ['سوق الزل', 'zal souk', 'souk al-zal', 'الزل'], src: '/images/saudi_artisan_souk_1786347116457.jpg' },
  { keywords: ['طريف', 'turaif', 'بجيري', 'bujairi', 'درعية', 'diriyah', 'سلوى'], src: '/images/diriyah_atturaif_1786293313850.jpg' },
  { keywords: ['فيل', 'elephant rock'], src: '/images/elephant_rock_alula_1786367294248.jpg' },
  { keywords: ['حجر', 'hegra', 'مدائن صالح', 'قصر الفريد'], src: '/images/alula_hegra_tomb_1786293300477.jpg' },
  { keywords: ['بلدة قديمة بالعلا', 'alula old town'], src: '/images/alula_hero_1786210418895.jpg' },
  { keywords: ['نصيف', 'nassif', 'بلد', 'al-balad', 'جدة التاريخية'], src: '/images/jeddah_albalad_1786293328938.jpg' },
  { keywords: ['علوي', 'alawi', 'ندى', 'nada'], src: '/images/jeddah_balad_1786210446249.jpg' },
  { keywords: ['رجال ألمع', 'rijal almaa'], src: '/images/rijal_almaa_abha_1786367326752.jpg' },
  { keywords: ['الجبل الأخضر', 'green mountain'], src: '/images/abha_green_mountain_1786344292130.jpg' },
  { keywords: ['شبرا', 'shubra', 'ورد طائفي', 'taif rose'], src: '/images/taif_heritage_mountains_1786344305214.jpg' },
  { keywords: ['قارة', 'alqarah', 'كهوف', 'caves'], src: '/images/alqarah_mountain_alahsa_1786367310661.jpg' },
  { keywords: ['إبراهيم', 'ibrahim palace', 'قيصرية', 'qaysariya', 'نخيل الأحساء'], src: '/images/alahsa_oasis_palms_1786344334756.jpg' },
  { keywords: ['إثراء', 'ithra', 'القرية التراثية', 'كورنيش الدمام', 'دمام', 'خبر', 'قطيف', 'dammam', 'khobar', 'qatif', 'مرجان'], src: '/images/ithra_center_dammam_1786367340612.jpg' },
  { keywords: ['قهوة', 'coffee', 'مقهى', 'cafe', 'شاي'], src: '/images/saudi_heritage_cafe_1786347078876.jpg' },
  { keywords: ['مطعم', 'restaurant', 'غداء', 'lunch', 'عشاء', 'dining', 'قرية نجدية', 'مأكولات', 'مكبوس', 'حنيذ', 'أرز'], src: '/images/saudi_traditional_dining_1786347105130.jpg' },
  { keywords: ['جامع', 'مسجد', 'mosque', 'صلاة', 'prayer', 'مصلى'], src: '/images/saudi_historic_mosque_1786347091803.jpg' },
  { keywords: ['سوق', 'souk', 'معرض', 'متحف', 'متحف التراث'], src: '/images/saudi_artisan_souk_1786347116457.jpg' }
];

export const CATEGORY_IMAGES: Record<string, string> = {
  prayer: '/images/saudi_historic_mosque_1786347091803.jpg',
  cafe: '/images/saudi_heritage_cafe_1786347078876.jpg',
  dining: '/images/saudi_traditional_dining_1786347105130.jpg',
  shopping: '/images/saudi_artisan_souk_1786347116457.jpg',
  heritage: '/images/alula_hegra_tomb_1786293300477.jpg',
  experience: '/images/saudi_artisan_souk_1786347116457.jpg'
};

export function getDestinationFallbackImage(destinationName?: string, category?: string): string {
  if (category && CATEGORY_IMAGES[category]) {
    return CATEGORY_IMAGES[category];
  }

  if (!destinationName) return DESTINATION_IMAGES.alula;

  const d = destinationName.toLowerCase();

  if (d.includes('قطيف') || d.includes('qatif') || d.includes('دمام') || d.includes('dammam') || d.includes('خبر') || d.includes('khobar') || d.includes('جبيل') || d.includes('ظهران') || d.includes('شرقية')) {
    return DESTINATION_IMAGES.dammam;
  }
  if (d.includes('أحساء') || d.includes('احساء') || d.includes('ahsa') || d.includes('هفوف')) {
    return DESTINATION_IMAGES.alahsa;
  }
  if (d.includes('أبها') || d.includes('abha') || d.includes('عسير') || d.includes('خميس') || d.includes('باحة')) {
    return DESTINATION_IMAGES.abha;
  }
  if (d.includes('طائف') || d.includes('taif')) {
    return DESTINATION_IMAGES.taif;
  }
  if (d.includes('جدة') || d.includes('jeddah') || d.includes('مكة') || d.includes('مدينة') || d.includes('ينبع')) {
    return DESTINATION_IMAGES.jeddah;
  }
  if (d.includes('علا') || d.includes('alula') || d.includes('تبوك') || d.includes('جوف')) {
    return DESTINATION_IMAGES.alula;
  }
  if (d.includes('درعية') || d.includes('diriyah')) {
    return DESTINATION_IMAGES.diriyah;
  }
  if (d.includes('رياض') || d.includes('riyadh') || d.includes('قصيم') || d.includes('بريدة')) {
    return DESTINATION_IMAGES.riyadh;
  }

  return DESTINATION_IMAGES.dammam; // High quality Eastern / Saudi default asset
}

export function getItineraryItemImage(
  item: {
    imageUrl?: string;
    image?: string;
    category?: string;
    isPrayerTime?: boolean;
    titleAr?: string;
    titleEn?: string;
    locationAr?: string;
    locationEn?: string;
  },
  destinationName?: string
): string {
  // 1. If explicit local asset is present, use it
  if (item.imageUrl && item.imageUrl.startsWith('/images/')) return item.imageUrl;
  if (item.image && item.image.startsWith('/images/')) return item.image;

  const fullText = ((item.titleAr || '') + ' ' + (item.titleEn || '') + ' ' + (item.locationAr || '') + ' ' + (item.locationEn || '')).toLowerCase();

  // 2. Search specific attraction-level image mapping
  for (const attr of ATTRACTION_IMAGES) {
    if (attr.keywords.some((kw) => fullText.includes(kw.toLowerCase()))) {
      return attr.src;
    }
  }

  const category = (item.category || '').toLowerCase();

  // 3. Prayer / Mosque
  if (item.isPrayerTime || category === 'prayer') {
    return CATEGORY_IMAGES.prayer;
  }

  // 4. Cafe / Coffee
  if (category === 'cafe') {
    return CATEGORY_IMAGES.cafe;
  }

  // 5. Dining
  if (category === 'dining') {
    return CATEGORY_IMAGES.dining;
  }

  // 6. Shopping / Souk
  if (category === 'shopping') {
    return CATEGORY_IMAGES.shopping;
  }

  // 7. If item provided an external imageUrl, return it as secondary option
  if (item.imageUrl && (item.imageUrl.startsWith('http://') || item.imageUrl.startsWith('https://'))) {
    return item.imageUrl;
  }

  // 8. Destination main image fallback
  return getDestinationFallbackImage(destinationName, category);
}

