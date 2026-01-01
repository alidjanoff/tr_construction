import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './IntroScreen.scss';
import logo from '../../assets/images/logo.jpeg';
import { useTranslation } from 'react-i18next';

const IntroScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    // Check if intro was already shown in this session
    const introShown = sessionStorage.getItem('introShown');
    
    if (introShown) {
      setIsVisible(false);
      return;
    }

    // Hide intro after 2.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('introShown', 'true');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="intro-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <div className="intro-screen__content">
            {/* Logo with animation */}
            <motion.div
              className="intro-screen__logo-wrapper"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.6, 
                ease: [0.34, 1.56, 0.64, 1] 
              }}
            >
              <motion.div
                className="intro-screen__logo-glow"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.5, 0.3] }}
                transition={{ duration: 1.5, delay: 0.3 }}
              />
              <img 
                src={logo} 
                alt="TR Construction" 
                className="intro-screen__logo"
              />
            </motion.div>

            {/* Company name with typewriter effect */}
            <motion.div className="intro-screen__text">
              <motion.h1 className="intro-screen__title">
                {'TR Construction'.split('').map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.1,
                      delay: 0.8 + index * 0.05,
                      ease: 'easeOut',
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </motion.h1>
              <motion.p
                className="intro-screen__tagline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.8 }}
              >
                {t('intro.tagline')}
              </motion.p>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              className="intro-screen__loader"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.2, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroScreen;
