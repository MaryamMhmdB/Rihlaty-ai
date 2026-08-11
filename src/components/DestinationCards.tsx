import React from 'react';
import { ArrowLeft, ArrowRight, Star, ShieldCheck, MapPin, ExternalLink } from 'lucide-react';
import { DESTINATIONS } from '../data/destinations';
import { Language } from '../types';
import { translations } from '../data/translations';
import { PalmIcon } from './PalmIcon';
import { ImageWithFallback } from './ImageWithFallback';
import { getGoogleMapsUrl } from '../utils/mapUtils';
import alulaImg from '../assets/images/alula_hegra_tomb_1786293300477.jpg';
import diriyahImg from '../assets/images/diriyah_atturaif_1786293313850.jpg';
import jeddahImg from '../assets/images/jeddah_albalad_1786293328938.jpg';
import riyadhImg from '../assets/images/riyadh_masmak_fortress_1786344318620.jpg';
import abhaImg from '../assets/images/abha_green_mountain_1786344292130.jpg';
import taifImg from '../assets/images/taif_heritage_mountains_1786344305214.jpg';
import alahsaImg from '../assets/images/alahsa_oasis_palms_1786344334756.jpg';

interface DestinationCardsProps {
  lang: Language;
  onSelectDestination: (destName: string) => void;
}

const FALLBACK_MAP: Record<string, string> = {
  alula: alulaImg,
  diriyah: diriyahImg,
  jeddah: jeddahImg,
  riyadh: riyadhImg,
  abha: abhaImg,
  taif: taifImg,
  alahsa: alahsaImg,
};

export const DestinationCards: React.FC<DestinationCardsProps> = ({ lang, onSelectDestination }) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';

  return (
    <section id="destinations" className="py-12 bg-[#FAF8F3] dark:bg-[#171310] relative border-t border-[#F3E6D0] dark:border-[#493A2F] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#241D18] border border-[#F3E6D0] dark:border-[#493A2F] text-[#3B2A22] dark:text-[#FAF8F3] text-xs font-bold shadow-sm">
            <PalmIcon className="w-4 h-4 text-[#C58B5C] dark:text-[#D6AD72]" />
            <span>{lang === 'ar' ? 'معالم التراث السعودي' : 'Saudi Heritage Landmarks'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3B2A22] dark:text-[#FAF8F3]">
            {t.destSectionTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#3B2A22]/80 dark:text-[#C8BDB2] max-w-2xl mx-auto font-medium">
            {t.destSectionSub}
          </p>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DESTINATIONS.map((dest) => (
            <div
              key={dest.id}
              className="bg-white dark:bg-[#30251E] border border-[#F3E6D0] dark:border-[#493A2F] rounded-3xl overflow-hidden shadow-sm hover:shadow-md hover:border-[#4F6F52] dark:hover:border-[#4F6F52] transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <ImageWithFallback
                  src={dest.image}
                  fallbackSrc={FALLBACK_MAP[dest.id] || FALLBACK_MAP.alula}
                  alt={dest.nameAr}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#171310]/80 via-transparent to-transparent" />

                {/* UNESCO Tag */}
                <div className="absolute top-3 right-3 rtl:left-3 rtl:right-auto bg-[#171310]/85 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-1.5 shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C58B5C] dark:text-[#D6AD72]" />
                  <span>{isRtl ? dest.tagAr : dest.tagEn}</span>
                </div>

                {/* Rating Badge */}
                <div className="absolute bottom-3 right-3 rtl:left-3 rtl:right-auto flex items-center gap-1 text-xs font-bold text-white bg-[#171310]/70 px-2.5 py-0.5 rounded-md backdrop-blur-sm border border-white/10">
                  <Star className="w-3.5 h-3.5 text-[#D6AD72] fill-[#D6AD72]" />
                  <span>{dest.rating}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <h3 className="text-xl font-bold text-[#3B2A22] dark:text-[#FAF8F3]">
                    {isRtl ? dest.nameAr : dest.nameEn}
                  </h3>
                  <p className="text-xs font-bold text-[#4F6F52] dark:text-[#D6AD72]">
                    "{isRtl ? dest.subtitleAr : dest.subtitleEn}"
                  </p>
                  <p className="text-xs text-[#3B2A22]/80 dark:text-[#C8BDB2] leading-relaxed font-medium pt-0.5">
                    {isRtl ? dest.descriptionAr : dest.descriptionEn}
                  </p>
                </div>

                {/* Action CTA Buttons */}
                <div className="pt-3 border-t border-[#F3E6D0] dark:border-[#493A2F] space-y-2">
                  <a
                    href={getGoogleMapsUrl(isRtl ? dest.nameAr : dest.nameEn, undefined, isRtl ? dest.nameAr : dest.nameEn, dest.coordinates)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-full bg-[#FAF8F3] dark:bg-[#241D18] hover:bg-[#F3E6D0] dark:hover:bg-[#493A2F] text-[#3B2A22] dark:text-[#FAF8F3] font-bold text-xs border border-[#F3E6D0] dark:border-[#493A2F] transition-all flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#C58B5C] dark:text-[#D6AD72]" />
                    <span>{isRtl ? '📍 موقع قوقل ماب الدقيق' : '📍 Exact Google Maps Location'}</span>
                    <ExternalLink className="w-3 h-3 text-gray-400" />
                  </a>

                  <button
                    onClick={() => onSelectDestination(dest.nameAr)}
                    className="w-full py-2.5 px-4 rounded-full bg-[#4F6F52] hover:bg-[#3B2A22] dark:hover:bg-[#C58B5C] text-white font-bold text-xs sm:text-sm shadow-sm transition-all duration-200 flex items-center justify-center gap-2 group-hover:gap-3 cursor-pointer"
                  >
                    <span>{t.exploreBtn}</span>
                    {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
