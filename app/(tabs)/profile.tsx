import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Trophy, Medal, Clock, LogOut } from 'lucide-react-native';
import { useAuth } from '../../contexts/AuthContext';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

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
        <View style={styles.header}>
          <LinearGradient
            colors={['#7863DF20', '#5546D620']}
            style={styles.headerBackground}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />

          <View style={styles.profileContainer}>
            <View style={styles.avatarContainer}>
              <LinearGradient
                colors={['#7863DF', '#5546D6']}
                style={styles.avatarBorder}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Image
                  source={{ uri: 'https://images.pexels.com/photos/1557801/pexels-photo-1557801.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
                  style={styles.avatar}
                />
              </LinearGradient>
            </View>

            <Text style={styles.username}>{user?.username || 'Player'}</Text>
            <Text style={styles.email}>{user?.email || 'player@example.com'}</Text>

            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Trophy size={20} color="#FFD700" />
                <Text style={styles.statValue}>2</Text>
                <Text style={styles.statLabel}>Wins</Text>
              </View>
              <View style={styles.statItem}>
                <Medal size={20} color="#C0C0C0" />
                <Text style={styles.statValue}>5</Text>
                <Text style={styles.statLabel}>Achievements</Text>
              </View>
              <View style={styles.statItem}>
                <Clock size={20} color="#7863DF" />
                <Text style={styles.statValue}>8h</Text>
                <Text style={styles.statLabel}>Playtime</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Achievements</Text>
          <View style={styles.achievementsList}>
            <View style={styles.achievementCard}>
              <View style={[styles.achievementIcon, { backgroundColor: '#FFD70020' }]}>
                <Trophy size={24} color="#FFD700" />
              </View>
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementTitle}>First Victory</Text>
                <Text style={styles.achievementDesc}>Win your first game</Text>
              </View>
              <Text style={styles.achievementDate}>2 days ago</Text>
            </View>

            <View style={styles.achievementCard}>
              <View style={[styles.achievementIcon, { backgroundColor: '#7863DF20' }]}>
                <Medal size={24} color="#7863DF" />
              </View>
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementTitle}>Quick Learner</Text>
                <Text style={styles.achievementDesc}>Complete the tutorial</Text>
              </View>
              <Text style={styles.achievementDate}>3 days ago</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color="#FF5252" />
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
    paddingBottom: 40,
  },
  header: {
    paddingBottom: 24,
    marginBottom: 24,
    position: 'relative',
  },
  headerBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  profileContainer: {
    alignItems: 'center',
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 16,
  },
  avatarBorder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#A0A0A0',
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
    padding: 16,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#A0A0A0',
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  achievementsList: {
    gap: 12,
  },
  achievementCard: {
    backgroundColor: '#1E222A',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  achievementDesc: {
    fontSize: 14,
    color: '#A0A0A0',
  },
  achievementDate: {
    fontSize: 12,
    color: '#A0A0A0',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    paddingVertical: 12,
    marginHorizontal: 16,
    backgroundColor: '#FF525220',
    borderRadius: 8,
  },
  logoutText: {
    marginLeft: 8,
    color: '#FF5252',
    fontWeight: '600',
  },
});