import express from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Security Middleware: Hide Express server signature
app.disable("x-powered-by");

// Security Headers Middleware
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=*, microphone=*, geolocation=*");
  next();
});

// Explicit Static Images & Public Folder Routing
app.use("/images", express.static(path.join(process.cwd(), "public", "images"), {
  maxAge: "1d",
  etag: true
}));
app.use(express.static(path.join(process.cwd(), "public")));

app.use(express.json({ limit: "10mb" }));

// Initialize Gemini Client safely
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// Robust Gemini execution helper with automatic model fallback for 429 quota/rate-limits
async function generateContentWithFallback(ai: GoogleGenAI, requestOptions: { contents: any; config?: any }) {
  const modelCandidates = [
    "gemini-3.6-flash",
    "gemini-flash-latest",
    "gemini-3.1-flash-lite"
  ];

  let lastError: any = null;

  for (const model of modelCandidates) {
    try {
      const response = await ai.models.generateContent({
        ...requestOptions,
        model,
      });

      if (response && response.text) {
        return response;
      }
    } catch (err: any) {
      lastError = err;
      const errorMsg = err?.message || String(err);
      const isQuotaOrRateLimit = err?.status === 429 || errorMsg.includes("429") || errorMsg.includes("quota") || errorMsg.includes("RESOURCE_EXHAUSTED");

      if (isQuotaOrRateLimit) {
        console.warn(`[Gemini API] Model '${model}' quota/rate-limit hit (429). Trying next candidate...`);
      } else {
        console.warn(`[Gemini API] Model '${model}' call failed (${errorMsg}). Trying next candidate...`);
      }
    }
  }

  throw lastError;
}

// API: Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", app: "Rihlaty AI", time: new Date().toISOString() });
});

// API: Prayer Times
app.get("/api/prayer-times", (req, res) => {
  const city = (req.query.city as string || "riyadh").toLowerCase();
  
  const cityDataMap: Record<string, any> = {
    alula: { city: "العلا", fajr: "04:30", dhuhr: "12:30", asr: "15:55", maghrib: "19:02", isha: "20:32" },
    diriyah: { city: "الدرعية", fajr: "04:05", dhuhr: "12:00", asr: "15:28", maghrib: "18:34", isha: "20:04" },
    jeddah: { city: "جدة التاريخية", fajr: "04:37", dhuhr: "12:27", asr: "15:47", maghrib: "18:55", isha: "20:25" },
    riyadh: { city: "الرياض", fajr: "04:05", dhuhr: "12:00", asr: "15:28", maghrib: "18:34", isha: "20:04" },
    abha: { city: "أبها", fajr: "04:38", dhuhr: "12:20", asr: "15:36", maghrib: "18:43", isha: "20:13" },
    taif: { city: "الطائف", fajr: "04:34", dhuhr: "12:24", asr: "15:44", maghrib: "18:52", isha: "20:22" },
    alahsa: { city: "الأحساء", fajr: "03:52", dhuhr: "11:48", asr: "15:16", maghrib: "18:22", isha: "19:52" },
    makkah: { city: "مكة المكرمة", fajr: "04:35", dhuhr: "12:25", asr: "15:45", maghrib: "18:53", isha: "20:23" },
    madinah: { city: "المدينة المنورة", fajr: "04:31", dhuhr: "12:26", asr: "15:52", maghrib: "18:58", isha: "20:28" }
  };

  const selected = cityDataMap[city] || cityDataMap["riyadh"];
  res.json(selected);
});

// Helper to get city details for itinerary generation
function getCityData(dest: string) {
  const d = (dest || "الرياض").trim();
  const lower = d.toLowerCase();

  if (lower.includes("قطيف") || lower.includes("qatif")) {
    return { nameAr: "القطيف والدمام", nameEn: "Qatif & Dammam", dhuhr: "11:47", asr: "15:15", maghrib: "18:21", temp: "39°C", tempNum: 39, lat: 26.5614, lng: 50.0270 };
  }
  if (lower.includes("دمام") || lower.includes("dammam")) {
    return { nameAr: "الدمام", nameEn: "Dammam", dhuhr: "11:47", asr: "15:15", maghrib: "18:21", temp: "39°C", tempNum: 39, lat: 26.4380, lng: 50.1100 };
  }
  if (lower.includes("خبر") || lower.includes("khobar")) {
    return { nameAr: "الخبر", nameEn: "Khobar", dhuhr: "11:46", asr: "15:14", maghrib: "18:20", temp: "38°C", tempNum: 38, lat: 26.2172, lng: 50.1971 };
  }
  if (lower.includes("ظهران") || lower.includes("dhahran")) {
    return { nameAr: "الظهران", nameEn: "Dhahran", dhuhr: "11:47", asr: "15:15", maghrib: "18:21", temp: "38°C", tempNum: 38, lat: 26.3350, lng: 50.1220 };
  }
  if (lower.includes("تبوك") || lower.includes("tabuk")) {
    return { nameAr: "تبوك", nameEn: "Tabuk", dhuhr: "12:35", asr: "16:05", maghrib: "19:10", temp: "33°C", tempNum: 33, lat: 28.3835, lng: 36.5662 };
  }
  if (lower.includes("حائل") || lower.includes("حايل") || lower.includes("hail")) {
    return { nameAr: "حائل", nameEn: "Hail", dhuhr: "12:12", asr: "15:42", maghrib: "18:48", temp: "35°C", tempNum: 35, lat: 27.5219, lng: 41.6961 };
  }
  if (lower.includes("جازان") || lower.includes("جيزان") || lower.includes("jazan") || lower.includes("jizan")) {
    return { nameAr: "جازان", nameEn: "Jazan", dhuhr: "12:15", asr: "15:32", maghrib: "18:38", temp: "37°C", tempNum: 37, lat: 16.8894, lng: 42.5511 };
  }
  if (lower.includes("نجران") || lower.includes("najran")) {
    return { nameAr: "نجران", nameEn: "Najran", dhuhr: "12:08", asr: "15:26", maghrib: "18:30", temp: "36°C", tempNum: 36, lat: 17.4924, lng: 44.1277 };
  }
  if (lower.includes("قصيم") || lower.includes("بريدة") || lower.includes("عنيزة") || lower.includes("qassim") || lower.includes("buraidah")) {
    return { nameAr: "القصيم (بريدة)", nameEn: "Qassim (Buraidah)", dhuhr: "12:06", asr: "15:35", maghrib: "18:40", temp: "40°C", tempNum: 40, lat: 26.3300, lng: 43.9800 };
  }
  if (lower.includes("ينبع") || lower.includes("yanbu")) {
    return { nameAr: "ينبع", nameEn: "Yanbu", dhuhr: "12:31", asr: "15:53", maghrib: "18:59", temp: "35°C", tempNum: 35, lat: 24.0890, lng: 38.0630 };
  }
  if (lower.includes("جبيل") || lower.includes("jubail")) {
    return { nameAr: "الجبيل", nameEn: "Jubail", dhuhr: "11:48", asr: "15:18", maghrib: "18:22", temp: "38°C", tempNum: 38, lat: 27.0049, lng: 49.6583 };
  }
  if (lower.includes("باحة") || lower.includes("baha")) {
    return { nameAr: "الباحة", nameEn: "Al Baha", dhuhr: "12:21", asr: "15:39", maghrib: "18:45", temp: "27°C", tempNum: 27, lat: 19.8297, lng: 41.4646 };
  }
  if (lower.includes("مكة") || lower.includes("makkah") || lower.includes("mecca")) {
    return { nameAr: "مكة المكرمة", nameEn: "Makkah", dhuhr: "12:25", asr: "15:45", maghrib: "18:53", temp: "38°C", tempNum: 38, lat: 21.4225, lng: 39.8262 };
  }
  if (lower.includes("مدينة") || lower.includes("madinah") || lower.includes("medina")) {
    return { nameAr: "المدينة المنورة", nameEn: "Madinah", dhuhr: "12:26", asr: "15:52", maghrib: "18:58", temp: "40°C", tempNum: 40, lat: 24.4672, lng: 39.6112 };
  }
  if (lower.includes("جدة") || lower.includes("jeddah") || lower.includes("بلد")) {
    return { nameAr: "جدة التاريخية", nameEn: "Historic Jeddah", dhuhr: "12:27", asr: "15:47", maghrib: "18:55", temp: "34°C", tempNum: 34, lat: 21.4858, lng: 39.1873 };
  }
  if (lower.includes("علا") || lower.includes("alula")) {
    return { nameAr: "العلا", nameEn: "AlUla", dhuhr: "12:30", asr: "15:55", maghrib: "19:02", temp: "37°C", tempNum: 37, lat: 26.6205, lng: 37.9251 };
  }
  if (lower.includes("أبها") || lower.includes("abha")) {
    return { nameAr: "أبها", nameEn: "Abha", dhuhr: "12:20", asr: "15:36", maghrib: "18:43", temp: "25°C", tempNum: 25, lat: 18.2164, lng: 42.5053 };
  }
  if (lower.includes("طائف") || lower.includes("taif")) {
    return { nameAr: "الطائف", nameEn: "Taif", dhuhr: "12:24", asr: "15:44", maghrib: "18:52", temp: "33°C", tempNum: 33, lat: 21.2750, lng: 40.4100 };
  }
  if (lower.includes("أحساء") || lower.includes("احساء") || lower.includes("ahsa")) {
    return { nameAr: "الأحساء", nameEn: "Al-Ahsa", dhuhr: "11:48", asr: "15:16", maghrib: "18:22", temp: "42°C", tempNum: 42, lat: 25.3780, lng: 49.5860 };
  }
  if (lower.includes("درعية") || lower.includes("diriyah")) {
    return { nameAr: "الدرعية", nameEn: "Diriyah", dhuhr: "12:00", asr: "15:28", maghrib: "18:34", temp: "41°C", tempNum: 41, lat: 24.7335, lng: 46.5739 };
  }
  if (lower.includes("رياض") || lower.includes("riyadh")) {
    return { nameAr: "الرياض", nameEn: "Riyadh", dhuhr: "12:00", asr: "15:28", maghrib: "18:34", temp: "41°C", tempNum: 41, lat: 24.6312, lng: 46.7133 };
  }

  // DYNAMIC FALLBACK FOR ANY OTHER UNLISTED CITY/TOWN TYPED BY USER!
  const formattedEn = d.charAt(0).toUpperCase() + d.slice(1);
  return {
    nameAr: d,
    nameEn: formattedEn,
    dhuhr: "12:10",
    asr: "15:35",
    maghrib: "18:40",
    temp: "36°C",
    tempNum: 36,
    lat: 24.6312,
    lng: 46.7133
  };
}

