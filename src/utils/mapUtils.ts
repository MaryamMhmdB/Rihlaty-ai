export function cleanPlaceName(text: string): string {
  if (!text) return '';
  let s = text.trim();

  // Remove common action/activity verbs & prefixes
  s = s.replace(/^(زيارة|جولة في|جولة|تذوق|استكشاف|وجبة|تناول الغداء في|تناول العشاء في|الغداء في|العشاء في|تجربة|صلاة (الظهر|العصر|المغرب|العشاء|الفجر) (في|بـ|في جامع|في مسجد)?|Visit|Tour of|Tour|Explore|Taste|Lunch at|Dinner at|Experience|Prayer at)\s+/gi, '');

  // Remove emojis & symbols
  s = s.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}♿📍🕌⏱️☕🍽️🏛️🛍️]/gu, '');

  // Replace dashes, pipes with commas
  s = s.replace(/\s*[\u2014\u2013\-\|/]+\s*/g, '، ');

  // Cut off extra concatenated landmarks joined by " و " or " and "
  if (/\s+و(سوق|متحف|جبل|بيت|حديقة|منتزه|قرية|قلعة|حصن|شاطئ|وادي|كورنيش|برج)\s+/i.test(s)) {
    s = s.split(/\s+و(سوق|متحف|جبل|بيت|حديقة|منتزه|قرية|قلعة|حصن|شاطئ|وادي|كورنيش|برج)\s+/i)[0];
  } else if (/\s+and\s+(a\s+|the\s+)?(market|museum|mountain|fort|park|beach|valley|tower)\s+/i.test(s)) {
    s = s.split(/\s+and\s+/i)[0];
  }

  // Remove trailing or extra spaces/commas
  s = s.replace(/,\s*,/g, ',').replace(/،\s*،/g, '،').replace(/\s+/g, ' ').trim();

  return s;
}

export function getCleanMapQuery(location: string, title?: string, destinationName?: string): string {
  const city = (destinationName || '').trim();

  // Clean title & location
  const cleanTitle = cleanPlaceName(title || '');
  const cleanLoc = cleanPlaceName(location || '');

  // Determine the primary place name
  let primaryPlace = '';

  // If title is specific and not generic (e.g. "قصر المصمك" or "Masmak Fortress")
  if (
    cleanTitle &&
    cleanTitle.length > 2 &&
    !/^(الغداء|العشاء|الإفطار|الصلاة|جولة|رحلة|Lunch|Dinner|Breakfast|Prayer|Tour)$/i.test(cleanTitle)
  ) {
    primaryPlace = cleanTitle;
  } else if (cleanLoc) {
    primaryPlace = cleanLoc;
  } else {
    primaryPlace = cleanTitle || city;
  }

  // If primaryPlace contains multiple comma-separated parts (e.g. "حي الديرة، وسط الرياض، قصر المصمك")
  // Extract the most specific landmark segment
  if (primaryPlace.includes('،') || primaryPlace.includes(',')) {
    const segments = primaryPlace.split(/[،,]/).map((s) => s.trim()).filter(Boolean);

    // Find segment that is NOT a neighborhood description and NOT the city name
    const landmarkSegment = segments.find((seg) => {
      const lower = seg.toLowerCase();
      if (
        lower.startsWith('حي ') ||
        lower.startsWith('وسط ') ||
        lower.startsWith('منطقة ') ||
        lower.startsWith('مركز ') ||
        lower.startsWith('شارع ') ||
        lower.startsWith('طريق ')
      )
        return false;
      if (
        lower.startsWith('district ') ||
        lower.startsWith('downtown ') ||
        lower.startsWith('area ') ||
        lower.startsWith('street ') ||
        lower.startsWith('road ')
      )
        return false;
      if (city && lower === city.toLowerCase()) return false;
      return true;
    });

    if (landmarkSegment) {
      primaryPlace = landmarkSegment;
    } else if (segments.length > 0) {
      primaryPlace = segments.find((s) => !city || s.toLowerCase() !== city.toLowerCase()) || segments[0];
    }
  }

  // Clean up any remaining city occurrences inside primaryPlace so we don't repeat city twice
  if (city) {
    const cityRegex = new RegExp(`^${city}\\s+|\\s+${city}$`, 'gi');
    primaryPlace = primaryPlace.replace(cityRegex, '').trim();
  }

  // Final assembly: landmark name + city name
  // e.g. "قصر المصمك، الرياض"
  if (city && primaryPlace && !primaryPlace.toLowerCase().includes(city.toLowerCase())) {
    return `${primaryPlace}، ${city}`;
  }

  return primaryPlace || city || 'السعودية';
}

