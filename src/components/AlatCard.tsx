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

      {/* Foto alat */}
      <Image
        source={{ uri: alat.gambar }}
        style={styles.gambar}
        resizeMode="cover"
      />

      {/* Nama */}
      <Text
        style={styles.nama}
        numberOfLines={1}
      >
        {alat.nama}
      </Text>

      {/* Kategori */}
      <Text
        style={styles.kategori}
        numberOfLines={1}
      >
        {alat.kategori}
      </Text>

      {/* Harga */}
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

      {/* Stok */}
      <View style={styles.stockBox}>
        <View style={styles.stockDot} />

        <Text style={styles.stockText}>
          {alat.stok} tersedia
        </Text>
      </View>

      {/* Tombol */}
      <Pressable
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
    borderRadius: 16,
    padding: 10,
    marginBottom: 14,
    elevation: 3,
  },

  gambar: {
    width: '100%',
    height: 115,
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: '#E2E8F0',
  },

  nama: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#172033',
  },

  kategori: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 3,
  },

  priceContainer: {
    marginTop: 9,
  },

  priceLabel: {
    fontSize: 9,
    color: '#94A3B8',
  },

  harga: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2563EB',
    marginTop: 1,
  },

  perHari: {
    fontSize: 9,
    color: '#64748B',
    marginTop: 1,
  },

  stockBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderRadius: 7,
    paddingVertical: 5,
    paddingHorizontal: 7,
    alignSelf: 'flex-start',
    marginTop: 8,
  },

  stockDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22C55E',
    marginRight: 5,
  },

  stockText: {
    fontSize: 9,
    color: '#15803D',
    fontWeight: '600',
  },

  button: {
    height: 34,
    backgroundColor: '#2563EB',
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 9,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },

});