// API: Generate Itinerary with Gemini
app.post("/api/generate-itinerary", async (req, res) => {
  const { destination, duration, mobility, budget, interests, preferences, date, time, notes, lang } = req.body;

  const isArabic = lang !== "en";
  const cityData = getCityData(destination);
  const ai = getGeminiClient();

  if (ai) {
    try {
      const prompt = `
Act as a world-class Saudi Arabian heritage tourism expert and AI travel architect for "Rihlaty AI" (رحلتي).
Create a highly accurate, step-by-step personalized itinerary for a trip to "${destination || cityData.nameAr}".

Destination Verified Real-Time Context:
- City: ${cityData.nameEn} (${cityData.nameAr})
- Official Dhuhr Prayer Time: ${cityData.dhuhr}
- Official Asr Prayer Time: ${cityData.asr}
- Official Maghrib Prayer Time: ${cityData.maghrib}
- Official Temperature: ${cityData.temp}

Constraints & Preferences:
- Available Time: ${duration || '5h'}
- Mobility Needs: ${mobility || 'none'}
- Budget Level: ${budget || 'medium'} (economic = popular street & traditional dining, budget-friendly/free heritage spots; medium = balanced popular dining & key attractions; luxury = fine dining, upscale heritage venues & premium experiences)
- User Interests: ${Array.isArray(interests) ? interests.join(', ') : 'التاريخ والتراث'}
- User Preferences: ${Array.isArray(preferences) ? preferences.join(', ') : 'أماكن هادئة'}
- Date & Start Time: ${date || '2026-08-08'} at ${time || '09:00'}
- Additional Notes: ${notes || 'None'}

CRITICAL DURATION & MULTI-DAY RULES:
1. SINGLE-DAY vs MULTI-DAY ITINERARY STRUCTURE:
   - If Available Time is specified in hours (e.g., "3 ساعات", "5 ساعات", "3 hours", "5 Hours") or "يوم كامل" / "1 Day", you MUST generate a SINGLE-DAY plan where EVERY item has "dayNumber": 1. Do NOT generate multiple days!
   - If Available Time explicitly specifies multiple days (e.g., "2 يومان", "3 أيام", "5 Days", "Multiple Days"), you MUST generate a day-by-day plan covering all requested days (dayNumber: 1, 2, 3...).
   - For single-day trips of 3 hours ("3 ساعات"), generate ONLY 3 concise, high-value stops (e.g., heritage landmark + cafe + prayer/meal) fitting within 3 hours.
   - ABSOLUTELY ZERO REPETITION ACROSS DAYS for multi-day plans: Day 1, Day 2, Day 3, etc., MUST feature COMPLETELY DIFFERENT real landmarks, museums, markets, cafes, and dining spots in the selected city.
   - NEVER repeat the exact same attraction, restaurant, or routine on multiple days. Every day must be a distinct, fresh exploration.

2. REAL & VERIFIABLE LOCATIONS ONLY:
   - ALL LOCATIONS MUST BE SPECIFIC REAL-WORLD LANDMARKS, ATTRACTIONS, CAFES, RESTAURANTS AND MOSQUES IN ${cityData.nameAr} / ${cityData.nameEn}.
   - ABSOLUTELY NEVER INVENT OR HALLUCINATE PLACES (no "Central Heritage Park", "City Museum", "Main Square").
   - EVERY location MUST belong strictly to ${cityData.nameAr} / ${cityData.nameEn}.
   - NEVER borrow attractions from other cities (e.g., NEVER put Riyadh's Masmak in Dammam, or Jeddah's Balad in Abha).
   - "locationAr" and "locationEn" MUST contain ONLY the exact landmark name and location/city (e.g., "قصر المصمك، الرياض" or "منطقة البلد، جدة"). NEVER put the activity title, trip title, or verbs inside locationAr or locationEn.
   - Real Examples by city:
     * Riyadh: قصر المصمك، سوق الزل بالديرة، جامع الإمام تركي بن عبدالله، مطعم القرية النجدية، حي الطريف بآل بجيري بالدرعية، المتحف الوطني، بوليفارد سيتي.
     * Jeddah: منطقة البلد التاريخية، بيت نصيف، جامع الشافعي، مطعم السدّة، كورنيش جدة والمسجد العائم (مسجد الرحمة)، فقيه أكواريوم.
     * AlUla: موقع الحجر الأثري (مدائن صالح)، البلدة القديمة بالعلا، جبل الفيل، دادان، جبل إثلب، مطعم سهيل.
     * Diriyah: حي الطريف التاريخي، مطل البجيري، وادي حنيفة، مطعم الهنيبل أو سهيل.
     * Abha: قرية رجال ألمع التراثية، حي النصب التاريخي، جامع الملك فهد بأبها، ممشى الضباب، الجبل الأخضر.
     * Taif: قصر شبرا، سوق الطائف القديم، مزارع الورد الطائفي بالهدا، تلفريك الهدا، جامع ابن عباس.
     * Al-Ahsa: قصر إبراهيم، سوق القيصرية، جبل القارة، واحة الأحساء، مسجد جواثى.
     * Dammam: واجهة كورنيش الدمام، القرية التراثية بالدمام، جزيرة المرجان، مركز إثراء.
     * Khobar: واجهة كورنيش الخبر، برج المياه، ممشى أجدان ووك، شاطئ نصف القمر.
     * Tabuk: قلعة تبوك التاريخية، عين السكر، سوق الطواحين، مسجد التوبة، وادي الديسة.
     * Hail: قلعة عيرف، قصر القشلة، سوق برزان، نقوش جبة (أم سنمان).
     * Jazan: القرية التراثية بجازان، الكورنيش الشمالي، جبال فيفاء، جامع جازان الكبير.
     * Najran: قصر العان الطيني، قصر الإمارة التاريخي، آبار حمى، موقع الأخدود الأثري.
     * Qassim/Buraidah: سوق العقيلات، برج بريدة، سوق التمور، برج عنيزة.
     * Yanbu: منطقة ينبع التاريخية، سوق الليل، كورنيش ينبع البحر، مسجد البحر.

2. PRAYER SYNCHRONIZATION:
   - Include a dedicated prayer pause item with category "prayer".
   - The time MUST match ${cityData.nameEn} local prayer time (Dhuhr Prayer at ${cityData.dhuhr}, Asr at ${cityData.asr}, or Maghrib at ${cityData.maghrib}).

3. WEATHER, ACCESSIBILITY & MAP COORDINATES:
   - Weather temperature in all activities MUST match ${cityData.temp}.
   - Address mobility needs strictly (if wheelchair user or limited walking, choose flat paved surfaces, step-free access, ramps).
   - EXACT REAL GEOGRAPHIC COORDINATES ARE MANDATORY: Every item MUST include exact, real, verified geographic coordinates for ${cityData.nameAr} in Saudi Arabia in the coordinates field with lat and lng numbers. Do NOT use fake or zero coordinates.

Return ONLY a JSON object matching this schema:
{
  "id": "generated-id",
  "destinationNameAr": "${cityData.nameAr}",
  "destinationNameEn": "${cityData.nameEn}",
  "durationAr": "${duration || '5 ساعات'}",
  "durationEn": "${duration || '5 Hours'}",
  "date": "${date || '2026-08-08'}",
  "totalDistance": "4.5 كم",
  "totalDistanceAr": "4.5 كم",
  "totalDistanceEn": "4.5 km",
  "accessibilityScore": 95,
  "summaryAr": "ملخص باللغة العربية للرحلة",
  "summaryEn": "English summary of the trip",
  "items": [
    {
      "id": "1",
      "time": "09:00",
      "titleAr": "عنوان النشاط الدقيق",
      "titleEn": "Specific Activity Title",
      "locationAr": "اسم المكان الواقعي الدقيق جداً بـ ${cityData.nameAr}",
      "locationEn": "Specific Real Location Name in ${cityData.nameEn}",
      "coordinates": { "lat": 24.6312, "lng": 46.7133 },
      "distanceAr": "800 متر",
      "distanceEn": "800 meters",
      "travelTimeAr": "10 دقائق",
      "travelTimeEn": "10 mins",
      "mobilityNoteAr": "توضيح إمكانية الوصول",
      "mobilityNoteEn": "Mobility note in English",
      "isWheelchairAccessible": true,
      "isPrayerTime": false,
      "prayerNameAr": "صلاة الظهر (${cityData.dhuhr})",
      "prayerNameEn": "Dhuhr Prayer (${cityData.dhuhr})",
      "temperature": "${cityData.temp}",
      "weatherIcon": "☀️",
      "crowdLevelAr": "منخفض",
      "crowdLevelEn": "Low",
      "crowdStatus": "low",
      "category": "heritage",
      "aiRationaleAr": "سبب التنسيق",
      "aiRationaleEn": "AI rationale in English",
      "sourceAr": "المصدر: هيئة التراث",
      "sourceEn": "Source: Saudi Heritage Authority"
    }
  ]
}
`;

      const response = await generateContentWithFallback(ai, {
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          systemInstruction: "You are Rihlaty AI, an elite Saudi tourism planner specializing in 100% geographically accurate, real-world, accessible, prayer-synchronized itineraries in Saudi Arabia."
        }
      });

      if (response.text) {
        const json = JSON.parse(response.text);
        const cleaned = validateAndCleanItinerary(json, cityData, duration);
        return res.json({ success: true, data: cleaned });
      }
    } catch (error) {
      console.error("Gemini itinerary generation error:", error);
    }
  }

  // Fallback intelligent itinerary generation when API key isn't provided or fails
  const mockItinerary = generateFallbackItinerary(destination, duration, mobility, isArabic, budget);
  res.json({ success: true, data: mockItinerary, isFallback: true });
});

