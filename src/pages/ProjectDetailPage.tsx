import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { BsArrowLeft, BsGeoAlt, BsTag } from 'react-icons/bs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useHome } from '../Modules/Home/Provider/HomeProvider';
import Loader from '../components/UI/Loader';
import 'swiper/css';
import 'swiper/css/pagination';
import './ProjectDetailPage.scss';

const ProjectDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { homeData, isLoading } = useHome();
  const navigate = useNavigate();

  // Helper function to create slug from title
  const createSlug = (title: string) => {
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

  const project = homeData?.projects.find((p) => createSlug(p.title) === id);
  const [mainImage, setMainImage] = useState(project ? project.cover_image : '');

  useEffect(() => {
    if (project) {
      setMainImage(project.cover_image);
    }
  }, [project]);

  useEffect(() => {
    if (!isLoading && homeData && !project) {
      navigate('/404', { replace: true });
    }
  }, [isLoading, homeData, project, navigate]);

  if (isLoading || !homeData || !project) {
    return <Loader fullPage size="lg" />;
  }

  // Use backend gallery if available, otherwise just the cover image
  const galleryImages = project.image_gallery?.length
    ? project.image_gallery.map(img => img.image_url)
    : [project.cover_image];

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
          <header className="project-detail__header">
            <h1 className="project-detail__title">{project.title}</h1>
            <div className="project-detail__meta">
              <span className="project-detail__meta-item">
                <BsGeoAlt className="project-detail__meta-icon" /> {project.address}
              </span>
              <span className="project-detail__meta-item">
                <BsTag className="project-detail__meta-icon" /> {project.badge}
              </span>
            </div>
          </header>

          <div className="project-detail__image-wrapper">
            <motion.img
              key={mainImage}
              src={mainImage}
              alt={project.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {galleryImages.length > 1 && (
            <div className="project-detail__gallery-slider">
              <Swiper
                modules={[Pagination]}
                spaceBetween={10}
                slidesPerView={3}
                breakpoints={{
                  768: {
                    slidesPerView: 5,
                    spaceBetween: 12
                  }
                }}
                pagination={{ clickable: true }}
              >
                {galleryImages.map((imgUrl, i) => (
                  <SwiperSlide key={i} onClick={() => setMainImage(imgUrl)} style={{ cursor: 'pointer' }}>
                    <div className="project-detail__gallery-thumb" style={{ border: mainImage === imgUrl ? '2px solid #1B5E3A' : 'none' }}>
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
          )}

          <div className="project-detail__body">
            <h3>{t('projects.overview')}</h3>
            <p>
              {project.details || t('projects.detailDescription', { location: project.address })}
            </p>

            {/* Features can be static or come from backend if added later */}
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default ProjectDetailPage;
