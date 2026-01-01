import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import CustomButton from '../components/UI/CustomButton';
import './NotFound.scss';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <main className="not-found">
      <div className="not-found__container container">
        <motion.div
          className="not-found__content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Construction scene */}
          <div className="not-found__scene">
            <div className="not-found__crane">
              <div className="not-found__crane-tower" />
              <div className="not-found__crane-arm" />
              <div className="not-found__crane-cable" />
              <div className="not-found__crane-hook">
                <span className="not-found__404">{t('notFound.title')}</span>
              </div>
            </div>
            {/* Building elements removed as per user request */}
            <div className="not-found__ground" />
          </div>

          {/* Text content */}
          <motion.h1
            className="not-found__title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {t('notFound.subtitle')}
          </motion.h1>
          
          <motion.p
            className="not-found__description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {t('notFound.description')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Link to="/">
              <CustomButton variant="primary" size="lg">
                {t('notFound.backHome')}
              </CustomButton>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
};

export default NotFound;
