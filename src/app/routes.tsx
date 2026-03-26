import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/layouts/RootLayout";
import { HomePage } from "./components/pages/HomePage";
import { CourseCatalog } from "./components/pages/CourseCatalog";
import { CourseDetail } from "./components/pages/CourseDetail";
import { AboutPage } from "./components/pages/AboutPage";
import { StudentDashboard } from "./components/pages/StudentDashboard";
import { AssessmentPage } from "./components/pages/AssessmentPage";
import { AssessmentTake } from "./components/pages/AssessmentTake";
import { MockInterviewPage } from "./components/pages/MockInterviewPage";
import { InstructorDashboard } from "./components/pages/InstructorDashboard";
import { CommunityPage } from "./components/pages/CommunityPage";
import { ProjectShowcase } from "./components/pages/ProjectShowcase";
import { CareerResources } from "./components/pages/CareerResources";
import { ResumeBuilder } from "./components/pages/ResumeBuilder";
import { EnrollmentPage } from "./components/pages/EnrollmentPage";
import { SuccessStories } from "./components/pages/SuccessStories";
import { NotFound } from "./components/pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "courses", Component: CourseCatalog },
      { path: "courses/:id", Component: CourseDetail },
      { path: "about", Component: AboutPage },
      { path: "student/dashboard", Component: StudentDashboard },
      { path: "student/assessments", Component: AssessmentPage },
      { path: "student/assessments/:id", Component: AssessmentTake },
      { path: "student/mock-interviews", Component: MockInterviewPage },
      { path: "instructor/dashboard", Component: InstructorDashboard },
      { path: "community", Component: CommunityPage },
      { path: "projects", Component: ProjectShowcase },
      { path: "career-resources", Component: CareerResources },
      { path: "career-resources/resume-builder", Component: ResumeBuilder },
      { path: "enroll/:courseId", Component: EnrollmentPage },
      { path: "success-stories", Component: SuccessStories },
      { path: "*", Component: NotFound },
    ],
  },
]);
