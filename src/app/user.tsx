 
import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { getUsers} from "../Data/userApi";
import type { user } from "../Types/user";

export default function UsersScreen() {
  const [users, setUsers] = useState<user[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers ()
      .then((data) => setUsers(data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Daftar Pengguna</Text>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        users.map((user) => (
          <View key={user.id} style={styles.card}>
            <Text style={styles.name}>{user.name}</Text>
            <Text>{user.email}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F1F5F9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "white",
    padding: 15,
    marginBottom: 12,
    borderRadius: 10,
  },
  name: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

 