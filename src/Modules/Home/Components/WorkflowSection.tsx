import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useHome } from '../Provider/HomeContext';
import { getTranslation } from '../../../utils/translations';
import SectionTitle from '../../../components/UI/SectionTitle';
import './WorkflowSection.scss';

// Roman numerals for step numbers
const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

const WorkflowSection = ({ backgroundColor }: { backgroundColor?: string }) => {
  const { t } = useTranslation();
  const { homeData, currentLang } = useHome();

  const workflowSteps = homeData?.workflow || [];

  if (!workflowSteps || workflowSteps.length === 0) {
    return null;
  }

  return (
    <section className="workflow section" id="workflow" style={{ backgroundColor }}>
      <div className="workflow__container container">
        <SectionTitle
          title={t('workflow.sectionTitle')}
          subtitle={t('workflow.sectionSubtitle')}
        />

        <div className="workflow__timeline">
          {workflowSteps.map((step, index) => {
            const title = getTranslation(step.title, currentLang);
            const description = getTranslation(step.details, currentLang);

            return (
              <motion.div
                key={step.id || index}
                className="workflow__step"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0, margin: '100px 0px' }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="workflow__step-number">{romanNumerals[index] || (index + 1)}</div>
                <div className="workflow__step-content">
                  <div className="workflow__step-icon">{/* Icon could go here if available */}</div>
                  <h3 className="workflow__step-title">{title}</h3>
                  <p className="workflow__step-description">
                    {description}
                  </p>
                </div>
                {/* Connector line from SCSS */}
                {index < workflowSteps.length - 1 && (
                  <div className="workflow__step-connector" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
