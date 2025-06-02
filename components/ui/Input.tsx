import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  showPasswordToggle?: boolean;
}

export function Input({
  label,
  error,
  containerStyle,
  showPasswordToggle = false,
  secureTextEntry,
  ...props
}: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer, error ? styles.inputError : null]}>
        <TextInput
          style={styles.input}
          placeholderTextColor="#A0A0A0"
          secureTextEntry={showPasswordToggle ? !isPasswordVisible : secureTextEntry}
          {...props}
        />
        {showPasswordToggle && (
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
            {isPasswordVisible ? (
              <EyeOff size={20} color="#A0A0A0" />
            ) : (
              <Eye size={20} color="#A0A0A0" />
            )}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
    color: '#E0E0E0',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3A3D46',
    borderRadius: 8,
    backgroundColor: '#2A2E37',
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    color: '#FFFFFF',
    fontSize: 16,
  },
  inputError: {
    borderColor: '#FF5252',
  },
  errorText: {
    color: '#FF5252',
    fontSize: 12,
    marginTop: 4,
  },
  eyeIcon: {
    padding: 10,
  },
});