import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { useHome } from '../Provider/HomeProvider';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import './HeroSection.scss';

const HeroSection = () => {
  const { t } = useTranslation();
  const { homeData, isLoading } = useHome();

  if (isLoading || !homeData?.hero) {
    return <div className="hero-skeleton"></div>;
  }

  return (
    <section className="hero" id="hero">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={homeData.hero.length > 1}
        className="hero__swiper"
      >
        {homeData.hero.map((slide, index) => (
          <SwiperSlide key={slide.id || index}>
            <div className="hero__slide">
              <div
                className="hero__image"
                style={{ backgroundImage: `url(${slide.image_url})` }}
              />
              <div className="hero__overlay" />
              <div className="hero__content">
                <div className="hero__container">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="hero__text-wrapper"
                  >
                    {slide.title && (
                      <h1 className="hero__title">
                        {slide.title}
                      </h1>
                    )}

                    {slide.info && (
                      <p className="hero__description">
                        {slide.info}
                      </p>
                    )}

                    {(slide.button_text || (slide.button_url && slide.button_url !== '/')) && (
                      <div className="hero__actions">
                        <Link
                          to={slide.button_url || '/about'}
                          className="hero__btn hero__btn--primary"
                        >
                          {slide.button_text || t('hero.learnMore')}
                        </Link>
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSection;
