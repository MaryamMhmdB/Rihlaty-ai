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
  const { destination, duration, mobility, interests, preferences, date, time, notes, lang } = req.body;

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
- User Interests: ${Array.isArray(interests) ? interests.join(', ') : 'التاريخ والتراث'}
- User Preferences: ${Array.isArray(preferences) ? preferences.join(', ') : 'أماكن هادئة'}
- Date & Start Time: ${date || '2026-08-08'} at ${time || '09:00'}
- Additional Notes: ${notes || 'None'}

CRITICAL STRICT RULES FOR ACCURACY, GOOGLE MAPS & PRAYER:
1. REAL & VERIFIABLE LOCATIONS ONLY:
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

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          systemInstruction: "You are Rihlaty AI, an elite Saudi tourism planner specializing in 100% geographically accurate, real-world, accessible, prayer-synchronized itineraries in Saudi Arabia."
        }
      });

      if (response.text) {
        const json = JSON.parse(response.text);
        const cleaned = validateAndCleanItinerary(json, cityData);
        return res.json({ success: true, data: cleaned });
      }
    } catch (error) {
      console.error("Gemini itinerary generation error:", error);
    }
  }

  // Fallback intelligent itinerary generation when API key isn't provided or fails
  const mockItinerary = generateFallbackItinerary(destination, duration, mobility, isArabic);
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
function validateAndCleanItinerary(json: any, cityData: any) {
  if (!json || typeof json !== 'object') return json;

  json.destinationNameAr = cityData.nameAr;
  json.destinationNameEn = cityData.nameEn;

  if (Array.isArray(json.items)) {
    json.items = json.items.map((item: any) => {
      let locAr = (item.locationAr || item.titleAr || cityData.nameAr).replace(/\s*[\u2014\u2013\-\|]+\s*/g, '، ').trim();
      let locEn = (item.locationEn || item.titleEn || cityData.nameEn).replace(/\s*[\u2014\u2013\-\|]+\s*/g, ', ').trim();

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
        wIcon = getLogicalWeatherIcon(cityData.nameAr, item.time);
      }

      if (item.isPrayerTime || item.category === "prayer") {
        const hour = parseInt((item.time || "12:00").split(":")[0], 10);
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
      const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");
      
      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: {
          parts: [
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: cleanBase64,
              },
            },
            {
              text: `Analyze this image of a landmark or heritage item in Saudi Arabia. 
Identify what it is, its historical context, cultural significance, and nearby recommendations.
Provide responses in both Arabic and English JSON format with fields:
{
  "titleAr": "اسم المعلم بالعربية",
  "titleEn": "Landmark Name in English",
  "locationAr": "الموقع في السعودية",
  "locationEn": "Location in Saudi Arabia",
  "historicalInfoAr": "نبذة تاريخية مفصلة",
  "historicalInfoEn": "Detailed historical context",
  "culturalImportanceAr": "الأهمية الثقافية للتراث السعودي",
  "culturalImportanceEn": "Cultural importance to Saudi heritage",
  "nearbyPlacesAr": ["مكان قريب 1", "مكان قريب 2"],
  "nearbyPlacesEn": ["Nearby Place 1", "Nearby Place 2"],
  "sourceAr": "المصدر: هيئة التراث / دارة الملك عبد العزیز",
  "sourceEn": "Source: Saudi Heritage Authority / King Abdulaziz Foundation"
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

// Helper for generating custom fallback itinerary based on inputs
function generateFallbackItinerary(destName: string, duration: string, mobility: string, isArabic: boolean) {
  const isWheelchair = mobility === "wheelchair" || mobility === "easy_access";
  const name = destName || "الرياض";
  const cityData = getCityData(name);

  // Default dynamic placeholders for any unlisted town/city
  let landmark1Ar = `المعلم الأثري والتراثي بـ ${cityData.nameAr}`;
  let landmark1En = `Main Historical Landmark in ${cityData.nameEn}`;
  let cafeAr = `مقهى ${cityData.nameAr} التراثي للقهوة السعودية`;
  let cafeEn = `Local Heritage Cafe in ${cityData.nameEn}`;
  let mosqueAr = `جامع ${cityData.nameAr} الكبير`;
  let mosqueEn = `Grand Mosque of ${cityData.nameEn}`;
  let diningAr = `مطعم الضيافة والتراث المحلي في ${cityData.nameAr}`;
  let diningEn = `Traditional Heritage Restaurant in ${cityData.nameEn}`;
  let landmark5Ar = `سوق الحرف والمتحف المحلي بـ ${cityData.nameAr}`;
  let landmark5En = `Traditional Crafts Souk & Museum in ${cityData.nameEn}`;

  const lower = name.toLowerCase();
  if (lower.includes("رياض") || lower.includes("riyadh")) {
    landmark1Ar = "قصر المصمك وسوق الزل بالديرة";
    landmark1En = "Al-Masmak Fortress & Souk Al-Zal in Deera";
    cafeAr = "مقهى كفة وديرة للتراث بالديرة";
    cafeEn = "Deera Heritage & Kaffa Cafe";
    mosqueAr = "جامع الإمام تركي بن عبدالله (الجامع الكبير بالديرة)";
    mosqueEn = "Imam Turki bin Abdullah Grand Mosque in Deera";
    diningAr = "مطعم القرية النجدية بالديرة";
    diningEn = "Najd Village Heritage Restaurant in Deera";
    landmark5Ar = "حي الطريف بآل بجيري والمتحف الوطني بالرياض";
    landmark5En = "At-Turaif Diriyah & National Museum in Riyadh";
  } else if (lower.includes("جدة") || lower.includes("jeddah")) {
    landmark1Ar = "منطقة البلد التاريخية وبيت نصيف";
    landmark1En = "Al-Balad Historic District & Naseef House";
    cafeAr = "مقهى كافيهات البلد التراثية";
    cafeEn = "Al-Balad Heritage Cafe";
    mosqueAr = "جامع الشافعي التاريخي بالبلد";
    mosqueEn = "Historic Al-Shafei Mosque in Al-Balad";
    diningAr = "مطعم السدّة ومأكولات التراث الحجازي";
    diningEn = "Al-Saddah Traditional Hijazi Dining";
    landmark5Ar = "واجهة كورنيش جدة والمسجد العائم (مسجد الرحمة)";
    landmark5En = "Jeddah Corniche & Al-Rahmah Floating Mosque";
  } else if (lower.includes("علا") || lower.includes("alula")) {
    landmark1Ar = "موقع الحجر الأثري (مدائن صالح - يونسكو)";
    landmark1En = "Hegra UNESCO World Heritage Site";
    cafeAr = "مقهى واحة العلا ومحمية الحجر";
    cafeEn = "AlUla Oasis Heritage Cafe";
    mosqueAr = "مسجد البلدة القديمة بالعلا";
    mosqueEn = "AlUla Old Town Mosque";
    diningAr = "مطعم سهيل للضيافة بالعلا";
    diningEn = "Suhail Heritage Restaurant in AlUla";
    landmark5Ar = "البلدة القديمة وجبل الفيل بالعلا";
    landmark5En = "AlUla Old Town & Elephant Rock";
  } else if (lower.includes("درعية") || lower.includes("diriyah")) {
    landmark1Ar = "حي الطريف التاريخي بآل بجيري (يونسكو)";
    landmark1En = "At-Turaif UNESCO Heritage Site in Diriyah";
    cafeAr = "مقهى البجيري بروميناد";
    cafeEn = "Al-Bujairi Promenade Cafe";
    mosqueAr = "جامع الإمام محمد بن عبدالوهاب بالدرعية";
    mosqueEn = "Diriyah Imam Grand Mosque";
    diningAr = "مطعم سهيل بالدرعية";
    diningEn = "Suhail Diriyah Restaurant";
    landmark5Ar = "مطل البجيري ومطل وادي حنيفة";
    landmark5En = "Al-Bujairi Lookout & Wadi Hanifa";
  } else if (lower.includes("أبها") || lower.includes("abha")) {
    landmark1Ar = "قرية رجال ألمع التراثية ومتحف ألمع";
    landmark1En = "Rijal Almaa Heritage Village & Museum";
    cafeAr = "مقهى مطل الجبل الأخضر";
    cafeEn = "Green Mountain Lookout Cafe";
    mosqueAr = "جامع الملك فهد بأبها";
    mosqueEn = "King Fahd Grand Mosque Abha";
    diningAr = "مطعم الضيافة العسيرية بأبها";
    diningEn = "Traditional Aseer Hospitality Restaurant";
    landmark5Ar = "حي النصب التراثي وممشى الضباب";
    landmark5En = "Al-Nassab Heritage District & Fog Walkway";
  } else if (lower.includes("طائف") || lower.includes("taif")) {
    landmark1Ar = "قصر شبرا التاريخي وسوق الطائف القديم";
    landmark1En = "Shubra Palace & Historic Taif Souk";
    cafeAr = "مقهى ومزارع الورد الطائفي";
    cafeEn = "Taif Rose Farm & Heritage Cafe";
    mosqueAr = "جامع عبدالله بن عباس التاريخي";
    mosqueEn = "Historic Ibn Abbas Mosque";
    diningAr = "مطعم الهدا للضيافة الطائفية";
    diningEn = "Taif Traditional Heritage Restaurant";
    landmark5Ar = "تلفريك الهدا ومطلات الشفا الجبلية";
    landmark5En = "Al-Hada Cable Car & Al-Shafa Lookouts";
  } else if (lower.includes("أحساء") || lower.includes("احساء") || lower.includes("ahsa")) {
    landmark1Ar = "قصر إبراهيم الأثري وسوق القيصرية";
    landmark1En = "Ibrahim Palace & Al-Qaysariya Souk";
    cafeAr = "مقهى القيصرية والخبز الحساوي";
    cafeEn = "Al-Qaysariya Heritage Cafe";
    mosqueAr = "مسجد جواثى التاريخي بالأحساء";
    mosqueEn = "Historic Jawatha Mosque";
    diningAr = "مطعم ومخبز الخبز الحساوي التراثي";
    diningEn = "Hassawi Heritage Bakery & Dining";
    landmark5Ar = "جبل القارة وواحة الأحساء التراثية (يونسكو)";
    landmark5En = "Jabal Al-Qarah & Al-Ahsa UNESCO Oasis";
  } else if (lower.includes("دمام") || lower.includes("dammam")) {
    landmark1Ar = "واجهة كورنيش الدمام وجزيرة المرجان";
    landmark1En = "Dammam Corniche Waterfront & Marjan Island";
    cafeAr = "مقهى القرية التراثية بالدمام";
    cafeEn = "Dammam Heritage Village Cafe";
    mosqueAr = "جامع الإمام فيصل بن تركي بالدمام";
    mosqueEn = "Grand Faisal Mosque Dammam";
    diningAr = "مطعم القرية التراثية بالدمام";
    diningEn = "Dammam Heritage Village Restaurant";
    landmark5Ar = "مركز الملك عبدالعزيز الثقافي العالمي (إثراء)";
    landmark5En = "King Abdulaziz Center for World Culture (Ithra)";
  } else if (lower.includes("خبر") || lower.includes("khobar")) {
    landmark1Ar = "واجهة كورنيش الخبر وبرج المياه";
    landmark1En = "Khobar Waterfront Corniche & Water Tower";
    cafeAr = "مقهى ممشى أجدان ووك";
    cafeEn = "Ajdan Walk Promenade Cafe";
    mosqueAr = "جامع الكورنيش الكبير بالخبر";
    mosqueEn = "Khobar Waterfront Grand Mosque";
    diningAr = "مطعم الساحل والمأكولات البحرية بالخبر";
    diningEn = "Khobar Coast Seafood Restaurant";
    landmark5Ar = "شاطئ نصف القمر والواجهة البحرية";
    landmark5En = "Half Moon Bay Waterfront Beach";
  } else if (lower.includes("تبوك") || lower.includes("tabuk")) {
    landmark1Ar = "قلعة تبوك التاريخية وعين السكر";
    landmark1En = "Historic Tabuk Castle & Sugar Spring";
    cafeAr = "مقهى سوق الطواحين التراثي";
    cafeEn = "Souk Al-Twaheen Cafe";
    mosqueAr = "المسجد الأثري التاريخي بتبوك";
    mosqueEn = "Historic Tabuk Mosque";
    diningAr = "مطعم الضيافة الشمالية بتبوك";
    diningEn = "Northern Heritage Restaurant in Tabuk";
    landmark5Ar = "وادي الديسة الطبيعي العجيب";
    landmark5En = "Wadi Al-Disah Natural Canyon";
  } else if (lower.includes("حائل") || lower.includes("حايل") || lower.includes("hail")) {
    landmark1Ar = "قلعة عيرف وقصر القشلة التاريخي";
    landmark1En = "A'arif Fort & Qeshla Historical Palace";
    cafeAr = "مقهى سوق حائل التراثي";
    cafeEn = "Hail Heritage Souk Cafe";
    mosqueAr = "جامع برزان الكبير بحائل";
    mosqueEn = "Barzan Grand Mosque in Hail";
    diningAr = "مطعم الكرم الحائلي التراثي";
    diningEn = "Hail Hospitality Restaurant";
    landmark5Ar = "نقوش جبة جبل أم سنمان (يونسكو)";
    landmark5En = "Jubbah UNESCO Rock Art Site";
  } else if (lower.includes("جازان") || lower.includes("جيزان") || lower.includes("jazan") || lower.includes("jizan")) {
    landmark1Ar = "القرية التراثية الكبرى بجازان";
    landmark1En = "Jazan Grand Heritage Village";
    cafeAr = "مقهى الكورنيش الشمالي بجازان";
    cafeEn = "North Corniche Cafe Jazan";
    mosqueAr = "جامع جازان الكبير";
    mosqueEn = "Jazan Grand Mosque";
    diningAr = "مطعم المرساة للمأكولات البحرية بجازان";
    diningEn = "Jazan Seafood & Southern Dining";
    landmark5Ar = "مطل مدرجات جبال فيفاء الخضراء";
    landmark5En = "Fayfa Green Mountain Terraces Viewpoint";
  } else if (lower.includes("نجران") || lower.includes("najran")) {
    landmark1Ar = "قصر العان الطيني وقصر الإمارة التاريخي";
    landmark1En = "Al-Aan Mud Palace & Emara Palace";
    cafeAr = "مقهى سوق نجران التراثي";
    cafeEn = "Najran Heritage Market Cafe";
    mosqueAr = "الجامع التاريخي الأثري بنجران";
    mosqueEn = "Historic Najran Mosque";
    diningAr = "مطعم الضيافة النجرانية التراثية";
    diningEn = "Najran Traditional Hospitality Dining";
    landmark5Ar = "آبار حمى التراثية وموقع الأخدود (يونسكو)";
    landmark5En = "Hima UNESCO Site & Al-Okhdood Historic Ruins";
  } else if (lower.includes("قصيم") || lower.includes("بريدة") || lower.includes("عنيزة") || lower.includes("qassim") || lower.includes("buraidah")) {
    landmark1Ar = "سوق العقيلات وسوق الحرف الشعبية";
    landmark1En = "Souk Al-Aqilat & Traditional Crafts Souk";
    cafeAr = "مقهى واحة النخيل ببريدة";
    cafeEn = "Buraidah Palm Oasis Cafe";
    mosqueAr = "جامع خادم الحرمين الشريفين ببريدة";
    mosqueEn = "Buraidah Grand Mosque";
    diningAr = "مطعم المأكولات القصيمية التراثية";
    diningEn = "Qassim Traditional Cuisine Restaurant";
    landmark5Ar = "برج بريدة وسوق التمور التراثي";
    landmark5En = "Buraidah Tower & Date Souk Museum";
  } else if (lower.includes("ينبع") || lower.includes("yanbu")) {
    landmark1Ar = "منطقة ينبع التاريخية وسوق الليل";
    landmark1En = "Historic Yanbu District & Night Souk";
    cafeAr = "مقهى سوق الليل التراثي بينبع";
    cafeEn = "Yanbu Night Souk Cafe";
    mosqueAr = "مسجد البحر التاريخي بينبع";
    mosqueEn = "Historic Seaside Mosque in Yanbu";
    diningAr = "مطعم الصياد للمأكولات البحرية بينبع";
    diningEn = "Yanbu Seafood & Fisherman Dining";
    landmark5Ar = "واجهة كورنيش ينبع البحر";
    landmark5En = "Yanbu Sea Corniche Waterfront";
  } else if (lower.includes("مكة") || lower.includes("makkah") || lower.includes("mecca")) {
    landmark1Ar = "جبل النور وغار حراء ومعرض الوحي بمكة";
    landmark1En = "Mount Noor, Hira Cave & Revelation Exhibition";
    cafeAr = "مقهى ومجالس الضيافة المكية";
    cafeEn = "Makkah Traditional Hospitality Cafe";
    mosqueAr = "المسجد الحرام بمكة المكرمة";
    mosqueEn = "Al-Masjid Al-Haram in Makkah";
    diningAr = "مطعم الضيافة والمأكولات المكية التراثية";
    diningEn = "Makkah Traditional Cuisine Restaurant";
    landmark5Ar = "متحف معالم مكة ومتحف عمارة الحرمين";
    landmark5En = "Makkah Landmarks & Two Holy Mosques Museum";
  } else if (lower.includes("مدينة") || lower.includes("madinah") || lower.includes("medina")) {
    landmark1Ar = "مسجد قباء ومزرعة بئر عثمان بالمدينة";
    landmark1En = "Quba Mosque & Well of Othman Heritage Garden";
    cafeAr = "مقهى باحة جبل أُحد والتمور المدينية";
    cafeEn = "Mount Uhud Oasis Cafe";
    mosqueAr = "المسجد النبوي الشريف بالمدينة المنورة";
    mosqueEn = "Al-Masjid An-Nabawi in Madinah";
    diningAr = "مطعم الضيافة المدينية التراثية";
    diningEn = "Madinah Traditional Heritage Restaurant";
    landmark5Ar = "جبل أُحد ومحطة سكة حديد الحجاز التاريخية";
    landmark5En = "Mount Uhud & Historic Hejaz Railway Station";
  } else if (lower.includes("باحة") || lower.includes("baha")) {
    landmark1Ar = "قرية ذي عين الأثرية بالباحة";
    landmark1En = "Thee Ain Ancient Marble Village in Al Baha";
    cafeAr = "مقهى منتزه غابة رغدان بالباحة";
    cafeEn = "Raghadan Forest Park Cafe";
    mosqueAr = "جامع الباحة الكبير";
    mosqueEn = "Al Baha Grand Mosque";
    diningAr = "مطعم الضيافة الجنوبية بالباحة";
    diningEn = "Traditional Southern Hospitality Restaurant";
    landmark5Ar = "منتزه غابة رغدان وشلالات جبل شدا";
    landmark5En = "Raghadan Forest Park & Shada Mountain";
  } else if (lower.includes("جبيل") || lower.includes("jubail")) {
    landmark1Ar = "شاطئ الفنير والواجهة البحرية بالجبيل";
    landmark1En = "Fanateer Beach & Waterfront Promenade";
    cafeAr = "مقهى مرسى الفنطاس بالجبيل";
    cafeEn = "Fanateer Marina Cafe";
    mosqueAr = "جامع الفنطير الكبير بالجبيل";
    mosqueEn = "Fanateer Grand Mosque";
    diningAr = "مطعم المأكولات البحرية بالجبيل";
    diningEn = "Jubail Seafood Restaurant";
    landmark5Ar = "منتزه نجد ومتنزه الدفي بالجبيل";
    landmark5En = "Al-Dafi Park & Jubail Coastal Trail";
  }

  return {
    id: `custom-plan-${Date.now()}`,
    destinationNameAr: cityData.nameAr,
    destinationNameEn: cityData.nameEn,
    durationAr: duration || "5 ساعات",
    durationEn: duration || "5 Hours",
    date: new Date().toISOString().split("T")[0],
    createdAt: new Date().toISOString(),
    totalDistanceAr: "3.8 كم",
    totalDistanceEn: "3.8 km",
    accessibilityScore: isWheelchair ? 99 : 92,
    summaryAr: `تم توليد هذا المسار بالذكاء الاصطناعي لزيارة ${cityData.nameAr} مع مراعاة أوقات الصلاة (الظهر: ${cityData.dhuhr})، ومسارات ${isWheelchair ? "مجهزة للكراسي المتحركة بدون درجات" : "المشي المريحة"} والطقس (${cityData.temp}).`,
    summaryEn: `AI-generated itinerary for ${cityData.nameEn} factoring prayer schedules (Dhuhr: ${cityData.dhuhr}), ${isWheelchair ? "step-free wheelchair paths" : "comfortable walking routes"} and weather comfort (${cityData.temp}).`,
    items: [
      {
        id: "f1",
        time: "09:30",
        titleAr: "الجولة الاستكشافية للمعالم الرئيسية",
        titleEn: "Main Landmark Heritage Exploration",
        locationAr: landmark1Ar,
        locationEn: landmark1En,
        distanceAr: "900 متر",
        distanceEn: "900 meters",
        travelTimeAr: "12 دقيقة",
        travelTimeEn: "12 mins",
        mobilityNoteAr: isWheelchair ? "مسار مسطح ممهد بالكامل ♿ مع نقاط ظلال متكررة" : "مسار مشي سهل وممتع",
        mobilityNoteEn: isWheelchair ? "Completely flat paved trail ♿ with frequent shade stops" : "Easy pleasant walking path",
        isWheelchairAccessible: true,
        temperature: cityData.temp,
        weatherIcon: "☀️",
        crowdLevelAr: "منخفض (أجواء هادئة)",
        crowdLevelEn: "Low Density",
        crowdStatus: "low",
        category: "heritage",
        aiRationaleAr: "توقيت الصباح يوفر طقساً ألطف وإضاءة تصوير ممتازة مع زحام لا يذكر.",
        aiRationaleEn: "Morning hours offer mild weather, low crowds, and ideal photo lighting.",
        sourceAr: "المصدر: هيئة التراث السعودية",
        sourceEn: "Source: Saudi Heritage Authority"
      },
      {
        id: "f2",
        time: "11:00",
        titleAr: "استراحة قهوة وتجربة المأكولات المحلية",
        titleEn: "Local Coffee & Culinary Break",
        locationAr: cafeAr,
        locationEn: cafeEn,
        distanceAr: "400 متر",
        distanceEn: "400 meters",
        travelTimeAr: "5 دقائق",
        travelTimeEn: "5 mins",
        mobilityNoteAr: "مدخل مهيأ بمرور سهل وطاولات واسعة ♿",
        mobilityNoteEn: "Ramped entrance with spacious seating ♿",
        isWheelchairAccessible: true,
        temperature: cityData.temp,
        weatherIcon: "☕",
        crowdLevelAr: "هادئ",
        crowdLevelEn: "Quiet",
        crowdStatus: "low",
        category: "cafe",
        aiRationaleAr: "توفير فترة راحة قبل موعد أذان الظهر للانتعاش بالقهوة السعودية.",
        aiRationaleEn: "Resting break planned before noon prayer call.",
        sourceAr: "المصدر: روح السعودية",
        sourceEn: "Source: Visit Saudi"
      },
      {
        id: "f3",
        time: "12:15",
        titleAr: "صلاة الظهر والتوقف الإيماني",
        titleEn: "Dhuhr Prayer & Peaceful Pause",
        locationAr: mosqueAr,
        locationEn: mosqueEn,
        distanceAr: "250 متر",
        distanceEn: "250 meters",
        travelTimeAr: "4 دقائق",
        travelTimeEn: "4 mins",
        mobilityNoteAr: "مصلى مجهز بمسار سلس ومنحدر سهولة وصول",
        mobilityNoteEn: "Ramped accessible mosque entrance",
        isWheelchairAccessible: true,
        isPrayerTime: true,
        prayerNameAr: `صلاة الظهر (${cityData.dhuhr})`,
        prayerNameEn: `Dhuhr Prayer (${cityData.dhuhr})`,
        temperature: `${cityData.temp} (داخل المسجد 22°C)`,
        weatherIcon: "🕌",
        crowdLevelAr: "متوسط",
        crowdLevelEn: "Moderate",
        crowdStatus: "medium",
        category: "prayer",
        aiRationaleAr: "مراعاة وقت الصلاة والتوقف في مسجد قريب مكيف ومريح.",
        aiRationaleEn: "Scheduled prayer pause at a fully accessible air-conditioned mosque.",
        sourceAr: "المصدر: وزارة الشؤون الإسلامية",
        sourceEn: "Source: Ministry of Islamic Affairs"
      },
      {
        id: "f4",
        time: "13:15",
        titleAr: "غداء تراثي في بيئة مكيفة ومريحة",
        titleEn: "Traditional Lunch in Air-Conditioned Comfort",
        locationAr: diningAr,
        locationEn: diningEn,
        distanceAr: "300 متر",
        distanceEn: "300 meters",
        travelTimeAr: "5 دقائق",
        travelTimeEn: "5 mins",
        mobilityNoteAr: "جلسات مريحة ومصعد أو بدون درجات ♿",
        mobilityNoteEn: "Level floor seating with zero steps ♿",
        isWheelchairAccessible: true,
        temperature: cityData.temp,
        weatherIcon: "🍽️",
        crowdLevelAr: "متوسط",
        crowdLevelEn: "Moderate",
        crowdStatus: "medium",
        category: "dining",
        aiRationaleAr: "تناول وجبة الغداء التراثية في مكان دافئ الضيافة بعد أدء الصلاة.",
        aiRationaleEn: "Enjoying authentic local lunch after prayer pause.",
        sourceAr: "المصدر: روح السعودية",
        sourceEn: "Source: Visit Saudi"
      },
      {
        id: "f5",
        time: "15:00",
        titleAr: "جولة المعارض التراثية والتسوق الحرفي",
        titleEn: "Handicraft Souk & Museum Exhibition Walk",
        locationAr: landmark5Ar,
        locationEn: landmark5En,
        distanceAr: "500 متر",
        distanceEn: "500 meters",
        travelTimeAr: "8 دقائق",
        travelTimeEn: "8 mins",
        mobilityNoteAr: "ممرات عريضة ومسارات مجهزة للكراسي المتحركة ♿",
        mobilityNoteEn: "Wide corridors with smooth wheelchair access ♿",
        isWheelchairAccessible: true,
        temperature: cityData.temp,
        weatherIcon: "🏛️",
        crowdLevelAr: "خفيف",
        crowdLevelEn: "Light",
        crowdStatus: "low",
        category: "heritage",
        aiRationaleAr: "اختتام الرحلة بجولة ممتعة ومسترخية بين التحف التراثية والحرف اليدوية.",
        aiRationaleEn: "Closing the tour with an enriching cultural walkthrough.",
        sourceAr: "المصدر: هيئة التراث السعودية",
        sourceEn: "Source: Saudi Heritage Authority"
      }
    ]
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
