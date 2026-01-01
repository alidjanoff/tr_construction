import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { BsGeoAlt, BsTelephone, BsEnvelope, BsClock } from 'react-icons/bs';
import SectionTitle from '../../../components/UI/SectionTitle';
import CustomInput from '../../../components/UI/CustomInput';
import CustomButton from '../../../components/UI/CustomButton';
import HomeService from '../Service/HomeService';
import type { ContactFormData } from '../Models/HomeModels';
import './ContactSection.scss';

const ContactSection = () => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};
    if (!formData.name.trim()) newErrors.name = 'Ad daxil edin';
    if (!formData.email.trim()) {
      newErrors.email = 'E-poçt daxil edin';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Düzgün e-poçt daxil edin';
    }
    if (!formData.message.trim()) newErrors.message = 'Mesaj daxil edin';
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
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
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
                  label={t('contact.form.email')}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                />
              </div>
              <div className="contact__form-row">
                <CustomInput
                  label={t('contact.form.phone')}
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                />
                <CustomInput
                  label={t('contact.form.subject')}
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  error={errors.subject}
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
            </div>

            <div className="contact__map">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d194472.76853036437!2d49.83353457193374!3d40.39473700779781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d6bd6211cf9%3A0x343f6b5e7ae56c6b!2sBaku!5e0!3m2!1sen!2saz!4v1709292020202!5m2!1sen!2saz" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Baku, Azerbaijan Map"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
