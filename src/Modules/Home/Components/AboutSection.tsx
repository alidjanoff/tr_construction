import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SectionTitle from '../../../components/UI/SectionTitle';
import { SlTarget, SlEye } from 'react-icons/sl';
import { useHome } from '../Provider/HomeContext';
import { getTranslation } from '../../../utils/translations';
import './AboutSection.scss';

const AboutSection = ({ backgroundColor }: { backgroundColor?: string }) => {
  const { t } = useTranslation();
  const { homeData, currentLang } = useHome();

  // Get about data from API or use fallback translations
  const about = homeData?.about;
  const aboutTitle = about ? getTranslation(about.title, currentLang) : t('about.title');
  const aboutDescription = about ? getTranslation(about.description, currentLang) : t('about.description');
  const missionTitle = t('about.mission.title'); // Keep section titles from i18n
  const missionText = about ? getTranslation(about.our_mission, currentLang) : t('about.mission.text');
  const visionTitle = t('about.vision.title'); // Keep section titles from i18n
  const visionText = about ? getTranslation(about.our_vision, currentLang) : t('about.vision.text');
  const aboutImage = about?.image || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1000&auto=format&fit=crop';

  return (
    <section className="about section" id="about" style={{ backgroundColor }}>
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
              {aboutTitle}
            </motion.h3>

            <motion.p
              className="about__description"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0, margin: '100px 0px' }}
              transition={{ delay: 0.1 }}
            >
              {aboutDescription}
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
              <img src={aboutImage} alt={t('common.brandName')} />
            </div>
          </motion.div>
        </div>

        <div className="about__cards">
          <motion.div
            className="about__card"
            whileHover={{ y: -5 }}
          >
            <div className="about__card-icon"><SlTarget /></div>
            <h4 className="about__card-title">{missionTitle}</h4>
            <p className="about__card-text">{missionText}</p>
          </motion.div>

          <motion.div
            className="about__card"
            whileHover={{ y: -5 }}
          >
            <div className="about__card-icon"><SlEye /></div>
            <h4 className="about__card-title">{visionTitle}</h4>
            <p className="about__card-text">{visionText}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
