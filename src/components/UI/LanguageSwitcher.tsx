import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useHome } from '../../Modules/Home/Provider/HomeContext';
import './LanguageSwitcher.scss';

const languageConfig: Record<string, { name: string; flag: React.ReactNode }> = {
  az: {
    name: 'Azərbaycan',
    flag: (
      <svg width="20" height="15" viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg">
        <rect width="1200" height="600" fill="#3f9c35" />
        <rect width="1200" height="400" fill="#ed2939" />
        <rect width="1200" height="200" fill="#00b5e2" />
        <circle cx="600" cy="300" r="60" fill="#fff" />
        <circle cx="615" cy="300" r="48" fill="#ed2939" />
        <path fill="#fff" d="M628.2 270l5.8 17.8 18.7.1-15 11 5.7 17.8-15.1-10.9-15.1 11 5.8-17.9L604 288l18.7-.1z" />
      </svg>
    )
  },
  en: {
    name: 'English',
    flag: (
      <svg width="20" height="15" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </svg>
    )
  },
  tr: {
    name: 'Türkçe',
    flag: (
      <svg width="20" height="15" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
        <rect width="1200" height="800" fill="#e30a17" />
        <circle cx="425" cy="400" r="200" fill="#fff" />
        <circle cx="475" cy="400" r="160" fill="#e30a17" />
        <path fill="#fff" d="M706.7 400l-63.3 20.6 39.1-53.8V433.2l-39.1-53.8 63.3 20.6z" />
      </svg>
    )
  }
};

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const { homeData } = useHome();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const availableLanguages = homeData?.languages || [];

  // Transform API languages to our UI format
  const languagesList = availableLanguages.map(apiLang => ({
    code: apiLang.lang,
    name: languageConfig[apiLang.lang]?.name || apiLang.lang.toUpperCase(),
    flag: languageConfig[apiLang.lang]?.flag || (
      <div className="language-switcher__flag-placeholder">
        {apiLang.lang.toUpperCase()}
      </div>
    )
  }));

  // If API data hasn't loaded yet, use a minimal default list to prevent shell layout breakage
  const displayLanguages = languagesList.length > 0 ? languagesList : [
    { code: 'az', name: 'Azərbaycan', flag: languageConfig.az.flag },
    { code: 'en', name: 'English', flag: languageConfig.en.flag }
  ];

  const currentLanguage = displayLanguages.find((lang) => lang.code === i18n.language) || displayLanguages[0];

  const handleLanguageChange = (code: string) => {
    if (code === i18n.language) return;
    localStorage.setItem('language', code);
    i18n.changeLanguage(code);
    setIsOpen(false);
    window.location.reload();
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="language-switcher" ref={dropdownRef}>
      <button
        className="language-switcher__trigger"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="language-switcher__flag">{currentLanguage.flag}</span>
        <span className="language-switcher__code">{currentLanguage.code.toUpperCase()}</span>
        <svg
          className={`language-switcher__arrow ${isOpen ? 'language-switcher__arrow--open' : ''}`}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            d="M2.5 4.5L6 8L9.5 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="language-switcher__dropdown"
            role="listbox"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {displayLanguages.map((lang) => (
              <li key={lang.code}>
                <button
                  className={`language-switcher__option ${lang.code === i18n.language ? 'language-switcher__option--active' : ''
                    }`}
                  onClick={() => handleLanguageChange(lang.code)}
                  role="option"
                  aria-selected={lang.code === i18n.language}
                >
                  <span className="language-switcher__flag">{lang.flag}</span>
                  <span className="language-switcher__name">{lang.name}</span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
