import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import CustomButton from '../../../components/UI/CustomButton';
import './HeroSection.scss';

// Construction images
const heroImage1 = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop';
const heroImage2 = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop';

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="hero" id="hero">
      <div className="hero__container">
        {/* Top Section: Title left, Info + Buttons right */}
        <div className="hero__top">
          <motion.div
            className="hero__title-wrapper"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="hero__title">{t('hero.title')}</h1>
          </motion.div>

          <motion.div
            className="hero__info"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="hero__subtitle">{t('hero.subtitle')}</p>
            
            {/* Buttons under info text */}
            <div className="hero__buttons">
              <Link to="/contact" className="hero__button-link">
                <CustomButton variant="primary" size="lg">
                  {t('nav.contact')}
                </CustomButton>
              </Link>
              <Link to="/about" className="hero__button-link">
                <CustomButton variant="outline" size="lg">
                  {t('nav.about')}
                </CustomButton>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Images Section */}
        <motion.div
          className="hero__images"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="hero__image-large">
            <img src={heroImage1} alt="Construction site" />
          </div>
          <div className="hero__image-small">
            <img src={heroImage2} alt="Modern building" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
