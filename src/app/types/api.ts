export interface CreateUserRequest {
  fullName: string;
  email: string;
  phoneNumber: string;
  course: string;
  courseId?: string;
}

export interface User {
  userId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  course: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserResponse {
  message: string;
  user: User;
}

export interface ApiError {
  message?: string;
  error?: string;
  statusCode?: number;
}
