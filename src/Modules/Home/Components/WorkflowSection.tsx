import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useHome } from '../Provider/HomeProvider';
import SectionTitle from '../../../components/UI/SectionTitle';
import './WorkflowSection.scss';

const WorkflowSection = () => {
  const { t } = useTranslation();
  const { homeData } = useHome();

  return (
    <section className="workflow section" id="workflow">
      <div className="workflow__container container">
        <SectionTitle
          title={t('workflow.sectionTitle')}
          subtitle={t('workflow.sectionSubtitle')}
        />

        <div className="workflow__timeline">
          {homeData?.workflow.map((step, index) => (
            <motion.div
              key={step.id}
              className="workflow__step"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0, margin: '100px 0px' }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="workflow__step-number">{index + 1}</div>
              <div className="workflow__step-content">
                <h3 className="workflow__step-title">{step.title}</h3>
                <p className="workflow__step-description">
                  {step.details}
                </p>
              </div>
              {index < homeData.workflow.length - 1 && (
                <div className="workflow__step-connector" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
