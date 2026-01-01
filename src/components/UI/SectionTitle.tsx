import { useState, useEffect, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import './SectionTitle.scss';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  children?: ReactNode;
}

const SectionTitle = ({
  title,
  subtitle,
  centered = true,
  light = false,
  children,
}: SectionTitleProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const classes = [
    'section-title',
    centered && 'section-title--centered',
    light && 'section-title--light',
  ]
    .filter(Boolean)
    .join(' ');

  const animationProps = isMobile 
    ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0, margin: '100px 0px' },
        transition: { duration: 0.6, ease: 'easeOut' as const }
      };

  return (
    <motion.div
      className={classes}
      {...animationProps}
    >
      {subtitle && <span className="section-title__subtitle">{subtitle}</span>}
      <h2 className="section-title__title">{title}</h2>
      {children && <div className="section-title__content">{children}</div>}
      <div className="section-title__decoration">
        <span className="section-title__line" />
        <span className="section-title__dot" />
        <span className="section-title__line" />
      </div>
    </motion.div>
  );
};

export default SectionTitle;
