import React, { useState, useEffect } from 'react';
import { Utensils, MapPin, ExternalLink, Clock, Users, ShieldCheck, Flame, Sparkles, Search, X, Star, Award, DollarSign, Eye, Calendar } from 'lucide-react';
import { CITY_CULINARY_GUIDES, TraditionalRestaurant, HeritageDish, getCityCulinaryGuide } from '../data/heritageFoods';
import { Language } from '../types';
import { getGoogleMapsUrl } from '../utils/mapUtils';
import { getDestinationFallbackImage } from '../utils/imageHelper';
import { ImageWithFallback } from './ImageWithFallback';

interface HeritageFoodGuideProps {
  lang: Language;
  onSelectDestination?: (cityName: string) => void;
  selectedCityName?: string;
}

export const HeritageFoodGuide: React.FC<HeritageFoodGuideProps> = ({ lang, onSelectDestination, selectedCityName }) => {
  const [activeCityName, setActiveCityName] = useState<string>(selectedCityName || 'الرياض');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [highlightedRestaurantId, setHighlightedRestaurantId] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<{ url: string; title: string; subtitle?: string } | null>(null);

  // Auto-sync active city name when destination selected in planner/map/cards
  useEffect(() => {
    if (selectedCityName) {
      setActiveCityName(selectedCityName);
    }
  }, [selectedCityName]);

  const isRtl = lang === 'ar';
  const currentGuide = getCityCulinaryGuide(activeCityName);

  // Filter dishes & restaurants by search query
  const filteredDishes = currentGuide.dishes.filter(dish => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      dish.nameAr.toLowerCase().includes(q) ||
      dish.nameEn.toLowerCase().includes(q) ||
      dish.descriptionAr.toLowerCase().includes(q) ||
      dish.descriptionEn.toLowerCase().includes(q) ||
      dish.bestRestaurantNameAr.toLowerCase().includes(q) ||
      dish.bestRestaurantNameEn.toLowerCase().includes(q)
    );
  });

  const filteredRestaurants = currentGuide.restaurants.filter(rest => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      rest.nameAr.toLowerCase().includes(q) ||
      rest.nameEn.toLowerCase().includes(q) ||
      rest.specialtyAr.toLowerCase().includes(q) ||
      rest.specialtyEn.toLowerCase().includes(q) ||
      rest.recommendedDishesAr.some(d => d.toLowerCase().includes(q)) ||
      rest.recommendedDishesEn.some(d => d.toLowerCase().includes(q))
    );
  });

  const getCrowdBadge = (prediction: TraditionalRestaurant['crowdPrediction']) => {
    switch (prediction) {
      case 'low':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 text-xs font-bold border border-emerald-300 dark:border-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>🟢 {isRtl ? 'ازدحام خفيف (مثالي)' : 'Crowd: Low (Optimal)'}</span>
          </span>
        );
      case 'moderate':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 text-xs font-bold border border-amber-300 dark:border-amber-800">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>🟡 {isRtl ? 'ازدحام متوسط' : 'Crowd: Moderate'}</span>
          </span>
        );
      case 'high':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 text-xs font-bold border border-rose-300 dark:border-rose-800">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span>🔴 {isRtl ? 'ازدحام مرتفع (ذروة)' : 'Crowd: High (Peak)'}</span>
          </span>
        );
      default:
        return null;
    }
  };

  const handleDishClickRestaurant = (restaurantId: string) => {
    setHighlightedRestaurantId(restaurantId);
    const element = document.getElementById(`restaurant-${restaurantId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    setTimeout(() => {
      setHighlightedRestaurantId(null);
    }, 4000);
  };

  return (
    <section id="heritage-food" className="py-12 bg-white dark:bg-[#1A1411] border-t border-[#F3E6D0] dark:border-[#493A2F] transition-colors relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F3] dark:bg-[#241D18] border border-[#F3E6D0] dark:border-[#493A2F] text-[#C58B5C] dark:text-[#D6AD72] text-xs font-bold shadow-2xs">
            <Utensils className="w-4 h-4 text-[#4F6F52]" />
            <span>{isRtl ? 'دليل الأكلات الشعبية والمطاعم الموصى بها حسب المدينة' : 'City Popular Food & Recommended Restaurants'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3B2A22] dark:text-[#FAF8F3]">
            {isRtl ? '🍲 الأكل الشعبي والمطاعم الأفضل في كل مدينة' : '🍲 Popular Heritage Dishes & Top Rated Restaurants'}
          </h2>
          <p className="text-sm sm:text-base text-[#3B2A22]/80 dark:text-[#C8BDB2] max-w-2xl mx-auto font-medium">
            {isRtl 
              ? 'تذوّق أشهر الأطباق السعودية الشعبية بالصور، مع المطاعم المقترحة والأفضل تحضيراً لكل أكلة، وتوقعات الازدحام الحية وأفضل أوقات الزيارة.'
              : 'Discover famous regional Saudi dishes with photos, paired with top recommended restaurants for each dish, live crowd levels, and visit tips.'}
          </p>
        </div>

        {/* City Selector Buttons */}
        <div className="flex justify-center gap-2.5 mb-6 flex-wrap">
          {Object.entries(CITY_CULINARY_GUIDES).map(([key, guide]) => {
            const isSelected = activeCityName.toLowerCase().includes(key) || currentGuide.cityId === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setActiveCityName(guide.cityNameAr);
                  setSearchQuery('');
                  if (onSelectDestination) {
                    onSelectDestination(guide.cityNameAr);
                  }
                }}
                className={`px-4 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-[#3B2A22] text-white dark:bg-[#C58B5C] shadow-md scale-105'
                    : 'bg-[#FAF8F3] dark:bg-[#241D18] text-[#3B2A22] dark:text-[#FAF8F3] border border-[#F3E6D0] dark:border-[#493A2F] hover:bg-[#F3E6D0] dark:hover:bg-[#30251E]'
                }`}
              >
                <span>📍 {isRtl ? guide.cityNameAr : guide.cityNameEn}</span>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8 relative">
          <div className="relative">
            <Search className={`w-4 h-4 text-gray-400 absolute top-1/2 -translate-y-1/2 ${isRtl ? 'right-3.5' : 'left-3.5'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isRtl ? 'ابحث عن أكلة شعبية أو مطعم تراثي...' : 'Search for a popular dish or heritage restaurant...'}
              className={`w-full py-2.5 rounded-2xl bg-[#FAF8F3] dark:bg-[#241D18] text-xs sm:text-sm border border-[#F3E6D0] dark:border-[#493A2F] text-[#3B2A22] dark:text-[#FAF8F3] focus:outline-none focus:ring-2 focus:ring-[#C58B5C] transition-all ${
                isRtl ? 'pr-10 pl-9' : 'pl-10 pr-9'
              }`}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className={`text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 absolute top-1/2 -translate-y-1/2 ${isRtl ? 'left-3' : 'right-3'}`}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Content Grid: Dishes (Left 6 Cols) vs Restaurants (Right 6 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Traditional Dishes with Photos */}
          <div className="lg:col-span-6 bg-[#FAF8F3] dark:bg-[#241D18] p-5 sm:p-6 rounded-3xl border border-[#F3E6D0] dark:border-[#493A2F] space-y-5 shadow-2xs">
            <div className="flex items-center justify-between border-b border-[#F3E6D0] dark:border-[#493A2F] pb-3">
              <h3 className="font-extrabold text-base sm:text-lg text-[#3B2A22] dark:text-[#FAF8F3] flex items-center gap-2">
                <span>🫓</span>
                <span>{isRtl ? `الأكلات الشعبية في ${currentGuide.cityNameAr}` : `Popular Dishes in ${currentGuide.cityNameEn}`}</span>
              </h3>
              <span className="text-xs bg-[#4F6F52] text-white font-bold px-2.5 py-1 rounded-full">
                {filteredDishes.length} {isRtl ? 'أطباق شعبية' : 'Popular Dishes'}
              </span>
            </div>

            {filteredDishes.length === 0 ? (
              <p className="text-xs text-center py-6 text-gray-500">
                {isRtl ? 'لم نجد أكلات تطابق بحثك في هذه المدينة' : 'No dishes matching your search'}
              </p>
            ) : (
              <div className="space-y-4">
                {filteredDishes.map((dish) => (
                  <div 
                    key={dish.id}
                    className="bg-white dark:bg-[#1A1411] rounded-2xl border border-[#F3E6D0] dark:border-[#493A2F] overflow-hidden hover:border-[#C58B5C] transition-all shadow-2xs group flex flex-col sm:flex-row items-stretch"
                  >
                    {/* Dish Photo */}
                    <div className="relative sm:w-44 h-40 sm:h-auto shrink-0 overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <ImageWithFallback
                        src={dish.imageUrl}
                        fallbackSrc={getDestinationFallbackImage(currentGuide.cityNameAr, 'dining')}
                        alt={isRtl ? dish.nameAr : dish.nameEn}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <button
                        type="button"
                        onClick={() => setPreviewImage({ url: dish.imageUrl, title: isRtl ? dish.nameAr : dish.nameEn, subtitle: isRtl ? dish.originRegionAr : dish.originRegionEn })}
                        className="absolute bottom-2 right-2 bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-full backdrop-blur-xs text-xs flex items-center gap-1 px-2 font-bold cursor-pointer transition-colors"
                        title={isRtl ? "تكبير الصورة" : "Zoom photo"}
                      >
                        <Eye className="w-3 h-3" />
                        <span className="text-[10px]">{isRtl ? 'عرض' : 'View'}</span>
                      </button>
                      <span className="absolute top-2 left-2 text-xl bg-white/80 dark:bg-black/70 p-1 rounded-xl backdrop-blur-xs">
                        {dish.icon || '🍲'}
                      </span>
                    </div>

                    {/* Dish Information */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-2.5">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-extrabold text-sm sm:text-base text-[#3B2A22] dark:text-[#FAF8F3]">
                            {isRtl ? dish.nameAr : dish.nameEn}
                          </h4>
                          <span className="text-[11px] font-bold text-[#4F6F52] dark:text-[#D6AD72] bg-[#FAF8F3] dark:bg-[#241D18] px-2 py-0.5 rounded-full border border-[#F3E6D0] dark:border-[#493A2F] whitespace-nowrap shrink-0 flex items-center gap-1">
                            <DollarSign className="w-3 h-3 text-[#C58B5C]" />
                            <span>{isRtl ? dish.priceEstimateAr : dish.priceEstimateEn}</span>
                          </span>
                        </div>
                        <p className="text-[11px] text-[#3B2A22]/70 dark:text-[#C8BDB2] mt-0.5 font-medium">
                          📍 {isRtl ? dish.originRegionAr : dish.originRegionEn}
                        </p>
                        <p className="text-xs text-[#3B2A22]/85 dark:text-[#C8BDB2] leading-relaxed mt-1.5 font-medium">
                          {isRtl ? dish.descriptionAr : dish.descriptionEn}
                        </p>
                      </div>

                      {/* Best Recommended Restaurant for this Dish */}
                      <div className="pt-2 border-t border-[#F3E6D0] dark:border-[#493A2F]/60 flex items-center justify-between text-xs">
                        <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <Award className="w-3.5 h-3.5 text-amber-500" />
                          <span>{isRtl ? 'المطعم الأفضل لتناولها:' : 'Best Restaurant:'}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDishClickRestaurant(dish.bestRestaurantId)}
                          className="px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800 font-bold hover:bg-amber-100 dark:hover:bg-amber-900 transition-colors flex items-center gap-1 text-[11px] cursor-pointer"
                        >
                          <span>🏪 {isRtl ? dish.bestRestaurantNameAr : dish.bestRestaurantNameEn}</span>
                          <span className="text-amber-600 dark:text-amber-400">➔</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="p-3.5 bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-200 font-medium flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>
                {isRtl 
                  ? 'تم اختيار وتحديد هذه الأطباق بناءً على الوصفات التاريخية المعتمدة للمنطقة والمطاعم الأكثر حواوزاً لرضا الزوار.'
                  : 'Selected based on certified regional recipes and top visitor ratings.'}
              </span>
            </div>
          </div>

          {/* Right Column: Recommended Traditional Restaurants with Photos */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between bg-[#FAF8F3] dark:bg-[#241D18] p-4 rounded-2xl border border-[#F3E6D0] dark:border-[#493A2F]">
              <h3 className="font-extrabold text-base sm:text-lg text-[#3B2A22] dark:text-[#FAF8F3] flex items-center gap-2">
                <span>🏪</span>
                <span>{isRtl ? `المطاعم الشعبية المقترحة والأفضل` : `Top Recommended Heritage Restaurants`}</span>
              </h3>
              <span className="text-xs font-bold text-[#4F6F52] dark:text-[#D6AD72] flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{isRtl ? 'مؤشر الازدحام' : 'Crowd Forecast'}</span>
              </span>
            </div>

            {filteredRestaurants.length === 0 ? (
              <p className="text-xs text-center py-6 text-gray-500">
                {isRtl ? 'لم نجد مطاعم تطابق بحثك' : 'No restaurants found matching your query'}
              </p>
            ) : (
              <div className="space-y-4">
                {filteredRestaurants.map((rest) => {
                  const isHighlighted = highlightedRestaurantId === rest.id;
                  return (
                    <div
                      key={rest.id}
                      id={`restaurant-${rest.id}`}
                      className={`bg-white dark:bg-[#241D18] rounded-3xl border transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-md ${
                        isHighlighted 
                          ? 'border-2 border-amber-500 ring-4 ring-amber-200 dark:ring-amber-900/50 scale-101' 
                          : 'border-[#F3E6D0] dark:border-[#493A2F]'
                      }`}
                    >
                      {/* Restaurant Image Banner */}
                      <div className="relative h-44 sm:h-48 w-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                        <ImageWithFallback
                          src={rest.imageUrl}
                          fallbackSrc={getDestinationFallbackImage(currentGuide.cityNameAr, 'dining')}
                          alt={isRtl ? rest.nameAr : rest.nameEn}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                        
                        {/* Rating Badge */}
                        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-300 border border-amber-400/40 flex items-center gap-1 shadow-sm">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{rest.rating}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => setPreviewImage({ url: rest.imageUrl, title: isRtl ? rest.nameAr : rest.nameEn, subtitle: isRtl ? rest.locationAr : rest.locationEn })}
                          className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-full backdrop-blur-xs text-xs flex items-center gap-1 px-2 font-bold cursor-pointer transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span className="text-[10px]">{isRtl ? 'عرض الصورة' : 'View'}</span>
                        </button>

                        {/* Title overlay on image */}
                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <h4 className="font-extrabold text-lg sm:text-xl drop-shadow-md">
                            {isRtl ? rest.nameAr : rest.nameEn}
                          </h4>
                          <p className="text-xs text-gray-200 flex items-center gap-1 font-medium drop-shadow-xs">
                            <MapPin className="w-3.5 h-3.5 text-[#D6AD72]" />
                            <span>{isRtl ? rest.locationAr : rest.locationEn}</span>
                          </p>
                        </div>
                      </div>

                      {/* Details Box */}
                      <div className="p-4 sm:p-5 space-y-3.5">
                        
                        {/* Specialty & Recommended Dishes */}
                        <div className="space-y-2">
                          <p className="text-xs text-[#3B2A22] dark:text-[#FAF8F3] font-medium leading-relaxed">
                            {isRtl ? rest.specialtyAr : rest.specialtyEn}
                          </p>
                          <div className="flex flex-wrap items-center gap-1.5 pt-1">
                            <span className="text-[11px] font-bold text-[#4F6F52] dark:text-[#D6AD72] flex items-center gap-1">
                              <Flame className="w-3.5 h-3.5 text-[#C58B5C]" />
                              <span>{isRtl ? 'الأطباق الأكثر طلباً:' : 'Famous Dishes:'}</span>
                            </span>
                            {(isRtl ? rest.recommendedDishesAr : rest.recommendedDishesEn).map((dishName, i) => (
                              <span
                                key={i}
                                className="px-2.5 py-0.5 rounded-full bg-[#FAF8F3] dark:bg-[#1A1411] text-[#3B2A22] dark:text-[#FAF8F3] text-[11px] font-bold border border-[#F3E6D0] dark:border-[#493A2F]"
                              >
                                {dishName}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Crowd & Best Time */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                          <div className="p-2.5 rounded-xl bg-[#FAF8F3] dark:bg-[#1A1411] border border-[#F3E6D0] dark:border-[#493A2F] space-y-1">
                            <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 block">
                              {isRtl ? 'مؤشر الازدحام المتوقع:' : 'Crowd Forecast:'}
                            </span>
                            {getCrowdBadge(rest.crowdPrediction)}
                            <p className="text-[11px] font-semibold text-[#3B2A22]/80 dark:text-[#C8BDB2] pt-1">
                              {isRtl ? rest.crowdTextAr : rest.crowdTextEn}
                            </p>
                          </div>

                          <div className="p-2.5 rounded-xl bg-[#FAF8F3] dark:bg-[#1A1411] border border-[#F3E6D0] dark:border-[#493A2F] space-y-1">
                            <span className="text-[10px] font-bold text-[#4F6F52] dark:text-[#D6AD72] flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{isRtl ? 'الوقت الذهبي لتجنب الانتظار:' : 'Best Visit Time:'}</span>
                            </span>
                            <p className="text-xs font-bold text-[#3B2A22] dark:text-[#FAF8F3]">
                              {isRtl ? rest.bestTimeToVisitAr : rest.bestTimeToVisitEn}
                            </p>
                          </div>
                        </div>

                        {/* Accessibility & Google Maps Link */}
                        <div className="pt-2 border-t border-[#F3E6D0] dark:border-[#493A2F] flex flex-wrap items-center justify-between gap-2 text-xs">
                          <span className="flex items-center gap-1.5 text-[#4F6F52] dark:text-[#D6AD72] font-semibold">
                            <ShieldCheck className="w-4 h-4 text-[#4F6F52] shrink-0" />
                            <span>{isRtl ? rest.accessibilityAr : rest.accessibilityEn}</span>
                          </span>

                          <a
                            href={getGoogleMapsUrl(isRtl ? rest.nameAr : rest.nameEn, undefined, isRtl ? currentGuide.cityNameAr : currentGuide.cityNameEn, undefined, rest.googleMapsUrl)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-1.5 rounded-full bg-[#4F6F52] hover:bg-[#3B2A22] text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
                          >
                            <MapPin className="w-3.5 h-3.5 text-[#D6AD72]" />
                            <span>{isRtl ? '📍 موقع قوقل ماب الدقيق' : '📍 Google Maps'}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Image Preview Modal / Lightbox */}
      {previewImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setPreviewImage(null)}
        >
          <div 
            className="relative max-w-3xl w-full bg-[#1A1411] border border-[#493A2F] rounded-3xl overflow-hidden shadow-2xl space-y-4 p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between text-white border-b border-[#493A2F] pb-3">
              <div>
                <h3 className="font-extrabold text-lg sm:text-xl text-[#FAF8F3]">{previewImage.title}</h3>
                {previewImage.subtitle && (
                  <p className="text-xs text-[#D6AD72]">{previewImage.subtitle}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="w-full max-h-[70vh] rounded-2xl overflow-hidden bg-black flex items-center justify-center">
              <img
                src={previewImage.url}
                alt={previewImage.title}
                className="max-h-[70vh] w-auto object-contain rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
