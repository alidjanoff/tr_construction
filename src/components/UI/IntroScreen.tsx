import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './IntroScreen.scss';

const IntroScreen = () => {
  const [isVisible, setIsVisible] = useState(() => !sessionStorage.getItem('introShown'));

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('introShown', 'true');
    }, 3500);

    return () => clearTimeout(timer);
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="intro-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          <div className="intro-screen__content">
            <div className="intro-screen__visual">
              {/* Geometric Minimalist Loader */}
              <div className="modern-loader">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: [0.2, 1, 0.2],
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.4,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
              <motion.div
                className="modern-loader__line"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 120, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroScreen;
