import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TripPlannerForm } from './components/TripPlannerForm';
import { ItineraryView } from './components/ItineraryView';
import { InteractiveMap } from './components/InteractiveMap';
import { HeritageFoodGuide } from './components/HeritageFoodGuide';
import { SmartFeatures } from './components/SmartFeatures';
import { MultimodalScanner } from './components/MultimodalScanner';
import { DestinationCards } from './components/DestinationCards';
import { HowItWorks } from './components/HowItWorks';
import { Footer } from './components/Footer';
import { Language, Theme, ItineraryResult, TripPlannerInput } from './types';
import { SAMPLE_RIYADH_ITINERARY, getCityFallbackItinerary } from './data/destinations';

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('rihlaty_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  const [itinerary, setItinerary] = useState<ItineraryResult | null>(SAMPLE_RIYADH_ITINERARY);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedDestForPlanner, setSelectedDestForPlanner] = useState<string>('الرياض');

  // Handle document direction and language switching
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  // Handle theme persistence and class switching on <html>
  useEffect(() => {
    localStorage.setItem('rihlaty_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectDestinationCard = (destName: string) => {
    setSelectedDestForPlanner(destName);
    setItinerary(getCityFallbackItinerary(destName));
    scrollToSection('planner');
  };

  const handleGenerateItinerary = async (input: TripPlannerInput) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...input, lang })
      });

      const json = await response.json();
      if (json.success && json.data) {
        setItinerary(json.data);
      } else {
        setItinerary(getCityFallbackItinerary(input.destination));
      }
    } catch (err) {
      console.error("Itinerary generation error:", err);
      setItinerary(getCityFallbackItinerary(input.destination));
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        scrollToSection('itinerary-results');
      }, 300);
    }
  };

  return (
    <div className={`min-h-screen bg-[#FAF8F3] dark:bg-[#171310] text-[#3B2A22] dark:text-[#FAF8F3] transition-colors duration-300 ${lang === 'ar' ? 'font-arabic' : 'font-sans'}`}>
      
      {/* Navigation */}
      <div className="sticky top-0 z-50 print:hidden">
        <Navbar
          lang={lang}
          setLang={setLang}
          theme={theme}
          setTheme={setTheme}
          onNavigate={scrollToSection}
        />
      </div>

      {/* Hero Section */}
      <div className="print:hidden">
        <Hero
          lang={lang}
          onStartPlanning={() => scrollToSection('planner')}
          onExploreDestinations={() => scrollToSection('destinations')}
        />
      </div>

      {/* Interactive Destination Cards */}
      <div className="print:hidden">
        <DestinationCards
          lang={lang}
          onSelectDestination={handleSelectDestinationCard}
        />
      </div>

      {/* AI Trip Planner Form */}
      <div className="print:hidden">
        <TripPlannerForm
          lang={lang}
          onGenerate={handleGenerateItinerary}
          isLoading={isLoading}
          selectedDestinationFromCard={selectedDestForPlanner}
        />
      </div>

      {/* Generated Itinerary Output */}
      {itinerary && (
        <div id="itinerary-results-container">
          <ItineraryView
            itinerary={itinerary}
            lang={lang}
            onReplan={() => scrollToSection('planner')}
          />
        </div>
      )}

      {/* Interactive Map Section */}
      <div className="print:hidden">
        <InteractiveMap
          lang={lang}
          onSelectDestination={handleSelectDestinationCard}
          selectedDestination={itinerary?.destinationNameAr || selectedDestForPlanner}
          itinerary={itinerary}
        />
      </div>

      {/* Traditional Food & Heritage Restaurant Section */}
      <div className="print:hidden">
        <HeritageFoodGuide 
          lang={lang} 
          onSelectDestination={handleSelectDestinationCard}
          selectedCityName={itinerary?.destinationNameAr || selectedDestForPlanner}
        />
      </div>

      {/* Smart AI Features Cards */}
      <div className="print:hidden">
        <SmartFeatures lang={lang} />
      </div>

      {/* Multimodal AI Heritage Lens / Scanner */}
      <div className="print:hidden">
        <MultimodalScanner lang={lang} />
      </div>

      {/* How It Works */}
      <div className="print:hidden">
        <HowItWorks lang={lang} />
      </div>

      {/* Footer */}
      <div className="print:hidden">
        <Footer
          lang={lang}
          onNavigate={scrollToSection}
        />
      </div>

    </div>
  );
}
