import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsGeoAlt,
  BsTelephone,
  BsEnvelope
} from 'react-icons/bs';
import { useHome } from '../../Modules/Home/Provider/HomeProvider';
import type { ContactInfo, SocialLink } from '../../Modules/Home/Models/HomeModels';
import './Footer.scss';

const Footer = () => {
  const { t } = useTranslation();
  const { homeData } = useHome();

  const getContactIcon = (type: string) => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes('address')) return <BsGeoAlt />;
    if (lowerType.includes('phone')) return <BsTelephone />;
    if (lowerType.includes('email')) return <BsEnvelope />;
    return null;
  };

  const getSocialIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'facebook': return <BsFacebook />;
      case 'instagram': return <BsInstagram />;
      case 'linkedin': return <BsLinkedin />;
      default: return null;
    }
  };

  return (
    <footer className="footer">
      <div className="footer__container container">
        <div className="footer__grid">
          <div className="footer__about">
            <Link to="/" className="footer__logo">
              TR CONSTRUCTION
            </Link>
            <p className="footer__description">
              {t('footer.description')}
            </p>
            <div className="footer__socials">
              {homeData?.socials.map((social: SocialLink) => {
                const Icon = getSocialIcon(social.type);
                return (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.type}
                  >
                    {Icon}
                  </a>
                );
              })}
            </div>
          </div>

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

          <div className="footer__column">
            <h4 className="footer__title">{t('footer.contactInfo')}</h4>
            <ul className="footer__contact">
              {homeData?.contactInfo
                .filter((info: ContactInfo) => {
                  const lowerType = info.contact_type.toLowerCase();
                  return ['address', 'phone', 'email'].includes(lowerType);
                })
                .map((info: ContactInfo) => (
                  <li key={info.id}>
                    <span className="footer__contact-icon">{getContactIcon(info.contact_type)}</span>
                    {info.contact_type.toLowerCase() === 'phone' ? (
                      <a href={`tel:${info.detail}`}>{info.detail}</a>
                    ) : info.contact_type.toLowerCase() === 'email' ? (
                      <a href={`mailto:${info.detail}`}>{info.detail}</a>
                    ) : (
                      <span>{info.detail}</span>
                    )}
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} TR CONSTRUCTION. {t('footer.allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
