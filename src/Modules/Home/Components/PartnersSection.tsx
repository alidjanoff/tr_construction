import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { useHome } from '../Provider/HomeContext';
import { getTranslation } from '../../../utils/translations';
import SectionTitle from '../../../components/UI/SectionTitle';
import { SlBriefcase, SlGlobe, SlBadge, SlLayers, SlDiamond } from 'react-icons/sl';
import 'swiper/css';
import 'swiper/css/pagination';
import './PartnersSection.scss';

const PartnersSection = ({ backgroundColor }: { backgroundColor?: string }) => {
  const { t } = useTranslation();
  const { homeData, currentLang } = useHome();
  const partners = homeData?.partners || [];

  if (!partners || partners.length === 0) {
    return null;
  }

  // Partner icons using react-icons/sl
  const partnerIcons = [SlBriefcase, SlGlobe, SlBadge, SlLayers, SlDiamond];

  // AutoPlay configuration logic: Only autoplay if more than 5 items
  const shouldAutoplay = partners.length > 5;

  return (
    <section className="partners section" style={{ backgroundColor:backgroundColor }}>
      <div className="partners__container container">
        <SectionTitle
          title={t('partners.sectionTitle')}
          subtitle={t('partners.sectionSubtitle')}
        />

        <motion.div
          className="partners__slider"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={2}
            loop={true}
            pagination={{ clickable: true }}
            autoplay={shouldAutoplay ? { delay: 3000, disableOnInteraction: false } : false}
            breakpoints={{
              576: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              992: { slidesPerView: 5 },
            }}
            className="partners__swiper"
          >
            {partners.map((partner, index) => {
              const IconComponent = partnerIcons[index % partnerIcons.length];
              const partnerName = getTranslation(partner.title, currentLang);

              return (
                <SwiperSlide key={partner.id || index}>
                  <div className="partners__item">
                    {partner.image ? (
                      <img src={partner.image} alt={partnerName} />
                    ) : (
                      <div className="partners__placeholder">
                        <span className="partners__placeholder-icon">
                          <IconComponent />
                        </span>
                        <span className="partners__placeholder-text">
                          {partnerName || `Partner ${index + 1}`}
                        </span>
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;
