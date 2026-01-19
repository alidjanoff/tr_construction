// Re-export types from central types module
export type {
  Hero,
  About,
  Service,
  Stat,
  Project,
  Workflow,
  Partner,
  Testimonial,
  ContactInfo,
  Social,
  MapUrl,
  Language,
  HomeData,
  TranslatedString,
  ProjectImage,
} from '../../../types';

// Contact Form Data for UI
export interface ContactFormData {
  name: string;
  surname: string;
  email: string;
  phone: string;
  message: string;
}