function getLogicalWeatherIcon(cityName: string, timeStr: string): string {
  const c = (cityName || '').toLowerCase();
  const hour = parseInt((timeStr || '12:00').split(':')[0], 10);
  
  if (hour >= 20 || hour < 6) return '🌙';
  if (hour >= 6 && hour < 10) return '🌅';
  if (hour >= 17 && hour < 20) return '🌇';

  if (c.includes('طائف') || c.includes('taif')) return '🌤️';
  if (c.includes('أبها') || c.includes('abha') || c.includes('عسير') || c.includes('باحة')) return '⛅';
  if (c.includes('جدة') || c.includes('jeddah') || c.includes('دمام') || c.includes('dammam') || c.includes('خبر') || c.includes('khobar') || c.includes('ينبع') || c.includes('yanbu') || c.includes('جازان')) return '🌤️';
  
  return '☀️';
}

// Helper to sanitize & validate generated itinerary
function validateAndCleanItinerary(json: any, cityData: any, requestedDuration: string = '') {
  if (!json || typeof json !== 'object') return json;

  json.destinationNameAr = cityData.nameAr;
  json.destinationNameEn = cityData.nameEn;

  const isMultiDay = requestedDuration && (
    requestedDuration.includes("أيام") || 
    requestedDuration.includes("يومان") || 
    requestedDuration.includes("أكثر من يوم") || 
    requestedDuration.includes("days") || 
    requestedDuration.includes("Days") || 
    requestedDuration.includes("Multiple")
  );

  if (Array.isArray(json.items)) {
    json.items = json.items.map((item: any) => {
      let locAr = (item.locationAr || item.titleAr || cityData.nameAr).replace(/\s*[\u2014\u2013\-\|]+\s*/g, '، ').trim();
      let locEn = (item.locationEn || item.titleEn || cityData.nameEn).replace(/\s*[\u2014\u2013\-\|]+\s*/g, ', ').trim();

      // Enforce dayNumber = 1 if user requested hours/single day
      let dayNumber = item.dayNumber || 1;
      if (!isMultiDay) {
        dayNumber = 1;
      }

      // Clean prefix from time if single day
      let itemTime = item.time || "09:00";
      if (!isMultiDay && typeof itemTime === 'string') {
        itemTime = itemTime.replace(/^\[.*?\]\s*/g, '').trim();
      }

      // Ensure city name is part of location if missing
      if (!locAr.includes(cityData.nameAr)) {
        locAr = `${locAr}، ${cityData.nameAr}`;
      }
      if (!locEn.toLowerCase().includes(cityData.nameEn.toLowerCase())) {
        locEn = `${locEn}, ${cityData.nameEn}`;
      }

      let itemCoords = item.coordinates;
      if (
        !itemCoords ||
        typeof itemCoords.lat !== 'number' ||
        typeof itemCoords.lng !== 'number' ||
        (itemCoords.lat === 0 && itemCoords.lng === 0)
      ) {
        itemCoords = { lat: cityData.lat, lng: cityData.lng };
      }

      // Enforce logical weather emojis
      const nonWeatherIcons = ['☕', '🕌', '🍽️', '🏛️', '🛍️', '🚗', '♿', '📍', '⭐', '🗺️', '🏰', '📷', '🕋', '🌹', '🌴', '🏔️', '⛰️'];
      let wIcon = item.weatherIcon;
      if (!wIcon || nonWeatherIcons.includes(wIcon)) {
        wIcon = getLogicalWeatherIcon(cityData.nameAr, itemTime);
      }

      if (item.isPrayerTime || item.category === "prayer") {
        const hour = parseInt((itemTime || "12:00").split(":")[0], 10);
        let pNameAr = `صلاة الظهر (${cityData.dhuhr})`;
        let pNameEn = `Dhuhr Prayer (${cityData.dhuhr})`;
        if (hour >= 15 && hour < 17) {
          pNameAr = `صلاة العصر (${cityData.asr})`;
          pNameEn = `Asr Prayer (${cityData.asr})`;
        } else if (hour >= 17) {
          pNameAr = `صلاة المغرب (${cityData.maghrib})`;
          pNameEn = `Maghrib Prayer (${cityData.maghrib})`;
        }

        return {
          ...item,
          dayNumber,
          time: itemTime,
          isPrayerTime: true,
          category: "prayer",
          locationAr: locAr,
          locationEn: locEn,
          coordinates: itemCoords,
          prayerNameAr: item.prayerNameAr || pNameAr,
          prayerNameEn: item.prayerNameEn || pNameEn,
          temperature: cityData.temp,
          weatherIcon: wIcon
        };
      }

      return {
        ...item,
        dayNumber,
        time: itemTime,
        locationAr: locAr,
        locationEn: locEn,
        coordinates: itemCoords,
        temperature: item.temperature || cityData.temp,
        weatherIcon: wIcon
      };
    });
  }

  return json;
}

