import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import LanguageSwitcher from '../UI/LanguageSwitcher';
import logo from '../../assets/images/logo.jpeg';
import './Header.scss';

const Header = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { key: 'home', href: '/' },
    { key: 'about', href: '/about' },
    { key: 'services', href: '/services' },
    { key: 'projects', href: '/projects' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Helper to check if link is active
  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  const isHomePage = location.pathname === '/';

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''} ${!isHomePage ? 'header--subpage' : ''}`}>
      <div className="header__container">
        <Link to="/" className="header__logo">
          <img src={logo} alt="TR Construction" />
          <span className="header__logo-text">TR Construction</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="header__nav">
          <ul className="header__nav-list">
            {navItems.map((item) => (
              <li key={item.key}>
                <Link
                  to={item.href}
                  className={`header__nav-link ${isActive(item.href) ? 'active' : ''}`}
                >
                  {t(`nav.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <LanguageSwitcher />
          <Link to="/contact" className="custom-button custom-button--primary custom-button--sm">
            <span className="custom-button__text">{t('nav.contact')}</span>
          </Link>
        </div>

      {/* Mobile Actions (Visible on small screens) */}
      <div className="header__mobile-actions">
        <button 
          className={`header__burger ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      </div>

      {/* Mobile Menu Overlay */}
      <div className={`header__mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="header__mobile-menu-header">
           <Link to="/" className="header__logo" onClick={() => setIsMobileMenuOpen(false)}>
            <img src={logo} alt="TR Construction" />
            <span className="header__logo-text">TR Construction</span>
          </Link>
          
          <button 
            className="header__close-btn"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            ✕
          </button>
        </div>

        <div className="header__mobile-lang-wrapper">
          <span className="header__mobile-lang-label">{t('nav.lang')}:</span>
          <LanguageSwitcher />
        </div>

        <nav className="header__mobile-nav">
          {navItems.map((item) => (
             <Link
              key={item.key}
              to={item.href}
              className={`header__mobile-link ${isActive(item.href) ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
        </nav>

        <div className="header__mobile-footer">
          <Link 
            to="/contact" 
            className="custom-button custom-button--primary custom-button--full-width"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="custom-button__text">{t('nav.contact')}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
