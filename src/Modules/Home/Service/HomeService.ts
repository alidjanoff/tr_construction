import type { ContactFormData, HomeData } from '../Models/HomeModels';

// Import local images
import project1 from '../../../assets/images/WhatsApp Image 2025-12-27 at 15.53.40.jpeg';
import project2 from '../../../assets/images/WhatsApp Image 2025-12-27 at 15.53.41.jpeg';
import project3 from '../../../assets/images/WhatsApp Image 2025-12-27 at 15.53.42.jpeg';
import project4 from '../../../assets/images/WhatsApp Image 2025-12-27 at 15.53.43.jpeg';
import project5 from '../../../assets/images/WhatsApp Image 2025-12-27 at 15.53.44.jpeg';

class HomeService {
  private static instance: HomeService;
  // private baseUrl = '/api'; // Uncomment when API is ready

  private constructor() {}

  static getInstance(): HomeService {
    if (!HomeService.instance) {
      HomeService.instance = new HomeService();
    }
    return HomeService.instance;
  }

  // Mock data - in production this would come from API
  async getHomeData(): Promise<HomeData> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          projects: [
            {
              id: '1',
              title: 'Villa Residance',
              location: 'Badamdar, Bakı',
              image: project1,
              category: 'İnteryer',
            },
            {
              id: '2',
              title: 'Biznes Mərkəzi',
              location: 'Nərimanov, Bakı',
              image: project2,
              category: 'Tikinti',
            },
            {
              id: '3',
              title: 'Mənzil Renovasiyası',
              location: 'Yasamal, Bakı',
              image: project3,
              category: 'Təmir',
            },
            {
              id: '4',
              title: 'Restoran Dizaynı',
              location: 'Səbail, Bakı',
              image: project4,
              category: 'İnteryer',
            },
            {
              id: '5',
              title: 'Ofis Binası',
              location: 'Xətai, Bakı',
              image: project5,
              category: 'Eksteryer',
            },
          ],
          services: [
            {
              id: '1',
              icon: '🏠',
              titleKey: 'services.items.interior.title',
              descriptionKey: 'services.items.interior.description',
            },
            {
              id: '2',
              icon: '🏢',
              titleKey: 'services.items.exterior.title',
              descriptionKey: 'services.items.exterior.description',
            },
            {
              id: '3',
              icon: '🏗️',
              titleKey: 'services.items.construction.title',
              descriptionKey: 'services.items.construction.description',
            },
            {
              id: '4',
              icon: '🔧',
              titleKey: 'services.items.renovation.title',
              descriptionKey: 'services.items.renovation.description',
            },
          ],
          stats: [
            { id: '1', value: 150, suffix: '+', labelKey: 'stats.projects' },
            { id: '2', value: 10, suffix: '+', labelKey: 'stats.experience' },
            { id: '3', value: 200, suffix: '+', labelKey: 'stats.clients' },
            { id: '4', value: 25, suffix: '+', labelKey: 'stats.team' },
          ],
          workflowSteps: [
            {
              id: '1',
              icon: '📋',
              titleKey: 'workflow.steps.planning.title',
              descriptionKey: 'workflow.steps.planning.description',
            },
            {
              id: '2',
              icon: '✏️',
              titleKey: 'workflow.steps.design.title',
              descriptionKey: 'workflow.steps.design.description',
            },
            {
              id: '3',
              icon: '🏗️',
              titleKey: 'workflow.steps.construction.title',
              descriptionKey: 'workflow.steps.construction.description',
            },
            {
              id: '4',
              icon: '🔑',
              titleKey: 'workflow.steps.delivery.title',
              descriptionKey: 'workflow.steps.delivery.description',
            },
          ],
          partners: [
            { id: '1', name: 'Partner 1', logo: '' },
            { id: '2', name: 'Partner 2', logo: '' },
            { id: '3', name: 'Partner 3', logo: '' },
            { id: '4', name: 'Partner 4', logo: '' },
            { id: '5', name: 'Partner 5', logo: '' },
          ],
          testimonials: [
            {
              id: '1',
              name: 'Əli Məmmədov',
              role: 'Ev sahibi',
              content: 'TR Construction ilə çalışmaq çox xoş təcrübə oldu. Evimizdə əsaslı təmir etdilər və nəticə gözləntilə rimizdən də yaxşı oldu.',
              avatar: '',
              rating: 5,
            },
            {
              id: '2',
              name: 'Leyla Həsənova',
              role: 'İş adamı',
              content: 'Ofisimizin interyer dizaynı üçün TR Construction-a müraciət etdik. Çox peşəkar yanaşma və keyfiyyətli iş!',
              avatar: '',
              rating: 5,
            },
            {
              id: '3',
              name: 'Rəşad Quliyev',
              role: 'Villa sahibi',
              content: 'Villamızın tikintisini A-dan Z-yə onlara etibar etdik. Vaxtında təhvil verdilər və keyfiyyət mükəmməl idi.',
              avatar: '',
              rating: 5,
            },
          ],
        });
      }, 500);
    });
  }

  async submitContactForm(data: ContactFormData): Promise<{ success: boolean; message: string }> {
    try {
      // In production, this would be a real API call
      // const response = await axios.post(`${this.baseUrl}/contact`, data);
      
      // Simulate API call
      console.log('Contact form submitted:', data);
      
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            message: 'Message sent successfully!',
          });
        }, 1000);
      });
    } catch (error) {
      throw new Error('Failed to submit contact form');
    }
  }
}

export default HomeService.getInstance();