// Known dictionary of verified geographic coordinates for Saudi landmarks
export const KNOWN_LANDMARK_COORDINATES: Record<string, { lat: number; lng: number }> = {
  'المصمك': { lat: 24.6312, lng: 46.7133 },
  'masmak': { lat: 24.6312, lng: 46.7133 },
  'سوق الزل': { lat: 24.6322, lng: 46.7139 },
  'zal': { lat: 24.6322, lng: 46.7139 },
  'تركي بن عبدالله': { lat: 24.6305, lng: 46.7121 },
  'الجامع الكبير': { lat: 24.6305, lng: 46.7121 },
  'القرية النجدية': { lat: 24.6901, lng: 46.6804 },
  'najd village': { lat: 24.6901, lng: 46.6804 },
  'الطريف': { lat: 24.7335, lng: 46.5739 },
  'turaif': { lat: 24.7335, lng: 46.5739 },
  'البجيري': { lat: 24.7360, lng: 46.5760 },
  'bujairi': { lat: 24.7360, lng: 46.5760 },
  'الحجر': { lat: 26.7955, lng: 37.9550 },
  'hegra': { lat: 26.7955, lng: 37.9550 },
  'قصر الفريد': { lat: 26.7955, lng: 37.9550 },
  'جبل الفيل': { lat: 26.6811, lng: 37.9825 },
  'elephant rock': { lat: 26.6811, lng: 37.9825 },
  'البلدة القديمة بالعلا': { lat: 26.6205, lng: 37.9251 },
  'alula old town': { lat: 26.6205, lng: 37.9251 },
  'مرايا': { lat: 26.7132, lng: 37.9820 },
  'maraya': { lat: 26.7132, lng: 37.9820 },
  'بيت نصيف': { lat: 21.4858, lng: 39.1873 },
  'nassif': { lat: 21.4858, lng: 39.1873 },
  'البلد': { lat: 21.4858, lng: 39.1873 },
  'al-balad': { lat: 21.4858, lng: 39.1873 },
  'سوق العلوي': { lat: 21.4865, lng: 39.1880 },
  'الشافعي': { lat: 21.4862, lng: 39.1868 },
  'مسجد الرحمة': { lat: 21.6380, lng: 39.1080 },
  'المسجد العائم': { lat: 21.6380, lng: 39.1080 },
  'رجال ألمع': { lat: 18.2167, lng: 42.2500 },
  'rijal almaa': { lat: 18.2167, lng: 42.2500 },
  'الجبل الأخضر': { lat: 18.2164, lng: 42.5053 },
  'green mountain': { lat: 18.2164, lng: 42.5053 },
  'شبرا': { lat: 21.2750, lng: 40.4100 },
  'shubra': { lat: 21.2750, lng: 40.4100 },
  'جبل القارة': { lat: 25.4140, lng: 49.6910 },
  'alqarah': { lat: 25.4140, lng: 49.6910 },
  'قصر إبراهيم': { lat: 25.3780, lng: 49.5860 },
  'ibrahim palace': { lat: 25.3780, lng: 49.5860 },
  'القيصرية': { lat: 25.3760, lng: 49.5870 },
  'qaysariya': { lat: 25.3760, lng: 49.5870 },
  'إثراء': { lat: 26.3350, lng: 50.1220 },
  'ithra': { lat: 26.3350, lng: 50.1220 },
  'القرية التراثية بالدمام': { lat: 26.4380, lng: 50.1100 },
  'برج المياه': { lat: 26.2172, lng: 50.1971 },
  'water tower': { lat: 26.2172, lng: 50.1971 },
  'قلعة تبوك': { lat: 28.3835, lng: 36.5662 },
  'tabuk castle': { lat: 28.3835, lng: 36.5662 },
  'وادي الديسة': { lat: 27.6000, lng: 36.4500 },
  'wadi al-disah': { lat: 27.6000, lng: 36.4500 },
  'عيرف': { lat: 27.5219, lng: 41.6961 },
  'aarif': { lat: 27.5219, lng: 41.6961 },
  'جبة': { lat: 28.0000, lng: 40.9000 },
  'jubbah': { lat: 28.0000, lng: 40.9000 },
  'القرية التراثية بجازان': { lat: 16.8894, lng: 42.5511 },
  'فيفاء': { lat: 17.2500, lng: 43.1000 },
  'fayfa': { lat: 17.2500, lng: 43.1000 },
  'العان': { lat: 17.4924, lng: 44.1277 },
  'al-aan': { lat: 17.4924, lng: 44.1277 },
  'آبار حمى': { lat: 17.9000, lng: 44.5000 },
  'hima': { lat: 17.9000, lng: 44.5000 },
  'سوق التمور': { lat: 26.3300, lng: 43.9800 },
  'date souk': { lat: 26.3300, lng: 43.9800 },
  'ينبع التاريخية': { lat: 24.0890, lng: 38.0630 },
  'historic yanbu': { lat: 24.0890, lng: 38.0630 },
  'سوق الليل': { lat: 24.0890, lng: 38.0630 },
  'night souk': { lat: 24.0890, lng: 38.0630 },
  'حراء': { lat: 21.4578, lng: 39.8592 },
  'hira': { lat: 21.4578, lng: 39.8592 },
  'قباء': { lat: 24.4392, lng: 39.6173 },
  'quba': { lat: 24.4392, lng: 39.6173 }
};

