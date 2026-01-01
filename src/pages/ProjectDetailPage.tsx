import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useHome } from '../Modules/Home/Provider/HomeProvider';
import './ProjectDetailPage.scss';

const ProjectDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { homeData } = useHome();


  // Find the project by ID (converting string ID to number if necessary)
  const project = homeData?.projects.find((p) => String(p.id) === id);

  if (!project) {
    return (
      <div className="container" style={{ paddingTop: '150px', textAlign: 'center' }}>
        <h2>{t('common.notFound') || 'Project Not Found'}</h2>
        <Link to="/projects" className="btn btn-primary" style={{ marginTop: '20px', display: 'inline-block' }}>
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <main className="project-detail">
      <div className="project-detail__container container">
        <Link to="/projects" className="project-detail__back-btn">
          ← {t('common.back') || 'Back'}
        </Link>

        <motion.div 
          className="project-detail__content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="project-detail__image-wrapper">
             <img src={project.image} alt={project.title} />
          </div>

          <div className="project-detail__info">
            <header className="project-detail__header">
              <h1 className="project-detail__title">{project.title}</h1>
              <div className="project-detail__meta">
                <span className="project-detail__meta-item">
                  📍 {project.location}
                </span>
                {project.category && (
                  <span className="project-detail__meta-item">
                    🏷️ {project.category}
                  </span>
                )}
              </div>
            </header>

            <div className="project-detail__body">
              {/* This content would ideally come from the CMS/Data specific to the detail page */}
              <h3>Project Overview</h3>
              <p>
                {t('projects.detailDescription') || 
                `This prestigious project in ${project.location} represents our commitment to quality and innovation. 
                Executed with precision planning and expert craftsmanship, it stands as a testament to modern engineering.`}
              </p>
              
              <h3>Key Features</h3>
              <ul>
                <li>High-grade materials ensuring longevity only.</li>
                <li>Sustainable construction practices.</li>
                <li>Completed on time and within budget.</li>
                <li>Strict adherence to safety standards.</li>
              </ul>

              <h3>Gallery</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                {/* Placeholder gallery */}
                {[1, 2, 3].map((i) => (
                  <div key={i} style={{ height: '100px', background: '#eee', borderRadius: '4px' }} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default ProjectDetailPage;
