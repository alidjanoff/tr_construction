// Generic translation type for translatable fields
export type TranslatedString = Record<string, string>;

// Language Types
export interface Language {
    id: string;
    lang: string;
}

// Hero Types
export interface Hero {
    title: TranslatedString;
    info: TranslatedString;
    images: string[];
}

// About Types
export interface About {
    title: TranslatedString;
    info: TranslatedString;
    description: TranslatedString;
    image: string;
    our_mission: TranslatedString;
    our_vision: TranslatedString;
}

// Service Types
export interface Service {
    id: string;
    title: TranslatedString;
    info: TranslatedString;
}

// Stat Types
export interface Stat {
    id: string;
    count: TranslatedString;
    detail: TranslatedString;
}

// Project Types
export interface ProjectImage {
    id: string;
    image_url: string;
}

export interface Project {
    id: string;
    title: TranslatedString;
    details: TranslatedString;
    badge: TranslatedString;
    address: TranslatedString;
    map_url: string;
    cover_image: string;
    image_gallery?: ProjectImage[];
}

// Workflow Types
export interface Workflow {
    id: string;
    title: TranslatedString;
    details: TranslatedString;
}

// Partner Types
export interface Partner {
    id: string;
    title: TranslatedString;
    image: string;
}

// Testimonial Types (no rating)
export interface Testimonial {
    id: string;
    customer_full_name: string;
    customer_type: TranslatedString;
    customer_review: TranslatedString;
}

// Contact Info Types
export interface ContactInfo {
    id: string;
    title: TranslatedString;
    detail: TranslatedString;
    url?: string;
    contact_type: string;
}

// Social Types (not translatable)
export interface Social {
    id: string;
    url: string;
    type: string;
}

// Map URL Types (not translatable)
export interface MapUrl {
    long: string;
    lat: string;
}

// Application Types (contact form submission)
export interface ApplicationRequest {
    full_name: string;
    email: string;
    phone: string;
    message: string;
}

// API Response wrapper
export interface ApiResponse<T> {
    data: T;
}

// Home Data aggregate type
export interface HomeData {
    hero: Hero | null;
    about: About | null;
    projects: Project[];
    services: Service[];
    stats: Stat[];
    workflow: Workflow[];
    partners: Partner[];
    testimonials: Testimonial[];
    contactInfo: ContactInfo[];
    socials: Social[];
    mapUrl: MapUrl | null;
    languages: Language[];
}
