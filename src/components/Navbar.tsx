import React, { useState } from 'react';
import { Sparkles, Globe, MapPin, Menu, X, ArrowLeft, ArrowRight, Sun, Moon, Lock, Utensils } from 'lucide-react';
import { Language, Theme } from '../types';
import { translations } from '../data/translations';
import { PalmIcon } from './PalmIcon';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, setLang, theme, setTheme, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang];
  const isRtl = lang === 'ar';

  const toggleLanguage = () => {
    setLang(lang === 'ar' ? 'en' : 'ar');
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-[#241D18]/95 backdrop-blur-md border-b border-[#F3E6D0] dark:border-[#493A2F] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-2 sm:gap-4">
          
          {/* Logo with Palm Tree Icon */}
          <div 
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#3B2A22] dark:bg-[#30251E] text-[#FAF8F3] flex items-center justify-center shadow-sm border border-[#F3E6D0] dark:border-[#493A2F] group-hover:bg-[#4F6F52] dark:group-hover:bg-[#4F6F52] transition-colors">
              <PalmIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#C58B5C] dark:text-[#D6AD72] group-hover:text-white transition-colors" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black text-[#3B2A22] dark:text-[#FAF8F3] leading-none tracking-tight">
                  {t.brandName}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#4F6F52]/10 text-[#4F6F52] dark:text-[#D6AD72] text-[10px] font-bold">
                  <Lock className="w-2.5 h-2.5" />
                  <span>SSL</span>
                </span>
              </div>
              <span className="text-[10px] font-bold text-[#C58B5C] dark:text-[#D6AD72] tracking-widest uppercase mt-0.5">
                {t.brandSub}
              </span>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs xl:text-sm font-semibold text-[#3B2A22] dark:text-[#C8BDB2]">
            <button 
              onClick={() => handleNavClick('hero')}
              className="px-2.5 py-2 xl:px-3.5 xl:py-2 rounded-xl text-[#4F6F52] dark:text-[#D6AD72] font-bold bg-[#4F6F52]/10 dark:bg-[#4F6F52]/20 border border-[#4F6F52]/20 dark:border-[#4F6F52]/40 transition-colors whitespace-nowrap"
            >
              {t.navHome}
            </button>
            <button 
              onClick={() => handleNavClick('planner')}
              className="px-2.5 py-2 xl:px-3.5 xl:py-2 rounded-xl hover:text-[#4F6F52] dark:hover:text-[#FAF8F3] hover:bg-[#FAF8F3] dark:hover:bg-[#30251E] transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C58B5C] dark:text-[#D6AD72]" />
              <span>{t.navPlan}</span>
            </button>
            <button 
              onClick={() => handleNavClick('destinations')}
              className="px-2.5 py-2 xl:px-3.5 xl:py-2 rounded-xl hover:text-[#4F6F52] dark:hover:text-[#FAF8F3] hover:bg-[#FAF8F3] dark:hover:bg-[#30251E] transition-colors whitespace-nowrap"
            >
              {t.navDestinations}
            </button>
            <button 
              onClick={() => handleNavClick('map')}
              className="px-2.5 py-2 xl:px-3.5 xl:py-2 rounded-xl hover:text-[#4F6F52] dark:hover:text-[#FAF8F3] hover:bg-[#FAF8F3] dark:hover:bg-[#30251E] transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <MapPin className="w-3.5 h-3.5 text-[#4F6F52] dark:text-[#D6AD72]" />
              <span>{t.navMap}</span>
            </button>
            <button 
              onClick={() => handleNavClick('heritage-food')}
              className="px-2.5 py-2 xl:px-3.5 xl:py-2 rounded-xl hover:text-[#4F6F52] dark:hover:text-[#FAF8F3] hover:bg-[#FAF8F3] dark:hover:bg-[#30251E] transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <Utensils className="w-3.5 h-3.5 text-[#C58B5C] dark:text-[#D6AD72]" />
              <span>{isRtl ? 'الأكل التراثي' : 'Heritage Food'}</span>
            </button>
            <button 
              onClick={() => handleNavClick('lens')}
              className="px-2.5 py-2 xl:px-3.5 xl:py-2 rounded-xl hover:text-[#4F6F52] dark:hover:text-[#FAF8F3] hover:bg-[#FAF8F3] dark:hover:bg-[#30251E] transition-colors whitespace-nowrap"
            >
              {t.navLens}
            </button>
            <button 
              onClick={() => handleNavClick('how-it-works')}
              className="px-2.5 py-2 xl:px-3.5 xl:py-2 rounded-xl hover:text-[#4F6F52] dark:hover:text-[#FAF8F3] hover:bg-[#FAF8F3] dark:hover:bg-[#30251E] transition-colors whitespace-nowrap"
            >
              {t.navHowItWorks}
            </button>
          </div>

          {/* Action, Theme & Language Toggle */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-2.5 shrink-0">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-9 h-9 xl:w-10 xl:h-10 rounded-full border border-[#F3E6D0] dark:border-[#493A2F] bg-[#FAF8F3] dark:bg-[#30251E] text-[#3B2A22] dark:text-[#FAF8F3] text-xs font-bold hover:bg-[#F3E6D0] dark:hover:bg-[#493A2F] transition-all shadow-sm shrink-0"
              title={theme === 'light' ? (lang === 'ar' ? 'التحويل للوضع الليلي' : 'Switch to Dark Mode') : (lang === 'ar' ? 'التحويل للوضع النهار' : 'Switch to Light Mode')}
            >
              {theme === 'light' ? (
                <Sun className="w-4 h-4 text-[#C58B5C]" />
              ) : (
                <Moon className="w-4 h-4 text-[#D6AD72]" />
              )}
            </button>

            {/* Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-2 xl:px-3.5 xl:py-2 rounded-full border border-[#C58B5C]/30 dark:border-[#493A2F] bg-[#FAF8F3] dark:bg-[#30251E] text-[#3B2A22] dark:text-[#FAF8F3] text-xs font-bold hover:bg-[#F3E6D0] dark:hover:bg-[#493A2F] transition-all shadow-sm shrink-0 cursor-pointer"
              title={lang === 'ar' ? 'Switch to English' : 'التحويل إلى اللغة العربية'}
            >
              <Globe className="w-4 h-4 text-[#C58B5C] dark:text-[#D6AD72]" />
              <span className="text-[#C58B5C] dark:text-[#D6AD72] font-black tracking-wide">
                {lang === 'ar' ? 'English' : 'العربية'}
              </span>
            </button>
          </div>

          {/* Mobile Actions Header */}
          <div className="flex lg:hidden items-center gap-2 shrink-0">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-[#F3E6D0] dark:border-[#493A2F] bg-[#FAF8F3] dark:bg-[#30251E] text-xs font-bold text-[#3B2A22] dark:text-[#FAF8F3]"
              title="Toggle Theme"
            >
              {theme === 'light' ? <Sun className="w-4 h-4 text-[#C58B5C]" /> : <Moon className="w-4 h-4 text-[#D6AD72]" />}
            </button>
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-[#C58B5C]/40 dark:border-[#493A2F] bg-[#F3E6D0]/60 dark:bg-[#30251E] text-xs font-black text-[#C58B5C] dark:text-[#D6AD72]"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#3B2A22] dark:text-[#FAF8F3] hover:bg-[#F3E6D0] dark:hover:bg-[#30251E] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#C58B5C]/20 dark:border-[#493A2F] bg-[#FAF8F3] dark:bg-[#241D18] px-4 pt-2 pb-6 space-y-2 shadow-xl animate-fadeIn">
          <button
            onClick={() => handleNavClick('hero')}
            className="w-full text-start px-4 py-3 rounded-xl font-medium text-[#3B2A22] dark:text-[#FAF8F3] hover:bg-[#F3E6D0] dark:hover:bg-[#30251E]"
          >
            {t.navHome}
          </button>
          <button
            onClick={() => handleNavClick('planner')}
            className="w-full text-start px-4 py-3 rounded-xl font-medium text-[#4F6F52] dark:text-[#D6AD72] bg-[#F3E6D0]/60 dark:bg-[#30251E] flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C58B5C] dark:text-[#D6AD72]" />
              {t.navPlan}
            </span>
            <span className="text-xs bg-[#4F6F52] text-white px-2 py-0.5 rounded-full font-bold">AI</span>
          </button>
          <button
            onClick={() => handleNavClick('destinations')}
            className="w-full text-start px-4 py-3 rounded-xl font-medium text-[#3B2A22] dark:text-[#FAF8F3] hover:bg-[#F3E6D0] dark:hover:bg-[#30251E]"
          >
            {t.navDestinations}
          </button>
          <button
            onClick={() => handleNavClick('map')}
            className="w-full text-start px-4 py-3 rounded-xl font-medium text-[#3B2A22] dark:text-[#FAF8F3] hover:bg-[#F3E6D0] dark:hover:bg-[#30251E]"
          >
            {t.navMap}
          </button>
          <button
            onClick={() => handleNavClick('heritage-food')}
            className="w-full text-start px-4 py-3 rounded-xl font-medium text-[#3B2A22] dark:text-[#FAF8F3] hover:bg-[#F3E6D0] dark:hover:bg-[#30251E] flex items-center gap-2"
          >
            <Utensils className="w-4 h-4 text-[#C58B5C]" />
            <span>{isRtl ? 'الأكل التراثي والمطاعم' : 'Heritage Food & Restaurants'}</span>
          </button>
          <button
            onClick={() => handleNavClick('lens')}
            className="w-full text-start px-4 py-3 rounded-xl font-medium text-[#3B2A22] dark:text-[#FAF8F3] hover:bg-[#F3E6D0] dark:hover:bg-[#30251E]"
          >
            {t.navLens}
          </button>
          <button
            onClick={() => handleNavClick('how-it-works')}
            className="w-full text-start px-4 py-3 rounded-xl font-medium text-[#3B2A22] dark:text-[#FAF8F3] hover:bg-[#F3E6D0] dark:hover:bg-[#30251E]"
          >
            {t.navHowItWorks}
          </button>

          <div className="pt-2 space-y-2">
            <button
              onClick={toggleLanguage}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#C58B5C]/30 dark:border-[#493A2F] bg-white dark:bg-[#30251E] text-[#3B2A22] dark:text-[#FAF8F3] font-bold text-xs shadow-sm"
            >
              <Globe className="w-4 h-4 text-[#C58B5C] dark:text-[#D6AD72]" />
              <span>{lang === 'ar' ? 'تغيير إلى English' : 'Switch to العربية'}</span>
            </button>

            <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#F3E6D0] dark:border-[#493A2F] bg-white dark:bg-[#30251E] text-[#3B2A22] dark:text-[#FAF8F3] font-bold text-xs shadow-sm"
            >
              {theme === 'light' ? (
                <>
                  <Sun className="w-4 h-4 text-[#C58B5C]" />
                  <span>☀️ {t.themeLight}</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-[#D6AD72]" />
                  <span className="text-[#D6AD72]">🌙 {t.themeDark}</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

