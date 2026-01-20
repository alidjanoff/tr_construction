import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { BsGeoAlt, BsTelephone, BsEnvelope, BsClock } from 'react-icons/bs';
import SectionTitle from '../../../components/UI/SectionTitle';
import CustomInput from '../../../components/UI/CustomInput';
import CustomButton from '../../../components/UI/CustomButton';
import HomeService from '../Service/HomeService';
import { useHome } from '../Provider/HomeContext';
import { getTranslation } from '../../../utils/translations';
import type { ContactFormData } from '../Models/HomeModels';
import './ContactSection.scss';

// Contact type to icon mapping
const contactTypeIcons: Record<string, React.ComponentType> = {
  address: BsGeoAlt,
  phone: BsTelephone,
  email: BsEnvelope,
  working_hours: BsClock,
};

const ContactSection = () => {
  const { t } = useTranslation();
  const { homeData, currentLang } = useHome();
  const [isMobile, setIsMobile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    surname: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  const contactInfo = homeData?.contactInfo || [];
  const mapUrl = homeData?.mapUrl;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};
    if (!formData.name.trim()) newErrors.name = t('contact.form.errorName');
    if (!formData.surname.trim()) newErrors.surname = t('contact.form.errorSurname');
    if (!formData.email.trim()) {
      newErrors.email = t('contact.form.errorEmail');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('contact.form.errorEmailInvalid');
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t('contact.form.errorPhone');
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone.trim())) {
      newErrors.phone = t('contact.form.errorPhoneInvalid');
    }

    if (!formData.message.trim()) newErrors.message = t('contact.form.errorMessage');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const result = await HomeService.submitContactForm(formData);
      if (result.success) {
        toast.success(t('contact.form.success'));
        setFormData({ name: '', surname: '', email: '', phone: '', message: '' });
      } else {
        toast.error(result.message || t('contact.form.error'));
      }
    } catch {
      toast.error(t('contact.form.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const formAnimation = isMobile
    ? { initial: { opacity: 1, x: 0 }, animate: { opacity: 1, x: 0 } }
    : {
      initial: { opacity: 0, x: -30 },
      whileInView: { opacity: 1, x: 0 },
      viewport: { once: true, amount: 0, margin: '100px 0px' },
      transition: { duration: 0.5 }
    };

  const infoAnimation = isMobile
    ? { initial: { opacity: 1, x: 0 }, animate: { opacity: 1, x: 0 } }
    : {
      initial: { opacity: 0, x: 30 },
      whileInView: { opacity: 1, x: 0 },
      viewport: { once: true, amount: 0, margin: '100px 0px' },
      transition: { duration: 0.5 }
    };

  // Generate Google Maps embed URL from lat/long
  const getMapEmbedUrl = () => {
    if (mapUrl?.lat && mapUrl?.long) {
      return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${mapUrl.long}!3d${mapUrl.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zLocation!5e0!3m2!1sen!2saz!4v1709292020202!5m2!1sen!2saz`;
    }
    // Fallback to default Baku map
    return 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d194472.76853036437!2d49.83353457193374!3d40.39473700779781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d6bd6211cf9%3A0x343f6b5e7ae56c6b!2sBaku!5e0!3m2!1sen!2saz!4v1709292020202!5m2!1sen!2saz';
  };

  return (
    <section className="contact section" id="contact">
      <div className="contact__container container">
        <SectionTitle
          title={t('contact.sectionTitle')}
          subtitle={t('contact.sectionSubtitle')}
        />

        <div className="contact__content">
          <motion.div
            className="contact__form-wrapper"
            {...formAnimation}
          >
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="contact__form-row">
                <CustomInput
                  label={t('contact.form.name')}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                />
                <CustomInput
                  label={t('contact.form.surname')}
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  error={errors.surname}
                />
              </div>
              <div className="contact__form-row">
                <CustomInput
                  label={t('contact.form.email')}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                />
                <CustomInput
                  label={t('contact.form.phone')}
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                />
              </div>
              <CustomInput
                label={t('contact.form.message')}
                name="message"
                value={formData.message}
                onChange={handleChange}
                error={errors.message}
                isTextarea
                rows={5}
              />
              <CustomButton
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isSubmitting}
              >
                {isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}
              </CustomButton>
            </form>
          </motion.div>

          <motion.div
            className="contact__info"
            {...infoAnimation}
          >
            <div className="contact__info-card">
              {contactInfo.map((info, index) => {
                const IconComponent = contactTypeIcons[info.contact_type] || BsGeoAlt;
                const title = getTranslation(info.title, currentLang);
                const detail = getTranslation(info.detail, currentLang);

                // Determine the correct href and whether it should be a link
                let href = info.url;
                const isLink = !!href || info.contact_type === 'phone' || info.contact_type === 'email';

                if (!href) {
                  if (info.contact_type === 'phone') {
                    href = `tel:${detail.replace(/[\s-()]/g, '')}`;
                  } else if (info.contact_type === 'email') {
                    href = `mailto:${detail}`;
                  } else {
                    href = detail;
                  }
                }

                return (
                  <div key={info.id || index} className="contact__info-item">
                    <div className="contact__info-icon"><IconComponent /></div>
                    <div className="contact__info-content">
                      <h4>{title}</h4>
                      {isLink ? (
                        <a href={href}>{detail}</a>
                      ) : (
                        <p>{detail}</p>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Fallback if no contact info from API */}
              {contactInfo.length === 0 && (
                <>
                  <div className="contact__info-item">
                    <div className="contact__info-icon"><BsGeoAlt /></div>
                    <div className="contact__info-content">
                      <h4>{t('contact.info.address')}</h4>
                      <p>{t('contact.info.addressValue')}</p>
                    </div>
                  </div>
                  <div className="contact__info-item">
                    <div className="contact__info-icon"><BsTelephone /></div>
                    <div className="contact__info-content">
                      <h4>{t('contact.info.phone')}</h4>
                      <a href="tel:+994XXXXXXXX">{t('contact.info.phoneValue')}</a>
                    </div>
                  </div>
                  <div className="contact__info-item">
                    <div className="contact__info-icon"><BsEnvelope /></div>
                    <div className="contact__info-content">
                      <h4>{t('contact.info.email')}</h4>
                      <a href="mailto:info@trconstruction.az">
                        {t('contact.info.emailValue')}
                      </a>
                    </div>
                  </div>
                  <div className="contact__info-item">
                    <div className="contact__info-icon"><BsClock /></div>
                    <div className="contact__info-content">
                      <h4>{t('contact.info.workingHours')}</h4>
                      <p>{t('contact.info.workingHoursValue')}</p>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="contact__map">
              <iframe
                src={getMapEmbedUrl()}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
