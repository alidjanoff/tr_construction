import axios, { type AxiosInstance } from 'axios';
import type {
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
    ApplicationRequest,
} from '../types';

const API_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/api/v1';

// Create axios instance
const api: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Hero API
export const heroAPI = {
    get: async (): Promise<Hero | null> => {
        try {
            const response = await api.get('/hero');
            return response.data?.data || response.data || null;
        } catch (error) {
            console.error('Error fetching hero:', error);
            return null;
        }
    },
};

// About API
export const aboutAPI = {
    get: async (): Promise<About | null> => {
        try {
            const response = await api.get('/about');
            return response.data?.data || response.data || null;
        } catch (error) {
            console.error('Error fetching about:', error);
            return null;
        }
    },
};

// Services API
export const servicesAPI = {
    getAll: async (): Promise<Service[]> => {
        try {
            const response = await api.get('/services');
            const data = response.data?.data || response.data;
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Error fetching services:', error);
            return [];
        }
    },
    getOne: async (id: string): Promise<Service | null> => {
        try {
            const response = await api.get(`/services/${id}`);
            return response.data?.data || response.data || null;
        } catch (error) {
            console.error('Error fetching service:', error);
            return null;
        }
    },
};

// Stats API
export const statsAPI = {
    getAll: async (): Promise<Stat[]> => {
        try {
            const response = await api.get('/stats');
            const data = response.data?.data || response.data;
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Error fetching stats:', error);
            return [];
        }
    },
};

// Projects API
export const projectsAPI = {
    getAll: async (): Promise<Project[]> => {
        try {
            const response = await api.get('/projects');
            const data = response.data?.data || response.data;
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Error fetching projects:', error);
            return [];
        }
    },
    getOne: async (id: string): Promise<Project | null> => {
        try {
            const response = await api.get(`/projects/${id}`);
            return response.data?.data || response.data || null;
        } catch (error) {
            console.error('Error fetching project:', error);
            return null;
        }
    },
};

// Workflow API
export const workflowAPI = {
    getAll: async (): Promise<Workflow[]> => {
        try {
            const response = await api.get('/workflow');
            const data = response.data?.data || response.data;
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Error fetching workflow:', error);
            return [];
        }
    },
};

// Partners API
export const partnersAPI = {
    getAll: async (): Promise<Partner[]> => {
        try {
            const response = await api.get('/partners');
            const data = response.data?.data || response.data;
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Error fetching partners:', error);
            return [];
        }
    },
};

// Testimonials API
export const testimonialsAPI = {
    getAll: async (): Promise<Testimonial[]> => {
        try {
            const response = await api.get('/testimonials');
            const data = response.data?.data || response.data;
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Error fetching testimonials:', error);
            return [];
        }
    },
};

// Contact Info API
export const contactInfoAPI = {
    getAll: async (): Promise<ContactInfo[]> => {
        try {
            const response = await api.get('/contact_info');
            const data = response.data?.data || response.data;
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Error fetching contact info:', error);
            return [];
        }
    },
};

// Socials API
export const socialsAPI = {
    getAll: async (): Promise<Social[]> => {
        try {
            const response = await api.get('/socials');
            const data = response.data?.data || response.data;
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Error fetching socials:', error);
            return [];
        }
    },
};

// Map URL API
export const mapUrlAPI = {
    get: async (): Promise<MapUrl | null> => {
        try {
            const response = await api.get('/map_url');
            return response.data?.data || response.data || null;
        } catch (error) {
            console.error('Error fetching map url:', error);
            return null;
        }
    },
};

// Languages API
export const languagesAPI = {
    getAll: async (): Promise<Language[]> => {
        try {
            const response = await api.get('/languages');
            const data = response.data?.data || response.data;
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Error fetching languages:', error);
            return [];
        }
    },
};

// Applications API (contact form)
export const applicationsAPI = {
    submit: async (data: ApplicationRequest): Promise<{ success: boolean; message: string }> => {
        try {
            const response = await api.post('/applications', data);
            return {
                success: true,
                message: response.data?.message || response.data || 'Müraciətiniz qəbul olundu',
            };
        } catch (error) {
            console.error('Error submitting application:', error);
            return {
                success: false,
                message: 'Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.',
            };
        }
    },
};

export default api;
