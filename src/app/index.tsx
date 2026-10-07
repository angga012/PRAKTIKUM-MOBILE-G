import { View, Text, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

import AlatCard from '../components/AlatCard';
import { daftarAlat } from '../Data/alat';
import { styles } from '../Styles/styles';

export default function HomeScreen() {
  const handleDetail = (id: number) => {
    router.push({
      pathname: '/detail',
      params: {
        id: id.toString(),
      },
    });
  };

  const handleProfil = () => {
    router.push('/profil');
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <View style={styles.topHeader}>
            <View>
              <Text style={styles.greeting}>
                Halo, Anggara 👋
              </Text>

              <Text style={styles.welcome}>
                Mau sewa alat apa hari ini?
              </Text>
            </View>

            <View style={styles.headerIcon}>
              <Ionicons
                name="construct-outline"
                size={25}
                color="#2563EB"
              />
            </View>
          </View>

          <View style={styles.banner}>
            <View style={styles.bannerText}>
              <Text style={styles.bannerTitle}>
                Sewa Alat Bangunan
              </Text>
        
              <Text style={styles.bannerSubtitle}>
                Temukan alat yang kamu butuhkan
                dengan mudah dan cepat.
              </Text>
            </View>

            <View style={styles.bannerIcon}>
              <Ionicons
                name="hammer-outline"
                size={45}
                color="#FFFFFF"
              />
            </View>
          </View>

          <View style={styles.summaryRow}>
            <View style={styles.summaryCard}>
              <View style={styles.summaryIcon}>
                <Ionicons
                  name="construct-outline"
                  size={22}
                  color="#2563EB"
                />
              </View>

              <View>
                <Text style={styles.summaryNumber}>
                  {daftarAlat.length}
                </Text>

                <Text style={styles.summaryLabel}>
                  Jenis Alat
                </Text>
              </View>  
            </View>
            

            <View style={styles.summaryCard}>
              <View style={styles.summaryIcon}>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={22}
                  color="#2563EB"
                />
              </View>

              <View>
                <Text style={styles.summaryNumber}>
                  Tersedia
                </Text>

                <Text style={styles.summaryLabel}>
                  Siap Disewa
                </Text>
              </View>
            </View>
            
            
          </View>

          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>
                Daftar Alat
              </Text>

              <Text style={styles.sectionSubtitle}>
                Pilih alat sesuai kebutuhanmu
              </Text>
            </View>

            <Text style={styles.totalAlat}>
              {daftarAlat.length} alat
            </Text>
          </View>

          <View style={styles.alatGrid}>
            {daftarAlat.map((alat) => (
              <View
                key={alat.id}
                style={styles.alatItem}
              >
                <AlatCard
                  alat={alat}
                  onPress={() => handleDetail(alat.id)}
                />
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={styles.bottomNav}>
          <Pressable style={styles.navItem}>
            <Ionicons
              name="home"
              size={25}
              color="#2563EB"
            />

            <Text style={styles.navActive}>
              Beranda
            </Text>
          </Pressable>

          <Pressable
            style={styles.navItem}
            onPress={handleProfil}
          >
            <Ionicons
              name="person-outline"
              size={25}
              color="#64748B"
            />

            <Text style={styles.navText}>
              Profil
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}