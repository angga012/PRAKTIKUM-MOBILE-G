import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';

import { Alat } from '../Types/alat';

type AlatCardProps = {
  alat: Alat;
  onPress: () => void;
};

export default function AlatCard({
  alat,
  onPress,
}: AlatCardProps) {
  return (
    <View style={styles.card}>

      <Image
        source={{ uri: alat.gambar }}
        style={styles.gambar}
        resizeMode="cover"
      />

      <Text
        style={styles.nama}
        numberOfLines={1}
      >
        {alat.nama}
      </Text>

      <Text
        style={styles.kategori}
        numberOfLines={1}
      >
        {alat.kategori}
      </Text>

      <View style={styles.priceContainer}>
        <Text style={styles.priceLabel}>
          Mulai dari
        </Text>

        <Text style={styles.harga}>
          Rp {alat.hargaSewa.toLocaleString('id-ID')}
        </Text>

        <Text style={styles.perHari}>
          /hari
        </Text>
      </View>

      <View style={styles.stockBox}>
        <View style={styles.stockDot} />

        <Text style={styles.stockText}>
          {alat.stok} tersedia
        </Text>
      </View>

      <Pressable
        accessibilityRole="button"
        style={styles.button}
        onPress={onPress}
      >
        <Text style={styles.buttonText}>
          Lihat Detail
        </Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 11,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
  },

  gambar: {
    width: '100%',
    height: 128,
    borderRadius: 13,
    marginBottom: 12,
    backgroundColor: '#E2E8F0',
  },

  nama: {
    fontSize: 14,
    fontWeight: '700',
    color: '#172033',
  },

  kategori: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 4,
  },

  priceContainer: {
    marginTop: 11,
  },

  priceLabel: {
    fontSize: 10,
    color: '#94A3B8',
  },

  harga: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2563EB',
    marginTop: 1,
  },

  perHari: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 1,
  },

  stockBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
    marginTop: 10,
  },

  stockDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#22C55E',
    marginRight: 6,
  },

  stockText: {
    fontSize: 10,
    color: '#15803D',
    fontWeight: '600',
  },

  button: {
    height: 38,
    backgroundColor: '#2563EB',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 11,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});