import { LucideIcon, Code, Cloud, Sparkles, Zap, ArrowRight, CheckCircle, Users, Award, MapPin, Gift } from "lucide-react";

// Map icon names (strings from backend) to LucideIcon components
export const iconMap: Record<string, LucideIcon> = {
  Code,
  Cloud,
  Sparkles,
  Zap,
  ArrowRight,
  CheckCircle,
  Users,
  Award,
  MapPin,
  Gift,
};

// Helper function to get icon component from string name
export const getIconComponent = (iconName: string): LucideIcon => {
  return iconMap[iconName] || Code; // Default to Code icon if not found
};
