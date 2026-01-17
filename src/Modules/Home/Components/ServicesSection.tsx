import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useHome } from '../Provider/HomeProvider';
import SectionTitle from '../../../components/UI/SectionTitle';
import './ServicesSection.scss';

const ServicesSection = () => {
  const { t } = useTranslation();
  const { homeData } = useHome();

  return (
    <section className="services section" id="services">
      <div className="services__container container">
        <SectionTitle
          title={t('services.sectionTitle')}
          subtitle={t('services.sectionSubtitle')}
        />

        <motion.div
          className="services__grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0, margin: '100px 0px' }}
        >
          {homeData?.services.map((service, index) => {
            return (
              <motion.div
                key={service.id}
                className="services__card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="services__card-content">
                  <h3 className="services__card-title">{service.title}</h3>
                  <p className="services__card-description">{service.info}</p>
                </div>
                <div className="services__card-line" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
