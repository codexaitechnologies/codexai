import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import CourseDetail from "./pages/CourseDetail";
import About from "./pages/About";
import Workshop from "./pages/Workshop";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "course/:courseId", Component: CourseDetail },
      { path: "about", Component: About },
      { path: "workshop", Component: Workshop },
      { path: "*", Component: NotFound },
    ],
  },
]);
