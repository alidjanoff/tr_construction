import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { useHome } from '../Provider/HomeContext';
import { getTranslation } from '../../../utils/translations';
import SectionTitle from '../../../components/UI/SectionTitle';
import ProjectCard from '../../../components/Cards/ProjectCard';
import 'swiper/css';
import 'swiper/css/pagination';
import './ProjectsSection.scss';

const ProjectsSection = () => {
  const { t } = useTranslation();
  const { homeData, currentLang } = useHome();
  const navigate = useNavigate();

  const projects = homeData?.projects || [];

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
            loop={true}
            pagination={{ clickable: true }}
            autoplay={{ delay: 1500, disableOnInteraction: false }}
            breakpoints={{
              576: { slidesPerView: 1.5 },
              768: { slidesPerView: 2 },
              992: { slidesPerView: 2.5 },
              1200: { slidesPerView: 3 },
            }}
            className="projects__swiper"
          >
            {projects.map((project, index) => {
              const title = getTranslation(project.title, currentLang);
              const address = getTranslation(project.address, currentLang);
              const badge = getTranslation(project.badge, currentLang);

              return (
                <SwiperSlide key={project.id || index}>
                  <ProjectCard
                    image={project.cover_image}
                    title={title}
                    location={address}
                    category={badge}
                    onClick={() => navigate(`/projects/${project.slug || project.id}`)}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
