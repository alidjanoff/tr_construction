import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useHome } from '../Provider/HomeProvider';
import './StatsSection.scss';

const StatsSection = () => {
  useTranslation(); // t is not used, but useTranslation might be kept for context or future use
  const { homeData } = useHome();

  return (
    <section className="stats">
      <div className="stats__container container">
        <div className="stats__grid">
          {homeData?.stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              className="stats__item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="stats__number">
                {stat.count}
              </div>
              <p className="stats__label">{stat.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
