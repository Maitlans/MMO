import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { CircleAlert as AlertCircle, CircleCheck as CheckCircle } from 'lucide-react-native';

type MessageType = 'success' | 'error';

interface MessageProps {
  type: MessageType;
  message: string;
  visible: boolean;
}

export function Message({ type, message, visible }: MessageProps) {
  const opacity = new Animated.Value(0);
  const translateY = new Animated.Value(-20);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.out(Easing.cubic),
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.out(Easing.cubic),
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.in(Easing.cubic),
        }),
        Animated.timing(translateY, {
          toValue: -20,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.in(Easing.cubic),
        }),
      ]).start();
    }
  }, [visible, opacity, translateY]);

  if (!visible && opacity._value === 0) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        styles[`container_${type}`],
        { opacity, transform: [{ translateY }] },
      ]}
    >
      <View style={styles.iconContainer}>
        {type === 'success' ? (
          <CheckCircle size={20} color="#FFFFFF" />
        ) : (
          <AlertCircle size={20} color="#FFFFFF" />
        )}
      </View>
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  container_success: {
    backgroundColor: '#22c55e20',
    borderLeftWidth: 4,
    borderLeftColor: '#22C55E',
  },
  container_error: {
    backgroundColor: '#ef444420',
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
  },
  iconContainer: {
    marginRight: 12,
  },
  message: {
    color: '#FFFFFF',
    fontSize: 14,
    flex: 1,
  },
});