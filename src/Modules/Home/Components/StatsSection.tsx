import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useHome } from '../Provider/HomeContext';
import { getTranslation, parseCountValue } from '../../../utils/translations';
import './StatsSection.scss';

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

const Counter = ({ end, suffix = '', duration = 2 }: CounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

const StatsSection = ({ backgroundColor }: { backgroundColor?: string }) => {
  const { homeData, currentLang } = useHome();
  const stats = homeData?.stats || [];

  if (!stats || stats.length === 0) {
    return null;
  }

  return (
    <section className="stats" style={{ backgroundColor }}>
      <div className="stats__container container">
        <div className="stats__grid">
          {stats.map((stat, index) => {
            // Parse count value - it might be like "150+" or just "150"
            const { value, suffix } = parseCountValue(stat.count, currentLang);
            const label = getTranslation(stat.detail, currentLang);

            return (
              <motion.div
                key={stat.id || index}
                className="stats__item"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="stats__value">
                  <Counter end={value} suffix={suffix} />
                </div>
                <div className="stats__label">{label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
