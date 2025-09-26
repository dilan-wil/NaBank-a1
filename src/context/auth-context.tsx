"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Session, User } from "@supabase/supabase-js";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  register: (
    email: string,
    phone: string,
    password: string,
    options: any
  ) => Promise<{ error: any; data: any }>;
  login: (identifier: string, password: string) => Promise<{ error: any }>;
  loginWithOtp: (identifier: string) => Promise<{ error: any }>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Load user session on mount
  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log(session?.user);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    // 🔔 Listen to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log(session?.user);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 📌 Register with email/phone + password
  const register = async (
    email: string,
    phone: string,
    password: string,
    options: any
  ) => {
    let response;
    response = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { ...options, phone }, // custom metadata
      },
    });
    return { error: response.error, data: response.data };
  };

  // 📌 Login with email/phone + password
  const login = async (identifier: string, password: string) => {
    let response;
    if (identifier.includes("@")) {
      response = await supabase.auth.signInWithPassword({
        email: identifier,
        password,
      });
    } else {
      response = await supabase.auth.signInWithPassword({
        phone: identifier,
        password,
      });
    }
    return { error: response.error };
  };

  // 📌 Login with OTP (email or phone)
  const loginWithOtp = async (identifier: string) => {
    let response;
    if (identifier.includes("@")) {
      response = await supabase.auth.signInWithOtp({ email: identifier });
    } else {
      response = await supabase.auth.signInWithOtp({ phone: identifier });
    }
    return { error: response.error };
  };

  // 📌 Logout
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, register, login, loginWithOtp, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
