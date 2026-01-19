import type { HomeData, ContactFormData } from '../Models/HomeModels';
import {
  heroAPI,
  aboutAPI,
  servicesAPI,
  statsAPI,
  projectsAPI,
  workflowAPI,
  partnersAPI,
  testimonialsAPI,
  contactInfoAPI,
  socialsAPI,
  mapUrlAPI,
  languagesAPI,
  applicationsAPI,
} from '../../../services/api';

class HomeService {
  private static instance: HomeService;

  private constructor() { }

  static getInstance(): HomeService {
    if (!HomeService.instance) {
      HomeService.instance = new HomeService();
    }
    return HomeService.instance;
  }

  async getHomeData(): Promise<HomeData> {
    // Fetch all data in parallel for better performance
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
      mapUrl,
      languages,
    ] = await Promise.all([
      heroAPI.get(),
      aboutAPI.get(),
      projectsAPI.getAll(),
      servicesAPI.getAll(),
      statsAPI.getAll(),
      workflowAPI.getAll(),
      partnersAPI.getAll(),
      testimonialsAPI.getAll(),
      contactInfoAPI.getAll(),
      socialsAPI.getAll(),
      mapUrlAPI.get(),
      languagesAPI.getAll(),
    ]);

    return {
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
      mapUrl,
      languages,
    };
  }

  async submitContactForm(data: ContactFormData): Promise<{ success: boolean; message: string }> {
    // Map form data to API format
    const applicationData = {
      full_name: `${data.name} ${data.surname}`.trim(),
      email: data.email,
      phone: data.phone,
      message: data.message,
    };

    return applicationsAPI.submit(applicationData);
  }
}

export default HomeService.getInstance();
