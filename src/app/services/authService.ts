const API_BASE_URL = "https://r5exi0cxad.execute-api.ap-south-1.amazonaws.com";

// Types
export interface SignUpPayload {
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  idToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    fullName: string;
    phoneNumber: string;
    createdAt: string;
  };
}

export interface SignUpResponse {
  message: string;
  userId: string;
  email: string;
}

export interface ConfirmEmailPayload {
  email: string;
  confirmationCode: string;
}

export interface ConfirmEmailResponse {
  message: string;
  email: string;
  verified: boolean;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
  email: string;
}

export interface ResetPasswordPayload {
  email: string;
  confirmationCode: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  message: string;
  email: string;
  passwordReset: boolean;
}

export interface ResendCodePayload {
  email: string;
}

export interface ResendCodeResponse {
  message: string;
  email: string;
}

export interface GoogleSignUpPayload {
  googleIdToken: string;
}

export interface GoogleSignUpResponse {
  accessToken: string;
  idToken: string;
  refreshToken?: string;
  user: {
    id: string;
    email: string;
    fullName: string;
    phoneNumber?: string;
  };
  isNewUser: boolean;
}

export interface RefreshTokenPayload {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  idToken?: string;
  refreshToken?: string;
}

// Auth Service
export const authService = {
  /**
   * Sign up a new user
   */
  async signUp(payload: SignUpPayload): Promise<SignUpResponse> {
    try {
      console.log("📡 Signup API call to:", `${API_BASE_URL}/auth/signup`);
      console.log("📋 Signup payload:", { ...payload, password: "***" });
      
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errorMessage = "Signup failed";
        
        try {
          const error = await response.json();
          errorMessage = error.message || error.error || errorMessage;
        } catch {
          // If response is not JSON, use status text
          errorMessage = response.statusText || errorMessage;
        }

        // Provide user-friendly messages based on HTTP status code
        switch (response.status) {
          case 400:
            throw new Error(`Invalid input: ${errorMessage}`);
          case 409:
            throw new Error("This email address is already registered. Please sign in or use a different email.");
          case 422:
            throw new Error(`Validation error: ${errorMessage}`);
          case 429:
            throw new Error("Too many signup attempts. Please try again later.");
          case 500:
          case 502:
          case 503:
            throw new Error("Server error. Please try again later.");
          default:
            throw new Error(errorMessage);
        }
      }

      const data = await response.json();
      console.log("✅ Signup successful:", data);
      return data;
    } catch (error) {
      console.error("❌ Signup error:", error);
      throw error;
    }
  },

  /**
   * Confirm email with OTP
   */
  async confirmEmail(payload: ConfirmEmailPayload): Promise<ConfirmEmailResponse> {
    try {
      console.log("📡 Confirm email API call to:", `${API_BASE_URL}/auth/confirm-email`);
      const response = await fetch(`${API_BASE_URL}/auth/confirm-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errorMessage = "Email confirmation failed";
        
        try {
          const error = await response.json();
          errorMessage = error.message || error.error || errorMessage;
        } catch {
          errorMessage = response.statusText || errorMessage;
        }

        switch (response.status) {
          case 400:
            throw new Error("Invalid confirmation code. Please check and try again.");
          case 401:
            throw new Error("Your confirmation code has expired. Request a new one.");
          case 404:
            throw new Error("Email not found. Please sign up first.");
          case 429:
            throw new Error("Too many attempts. Please try again later.");
          default:
            throw new Error(errorMessage);
        }
      }

      const data = await response.json();
      console.log("✅ Email confirmed:", data);
      return data;
    } catch (error) {
      console.error("❌ Email confirmation error:", error);
      throw error;
    }
  },

  /**
   * Resend email confirmation code
   */
  async resendCode(payload: ResendCodePayload): Promise<ResendCodeResponse> {
    try {
      console.log("📡 Resend code API call to:", `${API_BASE_URL}/auth/resend-code`);
      const response = await fetch(`${API_BASE_URL}/auth/resend-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errorMessage = "Failed to resend code";
        
        try {
          const error = await response.json();
          errorMessage = error.message || error.error || errorMessage;
        } catch {
          errorMessage = response.statusText || errorMessage;
        }

        switch (response.status) {
          case 404:
            throw new Error("Email not found. Please sign up first.");
          case 429:
            throw new Error("Too many resend attempts. Please wait a few minutes before trying again.");
          default:
            throw new Error(errorMessage);
        }
      }

      const data = await response.json();
      console.log("✅ Code resent:", data);
      return data;
    } catch (error) {
      console.error("❌ Resend code error:", error);
      throw error;
    }
  },

  /**
   * Login with email and password
   */
  async login(payload: LoginPayload): Promise<LoginResponse> {
    try {
      console.log("📡 Login API call to:", `${API_BASE_URL}/auth/login`);
      console.log("📋 Login payload:", payload);
      
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errorMessage = "Login failed";
        
        try {
          const error = await response.json();
          errorMessage = error.message || error.error || errorMessage;
        } catch {
          errorMessage = response.statusText || errorMessage;
        }

        // Provide user-friendly messages based on HTTP status code
        switch (response.status) {
          case 400:
            throw new Error("Invalid email or password format.");
          case 401:
            throw new Error("Invalid email or password. Please try again.");
          case 403:
            throw new Error("Your email is not verified. Please check your email for verification link.");
          case 404:
            throw new Error("No account found with this email. Please sign up.");
          case 429:
            throw new Error("Too many login attempts. Please try again later.");
          case 500:
          case 502:
          case 503:
            throw new Error("Server error. Please try again later.");
          default:
            throw new Error(errorMessage);
        }
      }

      const data = await response.json();
      console.log("📦 Full API response:", data);
      console.log("✅ Login successful");
      
      // Map API response to expected user format
      const apiUser = data.user || {};
      console.log("🔍 Raw API user object:", apiUser);
      
      const user = {
        id: apiUser.id || data.userId || payload.email,
        email: apiUser.email || data.email || payload.email,
        fullName: apiUser.fullName || apiUser.name || data.fullName || data.name || "",
        phoneNumber: apiUser.phoneNumber || data.phoneNumber || "",
        createdAt: apiUser.createdAt || data.createdAt || new Date().toISOString(),
      };
      
      console.log("✨ Mapped user object:", user);

      // Store tokens
      if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
      }
      if (data.idToken) {
        localStorage.setItem("idToken", data.idToken);
      }
      if (data.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
      }

      // Store user info
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("studentEmail", user.email);
      localStorage.setItem("studentName", user.fullName);
      if (user.phoneNumber) {
        localStorage.setItem("phoneNumber", user.phoneNumber);
      }

      return {
        accessToken: data.accessToken || "",
        idToken: data.idToken || "",
        refreshToken: data.refreshToken || "",
        user,
      };
    } catch (error) {
      console.error("❌ Login error:", error);
      throw error;
    }
  },

  /**
   * Forgot password - initiate reset flow
   */
  async forgotPassword(payload: ForgotPasswordPayload): Promise<ForgotPasswordResponse> {
    try {
      console.log("📡 Forgot password API call to:", `${API_BASE_URL}/auth/forgot-password`);
      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errorMessage = "Forgot password request failed";
        
        try {
          const error = await response.json();
          errorMessage = error.message || error.error || errorMessage;
        } catch {
          errorMessage = response.statusText || errorMessage;
        }

        switch (response.status) {
          case 404:
            throw new Error("No account found with this email address.");
          case 429:
            throw new Error("Too many reset requests. Please try again later.");
          default:
            throw new Error(errorMessage);
        }
      }

      const data = await response.json();
      console.log("✅ Forgot password email sent:", data);
      return data;
    } catch (error) {
      console.error("❌ Forgot password error:", error);
      throw error;
    }
  },

  /**
   * Reset password with confirmation code
   */
  async resetPassword(payload: ResetPasswordPayload): Promise<ResetPasswordResponse> {
    try {
      console.log("📡 Reset password API call to:", `${API_BASE_URL}/auth/reset-password`);
      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errorMessage = "Password reset failed";
        
        try {
          const error = await response.json();
          errorMessage = error.message || error.error || errorMessage;
        } catch {
          errorMessage = response.statusText || errorMessage;
        }

        switch (response.status) {
          case 400:
            throw new Error("Invalid reset code or new password. Please check and try again.");
          case 401:
            throw new Error("Reset code has expired. Request a new one.");
          case 404:
            throw new Error("Email not found.");
          case 429:
            throw new Error("Too many reset attempts. Please try again later.");
          default:
            throw new Error(errorMessage);
        }
      }

      const data = await response.json();
      console.log("✅ Password reset successful:", data);
      return data;
    } catch (error) {
      console.error("❌ Password reset error:", error);
      throw error;
    }
  },

  /**
   * Google Sign Up / Login
   */
  async googleSignUp(payload: GoogleSignUpPayload): Promise<GoogleSignUpResponse> {
    try {
      console.log("📡 Google signup API call to:", `${API_BASE_URL}/auth/google-signup`);
      console.log("📋 Payload being sent:", { googleIdToken: payload.googleIdToken?.substring(0, 50) + "..." });
      console.log("🔐 Full token for debugging:", payload.googleIdToken);
      
      const response = await fetch(`${API_BASE_URL}/auth/google-signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("📊 Backend response status:", response.status);
      
      if (!response.ok) {
        let errorMessage = "Google authentication failed";
        
        try {
          const error = await response.json();
          console.log("❌ Backend error response:", error);
          errorMessage = error.message || error.error || errorMessage;
        } catch {
          errorMessage = response.statusText || errorMessage;
          console.log("❌ Error response text:", errorMessage);
        }

        switch (response.status) {
          case 400:
            throw new Error("Invalid Google token. Please try again.");
          case 401:
            throw new Error("Google authentication expired. Please try again.");
          default:
            throw new Error(errorMessage);
        }
      }

      const data = await response.json();
      console.log("✅ Google authentication successful:", data);

      // Handle Google login response format
      // Backend returns user data directly, we need to construct the expected response format
      const user = {
        id: data.userId || data.id,
        email: data.email,
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        picture: data.picture,
        createdAt: data.createdAt,
      };

      // Use the userId or email as a token if accessToken is not provided
      // This allows the frontend to maintain the session
      const accessToken = data.accessToken || `google_${data.userId || data.email}`;
      const idToken = data.idToken || `google_id_${data.userId || data.email}`;

      console.log("💾 Storing user session:", user);
      console.log("🔐 Access token:", accessToken);

      // Store tokens
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("idToken", idToken);
      if (data.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
      }

      // Store user info
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("studentEmail", user.email);
      localStorage.setItem("studentName", user.fullName);
      if (user.phoneNumber) {
        localStorage.setItem("phoneNumber", user.phoneNumber);
      }

      return {
        accessToken,
        idToken,
        refreshToken: data.refreshToken,
        user,
      };
    } catch (error) {
      console.error("❌ Google signup error:", error);
      throw error;
    }
  },

  /**
   * Logout user
   */
  async logout(accessToken: string): Promise<void> {
    try {
      console.log("📡 Logout API call to:", `${API_BASE_URL}/auth/logout`);
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ accessToken }),
      });

      // Clear local storage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("idToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      localStorage.removeItem("studentEmail");
      localStorage.removeItem("studentName");
      localStorage.removeItem("phoneNumber");

      console.log("✅ Logout successful");
    } catch (error) {
      console.error("❌ Logout error:", error);
      // Still clear local storage even if API call fails
      localStorage.removeItem("accessToken");
      localStorage.removeItem("idToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      localStorage.removeItem("studentEmail");
      localStorage.removeItem("studentName");
      localStorage.removeItem("phoneNumber");
    }
  },

  /**
   * Get current user from local storage
   */
  getCurrentUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  /**
   * Get access token
   */
  getAccessToken(): string | null {
    return localStorage.getItem("accessToken");
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem("accessToken");
  },

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(): Promise<RefreshTokenResponse> {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      
      if (!refreshToken) {
        throw new Error("No refresh token available. Please login again.");
      }

      console.log("🔄 Refreshing access token...");
      
      const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        let errorMessage = "Token refresh failed";
        
        try {
          const error = await response.json();
          errorMessage = error.message || error.error || errorMessage;
        } catch {
          errorMessage = response.statusText || errorMessage;
        }

        if (response.status === 401) {
          // Refresh token expired, need to login again
          localStorage.removeItem("accessToken");
          localStorage.removeItem("idToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("user");
          throw new Error("Session expired. Please login again.");
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("✅ Token refreshed successfully");

      // Store new tokens
      localStorage.setItem("accessToken", data.accessToken);
      if (data.idToken) {
        localStorage.setItem("idToken", data.idToken);
      }
      if (data.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
      }

      return data;
    } catch (error) {
      console.error("❌ Token refresh error:", error);
      throw error;
    }
  },
};
