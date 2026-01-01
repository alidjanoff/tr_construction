import { motion } from 'framer-motion';
import './PageHero.scss';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  image?: string;
}

const PageHero = ({ title, subtitle, image }: PageHeroProps) => {
  return (
    <div className="page-hero" style={{ backgroundImage: image ? `url(${image})` : undefined }}>
      <div className="page-hero__overlay"></div>
      <div className="page-hero__content container">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="page-hero__title"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="page-hero__subtitle"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default PageHero;
