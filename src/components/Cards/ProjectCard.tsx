import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { BsGeoAlt } from 'react-icons/bs';
import './ProjectCard.scss';

interface ProjectCardProps {
  image: string;
  title: string;
  location: string;
  category?: string;
  onClick?: () => void;
}

const ProjectCard = ({ image, title, location, category, onClick }: ProjectCardProps) => {
  const { t } = useTranslation();

  return (
    <motion.article
      className="project-card"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="project-card__image-wrapper">
        <img src={image} alt={title} className="project-card__image" />
        <div className="project-card__overlay">
          <motion.button
            className="project-card__view-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation(); // Avoid double trigger if card also has onClick
              onClick?.();
            }}
          >
            {t('projects.viewProject')}
          </motion.button>
        </div>
        {category && <span className="project-card__category">{category}</span>}
      </div>
      <div className="project-card__content">
        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__location">
          <BsGeoAlt className="project-card__location-icon" />
          {location}
        </p>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
