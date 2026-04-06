import { RouterProvider } from 'react-router';
import { router } from './routes';
import { ThemeProvider } from './context/ThemeContext';
import { CoursesProvider } from './context/CoursesContext';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <ThemeProvider>
      <CoursesProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </CoursesProvider>
    </ThemeProvider>
  );
}
