import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { fetchCourses } from "../utils/apiUtils";

interface Course {
  courseId: string;
  title: string;
  duration: string;
  icon: string;
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

interface CoursesContextType {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

const CoursesContext = createContext<CoursesContextType | undefined>(undefined);

export function CoursesProvider({ children }: { children: ReactNode }) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadCourses = async () => {
      try {
        const apiCourses = await fetchCourses(10);
        if (isMounted) {
          if (apiCourses && Array.isArray(apiCourses) && apiCourses.length > 0) {
            setCourses(apiCourses);
            setError(null);
          } else {
            setCourses([]);
            setError("No courses available");
          }
        }
      } catch (err) {
        if (isMounted) {
          setError((err as any)?.message || "Failed to load courses");
          setCourses([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadCourses();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <CoursesContext.Provider value={{ courses, loading, error }}>
      {children}
    </CoursesContext.Provider>
  );
}

export function useCourses() {
  const context = useContext(CoursesContext);
  if (context === undefined) {
    throw new Error("useCourses must be used within CoursesProvider");
  }
  return context;
}