// API: Analyze Heritage Landmark Image with Gemini
app.post("/api/analyze-image", async (req, res) => {
  const { imageBase64, prompt, lang } = req.body;
  const isArabic = lang !== "en";
  const ai = getGeminiClient();

  if (ai && imageBase64) {
    try {
      let mimeType = "image/jpeg";
      const mimeMatch = imageBase64.match(/^data:(image\/\w+);base64,/);
      if (mimeMatch && mimeMatch[1]) {
        mimeType = mimeMatch[1];
      }
      const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");
      
      const response = await generateContentWithFallback(ai, {
        contents: {
          parts: [
            {
              inlineData: {
                mimeType: mimeType,
                data: cleanBase64,
              },
            },
            {
              text: `Analyze this image of a landmark, historical place, architectural site, traditional restaurant/dish, or heritage item in Saudi Arabia. 
Identify what it is, its historical context, cultural significance, and nearby recommendations.
Provide responses in both Arabic and English JSON format with fields:
{
  "titleAr": "اسم المعلم بالعربية",
  "titleEn": "Landmark Name in English",
  "locationAr": "الموقع في السعودية",
  "locationEn": "Location in Saudi Arabia",
  "historicalInfoAr": "نبذة تاريخية مفصلة والمعلومات الثقافية",
  "historicalInfoEn": "Detailed historical and cultural context",
  "culturalImportanceAr": "الأهمية الثقافية للتراث السعودي",
  "culturalImportanceEn": "Cultural importance to Saudi heritage",
  "nearbyPlacesAr": ["مكان قريب 1", "مكان قريب 2"],
  "nearbyPlacesEn": ["Nearby Place 1", "Nearby Place 2"],
  "sourceAr": "المصدر: هيئة التراث / وزارة الثقافة",
  "sourceEn": "Source: Saudi Heritage Authority / Ministry of Culture"
}`
            }
          ]
        },
        config: {
          responseMimeType: "application/json"
        }
      });

      if (response.text) {
        const json = JSON.parse(response.text);
        return res.json({ success: true, data: json });
      }
    } catch (err) {
      console.error("Gemini image analysis error:", err);
    }
  }

  // Fallback Image Analysis
  const fallbackAnalysis = {
    titleAr: "مقبرة قصر الفريد — الحِجر (العلا)",
    titleEn: "Qasr al-Farid — Hegra (AlUla)",
    locationAr: "العلا، المملكة العربية السعودية",
    locationEn: "AlUla, Kingdom of Saudi Arabia",
    historicalInfoAr: "أحد أشهر المقابر النبطية المنحوتة في الصخر بعناية فائقة، ويعود تاريخها إلى القرن الأول الميلادي. وتتميز بجمال واجهتها المنحوتة من صخرة واحدة منفردة.",
    historicalInfoEn: "One of the most iconic Nabataean tombs carved directly into monolithic sandstone, dating back to the 1st Century AD.",
    culturalImportanceAr: "تعد أول موقع سعودي يتم إدراجه في قائمة التراث العالمي لليونسكو (2008)، وتجسد المهارة الهندسية للأنباط وامتزاج الفنون العريقة.",
    culturalImportanceEn: "First UNESCO World Heritage Site in Saudi Arabia (2008), exemplifying ancient Nabataean engineering mastery.",
    nearbyPlacesAr: ["جبل إثلب وممر الديوان", "جبل الفيل", "البلدة القديمة بالعلا", "واحة العلا التاريخية"],
    nearbyPlacesEn: ["Jabal Ithlib & Diwan", "Elephant Rock", "AlUla Old Town", "AlUla Oasis"],
    sourceAr: "المصدر: الهيئة الملكية لمحافظة العلا & اليونسكو",
    sourceEn: "Source: Royal Commission for AlUla & UNESCO"
  };

  res.json({ success: true, data: fallbackAnalysis, isFallback: true });
});

