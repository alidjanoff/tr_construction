import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { BsArrowLeft, BsGeoAlt, BsTag } from 'react-icons/bs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { projectsAPI } from '../services/api';
import { getTranslation } from '../utils/translations';
import type { Project } from '../types';
import Loader from '../components/UI/Loader';
import 'swiper/css';
import 'swiper/css/pagination';
import './ProjectDetailPage.scss';

// Fallback gallery images
import b1 from '../assets/images/building1.avif';
import b2 from '../assets/images/building2.jpg';
import b3 from '../assets/images/building3.avif';
import b4 from '../assets/images/building4.avif';
import b5 from '../assets/images/building5.avif';

const fallbackGalleryImages = [b1, b2, b3, b4, b5];

const ProjectDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const currentLang = i18n.language || 'az';

  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) {
        navigate('/404', { replace: true });
        return;
      }

      setIsLoading(true);
      const data = await projectsAPI.getOne(id);

      if (data) {
        setProject(data);
        setMainImage(data.cover_image || '');
      } else {
        navigate('/404', { replace: true });
      }

      setIsLoading(false);
    };

    fetchProject();
  }, [id, navigate]);

  // Show loader while data is loading
  if (isLoading || !project) {
    return <Loader fullPage size="lg" />;
  }

  // Get translated values
  const title = getTranslation(project.title, currentLang);
  const address = getTranslation(project.address, currentLang);
  const badge = getTranslation(project.badge, currentLang);
  const details = getTranslation(project.details, currentLang);

  // Generate gallery images from API or use fallbacks
  const galleryImages = project.image_gallery?.length
    ? [project.cover_image, ...project.image_gallery.map(img => img.image_url)]
    : [project.cover_image, ...fallbackGalleryImages];

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
            <h1 className="project-detail__title">{title}</h1>
            <div className="project-detail__meta">
              <span className="project-detail__meta-item">
                <BsGeoAlt className="project-detail__meta-icon" /> {address}
              </span>
              {badge && (
                <span className="project-detail__meta-item">
                  <BsTag className="project-detail__meta-icon" /> {badge}
                </span>
              )}
            </div>
          </header>

          {/* Main Image */}
          <div className="project-detail__image-wrapper">
            <motion.img
              key={mainImage}
              src={mainImage}
              alt={title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Gallery - Moved directly under main image */}
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

          {/* Body Content */}
          <div className="project-detail__body">
            <h3>{t('projects.overview')}</h3>
            <p>
              {details || t('projects.detailDescription', { location: address })}
            </p>

            <h3>{t('projects.features')}</h3>
            <ul>
              <li>{t('projects.feature1')}</li>
              <li>{t('projects.feature2')}</li>
              <li>{t('projects.feature3')}</li>
              <li>{t('projects.feature4')}</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default ProjectDetailPage;
