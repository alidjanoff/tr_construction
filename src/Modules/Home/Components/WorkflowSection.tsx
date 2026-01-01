import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SectionTitle from '../../../components/UI/SectionTitle';
import './WorkflowSection.scss';

const WorkflowSection = () => {
  const { t } = useTranslation();

  const steps = [
    { id: 'planning', number: '01' },
    { id: 'design', number: '02' },
    { id: 'construction', number: '03' },
    { id: 'delivery', number: '04' },
  ];

  return (
    <section className="workflow section" id="workflow">
      <div className="workflow__container container">
        <SectionTitle
          title={t('workflow.sectionTitle')}
          subtitle={t('workflow.sectionSubtitle')}
        />

        <div className="workflow__timeline">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="workflow__step"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0, margin: '100px 0px' }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="workflow__step-number">{step.number}</div>
              <div className="workflow__step-content">
                <div className="workflow__step-icon">{/* Icon could go here if available */}</div>
                <h3 className="workflow__step-title">{t(`workflow.steps.${step.id}.title`)}</h3>
                <p className="workflow__step-description">
                  {t(`workflow.steps.${step.id}.description`)}
                </p>
              </div>
              {/* Connector line from SCSS */}
              {index < steps.length - 1 && (
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
