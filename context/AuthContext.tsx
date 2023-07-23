"use client";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { Login, SignUp, UserDetails } from "../types/user";

const AuthContext = createContext({});

export const useAuth = () => useContext<any>(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserDetails | null>(null);
  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          displayName: user.displayName || undefined,
          email: user.email || undefined,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubcribe();
  }, []);

  const signup = async (userData: SignUp) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );

      await updateProfile(result.user, {
        displayName: userData.displayName,
      });

      return { authUser: result.user, error: null };
    } catch (error: any) {
      return { authUser: null, error: error.code };
    }
  };

  const login = async (userData: Login) => {
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );

      return { authUser: result.user, error: null };
    } catch (error: any) {
      return { authUser: null, error: error.code };
    }
  };

  const logout = async () => {
    setUser(null);
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
