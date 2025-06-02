import { supabase } from './supabase';
import { RegistrationFormData, LoginFormData } from './validators';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

// User type
export type User = {
  id: string;
  username: string;
  email: string;
  created_at: string;
};

// Storage keys
const USER_STORAGE_KEY = 'game_auth_user';
const REMEMBER_ME_KEY = 'game_auth_remember_me';

// Platform-specific storage helper
const storage = {
  async setItem(key: string, value: string) {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  },
  async getItem(key: string) {
    if (Platform.OS === 'web') {
      return localStorage.getItem(key);
    }
    return SecureStore.getItemAsync(key);
  },
  async removeItem(key: string) {
    if (Platform.OS === 'web') {
      localStorage.removeItem(key);
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  }
};

// Register new user
export async function registerUser(userData: RegistrationFormData): Promise<{ success: boolean; message: string; user?: User }> {
  try {
    // First, sign up the user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
    });

    if (authError) {
      throw new Error(authError.message);
    }

    if (!authData.user) {
      throw new Error('Failed to create user account');
    }

    // Then, insert the user data into our users table
    const { data: userData_, error: insertError } = await supabase
      .from('users')
      .insert([
        {
          id: authData.user.id,
          username: userData.username,
          email: userData.email,
          password: userData.password,
        },
      ])
      .select()
      .single();

    if (insertError) {
      // If there was an error inserting the user data, clean up the auth user
      await supabase.auth.signOut();
      throw new Error(insertError.message);
    }

    if (!userData_) {
      throw new Error('Failed to create user profile');
    }

    return {
      success: true,
      message: 'Registration successful',
      user: {
        id: userData_.id,
        username: userData_.username,
        email: userData_.email,
        created_at: userData_.created_at,
      },
    };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Registration failed',
    };
  }
}

// Login user
export async function loginUser(loginData: LoginFormData): Promise<{ success: boolean; message: string; user?: User }> {
  try {
    // First, get the user's email if they provided a username
    let email = loginData.usernameOrEmail;
    
    // Check if the input is a username rather than an email
    if (!loginData.usernameOrEmail.includes('@')) {
      // Query the users table to get the email for this username
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('email')
        .eq('username', loginData.usernameOrEmail)
        .single();

      if (userError || !userData) {
        throw new Error('User not found');
      }

      email = userData.email;
    }

    // Sign in with Supabase Auth using the email
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: email,
      password: loginData.password,
    });

    if (authError) {
      throw new Error(authError.message);
    }

    if (!authData.user) {
      throw new Error('Login failed');
    }

    // Get user data from our users table
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (userError) {
      throw new Error(userError.message);
    }

    if (!userData) {
      throw new Error('User profile not found');
    }

    const user = {
      id: userData.id,
      username: userData.username,
      email: userData.email,
      created_at: userData.created_at,
    };

    // Save user data if remember me is checked
    if (loginData.rememberMe) {
      await storage.setItem(REMEMBER_ME_KEY, 'true');
      await saveUserData(user);
    } else {
      await storage.removeItem(REMEMBER_ME_KEY);
    }

    return {
      success: true,
      message: 'Login successful',
      user,
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Login failed',
    };
  }
}

// Logout user
export async function logoutUser(): Promise<void> {
  await supabase.auth.signOut();
  await storage.removeItem(USER_STORAGE_KEY);
  await storage.removeItem(REMEMBER_ME_KEY);
}

// Save user data to storage
export async function saveUserData(user: User): Promise<void> {
  await storage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
}

// Get saved user data
export async function getSavedUser(): Promise<User | null> {
  const userData = await storage.getItem(USER_STORAGE_KEY);
  return userData ? JSON.parse(userData) : null;
}

// Check if "remember me" is enabled
export async function isRememberMeEnabled(): Promise<boolean> {
  const rememberMe = await storage.getItem(REMEMBER_ME_KEY);
  return rememberMe === 'true';
}