// Helper for generating custom fallback itinerary based on inputs with unique items per day
function getCityDayItems(cityName: string, day: number, cityData: any, isWheelchair: boolean) {
  const lower = cityName.toLowerCase();

  let dayPlan: {
    l1Ar: string; l1En: string;
    cAr: string; cEn: string;
    mAr: string; mEn: string;
    dAr: string; dEn: string;
    l5Ar: string; l5En: string;
    t1Ar?: string; t1En?: string;
    t5Ar?: string; t5En?: string;
  };

  if (lower.includes("رياض") || lower.includes("riyadh")) {
    if (day === 1) {
      dayPlan = {
        l1Ar: "قصر المصمك وسوق الزل بالديرة", l1En: "Al-Masmak Fortress & Souk Al-Zal in Deera",
        cAr: "مقهى كفة وديرة للتراث بالديرة", cEn: "Deera Heritage & Kaffa Cafe",
        mAr: "جامع الإمام تركي بن عبدالله بالديرة", mEn: "Imam Turki bin Abdullah Grand Mosque",
        dAr: "مطعم القرية النجدية بالديرة", dEn: "Najd Village Heritage Restaurant",
        l5Ar: "المتحف الوطني السعودي وقصر المربع", l5En: "National Museum & Al-Murabba Palace",
        t1Ar: "جولة المعالم والأسواق التراثية القديمة", t1En: "Old Heritage Landmarks & Souk Tour",
        t5Ar: "استكشاف المتحف الوطني والقصر التاريخي", t5En: "National Museum & Royal Heritage Walk"
      };
    } else if (day === 2) {
      dayPlan = {
        l1Ar: "حي الطريف التاريخي بآل بجيري بالدرعية (يونسكو)", l1En: "At-Turaif UNESCO Heritage Site in Diriyah",
        cAr: "مقهى مطل البجيري بالدرعية", cEn: "Al-Bujairi Promenade Cafe",
        mAr: "جامع الإمام محمد بن عبدالوهاب بالدرعية", mEn: "Diriyah Imam Grand Mosque",
        dAr: "مطعم سهيل للضيافة النجدية بالدرعية", dEn: "Suhail Diriyah Heritage Restaurant",
        l5Ar: "منتزه وادي حنيفة ومطلات الدرعية الجبلية", l5En: "Wadi Hanifa Park & Diriyah Lookouts",
        t1Ar: "جولة جوهرة المملكة التراثية بالدرعية", t1En: "Diriyah Heritage Jewel Exploration",
        t5Ar: "استكشاف طبيعة وادي حنيفة والمطلات", t5En: "Wadi Hanifa Nature & Promenade Walk"
      };
    } else if (day === 3) {
      dayPlan = {
        l1Ar: "منطقة بوليفارد سيتي والممشى الحديث", l1En: "Boulevard City & Modern Promenade",
        cAr: "مقهى باحة بوليفارد للقهوة المختصة", cEn: "Boulevard Oasis Specialty Cafe",
        mAr: "جامع الراجحي الكبير بالرياض", mEn: "Al-Rajhi Grand Mosque in Riyadh",
        dAr: "مطعم الرومانسية للمأكولات النجدية الأصيلة", dEn: "Al-Romainsiah Traditional Restaurant",
        l5Ar: "واجهة الرياض الثقافية وسوق المتاجر", l5En: "Riyadh Front Cultural Promenade",
        t1Ar: "جولة التجربة المعاصرة والترفيه", t1En: "Modern City Exploration & Cultural Front",
        t5Ar: "تسوق معروضات التراث والمتاجر الثقافية", t5En: "Cultural Shopping & Promenade Walk"
      };
    } else if (day === 4) {
      dayPlan = {
        l1Ar: "منطقة قصر الحكم وسوق المقيبرة التراثي", l1En: "Qasr Al-Hokm District & Muqeibra Souk",
        cAr: "مقهى شمس التراثي بالرياض", cEn: "Shams Heritage Cafe Riyadh",
        mAr: "جامع قصر الحكم التاريخي", mEn: "Historic Qasr Al-Hokm Mosque",
        dAr: "مطعم كبسة الديرة ومأكولات التراث", dEn: "Kabsa Al-Deera Heritage Dining",
        l5Ar: "منتزه وادي نمار وشلالات نمار الطبيعية", l5En: "Wadi Namar Park & Natural Waterfalls",
        t1Ar: "جولة قلب العاصمة والأسواق التاريخية", t1En: "Capital Heart & Souk Heritage Walk",
        t5Ar: "جولة بحيرة نمار والتنزه بين الشلالات", t5En: "Wadi Namar Waterfall & Lake Stroll"
      };
    } else {
      dayPlan = {
        l1Ar: "مطل جبال طويق (حافة العالم)", l1En: "Tuwaiq Mountain Viewpoint (Edge of the World)",
        cAr: "مقهى مطلات طويق بالرياض", cEn: "Tuwaiq Lookouts Cafe",
        mAr: "جامع العلب التاريخي بالدرعية", mEn: "Historic Al-Olab Mosque Diriyah",
        dAr: "مطعم بيت عمر ومأكولات الضيافة", dEn: "Beit Omar Traditional Restaurant",
        l5Ar: "سوق أثري للتراث الشعبي وسوق الطيبين", l5En: "Al-Tayibeen Heritage Souk & Antiques",
        t1Ar: "مغامرة مطلات طويق وجبال الرياض", t1En: "Tuwaiq Escarpment Nature Sightseeing",
        t5Ar: "جولة التحف والنوادر التراثية النجدية", t5En: "Antiques & Heritage Craft Exhibition"
      };
    }
  } else if (lower.includes("جدة") || lower.includes("jeddah")) {
    if (day === 1) {
      dayPlan = {
        l1Ar: "منطقة البلد التاريخية وبيت نصيف", l1En: "Al-Balad Historic District & Naseef House",
        cAr: "مقهى كافيهات البلد التراثية", cEn: "Al-Balad Heritage Cafe",
        mAr: "جامع الشافعي التاريخي بالبلد", mEn: "Historic Al-Shafei Mosque in Al-Balad",
        dAr: "مطعم السدّة ومأكولات التراث الحجازي", dEn: "Al-Saddah Traditional Hijazi Dining",
        l5Ar: "واجهة كورنيش جدة والمسجد العائم (مسجد الرحمة)", l5En: "Jeddah Corniche & Al-Rahmah Floating Mosque",
        t1Ar: "جولة جدة التاريخية والأزقة العريقة", t1En: "Historic Al-Balad Ancient Alleyways",
        t5Ar: "استكشاف الواجهة البحرية والمسجد العائم", t5En: "Jeddah Waterfront & Floating Mosque Walk"
      };
    } else if (day === 2) {
      dayPlan = {
        l1Ar: "متحف عبد الرؤوف خليل للتراث والتاريخ", l1En: "Abdul Raouf Khalil Museum & Heritage Complex",
        cAr: "مقهى تراث الحجاز بالكورنيش الأوسط", cEn: "Mid-Corniche Hijazi Cafe",
        mAr: "جامع حسن عنقري بالكورنيش", mEn: "Hassan Anqari Mosque Corniche",
        dAr: "مطعم بلدي للمأكولات البحرية الحجازية", dEn: "Baladi Traditional Seafood Restaurant",
        l5Ar: "فقيه أكواريوم وممشى الكورنيش الأوسط", l5En: "Fakieh Aquarium & Middle Corniche Promenade",
        t1Ar: "جولة المعالم المتاحف والتاريخ الحجازي", t1En: "Hijazi Museums & Cultural Heritage Tour",
        t5Ar: "جولة الأحياء البحرية والغروب بجدة", t5En: "Aquarium Visit & Waterfront Sunset Walk"
      };
    } else if (day === 3) {
      dayPlan = {
        l1Ar: "منطقة جدة آرت بروميناد والمرسى البحري", l1En: "Jeddah Art Promenade & Marina",
        cAr: "مقهى باحة الممشى البحري بجدة", cEn: "Jeddah Promenade Coastal Cafe",
        mAr: "جامع التقوى الشاطئي", mEn: "Al-Taqwa Seaside Mosque",
        dAr: "مطعم الشامي للمأكولات البحرية والتقليدية", dEn: "Al-Shami Seafood & Traditional Restaurant",
        l5Ar: "سوق الشاطئ الشعبي والمعارض التراثية", l5En: "Al-Shati Traditional Souk & Exhibition",
        t1Ar: "جولة الفنون البحرية والمرسى الحديث", t1En: "Coastal Arts & Marina Promenade Tour",
        t5Ar: "تسوق الحرف البحرية والأسوق الشعبية", t5En: "Seaside Souk & Handicraft Exploration"
      };
    } else {
      dayPlan = {
        l1Ar: "منطقة أبحر الشمالية ومرسى اليخوت", l1En: "North Obhur Marina & Coastal Promenade",
        cAr: "مقهى جليبي للتراث الساحلي", cEn: "Coastal Heritage Cafe Obhur",
        mAr: "جامع خادم الحرمين الشريفين بجدة", mEn: "King Haramain Mosque Jeddah",
        dAr: "مطعم أسماك الثروة البحرية بأبحر", dEn: "Obhur Seafood & Fish Dining",
        l5Ar: "متحف الطيبات للعلوم والمعرفة والتراث", l5En: "Al-Tayebat City Museum for International Heritage",
        t1Ar: "جولة مرسى أبحر والشواطئ الهادئة", t1En: "Obhur Coast & Marine Promenade Tour",
        t5Ar: "جولة متحف الطيبات ومقتنيات الحضارات", t5En: "Al-Tayebat International Cultural Museum"
      };
    }
  } else if (lower.includes("علا") || lower.includes("alula")) {
    if (day === 1) {
      dayPlan = {
        l1Ar: "موقع الحجر الأثري (مدائن صالح - يونسكو)", l1En: "Hegra UNESCO World Heritage Site",
        cAr: "مقهى واحة العلا ومحمية الحجر", cEn: "AlUla Oasis Heritage Cafe",
        mAr: "مسجد البلدة القديمة بالعلا", mEn: "AlUla Old Town Mosque",
        dAr: "مطعم سهيل للضيافة بالعلا", dEn: "Suhail Heritage Restaurant AlUla",
        l5Ar: "البلدة القديمة وجبل الفيل بالعلا", l5En: "AlUla Old Town & Elephant Rock",
        t1Ar: "استكشاف مقابر النبطيين بآثار الحجر", t1En: "Nabataean Tombs & Hegra Heritage Tour",
        t5Ar: "جولة البلدة القديمة وجبل الفيل عند الغروب", t5En: "Old Town Walk & Elephant Rock Sunset"
      };
    } else if (day === 2) {
      dayPlan = {
        l1Ar: "موقع دادان الأثري ومقابر الأسود ومملكة لحيان", l1En: "Dadan Ancient City & Lion Tombs",
        cAr: "مقهى باحة جبل إثلب بالعلا", cEn: "Jabal Ithlib Oasis Cafe",
        mAr: "مسجد العظام التاريخي بالعلا", mEn: "Historic Bone Mosque AlUla",
        dAr: "مطعم مطبخ الواحة النخيلية", dEn: "Palm Oasis Kitchen AlUla",
        l5Ar: "قاعة مرايا ومنطقة مسرح العشار", l5En: "Maraya Concert Hall & Ashar Valley",
        t1Ar: "استكشاف آثار دادان والنقوش الجبلية", t1En: "Dadan Kingdom Archaeology & Inscriptions",
        t5Ar: "زيارة قاعة مرايا زجاجية والتصميم المعماري", t5En: "Maraya Architectural Marvel & Ashar Tour"
      };
    } else {
      dayPlan = {
        l1Ar: "جبل الحوارة ومسار جبال الغراميل", l1En: "Gharameel Rock Formations & Desert Trail",
        cAr: "مقهى ممشى العلا الثقافي", cEn: "AlUla Cultural Walkway Cafe",
        mAr: "جامع العلا الكبير", mEn: "AlUla Grand Mosque",
        dAr: "مطعم ضيافة العلا النبطية", dEn: "Nabataean Hospitality Dining AlUla",
        l5Ar: "محمية شرعان الطبيعية ووادي العشار", l5En: "Sharaan Nature Reserve & Canyon Trail",
        t1Ar: "جولة جبال الغراميل العجيبة والصحراء", t1En: "Gharameel Desert Rock Formations Sightseeing",
        t5Ar: "استكشاف الطبيعة والحيوانات بمحمية شرعان", t5En: "Sharaan Nature Reserve Wilderness Walk"
      };
    }
  } else if (lower.includes("أبها") || lower.includes("abha")) {
    if (day === 1) {
      dayPlan = {
        l1Ar: "قرية رجال ألمع التراثية ومتحف ألمع", l1En: "Rijal Almaa Heritage Village & Museum",
        cAr: "مقهى مطل الجبل الأخضر", cEn: "Green Mountain Lookout Cafe",
        mAr: "جامع الملك فهد بأبها", mEn: "King Fahd Grand Mosque Abha",
        dAr: "مطعم الضيافة العسيرية بأبها", dEn: "Traditional Aseer Hospitality Restaurant",
        l5Ar: "حي النصب التراثي وممشى الضباب", l5En: "Al-Nassab Heritage District & Fog Walkway",
        t1Ar: "جولة قرية رجال ألمع وقصور الحجر", t1En: "Rijal Almaa Ancient Stone Palaces",
        t5Ar: "جولة بين سحب وممشى الضباب البارد", t5En: "Fog Walkway & Mountain Mist Exploration"
      };
    } else if (day === 2) {
      dayPlan = {
        l1Ar: "قرية مفتاحة التراثية وسوق الثلاثاء الشعبي", l1En: "Muftaha Heritage Village & Tuesday Souk",
        cAr: "مقهى الممشى العسيري بأبها", cEn: "Aseer Promenade Heritage Cafe",
        mAr: "جامع العسيري التاريخي", mEn: "Historic Aseeri Mosque",
        dAr: "مطعم الحنيذ الجنوبي بأبها", dEn: "Southern Haneedh Heritage Restaurant",
        l5Ar: "منتزه السودة وجبل السحاب العالي", l5En: "Al-Soudah Park & Cloud Mountain Peak",
        t1Ar: "جولة الفنون والأسواق الشعبية القديمة", t1En: "Traditional Crafts & Cultural Souk Walk",
        t5Ar: "صعود منتزه السودة وإطلالات جبال الحجاز", t5En: "Al-Soudah Mountain Peak & Scenic Overlook"
      };
    } else {
      dayPlan = {
        l1Ar: "قصور أبو نقطة المتحمي بطبب التاريخية", l1En: "Abu Nuqta Heritage Palaces in Tabab",
        cAr: "مقهى المطلات الجبلية بأبها", cEn: "Mountain Lookouts Cafe Abha",
        mAr: "جامع طبب التاريخي الأثري", mEn: "Historic Tabab Ancient Mosque",
        dAr: "مطعم السودة للضيافة التراثية", dEn: "Al-Soudah Traditional Dining",
        l5Ar: "منتزه أبا الخيال ومطل سد أبها", l5En: "Abu Khayal Park & Abha Dam Lake Overlook",
        t1Ar: "جولة تاريخ طبب والقصور العسيرية الأثرية", t1En: "Tabab Ancient Palaces & Citadel Tour",
        t5Ar: "جولة بحيرة السد والتلفريك بأبها", t5En: "Abha Dam Lake & Cable Car Overlook"
      };
    }
  } else if (lower.includes("طائف") || lower.includes("taif")) {
    if (day === 1) {
      dayPlan = {
        l1Ar: "قصر شبرا التاريخي وسوق الطائف القديم", l1En: "Shubra Palace & Historic Taif Souk",
        cAr: "مقهى ومزارع الورد الطائفي", cEn: "Taif Rose Farm & Heritage Cafe",
        mAr: "جامع عبدالله بن عباس التاريخي", mEn: "Historic Ibn Abbas Mosque",
        dAr: "مطعم الهدا للضيافة الطائفية", dEn: "Taif Traditional Heritage Restaurant",
        l5Ar: "تلفريك الهدا ومطلات الشفا الجبلية", l5En: "Al-Hada Cable Car & Al-Shafa Lookouts",
        t1Ar: "استكشاف قصور وأسواق الطائف القديمة", t1En: "Historic Shubra Palace & Souk Tour",
        t5Ar: "ركوب التلفريك ومطلات جبال الهدا والشفا", t5En: "Al-Hada Cable Car & Mountain Viewpoint"
      };
    } else {
      dayPlan = {
        l1Ar: "منتزه سيسد الوطني وقصر الملك فيصل", l1En: "Saiysad National Park & King Faisal Palace",
        cAr: "مقهى بساتين الشفا الجبلية", cEn: "Al-Shafa Mountain Orchards Cafe",
        mAr: "جامع الهدا الكبير بالطائف", mEn: "Al-Hada Grand Mosque Taif",
        dAr: "مطعم السليق الطائفي الأصيل", dEn: "Authentic Taif Saleeq Restaurant",
        l5Ar: "سوق الفواكه الموسمية ومصانع الورد", l5En: "Seasonal Fruit Souk & Rose Distilleries",
        t1Ar: "جولة الطبيعة الجبلية والمتنزهات", t1En: "Mountain Nature & National Park Stroll",
        t5Ar: "تجربة قطاف الفواكه وعطور الورد", t5En: "Fruit Harvesting & Rose Oil Distilleries"
      };
    }
  } else if (lower.includes("أحساء") || lower.includes("احساء") || lower.includes("ahsa")) {
    if (day === 1) {
      dayPlan = {
        l1Ar: "قصر إبراهيم الأثري وسوق القيصرية", l1En: "Ibrahim Palace & Al-Qaysariya Souk",
        cAr: "مقهى القيصرية والخبز الحساوي", cEn: "Al-Qaysariya Heritage Cafe",
        mAr: "مسجد جواثى التاريخي بالأحساء", mEn: "Historic Jawatha Mosque",
        dAr: "مطعم ومخبز الخبز الحساوي التراثي", dEn: "Hassawi Heritage Bakery & Dining",
        l5Ar: "جبل القارة وواحة الأحساء التراثية (يونسكو)", l5En: "Jabal Al-Qarah & Al-Ahsa UNESCO Oasis",
        t1Ar: "جولة القلاع التاريخية وسوق القيصرية", t1En: "Forts & Ancient Qaysariya Souk Tour",
        t5Ar: "استكشاف المغارات الجبلية بواحة النخيل", t5En: "Jabal Al-Qarah Caves & Oasis Stroll"
      };
    } else {
      dayPlan = {
        l1Ar: "بيت البيعة التاريخي وقصر خزام", l1En: "House of Allegiance & Khuzam Palace",
        cAr: "مقهى باحة واحة الأحساء", cEn: "Al-Ahsa Oasis Promenade Cafe",
        mAr: "جامع الجبر التاريخي بالأحساء", mEn: "Historic Al-Jabr Mosque Al-Ahsa",
        dAr: "مطعم الأرز الحساوي والضيافة الشعبية", dEn: "Hassawi Rice Traditional Restaurant",
        l5Ar: "منتزه الأحساء الوطني وبحيرة الأصفر", l5En: "Al-Ahsa National Park & Asfar Lake",
        t1Ar: "جولة معالم البيعة والقصور التاريخية", t1En: "Historical Heritage Palaces Walk",
        t5Ar: "جولة الكثبان الذهبية وبحيرة الأصفر", t5En: "Asfar Lake & Desert Dunes Excursion"
      };
    }
  } else if (lower.includes("دمام") || lower.includes("خبر") || lower.includes("dammam") || lower.includes("khobar")) {
    if (day === 1) {
      dayPlan = {
        l1Ar: "واجهة كورنيش الدمام وجزيرة المرجان", l1En: "Dammam Corniche Waterfront & Marjan Island",
        cAr: "مقهى القرية التراثية بالدمام", cEn: "Dammam Heritage Village Cafe",
        mAr: "جامع الإمام فيصل بن تركي بالدمام", mEn: "Grand Faisal Mosque Dammam",
        dAr: "مطعم القرية التراثية بالدمام", dEn: "Dammam Heritage Village Restaurant",
        l5Ar: "مركز الملك عبدالعزيز الثقافي العالمي (إثراء)", l5En: "King Abdulaziz Center for World Culture (Ithra)",
        t1Ar: "جولة الواجهة البحرية وجزيرة المرجان", t1En: "Dammam Waterfront & Marjan Island Tour",
        t5Ar: "استكشاف المعارض والتحف بمركز إثراء", t5En: "Ithra Cultural Center & Art Exhibition"
      };
    } else {
      dayPlan = {
        l1Ar: "واجهة كورنيش الخبر وبرج المياه", l1En: "Khobar Waterfront Corniche & Water Tower",
        cAr: "مقهى ممشى أجدان ووك بالخبر", cEn: "Ajdan Walk Promenade Cafe Khobar",
        mAr: "جامع الكورنيش الكبير بالخبر", mEn: "Khobar Waterfront Grand Mosque",
        dAr: "مطعم الساحل والمأكولات البحرية بالخبر", dEn: "Khobar Coast Seafood Restaurant",
        l5Ar: "شاطئ نصف القمر والواجهة البحرية", l5En: "Half Moon Bay Waterfront Beach",
        t1Ar: "جولة كورنيش الخبر وبرج المياه المميز", t1En: "Khobar Promenade & Water Tower Sightseeing",
        t5Ar: "الاستجمام في شاطئ نصف القمر عند الغروب", t5En: "Half Moon Bay Sunset & Beach Walk"
      };
    }
  } else {
    const dayVariations = [
      { t1: "جولة المعالم والمواقع الأثرية الرئيسية", t5: "جولة الأسواق والمعارض التراثية", l1: `المعلم الأثري والتراثي بـ ${cityData.nameAr}`, l5: `سوق الحرف الشعبية بـ ${cityData.nameAr}`, c: `مقهى ${cityData.nameAr} التراثي`, m: `جامع ${cityData.nameAr} الكبير`, d: `مطعم الضيافة بـ ${cityData.nameAr}` },
      { t1: "جولة المتاحف والحرف الشعبية", t5: "جولة الحدائق والمطلات الطبيعية", l1: `متحف ${cityData.nameAr} التراثي والتاريخي`, l5: `منتزه ومطلات ${cityData.nameAr} الطبيعية`, c: `مقهى باحة ${cityData.nameAr}`, m: `جامع ${cityData.nameAr} التاريخي`, d: `مطعم مأكولات ${cityData.nameAr} الشعبية` },
      { t1: "جولة الأحياء القديمة وسوق الحرف", t5: "جولة الممشى الثقافي والواجهة", l1: `حي ${cityData.nameAr} القديم والأسواق`, l5: `الممشى الثقافي بـ ${cityData.nameAr}`, c: `مقهى واحة ${cityData.nameAr}`, m: `جامع ${cityData.nameAr} الأثري`, d: `مطعم التراث المحلي في ${cityData.nameAr}` },
      { t1: "جولة القصور والقلاع التاريخية", t5: "جولة المنتجات الزراعية والمحلية", l1: `قلعة وقصر ${cityData.nameAr} التاريخي`, l5: `سوق المنتجات المحلية بـ ${cityData.nameAr}`, c: `مقهى مطلات ${cityData.nameAr}`, m: `مسجد ${cityData.nameAr} الكبير`, d: `مطعم كرم الضيافة بـ ${cityData.nameAr}` }
    ];
    const selected = dayVariations[(day - 1) % dayVariations.length];
    dayPlan = {
      l1Ar: selected.l1, l1En: `Main Landmark Day ${day} in ${cityData.nameEn}`,
      cAr: selected.c, cEn: `Heritage Cafe Day ${day} in ${cityData.nameEn}`,
      mAr: selected.m, mEn: `Grand Mosque Day ${day} in ${cityData.nameEn}`,
      dAr: selected.d, dEn: `Traditional Dining Day ${day} in ${cityData.nameEn}`,
      l5Ar: selected.l5, l5En: `Cultural Park & Souk Day ${day} in ${cityData.nameEn}`,
      t1Ar: selected.t1, t1En: `Day ${day} Heritage Exploration`,
      t5Ar: selected.t5, t5En: `Day ${day} Cultural Stroll`
    };
  }

  const dayPrefixAr = `[اليوم ${day}] `;

  return [
    {
      time: `${dayPrefixAr}09:30`,
      titleAr: dayPlan.t1Ar || `جولة المعالم التراثية - اليوم ${day}`,
      titleEn: dayPlan.t1En || `Heritage Exploration - Day ${day}`,
      locationAr: dayPlan.l1Ar,
      locationEn: dayPlan.l1En,
      category: "heritage" as const,
      weatherIcon: "☀️"
    },
    {
      time: `${dayPrefixAr}11:00`,
      titleAr: `استراحة قهوة وتذوق الأصالة - اليوم ${day}`,
      titleEn: `Saudi Coffee Break - Day ${day}`,
      locationAr: dayPlan.cAr,
      locationEn: dayPlan.cEn,
      category: "cafe" as const,
      weatherIcon: "☕"
    },
    {
      time: `${dayPrefixAr}12:15`,
      titleAr: `صلاة الظهر والتوقف الإيماني - اليوم ${day}`,
      titleEn: `Dhuhr Prayer Pause - Day ${day}`,
      locationAr: dayPlan.mAr,
      locationEn: dayPlan.mEn,
      category: "prayer" as const,
      isPrayerTime: true,
      prayerNameAr: `صلاة الظهر (${cityData.dhuhr})`,
      prayerNameEn: `Dhuhr Prayer (${cityData.dhuhr})`,
      weatherIcon: "🕌"
    },
    {
      time: `${dayPrefixAr}13:15`,
      titleAr: `غداء تراثي ومأكولات محلية - اليوم ${day}`,
      titleEn: `Traditional Local Dining - Day ${day}`,
      locationAr: dayPlan.dAr,
      locationEn: dayPlan.dEn,
      category: "dining" as const,
      weatherIcon: "🍽️"
    },
    {
      time: `${dayPrefixAr}15:00`,
      titleAr: dayPlan.t5Ar || `المعارض والأنشطة التراثية - اليوم ${day}`,
      titleEn: dayPlan.t5En || `Cultural Exhibition & Crafts - Day ${day}`,
      locationAr: dayPlan.l5Ar,
      locationEn: dayPlan.l5En,
      category: "heritage" as const,
      weatherIcon: "🏛️"
    }
  ];
}

