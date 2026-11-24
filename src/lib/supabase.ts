import { createClient, type SupportedStorage } from "@supabase/supabase-js";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
const secureChunkSize = 1500;
const secureChunkMarker = "secure-chunks:v1:";

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Missing EXPO_PUBLIC_SUPABASE_URL or EXPO_PUBLIC_SUPABASE_ANON_KEY.",
  );
}

function getUtf8Length(value: string): number {
  const codePoint = value.codePointAt(0);
  if (codePoint === undefined) return 0;
  if (codePoint <= 0x7f) return 1;
  if (codePoint <= 0x7ff) return 2;
  return codePoint <= 0xffff ? 3 : 4;
}

function splitIntoSecureChunks(value: string): string[] {
  const chunks: string[] = [];
  let chunk = "";
  let chunkSize = 0;

  for (const character of value) {
    const characterSize = getUtf8Length(character);
    if (chunkSize + characterSize > secureChunkSize) {
      chunks.push(chunk);
      chunk = "";
      chunkSize = 0;
    }
    chunk += character;
    chunkSize += characterSize;
  }

  if (chunk || chunks.length === 0) chunks.push(chunk);
  return chunks;
}

function getStoredChunkCount(value: string | null): number | null {
  if (!value?.startsWith(secureChunkMarker)) return null;

  const count = Number(value.slice(secureChunkMarker.length));
  if (!Number.isSafeInteger(count) || count < 1 || count > 128) {
    throw new Error("Secure session storage contains an invalid chunk index.");
  }
  return count;
}

async function getSecureItem(key: string): Promise<string | null> {
  const storedValue = await SecureStore.getItemAsync(key);
  if (storedValue === null) return null;

  const chunkCount = getStoredChunkCount(storedValue);
  if (chunkCount === null) return storedValue;

  const chunks = await Promise.all(
    Array.from({ length: chunkCount }, (_, index) =>
      SecureStore.getItemAsync(`${key}.chunk.${index}`),
    ),
  );
  if (chunks.some((chunk) => chunk === null)) {
    throw new Error("Secure session storage is incomplete.");
  }
  return chunks.join("");
}

async function setSecureItem(key: string, value: string): Promise<void> {
  const oldChunkCount = getStoredChunkCount(
    await SecureStore.getItemAsync(key),
  );
  const chunks = splitIntoSecureChunks(value);

  for (const [index, chunk] of chunks.entries()) {
    await SecureStore.setItemAsync(`${key}.chunk.${index}`, chunk);
  }

  await SecureStore.setItemAsync(key, `${secureChunkMarker}${chunks.length}`);

  if (oldChunkCount !== null && oldChunkCount > chunks.length) {
    await Promise.all(
      Array.from(
        { length: oldChunkCount - chunks.length },
        (_, index) =>
          SecureStore.deleteItemAsync(`${key}.chunk.${chunks.length + index}`),
      ),
    );
  }
}

async function removeSecureItem(key: string): Promise<void> {
  const chunkCount = getStoredChunkCount(
    await SecureStore.getItemAsync(key),
  );
  if (chunkCount !== null) {
    await Promise.all(
      Array.from({ length: chunkCount }, (_, index) =>
        SecureStore.deleteItemAsync(`${key}.chunk.${index}`),
      ),
    );
  }
  await SecureStore.deleteItemAsync(key);
}

const authStorage: SupportedStorage = {
  getItem: (key) => {
    if (Platform.OS === "web") {
      return typeof localStorage === "undefined"
        ? Promise.resolve(null)
        : Promise.resolve(localStorage.getItem(key));
    }

    return getSecureItem(key);
  },
  setItem: (key, value) => {
    if (Platform.OS === "web") {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(key, value);
      }
      return Promise.resolve();
    }

    return setSecureItem(key, value);
  },
  removeItem: (key) => {
    if (Platform.OS === "web") {
      if (typeof localStorage !== "undefined") {
        localStorage.removeItem(key);
      }
      return Promise.resolve();
    }

    return removeSecureItem(key);
  },
};

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    detectSessionInUrl: false,
    persistSession: true,
    storage: authStorage,
  },
});