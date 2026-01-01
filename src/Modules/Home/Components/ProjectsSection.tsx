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
            {homeData?.projects.map((project) => (
              <SwiperSlide key={project.id}>
                <ProjectCard
                  image={project.image}
                  title={project.title}
                  location={project.location}
                  category={project.category}
                  onClick={() => navigate(`/projects/${project.id}`)}
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
