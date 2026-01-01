import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useHome } from '../Provider/HomeProvider';
import SectionTitle from '../../../components/UI/SectionTitle';
import Modal from '../../../components/UI/Modal';
import './PartnersSection.scss';

const PartnersSection = () => {
  const { t } = useTranslation();
  const { homeData } = useHome();
  const [selectedPartner, setSelectedPartner] = useState<any>(null);

  // Placeholder partner logos - in production these would be real logos
  const partnerPlaceholders = ['🏢', '🏗️', '🏛️', '🏠', '🏭'];

  return (
    <section className="partners section">
      <div className="partners__container container">
        <SectionTitle
          title={t('partners.sectionTitle')}
          subtitle={t('partners.sectionSubtitle')}
        />

        <motion.div
          className="partners__grid"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          {homeData?.partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              className="partners__item"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              style={{ cursor: 'pointer' }}
              onClick={() => setSelectedPartner(partner)}
            >
              {partner.logo ? (
                <img src={partner.logo} alt={partner.name} />
              ) : (
                <div className="partners__placeholder">
                  <span className="partners__placeholder-icon">
                    {partnerPlaceholders[index % partnerPlaceholders.length]}
                  </span>
                  <span className="partners__placeholder-text">
                    Partner {index + 1}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Modal
        isOpen={!!selectedPartner}
        onClose={() => setSelectedPartner(null)}
        title={selectedPartner?.name || 'Partner Details'}
      >
        <p>
          We are proud to collaborate with {selectedPartner?.name || 'this partner'}. 
          Together we have achieved significant milestones in the construction industry.
        </p>
        <p>
           Reliable partnership is the key to our success.
        </p>
      </Modal>
    </section>
  );
};

export default PartnersSection;
