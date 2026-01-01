import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import CustomButton from '../../../components/UI/CustomButton';
import ConstructionSiteScene from './ConstructionSiteScene';
import './HeroSection.scss';

const HeroSection = () => {
  const { t } = useTranslation();

  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="hero">
      <div className="hero__container">
        <div className="hero__content">
          <motion.div
            className="hero__text"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span
              className="hero__badge"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              TR Construction
            </motion.span>
            
            <motion.h1
              className="hero__title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {t('hero.title')}
            </motion.h1>
            
            <motion.p
              className="hero__subtitle"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              className="hero__buttons"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <CustomButton
                variant="primary"
                size="lg"
                onClick={() => handleScrollTo('#about')}
              >
                {t('hero.cta')}
              </CustomButton>
              <CustomButton
                variant="outline"
                size="lg"
                onClick={() => handleScrollTo('#projects')}
              >
                {t('hero.ctaSecondary')}
              </CustomButton>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero__3d"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ConstructionSiteScene />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="hero__scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <div className="hero__scroll-mouse">
            <div className="hero__scroll-wheel" />
          </div>
          <span>Scroll</span>
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="hero__bg-decoration" />
    </section>
  );
};

export default HeroSection;
