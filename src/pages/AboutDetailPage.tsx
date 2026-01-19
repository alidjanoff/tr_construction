import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import PageHero from '../components/UI/PageHero';
import { useHome } from '../Modules/Home/Provider/HomeContext';
import { getTranslation } from '../utils/translations';

const AboutDetailPage = () => {
  const { id } = useParams<{ id: string }>(); // 'mission' or 'vision'
  const { t } = useTranslation();
  const { homeData, currentLang } = useHome();

  const about = homeData?.about;

  // Get title from i18n (section titles remain in i18n)
  const title = t(`about.${id}.title`);

  // Get text from API if available, fallback to i18n
  let text = t(`about.${id}.text`);
  if (about) {
    if (id === 'mission') {
      text = getTranslation(about.our_mission, currentLang) || text;
    } else if (id === 'vision') {
      text = getTranslation(about.our_vision, currentLang) || text;
    }
  }

  return (
    <div className="about-detail-page">
      <PageHero title={title || t('about.sectionTitle')} />

      <div className="container" style={{ paddingBottom: '4rem' }}>
        <Link to="/about" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: '#666' }}>
          ← {t('common.back')}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="content"
          style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
        >
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>{title}</h2>
          <p style={{ fontSize: '1.125rem', color: '#374151', lineHeight: '1.625', marginBottom: '1.5rem' }}>
            {text}
          </p>
          <p style={{ color: '#4b5563' }}>
            {t('about.detailedText', { type: title })}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutDetailPage;
