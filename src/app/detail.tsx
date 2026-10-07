import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";

import { daftarAlat } from "../Data/alat";

const isWeb = Platform.OS === "web";

export default function DetailScreen() {
  const { id } = useLocalSearchParams();

  const alat = daftarAlat.find((item) => item.id === Number(id));

  if (!alat) {
    return (
      <View style={styles.outerContainer}>
        <View style={styles.container}>
          <Text style={styles.error}>Data alat tidak ditemukan.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={23} color="#172033" />
          </Pressable>

          <Text style={styles.headerTitle}>Detail Alat</Text>

          <View style={styles.headerSpace} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.detailLayout}>
            <View style={styles.hero}>
              <Image
                source={{ uri: alat.gambar }}
                style={styles.gambar}
                resizeMode="cover"
              />

              <Text style={styles.title}>{alat.nama}</Text>

              <View style={styles.categoryBox}>
                <Text style={styles.category}>{alat.kategori}</Text>
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Informasi Alat</Text>

              <View style={styles.infoItem}>
                <View style={styles.infoIcon}>
                  <Ionicons name="cash-outline" size={20} color="#2563EB" />
                </View>

                <View>
                  <Text style={styles.label}>Harga Sewa</Text>

                  <Text style={styles.price}>
                    Rp {alat.hargaSewa.toLocaleString("id-ID")}
                    <Text style={styles.perHari}> / hari</Text>
                  </Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.infoItem}>
                <View style={styles.infoIcon}>
                  <Ionicons name="cube-outline" size={20} color="#2563EB" />
                </View>

                <View>
                  <Text style={styles.label}>Stok Tersedia</Text>

                  <Text style={styles.value}>{alat.stok} unit</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <Text style={styles.label}>Deskripsi</Text>

              <Text style={styles.description}>{alat.deskripsi}</Text>

              <Pressable style={styles.button}>
                <Text style={styles.buttonText}>Sewa Sekarang</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: isWeb ? "#F1F5F9" : "#FFFFFF",
    alignItems: "center",
  },

  container: {
    flex: 1,
    width: "100%",
    maxWidth: isWeb ? 1500 : 390,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
  },

  header: {
    height: 68,
    width: "100%",
    paddingHorizontal: isWeb ? 40 : 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#CBD5E1",
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CBD5E1",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#172033",
  },

  headerSpace: {
    width: 42,
  },

  scrollContent: {
    width: "100%",
    paddingHorizontal: isWeb ? 40 : 16,
    paddingTop: isWeb ? 30 : 18,
    paddingBottom: 40,
  },

  detailLayout: {
    width: "100%",
    maxWidth: 1000,
    alignSelf: "center",
  },

  hero: {
    backgroundColor: "#2563EB",
    borderRadius: 20,
    padding: isWeb ? 25 : 14,
    alignItems: "center",
    marginBottom: 18,
  },

  gambar: {
    width: "100%",
    height: isWeb ? 330 : 220,
    borderRadius: 16,
    marginBottom: 15,
    backgroundColor: "#F1F5F9",
  },

  title: {
    fontSize: isWeb ? 28 : 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },

  categoryBox: {
    backgroundColor: "#3B82F6",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginTop: 7,
  },

  category: {
    fontSize: 11,
    color: "#DBEAFE",
  },

  card: {
    backgroundColor: "#F8FAFC",
    borderRadius: 18,
    padding: isWeb ? 25 : 18,
    borderWidth: 1,
    borderColor: "#CBD5E1",
  },

  cardTitle: {
    fontSize: isWeb ? 22 : 18,
    fontWeight: "bold",
    color: "#172033",
    marginBottom: 18,
  },

  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  infoIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 11,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  label: {
    fontSize: 11,
    color: "#64748B",
    marginBottom: 4,
  },

  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2563EB",
  },

  perHari: {
    fontSize: 11,
    fontWeight: "normal",
    color: "#64748B",
  },

  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#172033",
  },

  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 15,
  },

  description: {
    fontSize: 14,
    lineHeight: 21,
    color: "#475569",
  },

  button: {
    height: 48,
    backgroundColor: "#2563EB",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },

  error: {
    fontSize: 16,
    color: "#475569",
    textAlign: "center",
    marginTop: 50,
  },
});
