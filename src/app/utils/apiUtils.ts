import type { CreateUserRequest, CreateUserResponse, ApiError, User } from "../types/api";

const API_BASE_URL = "https://r5exi0cxad.execute-api.ap-south-1.amazonaws.com";

// Generic API request handler
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    // Handle HTTP errors
    if (!response.ok) {
      let errorData: any = {};
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: `HTTP ${response.status}` };
      }
      
      const error: ApiError = {
        message: errorData.message || errorData.error || `HTTP ${response.status}`,
        statusCode: response.status,
      };
      
      console.error(`API Error Response:`, errorData);
      throw error;
    }

    // Parse and return JSON response
    return await response.json();
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
}

// Create user endpoint
export async function createUser(userData: CreateUserRequest): Promise<User> {
  try {
    console.log("Creating user with data:", userData);
    const response = await apiRequest<CreateUserResponse>("/users", {
      method: "POST",
      body: JSON.stringify(userData),
    });

    if (!response.user) {
      throw new Error("Invalid response: user data not found");
    }

    return response.user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

// Additional utility for checking if API is accessible
export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await fetch(API_BASE_URL, { method: "HEAD" });
    return response.ok || response.status === 404; // 404 is okay for HEAD on non-existent root
  } catch {
    return false;
  }
}

// Submit brochure enquiry
export async function submitBrochureEnquiry(enquiry: {
  fullName: string;
  email: string;
  phoneNumber: string;
  course: string;
  courseId: string;
}): Promise<any> {
  try {
    console.log("Submitting brochure enquiry with data:", enquiry);
    const response = await fetch(
      "https://r5exi0cxad.execute-api.ap-south-1.amazonaws.com/enquiries/submit-brochure",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enquiry),
      }
    );

    if (!response.ok) {
      let errorData: any = {};
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: `HTTP ${response.status}` };
      }
      console.error(`API Error Response (${response.status}):`, errorData);
      throw new Error(errorData.message || errorData.error || `HTTP ${response.status}`);
    }

    const responseData = await response.json();
    console.log("✅ Brochure enquiry submitted successfully!");
    console.log("Backend Response:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error submitting brochure enquiry:", error);
    throw error;
  }
}

// Fetch courses from API
export async function fetchCourses(limit = 10) {
  try {
    const response = await fetch(
      `https://r5exi0cxad.execute-api.ap-south-1.amazonaws.com/courses?limit=${limit}`,
      { headers: { "Content-Type": "application/json" } }
    );
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data.courses)) throw new Error("Invalid API response");
    // Map iconName to icon for UI compatibility
    return data.courses.map((c: any) => ({ ...c, icon: c.iconName }));
  } catch (err) {
    console.error("Failed to fetch courses from API, using mock data.", err);
    return null;
  }
}
