import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { SlTarget, SlRocket } from 'react-icons/sl';
import { useHome } from '../Provider/HomeProvider';
import './AboutSection.scss';

const AboutSection = () => {
  const { t } = useTranslation();
  const { homeData, isLoading } = useHome();

  if (isLoading || !homeData?.about) {
    return <div className="section-skeleton"></div>;
  }

  const { about } = homeData;

  const highlights = [
    {
      icon: <SlTarget />,
      title: t('about.mission'),
      description: about.our_mission,
    },
    {
      icon: <SlRocket />,
      title: t('about.vision'),
      description: about.our_vision,
    },
  ];

  return (
    <section className="about section" id="about">
      <div className="about__container container">
        <div className="about__grid">
          <motion.div
            className="about__image-container"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <div className="about__image-wrapper">
              <img src={about.image} alt="TR Construction" />
              <div className="about__experience">
                <span className="about__experience-number">10+</span>
                <span className="about__experience-text">{t('about.yearsExperience')}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="about__content"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <span className="about__subtitle">{about.info}</span>
            <h2 className="about__title">{about.title}</h2>
            <p className="about__description">
              {about.description}
            </p>

            <div className="about__highlights">
              {highlights.map((item, index) => (
                <div key={index} className="about__highlight-item">
                  <div className="about__highlight-icon">{item.icon}</div>
                  <div className="about__highlight-text">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