export function parseCoordinates(coordsInput: any): { lat: number; lng: number } | null {
  if (!coordsInput) return null;

  if (typeof coordsInput === 'object' && typeof coordsInput.lat === 'number' && typeof coordsInput.lng === 'number') {
    if (coordsInput.lat !== 0 && coordsInput.lng !== 0) {
      return { lat: coordsInput.lat, lng: coordsInput.lng };
    }
  }

  if (typeof coordsInput === 'string') {
    // Parse format "26.791° N, 37.953° E" or "26.791, 37.953"
    const matches = coordsInput.match(/(-?\d+\.\d+).*?(-?\d+\.\d+)/);
    if (matches && matches[1] && matches[2]) {
      const lat = parseFloat(matches[1]);
      const lng = parseFloat(matches[2]);
      if (!isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0) {
        return { lat, lng };
      }
    }
  }

  return null;
}

export function getGoogleMapsUrl(
  location: string,
  title?: string,
  destinationName?: string,
  coordinates?: any,
  googleMapsUrl?: string
): string {
  // 1. Direct explicit googleMapsUrl if present and valid
  if (googleMapsUrl && typeof googleMapsUrl === 'string' && googleMapsUrl.startsWith('http')) {
    return googleMapsUrl;
  }

  // 2. Exact coordinates object / string passed directly
  const parsedCoords = parseCoordinates(coordinates);
  if (parsedCoords) {
    return `https://www.google.com/maps?q=${parsedCoords.lat},${parsedCoords.lng}`;
  }

  // 3. Search landmark coordinate dictionary
  const fullText = ((title || '') + ' ' + (location || '')).toLowerCase();
  for (const [key, coords] of Object.entries(KNOWN_LANDMARK_COORDINATES)) {
    if (fullText.includes(key.toLowerCase())) {
      return `https://www.google.com/maps?q=${coords.lat},${coords.lng}`;
    }
  }

  // 4. Clean Query for direct place URL
  const query = getCleanMapQuery(location, title, destinationName);
  return `https://www.google.com/maps/place/${encodeURIComponent(query)}`;
}
