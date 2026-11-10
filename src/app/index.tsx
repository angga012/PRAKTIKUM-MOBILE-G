import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

import AlatCard from "../components/AlatCard";
import { daftarAlat } from "../Data/alat";
import { getApiTools } from "../Data/api";
import { styles } from "../Styles/styles";
import type { ApiTool } from "../Types/api";

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const itemWidth =
    width < 700
      ? (width - (Platform.OS === "web" ? 64 : 32) -
          (Platform.OS === "web" ? 18 : 0)) /
        2
      : width < 1050
        ? "30%"
        : "23%";
  const [jumlahAlat, setJumlahAlat] = useState(0);
  const [alatApi, setAlatApi] = useState<ApiTool[]>([]);
  const [memuatApi, setMemuatApi] = useState(true);
  const [errorApi, setErrorApi] = useState<string | null>(null);
  const [percobaanMuat, setPercobaanMuat] = useState(0);

  useEffect(() => {
    setJumlahAlat(daftarAlat.length);
  }, []);

  useEffect(() => {
    let masihTerpasang = true;

    setMemuatApi(true);
    setErrorApi(null);

    getApiTools()
      .then((tools) => {
        if (masihTerpasang) {
          setAlatApi(tools);
        }
      })
      .catch((error: unknown) => {
        if (masihTerpasang) {
          setErrorApi(
            error instanceof Error
              ? error.message
              : "Terjadi kesalahan saat mengambil data API.",
          );
        }
      })
      .finally(() => {
        if (masihTerpasang) {
          setMemuatApi(false);
        }
      });

    return () => {
      masihTerpasang = false;
    };
  }, [percobaanMuat]);

  const handleDetail = (id: number) => {
    router.replace({
      pathname: "/detail",
      params: {
        id: id.toString(),
      },
    });
  };

  const handleProfil = () => {
    router.push("/profil");
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
              <Text style={styles.greeting}>Halo, Anggara 👋</Text>

              <Text style={styles.welcome}>Mau sewa alat apa hari ini?</Text>
            </View>

            <View style={styles.headerIcon}>
              <Ionicons name="construct-outline" size={25} color="#2563EB" />
            </View>
          </View>

          <View style={styles.banner}>
            <View style={styles.bannerText}>
              <Text style={styles.bannerTitle}>Sewa Alat Bangunan</Text>

              <Text style={styles.bannerSubtitle}>
                Temukan alat yang kamu butuhkan dengan mudah dan cepat.
              </Text>
            </View>

            <View style={styles.bannerIcon}>
              <Ionicons name="hammer-outline" size={45} color="#FFFFFF" />
            </View>
          </View>

          <View style={styles.summaryRow}>
            <View style={styles.summaryCard}>
              <View style={styles.summaryIcon}>
                <Ionicons name="construct-outline" size={22} color="#2563EB" />
              </View>

              <View>
                <Text style={styles.summaryNumber}>{jumlahAlat}</Text>

                <Text style={styles.summaryLabel}>Jenis Alat</Text>
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
                <Text style={styles.summaryNumber}>Tersedia</Text>

                <Text style={styles.summaryLabel}>Siap Disewa</Text>
              </View>
            </View>
          </View>

          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Daftar Alat</Text>

              <Text style={styles.sectionSubtitle}>
                Pilih alat sesuai kebutuhanmu
              </Text>
            </View>

            <Text style={styles.totalAlat}>{jumlahAlat} alat</Text>
          </View>

          <View style={styles.alatGrid}>
            {daftarAlat.map((alat) => (
              <View
                key={alat.id}
                style={[styles.alatItem, { width: itemWidth }]}
              >
                <AlatCard alat={alat} onPress={() => handleDetail(alat.id)} />
              </View>
            ))}
          </View>

          <View style={apiStyles.section}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>Alat Bangunan dari API</Text>
                <Text style={styles.sectionSubtitle}>
                  Informasi alat dari Wikipedia
                </Text>
              </View>
              <Text style={styles.totalAlat}>{alatApi.length} alat</Text>
            </View>

            {memuatApi ? (
              <Text style={apiStyles.statusCard}>
                Sedang mengambil data produk...
              </Text>
            ) : errorApi ? (
              <View style={apiStyles.statusCard}>
                <Text style={apiStyles.errorTitle}>
                  Data belum dapat dimuat
                </Text>
                <Text style={apiStyles.error}>
                  Gagal memuat data API: {errorApi}
                </Text>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => setPercobaanMuat((jumlah) => jumlah + 1)}
                  style={apiStyles.retryButton}
                >
                  <Text style={apiStyles.retryText}>Coba lagi</Text>
                </Pressable>
              </View>
            ) : alatApi.length === 0 ? (
              <Text style={apiStyles.statusCard}>
                API tidak mengirimkan data alat bangunan.
              </Text>
            ) : (
              <View style={styles.alatGrid}>
                {alatApi.map((alat) => (
                  <View
                    key={alat.id}
                    style={[styles.alatItem, { width: itemWidth }]}
                  >
                    <View style={apiStyles.productCard}>
                      <Image
                        source={{ uri: alat.thumbnail }}
                        style={apiStyles.productImage}
                        contentFit="cover"
                        transition={200}
                        accessibilityLabel={`Gambar ${alat.title}`}
                      />
                      <View style={apiStyles.productInfo}>
                        <Text numberOfLines={2} style={apiStyles.productTitle}>
                          {alat.title}
                        </Text>
                        <View style={apiStyles.categoryBadge}>
                          <Text style={apiStyles.productCategory}>
                            Alat bangunan
                          </Text>
                        </View>
                        <Text
                          numberOfLines={3}
                          style={apiStyles.productDescription}
                        >
                          {alat.description}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        </ScrollView>

        <View style={styles.bottomNav}>
          <Pressable style={styles.navItem}>
            <Ionicons name="home" size={25} color="#2563EB" />

            <Text style={styles.navActive}>Beranda</Text>
          </Pressable>

          <Pressable style={styles.navItem} onPress={handleProfil}>
            <Ionicons name="person-outline" size={25} color="#64748B" />

            <Text style={styles.navText}>Profil</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const apiStyles = StyleSheet.create({
  section: {
    marginTop: 32,
  },
  statusCard: {
    marginTop: 5,
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
    color: "#64748B",
    fontSize: 13,
    lineHeight: 19,
  },
  error: {
    marginTop: 6,
    color: "#B91C1C",
    fontSize: 12,
    lineHeight: 18,
  },
  errorTitle: {
    color: "#172033",
    fontSize: 15,
    fontWeight: "700",
  },
  retryButton: {
    alignSelf: "flex-start",
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#2563EB",
  },
  retryText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  productCard: {
    flex: 1,
    overflow: "hidden",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
    elevation: 2,
  },
  productImage: {
    width: "100%",
    height: 148,
    backgroundColor: "#F1F5F9",
  },
  productInfo: {
    padding: 13,
  },
  productTitle: {
    color: "#172033",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700",
    minHeight: 40,
  },
  categoryBadge: {
    alignSelf: "flex-start",
    marginTop: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: "#EFF6FF",
  },
  productCategory: {
    color: "#2563EB",
    fontSize: 10,
    fontWeight: "600",
  },
  productDescription: {
    marginTop: 8,
    color: "#475569",
    fontSize: 12,
    lineHeight: 17,
  },
});