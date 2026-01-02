// Home Module TypeScript Models

export interface Project {
  id: string;
  title: string;
  location: string;
  image: string;
  category: string;
}

export interface Service {
  id: string;
  icon: string;
  titleKey: string;
  descriptionKey: string;
}

export interface Stat {
  id: string;
  value: number;
  suffix?: string;
  labelKey: string;
}

export interface WorkflowStep {
  id: string;
  icon: string;
  titleKey: string;
  descriptionKey: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface HomeData {
  projects: Project[];
  services: Service[];
  stats: Stat[];
  workflowSteps: WorkflowStep[];
  partners: Partner[];
  testimonials: Testimonial[];
}
