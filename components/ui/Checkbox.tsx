import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Check } from 'lucide-react-native';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onValueChange: (value: boolean) => void;
  containerStyle?: ViewStyle;
}

export function Checkbox({ label, checked, onValueChange, containerStyle }: CheckboxProps) {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={() => onValueChange(!checked)}
      activeOpacity={0.7}
    >
      <View style={[styles.checkbox, checked ? styles.checkboxChecked : {}]}>
        {checked && <Check size={14} color="#FFFFFF" strokeWidth={3} />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#7863DF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: '#7863DF',
  },
  label: {
    fontSize: 14,
    color: '#E0E0E0',
  },
});