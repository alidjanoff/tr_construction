import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination, Autoplay } from 'swiper/modules';
import CustomButton from '../../../components/UI/CustomButton';
import { useHome } from '../Provider/HomeContext';
import { getTranslation } from '../../../utils/translations';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './HeroSection.scss';

const HeroSection = () => {
  const { t } = useTranslation();
  const { homeData, currentLang } = useHome();

  const slides = homeData?.hero || [];

  if (slides.length === 0) return null;

  return (
    <section className="hero" id="hero">
      <Swiper
        modules={[Mousewheel, Pagination, Autoplay]}
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
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="hero__image-wrapper">
              <img src={slide.image_url} alt={getTranslation(slide.title, currentLang)} />
              <div className="hero__overlay"></div>
            </div>

            <div className="hero__content">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="hero__text-container"
              >
                {slide.title && <h1 className="hero__title">{getTranslation(slide.title, currentLang)}</h1>}
                {slide.info && <p className="hero__subtitle">{getTranslation(slide.info, currentLang)}</p>}

                {slide.button_url && (
                  <div className="hero__actions">
                    <Link to={slide.button_url} className="hero__btn">
                      <CustomButton variant="primary" size="lg">
                        {slide.button_text ? getTranslation(slide.button_text, currentLang) : t('nav.about')}
                      </CustomButton>
                    </Link>
                  </div>
                )}
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
