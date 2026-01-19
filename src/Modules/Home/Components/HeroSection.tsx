import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination, Autoplay, Navigation } from 'swiper/modules';
import CustomButton from '../../../components/UI/CustomButton';
import { useHome } from '../Provider/HomeContext';
import { getTranslation } from '../../../utils/translations';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './HeroSection.scss';

// Fallback images for when API data is not available
import swiper1 from '../../../assets/images/swiper1.webp';
import swiper2 from '../../../assets/images/swiper2.jpg';
import swiper3 from '../../../assets/images/swiper3.avif';
import swiper4 from '../../../assets/images/swiper.avif';

const fallbackImages = [swiper1, swiper2, swiper3, swiper4];

const HeroSection = () => {
  const { t } = useTranslation();
  const { homeData, currentLang } = useHome();

  // Get hero data from API or use fallback
  const hero = homeData?.hero;
  const heroImages = hero?.images?.length ? hero.images : fallbackImages;
  const heroTitle = hero ? getTranslation(hero.title, currentLang) : t('hero.title');
  const heroSubtitle = hero ? getTranslation(hero.info, currentLang) : t('hero.subtitle');

  const slides = heroImages.map((image) => ({
    image,
    title: heroTitle,
    subtitle: heroSubtitle,
  }));

  return (
    <section className="hero" id="hero">
      <Swiper
        modules={[Mousewheel, Pagination, Autoplay, Navigation]}
        speed={1200}
        mousewheel={{
          releaseOnEdges: true,
          sensitivity: 1,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: false,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="hero__swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="hero__image-wrapper">
              <img src={slide.image} alt={`Construction ${index + 1}`} />
              <div className="hero__overlay"></div>
            </div>

            <div className="hero__content">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="hero__text-container"
              >
                <h1 className="hero__title">{slide.title}</h1>
                <p className="hero__subtitle">{slide.subtitle}</p>

                <div className="hero__actions">
                  <Link to="/about" className="hero__btn hero__btn--desktop-only">
                    <CustomButton variant="primary" size="lg">
                      {t('nav.about')}
                    </CustomButton>
                  </Link>
                </div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}

        <div className="hero__scroll-indicator">
          <span>{t('common.scroll')}</span>
          <div className="mouse"></div>
        </div>
      </Swiper>
    </section>
  );
};

export default HeroSection;
