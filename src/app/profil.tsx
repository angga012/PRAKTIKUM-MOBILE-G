import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Platform,
} from 'react-native';

import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

const isWeb = Platform.OS === 'web';

export default function ProfilScreen() {
  const handleKembali = () => {
    router.replace('/');
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={handleKembali}
          >
            <Ionicons
              name="arrow-back"
              size={23}
              color="#172033"
            />
          </Pressable>

          <Text style={styles.headerTitle}>
            Profil
          </Text>

          <View style={styles.headerSpace} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.content}>
            <View style={styles.headerContent}>
              <Text style={styles.pageTitle}>
                Profil Mahasiswa
              </Text>

              <Text style={styles.subtitle}>
                Informasi mahasiswa
              </Text>
            </View>

            <View style={styles.profileCard}>
              <View style={styles.profileIcon}>
                <Ionicons
                  name="person"
                  size={42}
                  color="#2563EB"
                />
              </View>

              <Text style={styles.name}>
                Anggara Aribawa
              </Text>

              <Text style={styles.nim}>
                202410370110103
              </Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.cardTitle}>
                Data Mahasiswa
              </Text>

              <View style={styles.infoItem}>
                <Text style={styles.label}>
                  Nama
                </Text>

                <Text style={styles.value}>
                  Anggara Aribawa
                </Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.label}>
                  NIM
                </Text>

                <Text style={styles.value}>
                  202410370110103
                </Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.label}>
                  Program Studi
                </Text>

                <Text style={styles.value}>
                  Informatika
                </Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.label}>
                  Universitas
                </Text>

                <Text style={styles.value}>
                  Universitas Muhammadiyah Malang
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomNav}>
          <Pressable
            style={styles.navItem}
            onPress={handleKembali}
          >
            <Ionicons
              name="home-outline"
              size={24}
              color="#64748B"
            />

            <Text style={styles.navText}>
              Beranda
            </Text>
          </Pressable>

          <View style={styles.navItem}>
            <Ionicons
              name="person"
              size={24}
              color="#2563EB"
            />

            <Text style={styles.navActive}>
              Profil
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: isWeb ? '#F1F5F9' : '#FFFFFF',
    alignItems: 'center',
  },

  container: {
    flex: 1,
    width: '100%',
    maxWidth: isWeb ? 1500 : 390,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },

  header: {
    height: 68,
    width: '100%',
    paddingHorizontal: isWeb ? 40 : 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#CBD5E1',
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#172033',
  },

  headerSpace: {
    width: 42,
  },

  scrollContent: {
    width: '100%',
    paddingBottom: 100,
  },

  content: {
    width: '100%',
    maxWidth: 900,
    alignSelf: 'center',
    paddingHorizontal: isWeb ? 40 : 16,
    paddingTop: isWeb ? 35 : 22,
  },

  headerContent: {
    marginBottom: 20,
  },

  pageTitle: {
    fontSize: isWeb ? 28 : 22,
    fontWeight: 'bold',
    color: '#172033',
  },

  subtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
  },

  profileCard: {
    width: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 20,
    paddingVertical: isWeb ? 35 : 25,
    paddingHorizontal: 18,
    alignItems: 'center',
    marginBottom: 18,
  },

  profileIcon: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 11,
  },

  name: {
    fontSize: isWeb ? 25 : 21,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },

  nim: {
    fontSize: 13,
    color: '#DBEAFE',
    marginTop: 4,
  },

  infoCard: {
    width: '100%',
    backgroundColor: '#F8FAFC',
    borderRadius: 18,
    padding: isWeb ? 25 : 18,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },

  cardTitle: {
    fontSize: isWeb ? 22 : 18,
    fontWeight: 'bold',
    color: '#172033',
    marginBottom: 6,
  },

  infoItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingVertical: 14,
  },

  label: {
    fontSize: 11,
    color: '#64748B',
    marginBottom: 4,
  },

  value: {
    fontSize: 14,
    fontWeight: '600',
    color: '#172033',
  },

  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    maxWidth: isWeb ? 1500 : 390,
    height: 72,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#CBD5E1',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: isWeb ? 500 : 100,
  },

  navItem: {
    width: 90,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },

  navActive: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#2563EB',
    marginTop: 3,
  },

  navText: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 3,
  },
});

