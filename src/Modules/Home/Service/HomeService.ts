import axios from 'axios';
import i18n from '../../../i18n';
import type {
  ContactFormData,
  HomeData,
  HeroSlide,
  AboutData,
  Project,
  Service,
  Stat,
  WorkflowStep,
  Partner,
  Testimonial,
  ContactInfo,
  SocialLink,
  MapCoordinates
} from '../Models/HomeModels';

class HomeService {
  private static instance: HomeService;
  private baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/api/v1';

  private constructor() { }

  static getInstance(): HomeService {
    if (!HomeService.instance) {
      HomeService.instance = new HomeService();
    }
    return HomeService.instance;
  }

  private get headers() {
    return {
      'Accept-Language': i18n.language || 'az',
    };
  }

  async getHomeData(): Promise<HomeData> {
    try {
      const [
        hero,
        about,
        projects,
        services,
        stats,
        workflow,
        partners,
        testimonials,
        contactInfo,
        socials,
        mapUrl
      ] = await Promise.all([
        axios.get<HeroSlide[]>(`${this.baseUrl}/hero`, { headers: this.headers }),
        axios.get<AboutData>(`${this.baseUrl}/about`, { headers: this.headers }),
        axios.get<Project[]>(`${this.baseUrl}/projects`, { headers: this.headers }),
        axios.get<Service[]>(`${this.baseUrl}/services`, { headers: this.headers }),
        axios.get<Stat[]>(`${this.baseUrl}/stats`, { headers: this.headers }),
        axios.get<WorkflowStep[]>(`${this.baseUrl}/workflow`, { headers: this.headers }),
        axios.get<Partner[]>(`${this.baseUrl}/partners`, { headers: this.headers }),
        axios.get<Testimonial[]>(`${this.baseUrl}/testimonials`, { headers: this.headers }),
        axios.get<ContactInfo[]>(`${this.baseUrl}/contact_info`, { headers: this.headers }),
        axios.get<SocialLink[]>(`${this.baseUrl}/socials`, { headers: this.headers }),
        axios.get<MapCoordinates>(`${this.baseUrl}/map_url`, { headers: this.headers })
      ]);

      return {
        hero: hero.data,
        about: about.data,
        projects: projects.data,
        services: services.data,
        stats: stats.data,
        workflow: workflow.data,
        partners: partners.data,
        testimonials: testimonials.data,
        contactInfo: contactInfo.data,
        socials: socials.data,
        mapUrl: mapUrl.data
      };
    } catch (error) {
      console.error('Error fetching home data:', error);
      throw error;
    }
  }

  async submitContactForm(data: ContactFormData): Promise<{ success: boolean; message: string }> {
    try {
      const response = await axios.post(`${this.baseUrl}/applications`, data);
      return {
        success: true,
        message: typeof response.data === 'string' ? response.data : 'Success',
      };
    } catch (error) {
      console.error('Error submitting application:', error);
      throw new Error('Failed to submit application');
    }
  }
}

export default HomeService.getInstance();
