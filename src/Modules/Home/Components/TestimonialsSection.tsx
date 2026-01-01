import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { useHome } from '../Provider/HomeProvider';
import SectionTitle from '../../../components/UI/SectionTitle';
import type { Testimonial } from '../Models/HomeModels';
import 'swiper/css';
import 'swiper/css/pagination';
import './TestimonialsSection.scss';

const TestimonialsSection = () => {
  const { t } = useTranslation();
  const { homeData } = useHome();
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? 'star--filled' : ''}`}>
        ★
      </span>
    ));
  };

  return (
    <section className="testimonials section">
      <div className="testimonials__container container">
        <SectionTitle
          title={t('testimonials.sectionTitle')}
          subtitle={t('testimonials.sectionSubtitle')}
        />

        <motion.div
          className="testimonials__slider"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1200: { slidesPerView: 3 },
            }}
            className="testimonials__swiper"
          >
            {homeData?.testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <article 
                  className="testimonials__card" 
                  onClick={() => setSelectedTestimonial(testimonial)}
                >
                  <div className="testimonials__card-rating">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="testimonials__card-content">
                    "{testimonial.content}"
                  </p>
                  <div className="testimonials__card-author">
                    <div className="testimonials__card-avatar">
                      {testimonial.avatar ? (
                        <img src={testimonial.avatar} alt={testimonial.name} />
                      ) : (
                        <span>{testimonial.name.charAt(0)}</span>
                      )}
                    </div>
                    <div className="testimonials__card-info">
                      <h4 className="testimonials__card-name">
                        {testimonial.name}
                      </h4>
                      <span className="testimonials__card-role">
                        {testimonial.role}
                      </span>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {selectedTestimonial && (
          <motion.div
            className="testimonials__modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTestimonial(null)}
          >
            <motion.div
              className="testimonials__modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="testimonials__modal-close"
                onClick={() => setSelectedTestimonial(null)}
              >
                ✕
              </button>
              
              <div className="testimonials__modal-content">
                <div className="testimonials__modal-header">
                  <div className="testimonials__modal-rating">
                    {renderStars(selectedTestimonial.rating)}
                  </div>
                  <div className="testimonials__modal-author">
                    <div className="testimonials__modal-avatar">
                      {selectedTestimonial.avatar ? (
                        <img src={selectedTestimonial.avatar} alt={selectedTestimonial.name} />
                      ) : (
                        <span>{selectedTestimonial.name.charAt(0)}</span>
                      )}
                    </div>
                    <div>
                      <h4 className="testimonials__modal-name">
                        {selectedTestimonial.name}
                      </h4>
                      <span className="testimonials__modal-role">
                        {selectedTestimonial.role}
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="testimonials__modal-text">
                  "{selectedTestimonial.content}"
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TestimonialsSection;
