import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

interface CourseCardProps {
  id: string;
  title: string;
  duration: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  color: "blue" | "purple" | "orange" | "gradient";
  colorClass: string;
  badgeColor: string;
  projectCount: string;
  certification: string;
  faculty: {
    name: string;
    title: string;
    avatar: string;
  };
  delay?: number;
  isFlagship?: boolean;
}

export function CourseCard({
  id,
  title,
  duration,
  description,
  image,
  icon,
  colorClass,
  badgeColor,
  projectCount,
  certification,
  faculty,
  delay = 0,
  isFlagship = false,
}: CourseCardProps) {
  // Define gradient colors based on course theme
  const gradientMap: { [key: string]: string } = {
    "blue-950": "from-blue-600 to-blue-400",
    "purple-950": "from-purple-600 to-purple-400",
    "orange-950": "from-orange-600 to-orange-400",
    "blue-500": "from-blue-600 via-purple-600 to-orange-500",
  };
  
  const buttonGradient = gradientMap[colorClass] || "from-blue-600 to-blue-400";
  
  // Define shadow colors for glow effect
  const shadowMap: { [key: string]: string } = {
    "blue-950": "shadow-blue-500/50",
    "purple-950": "shadow-purple-500/50", 
    "orange-950": "shadow-orange-500/50",
    "blue-500": "shadow-blue-500/50",
  };
  
  const shadowClass = shadowMap[colorClass] || "shadow-blue-500/50";
  
  // Define border glow colors
  const borderColorMap: { [key: string]: string } = {
    "blue-950": "group-hover:border-blue-400 group-hover:shadow-lg group-hover:shadow-blue-500/40",
    "purple-950": "group-hover:border-purple-400 group-hover:shadow-lg group-hover:shadow-purple-500/40",
    "orange-950": "group-hover:border-orange-400 group-hover:shadow-lg group-hover:shadow-orange-500/40",
    "blue-500": "group-hover:border-blue-400 group-hover:shadow-lg group-hover:shadow-blue-500/40",
  };
  
  const borderClass = borderColorMap[colorClass] || "group-hover:border-blue-400 group-hover:shadow-lg group-hover:shadow-blue-500/40";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className={`group relative flex-shrink-0 rounded-xl overflow-hidden transition-all flex flex-col ${
        isFlagship
          ? "bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-orange-500/20 border-2 border-blue-500 hover:shadow-2xl hover:shadow-blue-500/30 w-[420px]"
          : `bg-gradient-to-br from-${colorClass}/50 to-black border border-${colorClass}/30 ${borderClass} w-[420px]`
      }`}
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        
        {/* Duration Badge */}
        <div className={`absolute top-3 right-3 ${badgeColor} text-xs px-2 py-1 rounded-full font-semibold`}>
          {duration}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Icon & Title */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-white/10 to-transparent rounded-lg">
            {icon}
          </div>
          <h3 className="text-lg font-bold text-white leading-tight">{title}</h3>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-300 mb-3 line-clamp-2 flex-shrink-0">{description}</p>

        {/* Certification */}
        <div className="mb-3 pb-3 border-b border-white/10">
          <div className="inline-flex items-center gap-1 text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
            ✓ {certification}
          </div>
        </div>

        {/* Faculty Section */}
        <div className="mb-4 flex items-center gap-2">
          <img
            src={faculty.avatar}
            alt={faculty.name}
            className="w-9 h-9 rounded-full border border-white/20"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white truncate">{faculty.name}</p>
            <p className="text-xs text-gray-400">Industry Specialist</p>
          </div>
        </div>

        {/* Project Count */}
        <div className="text-xs text-blue-400 font-semibold mb-3">📚 {projectCount}</div>

        {/* CTA */}
        <Link
          to={`/course/${id}`}
          style={{
            backgroundImage: `linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to))`,
            "--tw-gradient-from": colorClass === "blue-950" ? "#2563eb" : colorClass === "purple-950" ? "#9333ea" : colorClass === "orange-950" ? "#ea580c" : "#2563eb",
            "--tw-gradient-to": colorClass === "blue-950" ? "#60a5fa" : colorClass === "purple-950" ? "#c084fc" : colorClass === "orange-950" ? "#fb923c" : "#60a5fa",
          } as React.CSSProperties}
          className="w-full text-white text-sm font-semibold py-2 px-3 rounded-lg transition-all hover:shadow-lg hover:shadow-blue-500/40 text-center flex items-center justify-center gap-1 mt-auto group/btn"
        >
          View Curriculum <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}
