import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { z } from 'zod';

import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Message } from '../ui/Message';
import { registrationSchema, RegistrationFormData } from '../../lib/validators';
import { registerUser } from '../../lib/auth';

export function RegisterForm() {
  const [formData, setFormData] = useState<Partial<RegistrationFormData>>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof RegistrationFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (field: keyof RegistrationFormData, value: string) => {
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
      registrationSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof RegistrationFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof RegistrationFormData] = err.message;
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
      // Register user
      const result = await registerUser(formData as RegistrationFormData);
      
      if (result.success) {
        setMessage({ type: 'success', text: 'Registration successful! Redirecting to login...' });
        
        // Clear form
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        
        // Redirect to login after a delay
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Registration failed. Please try again.' 
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
        label="Username"
        placeholder="Enter your username"
        value={formData.username}
        onChangeText={(value) => handleChange('username', value)}
        error={errors.username}
        autoCapitalize="none"
      />
      
      <Input
        label="Email"
        placeholder="Enter your email"
        value={formData.email}
        onChangeText={(value) => handleChange('email', value)}
        error={errors.email}
        keyboardType="email-address"
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
      
      <Input
        label="Confirm Password"
        placeholder="Confirm your password"
        value={formData.confirmPassword}
        onChangeText={(value) => handleChange('confirmPassword', value)}
        error={errors.confirmPassword}
        secureTextEntry
        showPasswordToggle
      />
      
      <Button
        fullWidth
        loading={isSubmitting}
        onPress={handleSubmit}
        gradientColors={['#7863DF', '#5546D6']}
      >
        Register
      </Button>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={styles.footerLink}>Login</Text>
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