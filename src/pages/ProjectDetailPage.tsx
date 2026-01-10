import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { BsArrowLeft } from 'react-icons/bs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useHome } from '../Modules/Home/Provider/HomeProvider';
import 'swiper/css';
import 'swiper/css/pagination';
import './ProjectDetailPage.scss';

import b1 from '../assets/images/building1.avif';
import b2 from '../assets/images/building2.jpg';
import b3 from '../assets/images/building3.avif';
import b4 from '../assets/images/building4.avif';
import b5 from '../assets/images/building5.avif';

const ProjectDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { homeData } = useHome();
  const navigate = useNavigate();

  // Find the project by ID
  const project = homeData?.projects.find((p) => String(p.id) === id);
  
  // State for the main image (defaulting to project image)
  const [mainImage, setMainImage] = useState(project ? project.image : '');

  // Update main image state when project is loaded or changed
  useEffect(() => {
    if (project) {
      setMainImage(project.image);
    }
  }, [project]);

  if (!project) {
    return (
      <div className="container" style={{ paddingTop: '150px', textAlign: 'center' }}>
        <h2>{t('common.notFound')}</h2>
        <button onClick={() => navigate('/projects')} className="btn btn-primary" style={{ marginTop: '20px', display: 'inline-block' }}>
          {t('projects.backToProjects')}
        </button>
      </div>
    );
  }

  // Generate gallery images (using local building images + main image for demo)
  const galleryImages = [
    project.image,
    b1,
    b2,
    b3,
    b4,
    b5,
  ];

  return (
    <main className="project-detail">
      <div className="project-detail__container container">
        <div className="project-detail__top-bar">
          <button onClick={() => navigate(-1)} className="project-detail__back-btn">
            <span className="project-detail__back-icon">
              <BsArrowLeft />
            </span>
            {t('common.back')}
          </button>
        </div>

        <motion.div 
          className="project-detail__content-wrapper"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
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

          {/* Main Image */}
          <div className="project-detail__image-wrapper">
             <motion.img 
               key={mainImage} // Re-animate on change
               src={mainImage} 
               alt={project.title}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 0.3 }}
             />
          </div>

          {/* Body Content */}
          <div className="project-detail__body">
            <h3>{t('projects.overview')}</h3>
            <p>
              {t('projects.detailDescription', { location: project.location })}
            </p>
            
            <h3>{t('projects.features')}</h3>
            <ul>
              <li>{t('projects.feature1')}</li>
              <li>{t('projects.feature2')}</li>
              <li>{t('projects.feature3')}</li>
              <li>{t('projects.feature4')}</li>
            </ul>

            {/* Gallery */}
            <div className="project-detail__gallery-slider">
              <h3>{t('projects.gallery')}</h3>
              <Swiper
                modules={[Pagination]}
                spaceBetween={16}
                slidesPerView={3}
                breakpoints={{
                  320: { slidesPerView: 1.5 },
                  768: { slidesPerView: 3 },
                }}
                pagination={{ clickable: true }}
              >
                {galleryImages.map((imgUrl, i) => (
                  <SwiperSlide key={i} onClick={() => setMainImage(imgUrl)} style={{ cursor: 'pointer' }}>
                    <div style={{ height: '150px', background: '#eee', borderRadius: '8px', overflow: 'hidden', border: mainImage === imgUrl ? '3px solid #1B5E3A' : 'none' }}>
                       <img 
                         src={imgUrl} 
                         alt={`Gallery ${i}`}
                         style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                       />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default ProjectDetailPage;