function generateFallbackItinerary(destName: string, duration: string, mobility: string, isArabic: boolean, budget: string = 'medium') {
  const isWheelchair = mobility === "wheelchair" || mobility === "easy_access";
  const name = destName || "الرياض";
  const cityData = getCityData(name);

  const isMultiDay = duration && (
    duration.includes("أيام") || 
    duration.includes("يومان") || 
    duration.includes("أكثر من يوم") || 
    duration.includes("days") || 
    duration.includes("Days") || 
    duration.includes("Multiple")
  );

  let totalDays = 1;
  if (isMultiDay) {
    const dayMatch = duration.match(/(\d+)/);
    if (dayMatch) {
      totalDays = Math.min(14, Math.max(1, parseInt(dayMatch[1], 10)));
    } else {
      totalDays = 2;
    }
  }

  let generatedItems: any[] = [];

  for (let day = 1; day <= totalDays; day++) {
    let dayBaseItems = getCityDayItems(name, day, cityData, isWheelchair);

    // If single day and 3 hours requested, keep it to 3 concise stops
    if (!isMultiDay && duration && (duration.includes("3") || duration.includes("٣"))) {
      dayBaseItems = dayBaseItems.slice(0, 3);
    }
    
    dayBaseItems.forEach((base, idx) => {
      const timeStr = isMultiDay ? base.time : base.time.replace(/^\[.*?\]\s*/g, '').trim();
      const titleCleanAr = isMultiDay ? base.titleAr : base.titleAr.replace(/\s*-\s*اليوم \d+/g, '');
      const titleCleanEn = isMultiDay ? base.titleEn : base.titleEn.replace(/\s*-\s*Day \d+/g, '');

      generatedItems.push({
        id: `f-d${day}-${idx + 1}`,
        dayNumber: day,
        time: timeStr,
        titleAr: titleCleanAr,
        titleEn: titleCleanEn,
        locationAr: base.locationAr,
        locationEn: base.locationEn,
        distanceAr: "600 متر",
        distanceEn: "600 meters",
        travelTimeAr: "8 دقائق",
        travelTimeEn: "8 mins",
        mobilityNoteAr: isWheelchair ? "مسار مسطح ممهد بالكامل ♿ مع نقاط ظلال متكررة" : "مسار مشي سهل وممتع",
        mobilityNoteEn: isWheelchair ? "Completely flat paved trail ♿ with frequent shade stops" : "Easy pleasant walking path",
        isWheelchairAccessible: true,
        isPrayerTime: base.isPrayerTime || false,
        prayerNameAr: base.prayerNameAr,
        prayerNameEn: base.prayerNameEn,
        temperature: cityData.temp,
        weatherIcon: base.weatherIcon,
        crowdLevelAr: "منخفض (أجواء هادئة)",
        crowdLevelEn: "Low Density",
        crowdStatus: "low",
        category: base.category,
        aiRationaleAr: isMultiDay 
          ? `برنامج اليوم ${day} مبتكر ومخصص لزيارة معالم جديدة وغير مكررة في ${cityData.nameAr}.`
          : `برنامج مخصص لزيارة معالم ${cityData.nameAr} خلال ${duration}.`,
        aiRationaleEn: isMultiDay 
          ? `Day ${day} itinerary uniquely customized with distinct new landmarks in ${cityData.nameEn}.`
          : `Customized itinerary for ${cityData.nameEn} within ${duration}.`,
        sourceAr: "المصدر: هيئة التراث السعودية وروح السعودية",
        sourceEn: "Source: Saudi Heritage Authority & Visit Saudi"
      });
    });
  }

  return {
    id: `custom-plan-${Date.now()}`,
    destinationNameAr: cityData.nameAr,
    destinationNameEn: cityData.nameEn,
    durationAr: duration || "5 ساعات",
    durationEn: duration || "5 Hours",
    date: new Date().toISOString().split("T")[0],
    createdAt: new Date().toISOString(),
    totalDistanceAr: `${(3.8 * totalDays).toFixed(1)} كم`,
    totalDistanceEn: `${(3.8 * totalDays).toFixed(1)} km`,
    accessibilityScore: isWheelchair ? 99 : 92,
    summaryAr: `تم توليد هذا المسار المبتكر بالذكاء الاصطناعي لزيارة ${cityData.nameAr} لمدة (${duration}) ببرنامج متنوع وغير مكرر لكل يوم، مع مراعاة أوقات الصلاة (الظهر: ${cityData.dhuhr}) ومسارات ${isWheelchair ? "مجهزة للكراسي المتحركة" : "المشي المريحة"}.`,
    summaryEn: `AI-generated ${duration} innovative itinerary for ${cityData.nameEn} with unique non-repeating daily events, factoring prayer schedules (Dhuhr: ${cityData.dhuhr}) and ${isWheelchair ? "step-free wheelchair paths" : "comfortable walking routes"}.`,
    items: generatedItems
  };
}

// Start Server and Vite setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Rihlaty AI Server running on http://localhost:${PORT}`);
  });
}

startServer();
