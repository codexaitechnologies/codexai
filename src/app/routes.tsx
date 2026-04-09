import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import CourseDetail from "./pages/CourseDetail";
import Enrollment from "./pages/Enrollment";
import About from "./pages/About";
import Brochure from "./pages/Brochure";
import WhyUs from "./pages/WhyUs";
import FAQ from "./pages/FAQ";
import MyCourses from "./pages/MyCourses";
import PaymentSuccess from "./pages/PaymentSuccess";
import Login from "./pages/Login";
import ConfirmEmail from "./pages/ConfirmEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Account from "./pages/Account";
import ContactSupport from "./pages/ContactSupport";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import Legal from "./pages/Legal";
import SignUp from "./pages/SignUp";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "course/:courseId", Component: CourseDetail },
      { path: "enrollment/:courseId", Component: Enrollment },
      { path: "about", Component: About },
      { path: "brochure", Component: Brochure },
      { path: "why-us", Component: WhyUs },
      { path: "faq", Component: FAQ },
      { path: "contact", Component: ContactSupport },
      { path: "payment-success", Component: PaymentSuccess },
      { path: "login", Component: Login },
      { path: "signup", Component: SignUp },
      { path: "confirm-email", Component: ConfirmEmail },
      { path: "forgot-password", Component: ForgotPassword },
      { path: "reset-password", Component: ResetPassword },
      { path: "account", Component: Account },
      { path: "my-courses", Component: MyCourses },
      { path: "legal/:documentName", Component: Legal },
      { path: "*", Component: NotFound },
    ],
  },
]);
