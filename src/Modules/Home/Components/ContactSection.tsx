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
    phone: '+994 ',
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
    // Validate phone - must have valid Azerbaijan format
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length < 12) {
      newErrors.phone = 'Telefon nömrəsini tam daxil edin';
    } else {
      const prefix = phoneDigits.substring(3, 5);
      const validPrefixes = ['12', '50', '51', '55', '99', '70', '77', '40', '10'];
      if (!validPrefixes.includes(prefix)) {
        newErrors.phone = 'Düzgün operator kodu daxil edin';
      }
    }
    if (!formData.message.trim()) newErrors.message = 'Mesaj daxil edin';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatPhoneNumber = (value: string): string => {
    // Keep only digits
    let digits = value.replace(/\D/g, '');

    // Ensure starts with 994
    if (!digits.startsWith('994')) {
      digits = '994' + digits.replace(/^994/, '');
    }

    // Limit to 12 digits (994 + 9 digits)
    digits = digits.substring(0, 12);

    // Format: +994 55 555 55 55
    let formatted = '+994 ';
    if (digits.length > 3) {
      const remaining = digits.substring(3);
      if (remaining.length > 0) {
        formatted += remaining.substring(0, 2);
        if (remaining.length > 2) {
          formatted += ' ' + remaining.substring(2, 5);
          if (remaining.length > 5) {
            formatted += ' ' + remaining.substring(5, 7);
            if (remaining.length > 7) {
              formatted += ' ' + remaining.substring(7, 9);
            }
          }
        }
      }
    }

    return formatted;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      const formattedPhone = formatPhoneNumber(value);
      setFormData((prev) => ({ ...prev, phone: formattedPhone }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

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
        setFormData({ name: '', email: '', phone: '+994 ', message: '' });
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
              <CustomInput
                label={t('contact.form.phone')}
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                placeholder="+994 55 555 55 55"
              />
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
