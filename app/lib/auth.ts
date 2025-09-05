// Simple mock authentication for demonstration
export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const mockLogin = async (email: string, password: string): Promise<User> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock validation - in real app, this would be server-side
  if (email && password) {
    return {
      id: '1',
      email,
      name: email.split('@')[0]
    };
  }
  
  throw new Error('Invalid credentials');
};

export const mockSignup = async (email: string, password: string): Promise<User> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock validation - in real app, this would be server-side
  if (email && password) {
    return {
      id: '1',
      email,
      name: email.split('@')[0]
    };
  }
  
  throw new Error('Registration failed');
};
