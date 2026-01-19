import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SlSocialFacebook, SlSocialInstagram, SlSocialLinkedin, SlSocialYoutube, SlLocationPin, SlPhone, SlEnvolope, SlClock } from 'react-icons/sl';
import { useHome } from '../../Modules/Home/Provider/HomeContext';
import { getTranslation } from '../../utils/translations';
import logo from '../../assets/images/logo.jpeg';
import './Footer.scss';

// Social type to icon mapping
const socialTypeIcons: Record<string, React.ReactElement> = {
  facebook: <SlSocialFacebook />,
  instagram: <SlSocialInstagram />,
  linkedin: <SlSocialLinkedin />,
  youtube: <SlSocialYoutube />,
};

// Contact type to icon mapping
const contactTypeIcons: Record<string, React.ReactElement> = {
  address: <SlLocationPin />,
  phone: <SlPhone />,
  email: <SlEnvolope />,
  working_hours: <SlClock />,
};

const Footer = () => {
  const { t } = useTranslation();
  const { homeData, currentLang } = useHome();
  const currentYear = new Date().getFullYear();

  const socials = homeData?.socials || [];
  const contactInfo = homeData?.contactInfo || [];

  // Build social links from API or use fallback
  const socialLinks = socials.length > 0
    ? socials.map((social) => ({
      name: social.type,
      icon: socialTypeIcons[social.type.toLowerCase()] || <SlSocialFacebook />,
      url: social.url,
    }))
    : [
      { name: 'Facebook', icon: <SlSocialFacebook />, url: '#' },
      { name: 'Instagram', icon: <SlSocialInstagram />, url: 'https://www.instagram.com/trmmc.az/' },
      { name: 'LinkedIn', icon: <SlSocialLinkedin />, url: '#' },
      { name: 'YouTube', icon: <SlSocialYoutube />, url: '#' },
    ];

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__grid">
          {/* Brand Column */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <img src={logo} alt="TR Construction" />
              <span>TR Construction</span>
            </Link>
            <p className="footer__description">{t('footer.description')}</p>
            <div className="footer__social">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="footer__social-link"
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__column">
            <h4 className="footer__title">{t('footer.quickLinks')}</h4>
            <ul className="footer__links">
              <li><Link to="/">{t('nav.home')}</Link></li>
              <li><Link to="/about">{t('nav.about')}</Link></li>
              <li><Link to="/services">{t('nav.services')}</Link></li>
              <li><Link to="/projects">{t('nav.projects')}</Link></li>
              <li><Link to="/contact">{t('nav.contact')}</Link></li>
            </ul>
          </div>



          {/* Contact Info */}
          <div className="footer__column">
            <h4 className="footer__title">{t('footer.contactInfo')}</h4>
            <ul className="footer__contact">
              {contactInfo.length > 0 ? (
                contactInfo.map((info, index) => {
                  const icon = contactTypeIcons[info.contact_type] || <SlLocationPin />;
                  const detail = getTranslation(info.detail, currentLang);

                  return (
                    <li key={info.id || index}>
                      <span className="footer__contact-icon">{icon}</span>
                      {info.url ? (
                        <a href={info.url}>{detail}</a>
                      ) : (
                        <span>{detail}</span>
                      )}
                    </li>
                  );
                })
              ) : (
                <>
                  <li>
                    <span className="footer__contact-icon"><SlLocationPin /></span>
                    <span>{t('contact.info.addressValue')}</span>
                  </li>
                  <li>
                    <span className="footer__contact-icon"><SlPhone /></span>
                    <a href="tel:+994XXXXXXXX">{t('contact.info.phoneValue')}</a>
                  </li>
                  <li>
                    <span className="footer__contact-icon"><SlEnvolope /></span>
                    <a href="mailto:info@trconstruction.az">{t('contact.info.emailValue')}</a>
                  </li>
                  <li>
                    <span className="footer__contact-icon"><SlClock /></span>
                    <span>{t('contact.info.workingHoursValue')}</span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>{t('footer.copyright').replace('2024', String(currentYear))}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
