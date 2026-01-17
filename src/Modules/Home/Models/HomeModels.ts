// Home Module TypeScript Models

export interface MultiLangText {
  az: string;
  en: string;
  [key: string]: string;
}

export interface HeroSlide {
  id: string;
  title: string | null;
  info: string | null;
  image_url: string;
  button_text: string | null;
  button_url: string | null;
}

export interface AboutData {
  title: string;
  info: string;
  description: string;
  image: string;
  our_mission: string;
  our_vision: string;
}

export interface Project {
  id: string;
  title: string;
  badge: string;
  address: string;
  map_url: string;
  cover_image: string;
  details?: string;
  image_gallery?: { id: string; image_url: string }[];
}

export interface Service {
  id: string;
  title: string;
  info: string;
}

export interface Stat {
  id: string;
  count: string;
  detail: string;
}

export interface WorkflowStep {
  id: string;
  title: string;
  details: string;
}

export interface Partner {
  id: string;
  title: string;
  image: string;
}

export interface Testimonial {
  id: string;
  customer_full_name: string;
  customer_type: string;
  customer_review: string;
}

export interface ContactInfo {
  id: string;
  title: string;
  detail: string;
  url: string;
  contact_type: string;
}

export interface SocialLink {
  id: string;
  url: string;
  type: string;
}

export interface MapCoordinates {
  long: string;
  lat: string;
}

export interface ContactFormData {
  full_name: string;
  email: string;
  phone: string;
  message: string;
}

export interface HomeData {
  hero: HeroSlide[];
  about: AboutData;
  projects: Project[];
  services: Service[];
  stats: Stat[];
  workflow: WorkflowStep[];
  partners: Partner[];
  testimonials: Testimonial[];
  contactInfo: ContactInfo[];
  socials: SocialLink[];
  mapUrl: MapCoordinates;
}
