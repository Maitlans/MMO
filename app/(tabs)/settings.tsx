import React from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../contexts/AuthContext';
import { router } from 'expo-router';
import { User, Bell, Volume2, Lock, CircleHelp as HelpCircle, LogOut, ChevronRight } from 'lucide-react-native';

export default function SettingsScreen() {
  const { logout } = useAuth();
  const [notifications, setNotifications] = React.useState(true);
  const [sounds, setSounds] = React.useState(true);

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <LinearGradient
        colors={['#1A1D25', '#2A2E37']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Settings</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <User size={20} color="#7863DF" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Edit Profile</Text>
              <Text style={styles.settingDescription}>Change your profile information</Text>
            </View>
            <ChevronRight size={20} color="#A0A0A0" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Lock size={20} color="#7863DF" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Change Password</Text>
              <Text style={styles.settingDescription}>Update your password</Text>
            </View>
            <ChevronRight size={20} color="#A0A0A0" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Bell size={20} color="#7863DF" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Notifications</Text>
              <Text style={styles.settingDescription}>Receive game notifications</Text>
            </View>
            <Switch
              trackColor={{ false: '#3A3D46', true: '#7863DF' }}
              thumbColor={notifications ? '#FFFFFF' : '#E0E0E0'}
              ios_backgroundColor="#3A3D46"
              onValueChange={setNotifications}
              value={notifications}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Volume2 size={20} color="#7863DF" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Sound Effects</Text>
              <Text style={styles.settingDescription}>Enable game sounds</Text>
            </View>
            <Switch
              trackColor={{ false: '#3A3D46', true: '#7863DF' }}
              thumbColor={sounds ? '#FFFFFF' : '#E0E0E0'}
              ios_backgroundColor="#3A3D46"
              onValueChange={setSounds}
              value={sounds}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <HelpCircle size={20} color="#7863DF" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Help Center</Text>
              <Text style={styles.settingDescription}>Get help with the app</Text>
            </View>
            <ChevronRight size={20} color="#A0A0A0" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color="#FF5252" style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 16,
    paddingVertical: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E222A',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#7863DF20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#A0A0A0',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF525220',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF5252',
  },
});