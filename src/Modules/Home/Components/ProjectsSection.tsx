import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { useHome } from '../Provider/HomeProvider';
import SectionTitle from '../../../components/UI/SectionTitle';
import ProjectCard from '../../../components/Cards/ProjectCard';
import 'swiper/css';
import 'swiper/css/pagination';
import './ProjectsSection.scss';

const ProjectsSection = () => {
  const { t } = useTranslation();
  const { homeData } = useHome();
  const navigate = useNavigate();

  // Helper function to create slug from title
  const createSlug = (title: string) => {
    // Transliterate Azerbaijani characters
    const transliterated = title
      .replace(/ə/gi, 'e')
      .replace(/ı/gi, 'i')
      .replace(/ş/gi, 'sh')
      .replace(/ç/gi, 'ch')
      .replace(/ö/gi, 'o')
      .replace(/ü/gi, 'u')
      .replace(/ğ/gi, 'g');

    return transliterated
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  return (
    <section className="projects section" id="projects">
      <div className="projects__container container">
        <SectionTitle
          title={t('projects.sectionTitle')}
          subtitle={t('projects.sectionSubtitle')}
        />

        <motion.div
          className="projects__slider"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0, margin: '100px 0px' }}
          transition={{ duration: 0.6 }}
        >
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            loop={homeData?.projects && homeData.projects.length > 3}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              576: { slidesPerView: 1.5 },
              768: { slidesPerView: 2 },
              992: { slidesPerView: 2.5 },
              1200: { slidesPerView: 3 },
            }}
            className="projects__swiper"
          >
            {homeData?.projects.map((project) => (
              <SwiperSlide key={project.id}>
                <ProjectCard
                  image={project.cover_image}
                  title={project.title}
                  location={project.address}
                  category={project.badge}
                  onClick={() => navigate(`/projects/${createSlug(project.title)}`)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
