export interface CurriculumModule {
  week: string;
  title: string;
  topics: string[];
}

export interface Course {
  courseId: string;
  title: string;
  duration: string;
  icon: string; // Icon name as string from backend (e.g., "Sparkles", "Cloud")
  iconName?: string; // fallback to iconName from API
  description: string;
  features: string[];
  projectCount: string;
  price?: number;
  link: string;
  colorClass: {
    from: string;
    to: string;
    icon: string;
    badge: string;
    border: string;
    hoverBorder: string;
    hoverShadow: string;
  };
  isFlagship?: boolean;
  image?: string;
  highlights?: string[];
  curriculum?: CurriculumModule[];
  outcomes?: string[];
}
