import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  gradientColors?: string[];
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  style,
  textStyle,
  gradientColors,
  children,
  ...props
}: ButtonProps) {
  const buttonStyles = [
    styles.button,
    styles[`button_${variant}`],
    styles[`button_${size}`],
    fullWidth && styles.fullWidth,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`text_${variant}`],
    styles[`text_${size}`],
    textStyle,
  ];

  // For primary buttons with gradient
  if (variant === 'primary' && gradientColors) {
    return (
      <TouchableOpacity
        style={[styles.buttonWrapper, fullWidth && styles.fullWidth]}
        activeOpacity={0.8}
        disabled={loading || props.disabled}
        {...props}
      >
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[...buttonStyles, { backgroundColor: 'transparent' }]}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff\" size="small" />
          ) : (
            <Text style={textStyles}>{children}</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={buttonStyles}
      activeOpacity={0.8}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#ffffff' : '#7863DF'} size="small" />
      ) : (
        <Text style={textStyles}>{children}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  button_primary: {
    backgroundColor: '#7863DF',
  },
  button_secondary: {
    backgroundColor: '#2A2E37',
  },
  button_outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#7863DF',
  },
  button_ghost: {
    backgroundColor: 'transparent',
  },
  button_sm: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  button_md: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  button_lg: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    fontWeight: '600',
  },
  text_primary: {
    color: '#ffffff',
  },
  text_secondary: {
    color: '#ffffff',
  },
  text_outline: {
    color: '#7863DF',
  },
  text_ghost: {
    color: '#7863DF',
  },
  text_sm: {
    fontSize: 14,
  },
  text_md: {
    fontSize: 16,
  },
  text_lg: {
    fontSize: 18,
  },
});