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
        <h2>{t('common.notFound') || 'Project Not Found'}</h2>
        <button onClick={() => navigate('/projects')} className="btn btn-primary" style={{ marginTop: '20px', display: 'inline-block' }}>
          Back to Projects
        </button>
      </div>
    );
  }

  // Generate gallery images (using placeholders + main image for demo)
  const galleryImages = [
    project.image,
    `https://source.unsplash.com/random/800x600?construction,building&sig=101`,
    `https://source.unsplash.com/random/800x600?construction,building&sig=102`,
    `https://source.unsplash.com/random/800x600?construction,building&sig=103`,
    `https://source.unsplash.com/random/800x600?construction,building&sig=104`,
  ];

  return (
    <main className="project-detail">
      <div className="project-detail__container container">
        <div className="project-detail__top-bar">
          <button onClick={() => navigate(-1)} className="project-detail__back-btn">
            <span className="project-detail__back-icon">
              <BsArrowLeft />
            </span>
            {t('common.back') || 'Geri'}
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

            {/* Gallery */}
            <div className="project-detail__gallery-slider">
              <h3>Project Gallery</h3>
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
