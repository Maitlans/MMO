import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RegisterForm } from '../../components/auth/RegisterForm';

const { width } = Dimensions.get('window');

export default function RegisterScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoContainer}>
          <View style={styles.logoWrapper}>
            <LinearGradient
              colors={['#7863DF', '#5546D6']}
              style={styles.logoBackground}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
            <Image
              source={{ uri: 'https://images.pexels.com/photos/7915069/pexels-photo-7915069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
              style={styles.gameLogo}
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join the adventure! Sign up to start playing.</Text>
          
          <View style={styles.formContainer}>
            <RegisterForm />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  logoWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  gameLogo: {
    width: 80,
    height: 80,
  },
  content: {
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#A0A0A0',
    textAlign: 'center',
    marginBottom: 32,
  },
  formContainer: {
    backgroundColor: '#1E222A',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 4,
    width: width > 500 ? 500 : '100%',
    alignSelf: 'center',
  },
});