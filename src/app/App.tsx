import { RouterProvider } from 'react-router';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { router } from './routes';
import { ThemeProvider } from './context/ThemeContext';
import { CoursesProvider } from './context/CoursesContext';
import { AuthProvider } from './context/AuthContext';

const GOOGLE_CLIENT_ID = '777482089639-cmkv7i31drlcqc6vhguusb7bn966cu49.apps.googleusercontent.com';

export default function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <ThemeProvider>
        <CoursesProvider>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </CoursesProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}
