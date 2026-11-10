import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Beranda',
        }}
      />

      <Stack.Screen
        name="profil"
        options={{
          title: 'Profil',
        }}
      />

      <Stack.Screen
        name="detail"
        options={{
          title: 'Detail Alat',
        }}
      />
    </Stack>
  );
}