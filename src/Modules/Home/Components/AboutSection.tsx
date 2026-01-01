import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SectionTitle from '../../../components/UI/SectionTitle';
// Verify this path exists or use imported image if available in file
import './AboutSection.scss';

const AboutSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="about section" id="about">
      <div className="about__container container">
        <div className="about__top">
          <div className="about__content-text">
            <SectionTitle
              title={t('about.sectionTitle')}
              subtitle={t('about.sectionSubtitle')}
            />
            
            <motion.h3 
              className="about__heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0, margin: '100px 0px' }}
            >
              {t('about.title')}
            </motion.h3>
            
            <motion.p 
              className="about__description"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0, margin: '100px 0px' }}
              transition={{ delay: 0.1 }}
            >
              {t('about.description')}
            </motion.p>
          </div>

          <motion.div 
            className="about__image"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0, margin: '100px 0px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="about__image-wrapper">
               <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1000&auto=format&fit=crop" alt="About TR Construction" />
            </div>
          </motion.div>
        </div>

        <div className="about__cards">
          <motion.div 
            className="about__card"
            whileHover={{ y: -5 }}
            onClick={() => navigate('/about/mission')}
            style={{ cursor: 'pointer' }}
          >
            <div className="about__card-icon">🎯</div>
            <h4 className="about__card-title">{t('about.mission.title')}</h4>
            <p className="about__card-text">{t('about.mission.text')}</p>
          </motion.div>

          <motion.div 
            className="about__card"
            whileHover={{ y: -5 }}
            onClick={() => navigate('/about/vision')}
            style={{ cursor: 'pointer' }}
          >
            <div className="about__card-icon">👁️</div>
            <h4 className="about__card-title">{t('about.vision.title')}</h4>
            <p className="about__card-text">{t('about.vision.text')}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
