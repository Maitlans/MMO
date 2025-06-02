import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { z } from 'zod';

import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Checkbox } from '../ui/Checkbox';
import { Message } from '../ui/Message';
import { loginSchema, LoginFormData } from '../../lib/validators';
import { loginUser } from '../../lib/auth';
import { useAuth } from '../../contexts/AuthContext';

export function LoginForm() {
  const { setUser } = useAuth();
  
  const [formData, setFormData] = useState<Partial<LoginFormData>>({
    usernameOrEmail: '',
    password: '',
    rememberMe: false,
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (field: keyof LoginFormData, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error for this field when user types
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    try {
      loginSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof LoginFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof LoginFormData] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setMessage(null);
    
    try {
      // Login user
      const result = await loginUser(formData as LoginFormData);
      
      if (result.success && result.user) {
        setMessage({ type: 'success', text: 'Login successful!' });
        
        // Set user in context
        setUser(result.user);
        
        // Redirect to dashboard
        setTimeout(() => {
          router.replace('/');
        }, 1000);
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Login failed. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      {message && (
        <Message 
          type={message.type} 
          message={message.text} 
          visible={!!message} 
        />
      )}
      
      <Input
        label="Username or Email"
        placeholder="Enter your username or email"
        value={formData.usernameOrEmail}
        onChangeText={(value) => handleChange('usernameOrEmail', value)}
        error={errors.usernameOrEmail}
        autoCapitalize="none"
      />
      
      <Input
        label="Password"
        placeholder="Enter your password"
        value={formData.password}
        onChangeText={(value) => handleChange('password', value)}
        error={errors.password}
        secureTextEntry
        showPasswordToggle
      />
      
      <Checkbox
        label="Remember me"
        checked={!!formData.rememberMe}
        onValueChange={(value) => handleChange('rememberMe', value)}
      />
      
      <Button
        fullWidth
        loading={isSubmitting}
        onPress={handleSubmit}
        gradientColors={['#7863DF', '#5546D6']}
      >
        Login
      </Button>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => router.push('/register')}>
          <Text style={styles.footerLink}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    color: '#A0A0A0',
    marginRight: 8,
  },
  footerLink: {
    color: '#7863DF',
    fontWeight: '600',
  },
});