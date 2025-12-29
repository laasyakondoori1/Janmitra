// Mock authentication for development when Supabase is unavailable
export const mockAuth = {
  signUp: async (email: string, password: string, metadata?: any) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user = {
      id: Math.random().toString(36).substring(7),
      email,
      user_metadata: metadata,
      aud: 'authenticated',
      created_at: new Date().toISOString(),
    };
    
    // Store in localStorage for persistence
    localStorage.setItem(`auth_user_${email}`, JSON.stringify({ email, password }));
    localStorage.setItem('current_user', JSON.stringify(user));
    
    return { user, error: null };
  },

  signIn: async (email: string, password: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const stored = localStorage.getItem(`auth_user_${email}`);
    if (!stored) {
      return { user: null, error: { message: 'Invalid credentials' } };
    }
    
    const { password: storedPassword } = JSON.parse(stored);
    if (storedPassword !== password) {
      return { user: null, error: { message: 'Invalid credentials' } };
    }
    
    const user = {
      id: Math.random().toString(36).substring(7),
      email,
      aud: 'authenticated',
      created_at: new Date().toISOString(),
    };
    
    localStorage.setItem('current_user', JSON.stringify(user));
    return { user, error: null };
  },

  signOut: async () => {
    localStorage.removeItem('current_user');
    return { error: null };
  },

  getUser: async () => {
    const user = localStorage.getItem('current_user');
    return user ? JSON.parse(user) : null;
  },
};
