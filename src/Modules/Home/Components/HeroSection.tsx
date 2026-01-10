import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination, Autoplay, Navigation } from 'swiper/modules';
import CustomButton from '../../../components/UI/CustomButton';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './HeroSection.scss';

// Import images
import swiper1 from '../../../assets/images/swiper1.webp';
import swiper2 from '../../../assets/images/swiper2.avif';
import swiper3 from '../../../assets/images/swiper3.avif';
import swiper4 from '../../../assets/images/swiper.avif';

const HeroSection = () => {
  const { t } = useTranslation();

  const slides = [
    { image: swiper1, title: t('hero.title'), subtitle: t('hero.subtitle') },
    { image: swiper2, title: t('hero.title'), subtitle: t('hero.subtitle') },
    { image: swiper3, title: t('hero.title'), subtitle: t('hero.subtitle') },
    { image: swiper4, title: t('hero.title'), subtitle: t('hero.subtitle') },
  ];

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
