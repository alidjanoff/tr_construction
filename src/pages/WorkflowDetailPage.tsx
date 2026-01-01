import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import PageHero from '../components/UI/PageHero';

const WorkflowDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  const title = t(`workflow.steps.${id}.title`);
  const description = t(`workflow.steps.${id}.description`);

  return (
    <div className="workflow-detail-page">
      <PageHero title={title || t('workflow.sectionTitle')} />
      
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: '#666' }}>
           {/* Workflow is on Home usually, but maybe separate page? The user said "Workflow page". 
               If workflow is only a section on home, maybe back to home. 
               But 'common.back' is generic. */}
          ← {t('common.back')}
        </Link>
        
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="content"
           style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
        >
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>{title}</h2>
          <div style={{ fontSize: '1.125rem', color: '#374151', lineHeight: '1.625', marginBottom: '1.5rem' }}>
             <p style={{ marginBottom: '1rem' }}>{description}</p>
             <p>
               Detailed explanation of the {title} phase. We ensure every step is calculated and executed with precision.
               Our team of experts collaborates closely to ensure this phase meets all requirements and standards.
             </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WorkflowDetailPage;
