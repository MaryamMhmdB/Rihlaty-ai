export type Language = 'ar' | 'en';
export type Theme = 'light' | 'dark';

export type DestinationId = 'alula' | 'diriyah' | 'jeddah' | 'riyadh' | 'abha' | 'taif' | 'alahsa' | 'dammam' | 'khobar' | 'tabuk' | 'hail' | 'jazan' | 'najran' | 'qassim' | 'yanbu' | 'other' | (string & {});

export interface Destination {
  id: DestinationId;
  nameAr: string;
  nameEn: string;
  subtitleAr: string;
  subtitleEn: string;
  tagAr: string;
  tagEn: string;
  descriptionAr: string;
  descriptionEn: string;
  image: string;
  unesco: boolean;
  rating: number;
  coordinates: { lat: number; lng: number };
  defaultPrayerTimes: {
    fajr: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  };
  avgTempAr: string;
  avgTempEn: string;
  recommendedDurationAr: string;
  recommendedDurationEn: string;
}

export type MobilityOption = 'none' | 'limited' | 'wheelchair' | 'easy_access';

export interface TripPlannerInput {
  destination: string;
  duration: string;
  mobility: MobilityOption;
  interests: string[];
  preferences: string[];
  date: string;
  time: string;
  startingPoint?: string;
  notes?: string;
}

export interface ItineraryItem {
  id: string;
  time: string;
  titleAr: string;
  titleEn: string;
  locationAr: string;
  locationEn: string;
  distanceAr: string;
  distanceEn: string;
  travelTimeAr: string;
  travelTimeEn: string;
  mobilityNoteAr: string;
  mobilityNoteEn: string;
  isWheelchairAccessible: boolean;
  isPrayerTime?: boolean;
  prayerNameAr?: string;
  prayerNameEn?: string;
  temperature: string;
  weatherIcon: string;
  crowdLevelAr: string;
  crowdLevelEn: string;
  crowdStatus: 'low' | 'medium' | 'high';
  aiRationaleAr: string;
  aiRationaleEn: string;
  category: 'heritage' | 'cafe' | 'dining' | 'prayer' | 'experience' | 'shopping' | 'nature';
  coordinates?: { lat: number; lng: number };
  googleMapsUrl?: string;
  imageUrl?: string;
  addressAr?: string;
  addressEn?: string;
  sourceAr?: string;
  sourceEn?: string;
}

export interface ItineraryResult {
  id: string;
  destinationNameAr: string;
  destinationNameEn: string;
  durationAr: string;
  durationEn: string;
  date: string;
  createdAt: string;
  totalDistanceAr: string;
  totalDistanceEn: string;
  accessibilityScore: number;
  items: ItineraryItem[];
  summaryAr: string;
  summaryEn: string;
}

export interface ImageAnalysisResult {
  titleAr: string;
  titleEn: string;
  locationAr: string;
  locationEn: string;
  historicalInfoAr: string;
  historicalInfoEn: string;
  culturalImportanceAr: string;
  culturalImportanceEn: string;
  nearbyPlacesAr: string[];
  nearbyPlacesEn: string[];
  sourceAr: string;
  sourceEn: string;
}
