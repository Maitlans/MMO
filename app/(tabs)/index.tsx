import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../contexts/AuthContext';

export default function HomeScreen() {
  const { user } = useAuth();

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
          <View style={styles.userInfo}>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.username}>{user?.username || 'Player'}</Text>
          </View>
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
        </View>

        <View style={styles.gameStats}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Games Played</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>2</Text>
            <Text style={styles.statLabel}>Wins</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>120</Text>
            <Text style={styles.statLabel}>Score</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Recent Activity</Text>

        <View style={styles.activityCard}>
          <View style={styles.activityHeader}>
            <Text style={styles.activityTitle}>Last Game</Text>
            <Text style={styles.activityTime}>2 hours ago</Text>
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityDescription}>
              You scored 45 points in Dragon Quest
            </Text>
          </View>
        </View>

        <View style={styles.activityCard}>
          <View style={styles.activityHeader}>
            <Text style={styles.activityTitle}>Achievement Unlocked</Text>
            <Text style={styles.activityTime}>Yesterday</Text>
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityDescription}>
              First Victory - Win your first game
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Continue Playing</Text>

        <View style={styles.gameCard}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
            style={styles.gameImage}
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.gameGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          >
            <Text style={styles.gameTitle}>Dragon Quest</Text>
            <Text style={styles.gameProgress}>Level 3 • 45% Complete</Text>
          </LinearGradient>
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
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingVertical: 8,
  },
  userInfo: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    color: '#A0A0A0',
    marginBottom: 4,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  avatarBorder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },
  gameStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1E222A',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#A0A0A0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
    marginTop: 8,
  },
  activityCard: {
    backgroundColor: '#1E222A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  activityTime: {
    fontSize: 12,
    color: '#A0A0A0',
  },
  activityContent: {},
  activityDescription: {
    fontSize: 14,
    color: '#E0E0E0',
  },
  gameCard: {
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  gameImage: {
    width: '100%',
    height: '100%',
  },
  gameGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    padding: 16,
    justifyContent: 'flex-end',
  },
  gameTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  gameProgress: {
    fontSize: 14,
    color: '#E0E0E0',
  },
});