import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Clock, Trophy, Users } from 'lucide-react-native';

export default function GamesScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <LinearGradient
        colors={['#1A1D25', '#2A2E37']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Game Library</Text>
        
        <Text style={styles.sectionTitle}>Featured Games</Text>
        
        <View style={styles.featuredGame}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
            style={styles.featuredImage}
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.featuredGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          >
            <View style={styles.gameInfo}>
              <Text style={styles.featuredTitle}>Space Explorer</Text>
              <Text style={styles.featuredSubtitle}>Explore the universe in this epic adventure</Text>
              
              <View style={styles.gameStats}>
                <View style={styles.gameStat}>
                  <Clock size={16} color="#A0A0A0" />
                  <Text style={styles.gameStatText}>10-15 min</Text>
                </View>
                <View style={styles.gameStat}>
                  <Users size={16} color="#A0A0A0" />
                  <Text style={styles.gameStatText}>1-4 players</Text>
                </View>
                <View style={styles.gameStat}>
                  <Trophy size={16} color="#A0A0A0" />
                  <Text style={styles.gameStatText}>15 achievements</Text>
                </View>
              </View>
              
              <TouchableOpacity style={styles.playButton}>
                <Text style={styles.playButtonText}>Play Now</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
        
        <Text style={styles.sectionTitle}>Popular Games</Text>
        
        <View style={styles.gameGrid}>
          <TouchableOpacity style={styles.gameCard}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
              style={styles.gameCardImage}
            />
            <View style={styles.gameCardOverlay}>
              <Text style={styles.gameCardTitle}>Super Adventure</Text>
              <Text style={styles.gameCardPlayers}>2-4 players</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.gameCard}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1174746/pexels-photo-1174746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
              style={styles.gameCardImage}
            />
            <View style={styles.gameCardOverlay}>
              <Text style={styles.gameCardTitle}>Dragon Quest</Text>
              <Text style={styles.gameCardPlayers}>1-2 players</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.gameCard}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/159204/game-controller-joystick-joypad-gamepad-159204.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
              style={styles.gameCardImage}
            />
            <View style={styles.gameCardOverlay}>
              <Text style={styles.gameCardTitle}>Racing Stars</Text>
              <Text style={styles.gameCardPlayers}>1-4 players</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.gameCard}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/7915575/pexels-photo-7915575.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
              style={styles.gameCardImage}
            />
            <View style={styles.gameCardOverlay}>
              <Text style={styles.gameCardTitle}>Puzzle Master</Text>
              <Text style={styles.gameCardPlayers}>1 player</Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.sectionTitle}>New Releases</Text>
        
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.newReleasesContainer}
        >
          <TouchableOpacity style={styles.newReleaseCard}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
              style={styles.newReleaseImage}
            />
            <View style={styles.newReleaseInfo}>
              <Text style={styles.newReleaseTitle}>Alien Worlds</Text>
              <Text style={styles.newReleaseDesc}>Space exploration game</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.newReleaseCard}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1293261/pexels-photo-1293261.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
              style={styles.newReleaseImage}
            />
            <View style={styles.newReleaseInfo}>
              <Text style={styles.newReleaseTitle}>Medieval Knights</Text>
              <Text style={styles.newReleaseDesc}>Strategy and combat</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.newReleaseCard}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/7862617/pexels-photo-7862617.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
              style={styles.newReleaseImage}
            />
            <View style={styles.newReleaseInfo}>
              <Text style={styles.newReleaseTitle}>Cyber Run</Text>
              <Text style={styles.newReleaseDesc}>Futuristic racing game</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
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
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
    marginTop: 8,
  },
  featuredGame: {
    height: 280,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
    justifyContent: 'flex-end',
    padding: 16,
  },
  gameInfo: {
    width: '100%',
  },
  featuredTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  featuredSubtitle: {
    fontSize: 14,
    color: '#E0E0E0',
    marginBottom: 12,
  },
  gameStats: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  gameStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  gameStatText: {
    color: '#A0A0A0',
    fontSize: 12,
    marginLeft: 4,
  },
  playButton: {
    backgroundColor: '#7863DF',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  playButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  gameGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  gameCard: {
    width: '48%',
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  gameCardImage: {
    width: '100%',
    height: '100%',
  },
  gameCardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 8,
  },
  gameCardTitle: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  gameCardPlayers: {
    color: '#A0A0A0',
    fontSize: 12,
  },
  newReleasesContainer: {
    paddingRight: 16,
  },
  newReleaseCard: {
    width: 150,
    marginRight: 12,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1E222A',
  },
  newReleaseImage: {
    width: '100%',
    height: 100,
  },
  newReleaseInfo: {
    padding: 12,
  },
  newReleaseTitle: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 4,
  },
  newReleaseDesc: {
    color: '#A0A0A0',
    fontSize: 12,
  },
});