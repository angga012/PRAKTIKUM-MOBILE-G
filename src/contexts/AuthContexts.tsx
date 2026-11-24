import type { Session } from "@supabase/supabase-js";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

import { supabase } from "@/lib/supabase";

type AuthAction = "signIn" | "signUp" | "signOut" | null;

type AuthContextValue = {
  session: Session | null;
  isLoading: boolean;
  action: AuthAction;
  error: string | null;
  clearError: () => void;
  signIn: (email: string, password: string) => Promise<string | null>;
  signUp: (email: string, password: string) => Promise<string | null>;
  signOut: () => Promise<string | null>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function getErrorMessage(error: unknown): string {
  return error instanceof Error
    ? error.message
    : "Terjadi kesalahan autentikasi.";
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [action, setAction] = useState<AuthAction>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (isMounted) {
        setSession(nextSession);
        setIsLoading(false);
      }
    });

    void supabase.auth
      .getSession()
      .then(({ data, error: sessionError }) => {
        if (!isMounted) return;
        if (sessionError) throw sessionError;
        setSession(data.session);
        setIsLoading(false);
      })
      .catch((sessionError: unknown) => {
        if (!isMounted) return;
        setError(getErrorMessage(sessionError));
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function runAuthAction(
    name: Exclude<AuthAction, null>,
    request: () => Promise<{ error: { message: string } | null }>,
  ): Promise<string | null> {
    setAction(name);
    setError(null);

    try {
      const { error: requestError } = await request();
      if (requestError) {
        setError(requestError.message);
        return requestError.message;
      }
      return null;
    } catch (requestError: unknown) {
      const message = getErrorMessage(requestError);
      setError(message);
      return message;
    } finally {
      setAction(null);
    }
  }

  const value: AuthContextValue = {
    session,
    isLoading,
    action,
    error,
    clearError: () => setError(null),
    signIn: (email, password) =>
      runAuthAction("signIn", () =>
        supabase.auth.signInWithPassword({ email, password }),
      ),
    signUp: (email, password) =>
      runAuthAction("signUp", () => supabase.auth.signUp({ email, password })),
    signOut: () => runAuthAction("signOut", () => supabase.auth.signOut()),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth harus digunakan di dalam AuthProvider.");
  }
  return value;
}