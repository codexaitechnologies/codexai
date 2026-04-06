import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authService } from "../services/authService";

interface User {
  id: string;
  email: string;
  fullName: string;
  phoneNumber?: string;
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, fullName: string, phoneNumber: string) => Promise<void>;
  confirmEmail: (email: string, confirmationCode: string) => Promise<void>;
  resendCode: (email: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (email: string, confirmationCode: string, newPassword: string) => Promise<void>;
  googleSignUp: (googleIdToken: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = localStorage.getItem("accessToken");
        const userData = localStorage.getItem("user");
        
        if (token && userData) {
          setAccessToken(token);
          const parsedUser = JSON.parse(userData);
          if (parsedUser && parsedUser.email) {
            setUser(parsedUser);
          }
        }
      } catch (error) {
        console.error("Error initializing auth from localStorage:", error);
        // Clear corrupted data
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authService.login({ email, password });
      setAccessToken(response.accessToken);
      setUser(response.user);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, fullName: string, phoneNumber: string) => {
    setIsLoading(true);
    try {
      await authService.signUp({ email, password, fullName, phoneNumber });
      // Don't auto-login after signup, user needs to confirm email first
    } finally {
      setIsLoading(false);
    }
  };

  const confirmEmail = async (email: string, confirmationCode: string) => {
    setIsLoading(true);
    try {
      await authService.confirmEmail({ email, confirmationCode });
    } finally {
      setIsLoading(false);
    }
  };

  const resendCode = async (email: string) => {
    setIsLoading(true);
    try {
      await authService.resendCode({ email });
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    try {
      await authService.forgotPassword({ email });
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string, confirmationCode: string, newPassword: string) => {
    setIsLoading(true);
    try {
      await authService.resetPassword({ email, confirmationCode, newPassword });
    } finally {
      setIsLoading(false);
    }
  };

  const googleSignUp = async (googleIdToken: string) => {
    setIsLoading(true);
    try {
      const response = await authService.googleSignUp({ googleIdToken });
      setAccessToken(response.accessToken);
      setUser(response.user);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      if (accessToken) {
        await authService.logout(accessToken);
      }
      setAccessToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshAccessToken = async (): Promise<string | null> => {
    try {
      const response = await authService.refreshToken();
      setAccessToken(response.accessToken);
      return response.accessToken;
    } catch (error) {
      console.error("Token refresh failed:", error);
      setAccessToken(null);
      setUser(null);
      return null;
    }
  };

  const value: AuthContextType = {
    user,
    accessToken,
    isLoading,
    isAuthenticated: !!accessToken,
    login,
    signup,
    confirmEmail,
    resendCode,
    forgotPassword,
    resetPassword,
    googleSignUp,
    logout,
    refreshAccessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
