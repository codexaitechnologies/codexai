import { LucideIcon } from "lucide-react";

export interface Course {
  title: string;
  duration: string;
  icon: LucideIcon;
  description: string;
  features: string[];
  projectCount: string;
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
}
