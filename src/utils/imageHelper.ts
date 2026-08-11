import alulaTombImg from '../assets/images/alula_hegra_tomb_1786293300477.jpg';
import alulaHeroImg from '../assets/images/alula_hero_1786210418895.jpg';
import diriyahAtturaifImg from '../assets/images/diriyah_atturaif_1786293313850.jpg';
import jeddahAlbaladImg from '../assets/images/jeddah_albalad_1786293328938.jpg';
import jeddahBaladAltImg from '../assets/images/jeddah_balad_1786210446249.jpg';
import riyadhMasmakImg from '../assets/images/riyadh_masmak_fortress_1786344318620.jpg';
import abhaGreenMountainImg from '../assets/images/abha_green_mountain_1786344292130.jpg';
import taifHeritageImg from '../assets/images/taif_heritage_mountains_1786344305214.jpg';
import alahsaOasisImg from '../assets/images/alahsa_oasis_palms_1786344334756.jpg';
import ithraCenterImg from '../assets/images/ithra_center_dammam_1786367340612.jpg';
import elephantRockImg from '../assets/images/elephant_rock_alula_1786367294248.jpg';
import alqarahMountainImg from '../assets/images/alqarah_mountain_alahsa_1786367310661.jpg';
import rijalAlmaaImg from '../assets/images/rijal_almaa_abha_1786367326752.jpg';
import heritageCafeImg from '../assets/images/saudi_heritage_cafe_1786347078876.jpg';
import historicMosqueImg from '../assets/images/saudi_historic_mosque_1786347091803.jpg';
import traditionalDiningImg from '../assets/images/saudi_traditional_dining_1786347105130.jpg';
import artisanSoukImg from '../assets/images/saudi_artisan_souk_1786347116457.jpg';

export const DESTINATION_IMAGES: Record<string, string> = {
  alula: alulaTombImg,
  diriyah: diriyahAtturaifImg,
  jeddah: jeddahAlbaladImg,
  riyadh: riyadhMasmakImg,
  abha: abhaGreenMountainImg,
  taif: taifHeritageImg,
  alahsa: alahsaOasisImg,
  dammam: ithraCenterImg,
  khobar: ithraCenterImg,
  qatif: ithraCenterImg,
  makkah: jeddahAlbaladImg,
  madinah: alulaTombImg,
  jazan: traditionalDiningImg,
  najran: artisanSoukImg,
  hail: riyadhMasmakImg,
  tabuk: alulaTombImg
};

// Specific attraction-level real photos mapping
export const ATTRACTION_IMAGES: Array<{ keywords: string[]; src: string }> = [
  { keywords: ['مصمك', 'masmak'], src: riyadhMasmakImg },
  { keywords: ['سوق الزل', 'zal souk', 'souk al-zal', 'الزل'], src: artisanSoukImg },
  { keywords: ['طريف', 'turaif', 'بجيري', 'bujairi', 'درعية', 'diriyah', 'سلوى'], src: diriyahAtturaifImg },
  { keywords: ['فيل', 'elephant rock'], src: elephantRockImg },
  { keywords: ['حجر', 'hegra', 'مدائن صالح', 'قصر الفريد'], src: alulaTombImg },
  { keywords: ['بلدة قديمة بالعلا', 'alula old town'], src: alulaHeroImg },
  { keywords: ['نصيف', 'nassif', 'بلد', 'al-balad', 'جدة التاريخية'], src: jeddahAlbaladImg },
  { keywords: ['علوي', 'alawi', 'ندى', 'nada'], src: jeddahBaladAltImg },
  { keywords: ['رجال ألمع', 'rijal almaa'], src: rijalAlmaaImg },
  { keywords: ['الجبل الأخضر', 'green mountain'], src: abhaGreenMountainImg },
  { keywords: ['شبرا', 'shubra', 'ورد طائفي', 'taif rose'], src: taifHeritageImg },
  { keywords: ['قارة', 'alqarah', 'كهوف', 'caves'], src: alqarahMountainImg },
  { keywords: ['إبراهيم', 'ibrahim palace', 'قيصرية', 'qaysariya', 'نخيل الأحساء'], src: alahsaOasisImg },
  { keywords: ['إثراء', 'ithra', 'القرية التراثية', 'كورنيش الدمام', 'دمام', 'خبر', 'قطيف', 'dammam', 'khobar', 'qatif', 'مرجان'], src: ithraCenterImg },
  { keywords: ['قهوة', 'coffee', 'مقهى', 'cafe', 'شاي'], src: heritageCafeImg },
  { keywords: ['مطعم', 'restaurant', 'غداء', 'lunch', 'عشاء', 'dining', 'قرية نجدية', 'مأكولات', 'مكبوس', 'حنيذ', 'أرز'], src: traditionalDiningImg },
  { keywords: ['جامع', 'مسجد', 'mosque', 'صلاة', 'prayer', 'مصلى'], src: historicMosqueImg },
  { keywords: ['سوق', 'souk', 'معرض', 'متحف', 'متحف التراث'], src: artisanSoukImg }
];

export const CATEGORY_IMAGES: Record<string, string> = {
  prayer: historicMosqueImg,
  cafe: heritageCafeImg,
  dining: traditionalDiningImg,
  shopping: artisanSoukImg,
  heritage: alulaTombImg,
  experience: artisanSoukImg
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

