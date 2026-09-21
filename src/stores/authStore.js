import { create } from 'zustand';

// Authentication Store with Customer and Admin roles, profile persistence
export const useAuthStore = create((set, get) => {
  const savedUser = typeof window !== 'undefined' 
    ? JSON.parse(localStorage.getItem('rh_auth_user') || 'null')
    : null;

  return {
    user: savedUser || {
      uid: 'guest_cust_001',
      displayName: 'Chaudhry Tariq',
      email: 'customer@rajahaqnawaz.com',
      phone: '0301 5558899',
      role: 'Customer', // 'Customer' | 'Admin'
      city: 'Lahore',
      address: 'Model Town, Link Road',
      photoURL: null,
      createdAt: new Date().toISOString()
    },
    isAuthenticated: true,
    isLoading: false,
    authError: null,

    // Set role directly (convenient for supervisor / evaluation toggling)
    setRole: (role) => {
      const currentUser = get().user;
      const updated = {
        ...currentUser,
        role: role,
        displayName: role === 'Admin' ? 'Raja Haqnawaz (Admin)' : 'Chaudhry Tariq (Customer)',
        email: role === 'Admin' ? 'admin@rajahaqnawazdairy.com' : 'customer@rajahaqnawaz.com'
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem('rh_auth_user', JSON.stringify(updated));
      }
      set({ user: updated });
    },

    login: async (email, password) => {
      set({ isLoading: true, authError: null });
      await new Promise(resolve => setTimeout(resolve, 600));

      const isAdmin = email.toLowerCase().includes('admin');
      const user = {
        uid: isAdmin ? 'admin_rh_001' : `cust_${Date.now()}`,
        displayName: isAdmin ? 'Raja Haqnawaz (Admin)' : (email.split('@')[0] || 'Valued Customer'),
        email: email,
        phone: isAdmin ? '0300 6072070' : '0301 5558899',
        role: isAdmin ? 'Admin' : 'Customer',
        city: 'Lahore, Punjab',
        address: 'Farm Registry Office',
        photoURL: null,
        createdAt: new Date().toISOString()
      };

      if (typeof window !== 'undefined') {
        localStorage.setItem('rh_auth_user', JSON.stringify(user));
      }

      set({ user, isAuthenticated: true, isLoading: false, authError: null });
      return { success: true, user };
    },

    register: async (userData) => {
      set({ isLoading: true, authError: null });
      await new Promise(resolve => setTimeout(resolve, 700));

      const newUser = {
        uid: `cust_${Date.now()}`,
        displayName: userData.name || 'Livestock Farmer',
        email: userData.email,
        phone: userData.phone || '0300 1234567',
        role: userData.role || 'Customer',
        city: userData.city || 'Punjab',
        address: userData.address || '',
        photoURL: null,
        createdAt: new Date().toISOString()
      };

      if (typeof window !== 'undefined') {
        localStorage.setItem('rh_auth_user', JSON.stringify(newUser));
      }

      set({ user: newUser, isAuthenticated: true, isLoading: false, authError: null });
      return { success: true, user: newUser };
    },

    googleSignIn: async () => {
      set({ isLoading: true, authError: null });
      await new Promise(resolve => setTimeout(resolve, 800));

      const googleUser = {
        uid: `google_cust_${Date.now()}`,
        displayName: 'Google Verified Farmer',
        email: 'verified.farmer@gmail.com',
        phone: '0312 9876543',
        role: 'Customer',
        city: 'Punjab, Pakistan',
        address: 'Near Dairy Cooperative',
        photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
        createdAt: new Date().toISOString()
      };

      if (typeof window !== 'undefined') {
        localStorage.setItem('rh_auth_user', JSON.stringify(googleUser));
      }

      set({ user: googleUser, isAuthenticated: true, isLoading: false });
      return { success: true, user: googleUser };
    },

    forgotPassword: async (email) => {
      set({ isLoading: true });
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ isLoading: false });
      return { 
        success: true, 
        message: `Password reset instructions sent to ${email}. Check your inbox.` 
      };
    },

    logout: () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('rh_auth_user');
      }
      set({
        user: null,
        isAuthenticated: false,
        authError: null
      });
    },

    updateProfile: (updates) => {
      const current = get().user || {};
      const updated = { ...current, ...updates };
      if (typeof window !== 'undefined') {
        localStorage.setItem('rh_auth_user', JSON.stringify(updated));
      }
      set({ user: updated });
    }
  };
});
