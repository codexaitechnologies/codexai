import { RouterProvider } from 'react-router';
import { router } from './routes';
import { ThemeProvider } from './context/ThemeContext';
import { CoursesProvider } from './context/CoursesContext';

export default function App() {
  return (
    <ThemeProvider>
      <CoursesProvider>
        <RouterProvider router={router} />
      </CoursesProvider>
    </ThemeProvider>
  );
}
