// Authentication Hook

import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import {
  signUpWithEmail,
  signInWithEmail,
  signOutUser,
  resetPassword,
  subscribeToAuthState,
} from '../services/auth';
import { UseAuthResult, AuthUser } from '../types';

export const useAuth = (): UseAuthResult => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToAuthState((firebaseUser: User | null) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      setError(null);
      setLoading(true);
      await signInWithEmail(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string): Promise<void> => {
    try {
      setError(null);
      setLoading(true);
      await signUpWithEmail(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign up');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      setError(null);
      await signOutUser();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign out');
      throw err;
    }
  };

  const handleResetPassword = async (email: string): Promise<void> => {
    try {
      setError(null);
      await resetPassword(email);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset password');
      throw err;
    }
  };

  return {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    resetPassword: handleResetPassword,
  };
};