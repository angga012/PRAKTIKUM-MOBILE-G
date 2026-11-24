import { Link } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useAuth } from "@/contexts/AuthContexts";

type AuthFormProps = {
  mode: "signIn" | "signUp";
};

export default function AuthForm({ mode }: AuthFormProps) {
  const isSignUp = mode === "signUp";
  const { action, clearError, error, signIn, signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [success, setSuccess] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isBusy = isSubmitting || action !== null;

  function clearFeedback() {
    clearError();
    setSuccess(null);
    setValidationError(null);
  }

  async function handleSubmit() {
    if (isBusy) return;
    clearFeedback();

    const normalizedEmail = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setValidationError("Masukkan alamat email yang valid.");
      return;
    }
    if (password.length < 6) {
      setValidationError("Kata sandi harus terdiri dari minimal 6 karakter.");
      return;
    }
    if (isSignUp && password !== confirmation) {
      setValidationError("Konfirmasi kata sandi tidak sama.");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = isSignUp
        ? await signUp(normalizedEmail, password)
        : await signIn(normalizedEmail, password);

      if (!result && isSignUp) {
        setSuccess(
          "Pendaftaran berhasil. Jika diminta, periksa email untuk konfirmasi akun.",
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.outer}
    >
      <View style={styles.card}>
        <Text style={styles.eyebrow}>SEWA ALAT BANGUNAN</Text>
        <Text style={styles.title}>
          {isSignUp ? "Buat akun" : "Selamat datang"}
        </Text>
        <Text style={styles.subtitle}>
          {isSignUp
            ? "Daftar untuk melanjutkan."
            : "Masuk untuk melanjutkan ke aplikasi."}
        </Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          accessibilityLabel="Email"
          keyboardType="email-address"
          onChangeText={(value) => {
            setEmail(value);
            clearFeedback();
          }}
          placeholder="nama@email.com"
          placeholderTextColor="#94A3B8"
          returnKeyType="next"
          style={styles.input}
          value={email}
        />

        <Text style={styles.label}>Kata sandi</Text>
        <TextInput
          autoCapitalize="none"
          autoComplete={isSignUp ? "new-password" : "current-password"}
          accessibilityLabel="Kata sandi"
          onChangeText={(value) => {
            setPassword(value);
            clearFeedback();
          }}
          onSubmitEditing={() => {
            if (!isSignUp) void handleSubmit();
          }}
          placeholder="Minimal 6 karakter"
          placeholderTextColor="#94A3B8"
          returnKeyType={isSignUp ? "next" : "go"}
          secureTextEntry
          style={styles.input}
          value={password}
        />

        {isSignUp && (
          <>
            <Text style={styles.label}>Konfirmasi kata sandi</Text>
            <TextInput
              autoCapitalize="none"
              accessibilityLabel="Konfirmasi kata sandi"
              onChangeText={(value) => {
                setConfirmation(value);
                clearFeedback();
              }}
              onSubmitEditing={() => void handleSubmit()}
              placeholder="Ulangi kata sandi"
              placeholderTextColor="#94A3B8"
              returnKeyType="go"
              secureTextEntry
              style={styles.input}
              value={confirmation}
            />
          </>
        )}

        {(validationError || error) && (
          <Text accessibilityRole="alert" style={styles.error}>
            {validationError || error}
          </Text>
        )}
        {success && <Text style={styles.success}>{success}</Text>}

        <Pressable
          accessibilityRole="button"
          disabled={isBusy}
          onPress={() => void handleSubmit()}
          style={({ pressed }) => [
            styles.button,
            (pressed || isBusy) && styles.buttonMuted,
          ]}
        >
          {isBusy ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>
              {isSignUp ? "Daftar" : "Masuk"}
            </Text>
          )}
        </Pressable>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {isSignUp ? "Sudah punya akun? " : "Belum punya akun? "}
          </Text>
          <Link
            href={isSignUp ? "/sign-in" : "/sign-up"}
            onPress={clearError}
            style={styles.link}
          >
            {isSignUp ? "Masuk" : "Daftar"}
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F1F5F9",
  },
  card: {
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
    padding: 24,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  eyebrow: {
    color: "#2563EB",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
  },
  title: {
    marginTop: 12,
    color: "#172033",
    fontSize: 28,
    fontWeight: "700",
  },
  subtitle: {
    marginTop: 6,
    marginBottom: 22,
    color: "#64748B",
    fontSize: 14,
  },
  label: {
    marginTop: 14,
    marginBottom: 7,
    color: "#334155",
    fontSize: 13,
    fontWeight: "600",
  },
  input: {
    minHeight: 48,
    paddingHorizontal: 13,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    color: "#172033",
    fontSize: 15,
  },
  error: {
    marginTop: 14,
    color: "#B91C1C",
    fontSize: 13,
  },
  success: {
    marginTop: 14,
    color: "#15803D",
    fontSize: 13,
  },
  button: {
    minHeight: 48,
    marginTop: 22,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#2563EB",
  },
  buttonMuted: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  footerText: {
    color: "#64748B",
    fontSize: 13,
  },
  link: {
    color: "#2563EB",
    fontSize: 13,
    fontWeight: "700",
  },
});
