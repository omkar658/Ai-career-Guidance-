// API utility functions for communicating with the Python FastAPI backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

class APIClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<APIResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add authorization header if token exists
    const token = this.getAuthToken();
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      return data;
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  private getAuthToken(): string | null {
    // Get token from localStorage or wherever you store it
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  // Authentication endpoints
  async register(userData: { email: string; name: string; password: string }) {
    return this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials: { email: string; password: string }) {
    return this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async getCurrentUser() {
    return this.request('/api/auth/me');
  }

  // Profile endpoints
  async createProfile(profileData: any) {
    return this.request('/api/profile', {
      method: 'POST',
      body: JSON.stringify(profileData),
    });
  }

  async getProfile() {
    return this.request('/api/profile');
  }

  async submitProfile(profileData: any) {
    return this.request('/api/profile/submit', {
      method: 'POST',
      body: JSON.stringify(profileData),
    });
  }

  // Dashboard endpoint - only returns user profile data
  async getDashboard() {
    return this.request('/api/dashboard');
  }

  // Chat endpoints
  async sendChatMessage(message: string, context?: any) {
    return this.request('/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        message,
        context,
      }),
    });
  }

  async getChatHistory() {
    return this.request('/api/chat/history');
  }

  async submitChatFeedback(feedback: any) {
    return this.request('/api/chat/feedback', {
      method: 'POST',
      body: JSON.stringify(feedback),
    });
  }
}

// Create and export a singleton instance
export const apiClient = new APIClient(API_BASE_URL);

// Export types
export type { APIResponse };